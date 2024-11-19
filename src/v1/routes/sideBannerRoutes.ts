import express from 'express'
import { validateAgent } from '../../middleware/authMiddleware'
import SideBannerController from '../controller/SideBannerController'
import { uploadImage } from '../../middleware/fileUpload'

const sideBannerRoutes = express.Router()

// get avalible slots
sideBannerRoutes.route("/get_avalible_slots").post(validateAgent, SideBannerController.avalibleSlot)
// assign slot
sideBannerRoutes.route("/assign_slots").post(validateAgent, uploadImage.single("image"), SideBannerController.assignSlot)

// list added campains 
sideBannerRoutes.route("/list/:find_for").get(validateAgent, SideBannerController.listCamp)

// details from campains 


export default sideBannerRoutes