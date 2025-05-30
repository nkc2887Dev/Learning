import mongoose from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"
import { PartService } from "../services/part.service"
import { Part } from "../models/part.model"
import type { CreateRawPartDto, CreateAssembledPartDto } from "../dtos/part.dto"
import { NotFoundException } from "../utils/exceptions"

describe("PartService", () => {
  let partService: PartService
  let mongoServer: MongoMemoryServer

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()
    await mongoose.connect(uri)
    partService = new PartService()
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
  })

  beforeEach(async () => {
    await Part.deleteMany({})
  })

  describe("createRawPart", () => {
    it("should create a raw part", async () => {
      const rawPartDto: CreateRawPartDto = {
        name: "Bolt",
        description: "Standard bolt",
        price: 1.5,
        stockQuantity: 100,
        type: "raw",
        supplier: "Acme Bolts",
        partNumber: "B-123",
      }

      const result = await partService.createRawPart(rawPartDto)

      expect(result).toBeDefined()
      expect(result.name).toBe(rawPartDto.name)
      expect(result.type).toBe("raw")
      expect(result.supplier).toBe(rawPartDto.supplier)
    })
  })

  describe("createAssembledPart", () => {
    it("should create an assembled part with valid components", async () => {
      // First create a raw part to use as a component
      const rawPartDto: CreateRawPartDto = {
        name: "Bolt",
        description: "Standard bolt",
        price: 1.5,
        stockQuantity: 100,
        type: "raw",
        supplier: "Acme Bolts",
        partNumber: "B-123",
      }

      const rawPart = await partService.createRawPart(rawPartDto)

      // Now create an assembled part using the raw part
      const assembledPartDto: CreateAssembledPartDto = {
        name: "Bracket Assembly",
        description: "Standard bracket assembly",
        price: 10,
        stockQuantity: 20,
        type: "assembled",
        components: [
          {
            part: rawPart._id.toString(),
            quantity: 4,
          },
        ],
        assemblyTime: 15,
        assemblyInstructions: "Attach bolts to bracket",
      }

      const result = await partService.createAssembledPart(assembledPartDto)

      expect(result).toBeDefined()
      expect(result.name).toBe(assembledPartDto.name)
      expect(result.type).toBe("assembled")
      expect(result.components).toHaveLength(1)
      expect(result.components[0].quantity).toBe(4)
    })

    it("should throw an error when component part does not exist", async () => {
      const nonExistentId = new mongoose.Types.ObjectId().toString()

      const assembledPartDto: CreateAssembledPartDto = {
        name: "Bracket Assembly",
        description: "Standard bracket assembly",
        price: 10,
        stockQuantity: 20,
        type: "assembled",
        components: [
          {
            part: nonExistentId,
            quantity: 4,
          },
        ],
        assemblyTime: 15,
        assemblyInstructions: "Attach bolts to bracket",
      }

      await expect(partService.createAssembledPart(assembledPartDto)).rejects.toThrow(NotFoundException)
    })
  })

  describe("getPartById", () => {
    it("should return a part by ID", async () => {
      const rawPartDto: CreateRawPartDto = {
        name: "Bolt",
        description: "Standard bolt",
        price: 1.5,
        stockQuantity: 100,
        type: "raw",
        supplier: "Acme Bolts",
        partNumber: "B-123",
      }

      const createdPart = await partService.createRawPart(rawPartDto)
      const foundPart = await partService.getPartById(createdPart._id.toString())

      expect(foundPart).toBeDefined()
      expect(foundPart._id.toString()).toBe(createdPart._id.toString())
    })

    it("should throw an error when part does not exist", async () => {
      const nonExistentId = new mongoose.Types.ObjectId().toString()

      await expect(partService.getPartById(nonExistentId)).rejects.toThrow(NotFoundException)
    })
  })

  describe("calculateAssembledPartCost", () => {
    it("should calculate the total cost of an assembled part", async () => {
      // Create two raw parts
      const bolt = await partService.createRawPart({
        name: "Bolt",
        description: "Standard bolt",
        price: 1.5,
        stockQuantity: 100,
        type: "raw",
        supplier: "Acme Bolts",
        partNumber: "B-123",
      })

      const bracket = await partService.createRawPart({
        name: "Bracket",
        description: "Metal bracket",
        price: 5,
        stockQuantity: 50,
        type: "raw",
        supplier: "Metal Works",
        partNumber: "BR-456",
      })

      // Create an assembled part using both raw parts
      const assembly = await partService.createAssembledPart({
        name: "Bracket Assembly",
        description: "Standard bracket assembly",
        price: 15,
        stockQuantity: 20,
        type: "assembled",
        components: [
          {
            part: bolt._id.toString(),
            quantity: 4,
          },
          {
            part: bracket._id.toString(),
            quantity: 1,
          },
        ],
        assemblyTime: 15,
        assemblyInstructions: "Attach bolts to bracket",
      })

      const result = await partService.calculateAssembledPartCost(assembly._id.toString())

      // Expected cost: (4 bolts * $1.5) + (1 bracket * $5) = $11
      expect(result.totalCost).toBe(11)
      expect(result.breakdown).toHaveLength(2)
    })
  })
})
