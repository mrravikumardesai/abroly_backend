import express from 'express'
import { validateAdmin, validateAgent } from '../../middleware/authMiddleware'
import SideBannerController from '../controller/SideBannerController'
import { uploadImage } from '../../middleware/fileUpload'

const sideBannerRoutes = express.Router()

// get avalible slots
sideBannerRoutes.route("/get_avalible_slots").post(validateAgent, SideBannerController.availableSlot)
// assign slot
sideBannerRoutes.route("/assign_slots").post(validateAgent, uploadImage.single("image"), SideBannerController.assignSlot)

// list added campains 
sideBannerRoutes.route("/list/:find_for").get(validateAgent, SideBannerController.listCamp)

// details from campains 
sideBannerRoutes.route("/can_assign_slot").get(validateAgent, SideBannerController.canAssign)


// admin routes 
const adminRoutes = express.Router()

adminRoutes.route("/list").post(validateAdmin, SideBannerController.adminSideList)
adminRoutes.route("/action").post(validateAdmin, SideBannerController.adminAction)


sideBannerRoutes.use("/admin",adminRoutes)
export default sideBannerRoutes