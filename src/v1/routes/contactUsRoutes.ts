import express from 'express'
import ContactUsController from '../controller/ContactUsController'

const contactUsRoutes = express.Router()

contactUsRoutes.route("/add").post(ContactUsController.addContactUs)
contactUsRoutes.route("/list").get(ContactUsController.listContactUs)

export default contactUsRoutes