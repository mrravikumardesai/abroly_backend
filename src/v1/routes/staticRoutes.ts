import express from 'express'
import { validateAdmin } from '../../middleware/authMiddleware'
import StaticContentController from '../controller/StaticContentController'

const staticRoutes = express.Router()

staticRoutes.route("/list").get(StaticContentController.listStaticContent)
staticRoutes.route("/create").post(validateAdmin,StaticContentController.createStatic)
staticRoutes.route("/update").post(validateAdmin,StaticContentController.updateStaticContent)
staticRoutes.route("/detail").post(StaticContentController.detailsStaicContent)
staticRoutes.route("/delete").post(validateAdmin,StaticContentController.deleteStaicContent)

export default staticRoutes