import express from 'express'
import { validateAdmin } from '../../middleware/authMiddleware'
import FAQController from '../controller/FAQController'


const faqRoutes = express.Router()

faqRoutes.route("/add").post(validateAdmin,FAQController.addFaq)
faqRoutes.route("/update").post(validateAdmin,FAQController.updateFaq)
faqRoutes.route("/delete").post(validateAdmin,FAQController.deleteFaq)
faqRoutes.route("/list").get(FAQController.listFaq)

export default faqRoutes