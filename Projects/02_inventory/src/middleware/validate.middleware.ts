import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const validate = (validator: Joi.ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await validator.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error: any) {
      const details = error.details?.map((err: Joi.ValidationErrorItem) => err.message) || [];
      res.status(422).json({
        success: false,
        code: "VALIDATION_ERROR",
        message: "Validation failed",
        errors: details,
      });
    }
  };
};

export default validate;
