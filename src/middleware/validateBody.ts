import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { mapJoiErrors } from "../utils/errors";


const validationBodyMw = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false }); // `abortEarly: false` to report all errors, not just the first
        if (error) {
            // const errorMessage = error.details.map(detail => detail.message).join(', ');
            // return res.status(200).json({ success: false, message: errorMessage });
            const formattedErrors = mapJoiErrors(error.details);
            return res.status(200).json({ success: false, message: formattedErrors[0].split(": ")[1] });
        }
        next();
    };
};

export default validationBodyMw