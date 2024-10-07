import express from 'express'
import { validateAdmin } from '../../middleware/authMiddleware'
import ContentWritingController from '../controller/ContentWritingController'

const contentWritingRoutes = express.Router()

contentWritingRoutes.route("/add").post(validateAdmin,ContentWritingController.add)
contentWritingRoutes.route("/update").post(validateAdmin,ContentWritingController.update)
contentWritingRoutes.route("/list").get(ContentWritingController.list)
contentWritingRoutes.route("/add_points").post(validateAdmin,ContentWritingController.addSubPoints)
contentWritingRoutes.route("/list_points").post(validateAdmin,ContentWritingController.listSubPoints)

export default contentWritingRoutes