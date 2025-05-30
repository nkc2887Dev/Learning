"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const exceptions_1 = require("../utils/exceptions");
const class_validator_1 = require("class-validator");
const errorMiddleware = (error, req, res, next) => {
    console.error(`[Error] ${error.message}`);
    console.error(error.stack);
    if (error instanceof exceptions_1.HttpException) {
        res.status(error.status).json({
            success: false,
            message: error.message,
        });
        return;
    }
    // Handle class-validator errors
    if (error instanceof Array && error[0] instanceof class_validator_1.ValidationError) {
        const validationErrors = error.flatMap((err) => {
            return Object.values(err.constraints || {});
        });
        res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: validationErrors,
        });
        return;
    }
    // Default error handler
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
};
exports.errorMiddleware = errorMiddleware;
