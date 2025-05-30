"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartController = void 0;
const part_service_1 = require("../services/part.service");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const part_dto_1 = require("../dtos/part.dto");
class PartController {
    constructor() {
        // Get all parts
        this.getAllParts = async (req, res, next) => {
            try {
                const type = req.query.type;
                const parts = await this.partService.getAllParts(type);
                res.status(200).json({ success: true, data: parts });
            }
            catch (error) {
                next(error);
            }
        };
        // Get a part by ID
        this.getPartById = async (req, res, next) => {
            try {
                const part = await this.partService.getPartById(req.params.id);
                res.status(200).json({ success: true, data: part });
            }
            catch (error) {
                next(error);
            }
        };
        // Create a raw part
        this.createRawPart = async (req, res, next) => {
            try {
                const partData = (0, class_transformer_1.plainToClass)(part_dto_1.CreateRawPartDto, req.body);
                await (0, class_validator_1.validateOrReject)(partData);
                const newPart = await this.partService.createRawPart(partData);
                res.status(201).json({ success: true, data: newPart });
            }
            catch (error) {
                next(error);
            }
        };
        // Create an assembled part
        this.createAssembledPart = async (req, res, next) => {
            try {
                const partData = (0, class_transformer_1.plainToClass)(part_dto_1.CreateAssembledPartDto, req.body);
                await (0, class_validator_1.validateOrReject)(partData);
                const newPart = await this.partService.createAssembledPart(partData);
                res.status(201).json({ success: true, data: newPart });
            }
            catch (error) {
                next(error);
            }
        };
        // Update a raw part
        this.updateRawPart = async (req, res, next) => {
            try {
                const updateData = (0, class_transformer_1.plainToClass)(part_dto_1.UpdateRawPartDto, req.body);
                await (0, class_validator_1.validateOrReject)(updateData);
                const updatedPart = await this.partService.updateRawPart(req.params.id, updateData);
                res.status(200).json({ success: true, data: updatedPart });
            }
            catch (error) {
                next(error);
            }
        };
        // Update an assembled part
        this.updateAssembledPart = async (req, res, next) => {
            try {
                const updateData = (0, class_transformer_1.plainToClass)(part_dto_1.UpdateAssembledPartDto, req.body);
                await (0, class_validator_1.validateOrReject)(updateData);
                const updatedPart = await this.partService.updateAssembledPart(req.params.id, updateData);
                res.status(200).json({ success: true, data: updatedPart });
            }
            catch (error) {
                next(error);
            }
        };
        // Delete a part
        this.deletePart = async (req, res, next) => {
            try {
                await this.partService.deletePart(req.params.id);
                res.status(200).json({ success: true, message: "Part deleted successfully" });
            }
            catch (error) {
                next(error);
            }
        };
        // Calculate assembled part cost
        this.calculateAssembledPartCost = async (req, res, next) => {
            try {
                const costBreakdown = await this.partService.calculateAssembledPartCost(req.params.id);
                res.status(200).json({ success: true, data: costBreakdown });
            }
            catch (error) {
                next(error);
            }
        };
        this.partService = new part_service_1.PartService();
    }
}
exports.PartController = PartController;
