import mongoose, { type Document, Schema } from "mongoose"

// Base interface for all parts
export interface IPart extends Document {
    name: string
    description: string
    price: number
    stockQuantity: number
    createdAt: Date
    updatedAt: Date
}

// Raw part interface
export interface IRawPart extends IPart {
    type: "raw"
    supplier: string
    partNumber: string
}

// Assembled part interface
export interface IAssembledPart extends IPart {
    type: "assembled"
    components: Array<{
        part: mongoose.Types.ObjectId | IPart
        quantity: number
    }>
    assemblyTime: number // in minutes
    assemblyInstructions: string
}

// Base schema for all parts
const partSchema = new Schema(
    {
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
    },
    {
        timestamps: true,
        discriminatorKey: "type",
    },
)

// Create the base model
const Part = mongoose.model<IPart>("Part", partSchema)

// Raw part schema
const RawPart = Part.discriminator<IRawPart>(
    "raw",
    new Schema({
        supplier: {
            type: String,
            required: [true, "Supplier name is required"],
        },
        partNumber: {
            type: String,
            required: [true, "Part number is required"],
        },
    }),
)

// Assembled part schema
const AssembledPart = Part.discriminator<IAssembledPart>(
    "assembled",
    new Schema({
        components: [
            {
                part: {
                    type: Schema.Types.ObjectId,
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
    }),
)

export { Part, RawPart, AssembledPart }
