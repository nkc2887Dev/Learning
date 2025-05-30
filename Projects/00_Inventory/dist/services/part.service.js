"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const part_model_1 = require("../models/part.model");
const exceptions_1 = require("../utils/exceptions");
class PartService {
    // Get all parts with optional filtering
    async getAllParts(type) {
        const filter = type ? { type } : {};
        return await part_model_1.Part.find(filter).populate({
            path: "components.part",
            model: "Part",
        });
    }
    // Get a part by ID
    async getPartById(id) {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            throw new exceptions_1.BadRequestException("Invalid part ID");
        }
        const part = await part_model_1.Part.findById(id).populate({
            path: "components.part",
            model: "Part",
        });
        if (!part) {
            throw new exceptions_1.NotFoundException(`Part with ID ${id} not found`);
        }
        return part;
    }
    // Create a raw part
    async createRawPart(partData) {
        const rawPart = new part_model_1.RawPart(partData);
        return await rawPart.save();
    }
    // Create an assembled part
    async createAssembledPart(partData) {
        // Validate that all component parts exist
        await this.validateComponents(partData.components);
        const assembledPart = new part_model_1.AssembledPart(partData);
        return await assembledPart.save();
    }
    // Update a raw part
    async updateRawPart(id, updateData) {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            throw new exceptions_1.BadRequestException("Invalid part ID");
        }
        const part = await part_model_1.RawPart.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true });
        if (!part) {
            throw new exceptions_1.NotFoundException(`Raw part with ID ${id} not found`);
        }
        return part;
    }
    // Update an assembled part
    async updateAssembledPart(id, updateData) {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            throw new exceptions_1.BadRequestException("Invalid part ID");
        }
        // If components are being updated, validate them
        if (updateData.components) {
            await this.validateComponents(updateData.components);
        }
        const part = await part_model_1.AssembledPart.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true }).populate({
            path: "components.part",
            model: "Part",
        });
        if (!part) {
            throw new exceptions_1.NotFoundException(`Assembled part with ID ${id} not found`);
        }
        return part;
    }
    // Delete a part
    async deletePart(id) {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            throw new exceptions_1.BadRequestException("Invalid part ID");
        }
        // Check if this part is used in any assembled parts
        const usedInAssembly = await part_model_1.AssembledPart.findOne({
            "components.part": id,
        });
        if (usedInAssembly) {
            throw new exceptions_1.BadRequestException(`Cannot delete part. It is used in assembled part: ${usedInAssembly.name}`);
        }
        const result = await part_model_1.Part.findByIdAndDelete(id);
        if (!result) {
            throw new exceptions_1.NotFoundException(`Part with ID ${id} not found`);
        }
    }
    // Helper method to validate components
    async validateComponents(components) {
        for (const component of components) {
            if (!mongoose_1.default.Types.ObjectId.isValid(component.part)) {
                throw new exceptions_1.BadRequestException(`Invalid component part ID: ${component.part}`);
            }
            const partExists = await part_model_1.Part.findById(component.part);
            if (!partExists) {
                throw new exceptions_1.NotFoundException(`Component part with ID ${component.part} not found`);
            }
        }
    }
    // Calculate the total cost of an assembled part
    async calculateAssembledPartCost(id) {
        const part = await part_model_1.AssembledPart.findById(id).populate({
            path: "components.part",
            model: "Part",
        });
        if (!part) {
            throw new exceptions_1.NotFoundException(`Assembled part with ID ${id} not found`);
        }
        let totalCost = 0;
        const breakdown = [];
        for (const component of part.components) {
            const componentPart = component.part;
            const componentCost = componentPart.price * component.quantity;
            totalCost += componentCost;
            breakdown.push({
                partId: componentPart._id,
                name: componentPart.name,
                unitPrice: componentPart.price,
                quantity: component.quantity,
                subtotal: componentCost,
            });
        }
        return { totalCost, breakdown };
    }
}
exports.PartService = PartService;
