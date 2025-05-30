"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssembledPart = exports.RawPart = exports.Part = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Base schema for all parts
const partSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Part name is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Part description is required"],
    },
    price: {
        type: Number,
        required: [true, "Part price is required"],
        min: [0, "Price cannot be negative"],
    },
    stockQuantity: {
        type: Number,
        required: [true, "Stock quantity is required"],
        min: [0, "Stock quantity cannot be negative"],
        default: 0,
    },
    type: {
        type: String,
        required: [true, "Part type is required"],
        enum: ["raw", "assembled"],
    },
}, {
    timestamps: true,
    discriminatorKey: "type",
});
// Create the base model
const Part = mongoose_1.default.model("Part", partSchema);
exports.Part = Part;
// Raw part schema
const RawPart = Part.discriminator("raw", new mongoose_1.Schema({
    supplier: {
        type: String,
        required: [true, "Supplier name is required"],
    },
    partNumber: {
        type: String,
        required: [true, "Part number is required"],
    },
}));
exports.RawPart = RawPart;
// Assembled part schema
const AssembledPart = Part.discriminator("assembled", new mongoose_1.Schema({
    components: [
        {
            part: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Part",
                required: [true, "Component part is required"],
            },
            quantity: {
                type: Number,
                required: [true, "Component quantity is required"],
                min: [1, "Component quantity must be at least 1"],
            },
        },
    ],
    assemblyTime: {
        type: Number,
        required: [true, "Assembly time is required"],
        min: [0, "Assembly time cannot be negative"],
    },
    assemblyInstructions: {
        type: String,
        required: [true, "Assembly instructions are required"],
    },
}));
exports.AssembledPart = AssembledPart;
