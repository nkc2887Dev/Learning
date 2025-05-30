import { Router } from "express"
import { AssembledPartController } from "../controllers/AssembledPartController"
import {
  createAssembledPartValidator,
  updatePartValidator,
  partIdValidator,
  queryValidator,
} from "../validators/partValidators"
import { validateRequest } from "../middleware/validateRequest"

const router = Router()
const assembledPartController = new AssembledPartController()

// GET /api/assembled-parts - Get all assembled parts with filtering and pagination
router.get("/", queryValidator, validateRequest, assembledPartController.getAllAssembledParts)

// GET /api/assembled-parts/skill/:skillLevel - Get parts by skill level
router.get("/skill/:skillLevel", assembledPartController.getPartsBySkillLevel)

// GET /api/assembled-parts/:id - Get assembled part by ID
router.get("/:id", partIdValidator, validateRequest, assembledPartController.getAssembledPartById)

// GET /api/assembled-parts/:id/cost - Calculate total cost
router.get("/:id/cost", partIdValidator, validateRequest, assembledPartController.calculateTotalCost)

// GET /api/assembled-parts/:id/availability - Check component availability
router.get("/:id/availability", partIdValidator, validateRequest, assembledPartController.checkComponentAvailability)

// POST /api/assembled-parts - Create new assembled part
router.post("/", createAssembledPartValidator, validateRequest, assembledPartController.createAssembledPart)

// PUT /api/assembled-parts/:id - Update assembled part
router.put("/:id", partIdValidator, updatePartValidator, validateRequest, assembledPartController.updateAssembledPart)

// DELETE /api/assembled-parts/:id - Delete assembled part
router.delete("/:id", partIdValidator, validateRequest, assembledPartController.deleteAssembledPart)

export default router
