"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const part_controller_1 = require("../controllers/part.controller");
const router = (0, express_1.Router)();
const partController = new part_controller_1.PartController();
// Get all parts
router.get("/", partController.getAllParts);
// Get a part by ID
router.get("/:id", partController.getPartById);
// Create a raw part
router.post("/raw", partController.createRawPart);
// Create an assembled part
router.post("/assembled", partController.createAssembledPart);
// Update a raw part
router.put("/raw/:id", partController.updateRawPart);
// Update an assembled part
router.put("/assembled/:id", partController.updateAssembledPart);
// Delete a part
router.delete("/:id", partController.deletePart);
// Calculate assembled part cost
router.get("/assembled/:id/cost", partController.calculateAssembledPartCost);
exports.default = router;
