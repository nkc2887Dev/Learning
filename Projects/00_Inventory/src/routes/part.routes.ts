import { Router } from "express"
import { PartController } from "../controllers/part.controller"

const router = Router()
const partController = new PartController()

// Get all parts
router.get("/", partController.getAllParts)

// Get a part by ID
router.get("/:id", partController.getPartById)

// Create a raw part
router.post("/raw", partController.createRawPart)

// Create an assembled part
router.post("/assembled", partController.createAssembledPart)

// Update a raw part
router.put("/raw/:id", partController.updateRawPart)

// Update an assembled part
router.put("/assembled/:id", partController.updateAssembledPart)

// Delete a part
router.delete("/:id", partController.deletePart)

// Calculate assembled part cost
router.get("/assembled/:id/cost", partController.calculateAssembledPartCost)

export default router
