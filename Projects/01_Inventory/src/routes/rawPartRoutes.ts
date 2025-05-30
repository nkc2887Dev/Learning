import { Router } from "express"
import { RawPartController } from "../controllers/RawPartController"
import {
  createRawPartValidator,
  updatePartValidator,
  partIdValidator,
  queryValidator,
} from "../validators/partValidators"
import { validateRequest } from "../middleware/validateRequest"

const router = Router()
const rawPartController = new RawPartController()

// GET /api/raw-parts - Get all raw parts with filtering and pagination
router.get("/", queryValidator, validateRequest, rawPartController.getAllRawParts)

// GET /api/raw-parts/low-stock - Get low stock parts
router.get("/low-stock", rawPartController.getLowStockParts)

// GET /api/raw-parts/supplier/:supplier - Get parts by supplier
router.get("/supplier/:supplier", rawPartController.getPartsBySupplier)

// GET /api/raw-parts/:id - Get raw part by ID
router.get("/:id", partIdValidator, validateRequest, rawPartController.getRawPartById)

// POST /api/raw-parts - Create new raw part
router.post("/", createRawPartValidator, validateRequest, rawPartController.createRawPart)

// PUT /api/raw-parts/:id - Update raw part
router.put("/:id", partIdValidator, updatePartValidator, validateRequest, rawPartController.updateRawPart)

// PATCH /api/raw-parts/:id/stock - Update stock quantity
router.patch("/:id/stock", partIdValidator, validateRequest, rawPartController.updateStock)

// DELETE /api/raw-parts/:id - Delete raw part
router.delete("/:id", partIdValidator, validateRequest, rawPartController.deleteRawPart)

export default router
