import mongoose, { Schema, type Document } from "mongoose"
import type { IRawPart } from "../@types"

export type IRawPartDocument = Document<unknown, {}, IRawPart> & IRawPart

const dimensionsSchema = new Schema(
  {
    length: { type: Number, required: true, min: 0 },
    width: { type: Number, required: true, min: 0 },
    height: { type: Number, required: true, min: 0 },
  },
  { _id: false },
)

const rawPartSchema = new Schema<IRawPartDocument>(
  {
    name: {
      type: String,
      required: [true, "Part name is required"],
      trim: true,
      maxlength: [100, "Part name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    stockQuantity: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock quantity cannot be negative"],
      default: 0,
    },
    supplier: {
      type: String,
      required: [true, "Supplier is required"],
      trim: true,
      maxlength: [100, "Supplier name cannot exceed 100 characters"],
    },
    partNumber: {
      type: String,
      required: [true, "Part number is required"],
      unique: true,
      trim: true,
      maxlength: [50, "Part number cannot exceed 50 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      enum: ["fasteners", "electronics", "mechanical", "hardware", "tools", "materials", "other"],
    },
    weight: {
      type: Number,
      min: [0, "Weight cannot be negative"],
    },
    dimensions: dimensionsSchema,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Indexes for better query performance
rawPartSchema.index({ partNumber: 1 })
rawPartSchema.index({ supplier: 1 })
rawPartSchema.index({ category: 1 })
rawPartSchema.index({ name: "text", description: "text" })

// Virtual for checking if part is in stock
rawPartSchema.virtual("inStock").get(function () {
  return this.stockQuantity > 0
})

export const RawPart = mongoose.model<IRawPartDocument>("RawPart", rawPartSchema)
