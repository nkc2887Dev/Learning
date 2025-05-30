import { body, query, param } from "express-validator"

export const createRawPartValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ max: 100 })
        .withMessage("Name cannot exceed 100 characters"),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required")
        .isLength({ max: 500 })
        .withMessage("Description cannot exceed 500 characters"),

    body("price").isFloat({ min: 0 }).withMessage("Price must be a positive number"),

    body("stockQuantity").isInt({ min: 0 }).withMessage("Stock quantity must be a non-negative integer"),

    body("supplier")
        .trim()
        .notEmpty()
        .withMessage("Supplier is required")
        .isLength({ max: 100 })
        .withMessage("Supplier name cannot exceed 100 characters"),

    body("partNumber")
        .trim()
        .notEmpty()
        .withMessage("Part number is required")
        .isLength({ max: 50 })
        .withMessage("Part number cannot exceed 50 characters"),

    body("category")
        .isIn(["fasteners", "electronics", "mechanical", "hardware", "tools", "materials", "other"])
        .withMessage("Invalid category"),

    body("weight").optional().isFloat({ min: 0 }).withMessage("Weight must be a positive number"),

    body("dimensions.length").optional().isFloat({ min: 0 }).withMessage("Length must be a positive number"),

    body("dimensions.width").optional().isFloat({ min: 0 }).withMessage("Width must be a positive number"),

    body("dimensions.height").optional().isFloat({ min: 0 }).withMessage("Height must be a positive number"),
]

export const createAssembledPartValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ max: 100 })
        .withMessage("Name cannot exceed 100 characters"),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required")
        .isLength({ max: 500 })
        .withMessage("Description cannot exceed 500 characters"),

    body("price").isFloat({ min: 0 }).withMessage("Price must be a positive number"),

    body("stockQuantity").isInt({ min: 0 }).withMessage("Stock quantity must be a non-negative integer"),

    body("components").isArray({ min: 1 }).withMessage("At least one component is required"),

    body("components.*.partId").isMongoId().withMessage("Invalid part ID"),

    body("components.*.partType").isIn(["RawPart", "AssembledPart"]).withMessage("Invalid part type"),

    body("components.*.quantity").isInt({ min: 1 }).withMessage("Component quantity must be at least 1"),

    body("components.*.isOptional").optional().isBoolean().withMessage("isOptional must be a boolean"),

    body("assemblyInstructions")
        .trim()
        .notEmpty()
        .withMessage("Assembly instructions are required")
        .isLength({ max: 1000 })
        .withMessage("Assembly instructions cannot exceed 1000 characters"),

    body("assemblyTime").isInt({ min: 1 }).withMessage("Assembly time must be at least 1 minute"),

    body("skillLevel").isIn(["beginner", "intermediate", "advanced"]).withMessage("Invalid skill level"),
]

export const updatePartValidator = [
    body("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Name cannot be empty")
        .isLength({ max: 100 })
        .withMessage("Name cannot exceed 100 characters"),

    body("description")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Description cannot be empty")
        .isLength({ max: 500 })
        .withMessage("Description cannot exceed 500 characters"),

    body("price").optional().isFloat({ min: 0 }).withMessage("Price must be a positive number"),

    body("stockQuantity").optional().isInt({ min: 0 }).withMessage("Stock quantity must be a non-negative integer"),
]

export const partIdValidator = [param("id").isMongoId().withMessage("Invalid part ID")]

export const queryValidator = [
    query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),

    query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100"),

    query("sortBy")
        .optional()
        .isIn(["name", "price", "stockQuantity", "createdAt", "updatedAt"])
        .withMessage("Invalid sort field"),

    query("sortOrder").optional().isIn(["asc", "desc"]).withMessage("Sort order must be asc or desc"),

    query("minPrice").optional().isFloat({ min: 0 }).withMessage("Minimum price must be a positive number"),

    query("maxPrice").optional().isFloat({ min: 0 }).withMessage("Maximum price must be a positive number"),

    query("inStock").optional().isBoolean().withMessage("inStock must be a boolean"),
]
