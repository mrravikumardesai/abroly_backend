import express from 'express'
import { validateAdmin } from '../../middleware/authMiddleware'
import ServiceInfoController from '../controller/ServiceInfoController'
import { uploadImage } from '../../middleware/fileUpload'

const serviceInfoRoutes = express.Router()

serviceInfoRoutes.route("/add_block").post(validateAdmin, uploadImage.single("file"), ServiceInfoController.addBlock,
    (err, req, res, next) => {
        res.status(200).send({
            success: false,
            message: err.message,
        });
    }
)
serviceInfoRoutes.route("/update_block").post(validateAdmin, uploadImage.single("file"), ServiceInfoController.updateService,
    (err, req, res, next) => {
        res.status(200).send({
            success: false,
            message: err.message,
        });
    }
)
serviceInfoRoutes.route("/list").post(ServiceInfoController.listBlocks)
serviceInfoRoutes.route("/delete").post(validateAdmin,ServiceInfoController.deleteBlock)

export default serviceInfoRoutes