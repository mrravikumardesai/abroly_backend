import express from 'express'
import { validateAdmin } from '../../middleware/authMiddleware'
import SimCardsController from '../controller/SimCardsController'

const simCardsRoutes = express.Router()

simCardsRoutes.route("/add").post(validateAdmin,SimCardsController.addSimcard)
simCardsRoutes.route("/update").post(validateAdmin,SimCardsController.updateSimcard)
simCardsRoutes.route("/delete").post(validateAdmin,SimCardsController.deleteSimcard)
simCardsRoutes.route("/list").get(SimCardsController.listSimcard)

export default simCardsRoutes