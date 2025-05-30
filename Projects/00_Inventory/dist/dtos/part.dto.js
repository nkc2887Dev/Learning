"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAssembledPartDto = exports.UpdateRawPartDto = exports.UpdatePartDto = exports.CreateAssembledPartDto = exports.ComponentDto = exports.CreateRawPartDto = exports.CreatePartDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
// Base DTO for all parts
class CreatePartDto {
}
exports.CreatePartDto = CreatePartDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePartDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePartDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreatePartDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreatePartDto.prototype, "stockQuantity", void 0);
// DTO for raw parts
class CreateRawPartDto extends CreatePartDto {
}
exports.CreateRawPartDto = CreateRawPartDto;
__decorate([
    (0, class_validator_1.IsEnum)(["raw"]),
    __metadata("design:type", String)
], CreateRawPartDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRawPartDto.prototype, "supplier", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRawPartDto.prototype, "partNumber", void 0);
// DTO for component in assembled parts
class ComponentDto {
}
exports.ComponentDto = ComponentDto;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], ComponentDto.prototype, "part", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ComponentDto.prototype, "quantity", void 0);
// DTO for assembled parts
class CreateAssembledPartDto extends CreatePartDto {
}
exports.CreateAssembledPartDto = CreateAssembledPartDto;
__decorate([
    (0, class_validator_1.IsEnum)(["assembled"]),
    __metadata("design:type", String)
], CreateAssembledPartDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_transformer_1.Type)(() => ComponentDto),
    __metadata("design:type", Array)
], CreateAssembledPartDto.prototype, "components", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateAssembledPartDto.prototype, "assemblyTime", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAssembledPartDto.prototype, "assemblyInstructions", void 0);
// DTO for updating parts
class UpdatePartDto {
}
exports.UpdatePartDto = UpdatePartDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePartDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePartDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdatePartDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdatePartDto.prototype, "stockQuantity", void 0);
// DTO for updating raw parts
class UpdateRawPartDto extends UpdatePartDto {
}
exports.UpdateRawPartDto = UpdateRawPartDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateRawPartDto.prototype, "supplier", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateRawPartDto.prototype, "partNumber", void 0);
// DTO for updating assembled parts
class UpdateAssembledPartDto extends UpdatePartDto {
}
exports.UpdateAssembledPartDto = UpdateAssembledPartDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ComponentDto),
    __metadata("design:type", Array)
], UpdateAssembledPartDto.prototype, "components", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateAssembledPartDto.prototype, "assemblyTime", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAssembledPartDto.prototype, "assemblyInstructions", void 0);
