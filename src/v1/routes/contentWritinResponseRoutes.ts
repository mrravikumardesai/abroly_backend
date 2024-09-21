import express, { NextFunction, Request, Response } from 'express'
import { validateAdmin, validateGeneral } from '../../middleware/authMiddleware'
import ContentWritingController from '../controller/ContentWritingController'
import ContentWritingResponseController from '../controller/ContentWritingResponseController'
import { uploadMedia } from '../../middleware/fileUpload'
import multer from 'multer'

const contentWritinResponseRoutes = express.Router()

contentWritinResponseRoutes.route("/submit_form").post(validateGeneral,ContentWritingResponseController.requestForPayment)
contentWritinResponseRoutes.route("/add_files").post(validateAdmin,uploadMedia.single("file"),ContentWritingResponseController.addFiles,
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

contentWritinResponseRoutes.route("/list").post(validateGeneral,ContentWritingResponseController.listUser)

contentWritinResponseRoutes.route("/list_files").post(validateGeneral,ContentWritingResponseController.listFiles)
contentWritinResponseRoutes.route("/list_admin").post(validateAdmin,ContentWritingResponseController.listAdmin)
contentWritinResponseRoutes.route("/change_status").post(validateAdmin,ContentWritingResponseController.changeRequestStatus)
contentWritinResponseRoutes.route("/details").post(validateGeneral,ContentWritingResponseController.details)

export default contentWritinResponseRoutes