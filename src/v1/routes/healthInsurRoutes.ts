import express from 'express'
import { validateAdmin } from '../../middleware/authMiddleware'
import SimCardsController from '../controller/SimCardsController'
import HealthInsurController from '../controller/HealthInsurController'

const healthInsurRoutes = express.Router()

healthInsurRoutes.route("/add").post(validateAdmin,HealthInsurController.addSimcard)
healthInsurRoutes.route("/update").post(validateAdmin,HealthInsurController.updateSimcard)
healthInsurRoutes.route("/delete").post(validateAdmin,HealthInsurController.deleteSimcard)
healthInsurRoutes.route("/list").get(HealthInsurController.listSimcard)

export default healthInsurRoutes