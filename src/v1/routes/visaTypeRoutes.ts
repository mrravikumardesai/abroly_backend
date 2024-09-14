import express from 'express'
import VisaTypeController from '../controller/VisaTypeController'
import { validateAdmin, validateAdminOrManager } from '../../middleware/authMiddleware'

const visaTypeRoutes = express.Router()

visaTypeRoutes.route("/create").post(validateAdminOrManager,VisaTypeController.createVisaType)
visaTypeRoutes.route("/update").post(validateAdminOrManager,VisaTypeController.updateVisaType)
visaTypeRoutes.route("/delete").post(validateAdminOrManager,VisaTypeController.deleteVisaType)
visaTypeRoutes.route("/list").get(VisaTypeController.listVisaType)

export default visaTypeRoutes