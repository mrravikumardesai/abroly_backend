import express, { NextFunction, Request, Response } from 'express'
import { validateAdmin } from '../../middleware/authMiddleware'
import TestimonialsController from '../controller/TestimonialsController'
import { uploadMedia } from '../../middleware/fileUpload'
import multer from 'multer'

const testimonialsRoutes = express.Router()

testimonialsRoutes.route("/add").post(validateAdmin,uploadMedia.single("file"),TestimonialsController.addTestimonial,
(err:any, req:Request, res:Response, next:NextFunction) => {
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res
                .status(200)
                .json({ success: false, message: err.message });
        }
    } else if (err) {
        return res.status(200).json({
            success: false,
            message: err.message,
        });
    }
})
testimonialsRoutes.route("/update").post(validateAdmin,TestimonialsController.updateTestimonial)
testimonialsRoutes.route("/delete").post(validateAdmin,TestimonialsController.deleteTestimonial)
testimonialsRoutes.route("/list").get(TestimonialsController.listTestimonials)

export default testimonialsRoutes
