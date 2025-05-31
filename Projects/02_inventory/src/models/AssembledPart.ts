import mongoose, { Schema, type Document } from "mongoose"
import type { IAssembledPart } from "../@types"

export type IAssembledPartDocument = Document<unknown, {}, IAssembledPart> & IAssembledPart

const componentSchema = new Schema(
  {
    partId: {
      type: Schema.Types.ObjectId,
      required: [true, "Part ID is required"],
      refPath: "components.partType",
    },
    partType: {
      type: String,
      required: true,
      enum: ["RawPart", "AssembledPart"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
    isOptional: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
)

const assembledPartSchema = new Schema<IAssembledPartDocument>(
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
    components: {
      type: [componentSchema],
      required: [true, "Components are required"],
      validate: {
        validator: (components: any[]) => components.length > 0,
        message: "At least one component is required",
      },
    },
    assemblyInstructions: {
      type: String,
      required: [true, "Assembly instructions are required"],
      trim: true,
      maxlength: [1000, "Assembly instructions cannot exceed 1000 characters"],
    },
    assemblyTime: {
      type: Number,
      required: [true, "Assembly time is required"],
      min: [1, "Assembly time must be at least 1 minute"],
    },
    skillLevel: {
      type: String,
      required: [true, "Skill level is required"],
      enum: ["beginner", "intermediate", "advanced"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Indexes for better query performance
assembledPartSchema.index({ name: "text", description: "text" })
assembledPartSchema.index({ skillLevel: 1 })
assembledPartSchema.index({ assemblyTime: 1 })

// Virtual for checking if part is in stock
assembledPartSchema.virtual("inStock").get(function () {
  return this.stockQuantity > 0
})

// Pre-save middleware to validate component references
assembledPartSchema.pre("save", async function (next) {
  if (this.isModified("components")) {
    const RawPart = mongoose.model("RawPart")
    const AssembledPart = mongoose.model("AssembledPart")

    for (const component of this.components) {
      let partExists = false

      if (component.partType === "RawPart") {
        partExists = !!(await RawPart.exists({ _id: component.partId }))
      } else if (component.partType === "AssembledPart") {
        partExists = !!(await AssembledPart.exists({ _id: component.partId }))
      }

      if (!partExists) {
        return next(new Error(`Component with ID ${component.partId} does not exist`))
      }
    }
  }
  next()
})

export const AssembledPart = mongoose.model<IAssembledPartDocument>("AssembledPart", assembledPartSchema)
