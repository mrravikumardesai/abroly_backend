// studentsListing
import express from 'express'
import { validateAdmin, validateGeneral } from '../../middleware/authMiddleware'
import StudentController from '../controller/StudentController'
const studentRoutes = express.Router()

// admin
studentRoutes.route("/list").post(validateAdmin, StudentController.studentsListing)

// student add profile 
studentRoutes.route("/update_visa_profile").post(validateGeneral, StudentController.updateBasicDetails)

// student details profile
studentRoutes.route("/get_visa_profile").post(validateGeneral, StudentController.getBasicDetails)

// student profile completion progress
studentRoutes.route("/profile_completion_progress").post(validateGeneral, StudentController.getProfileCompletionProgress)


// student details profile for admin 
const adminStudentProfileRoutes = express.Router()

adminStudentProfileRoutes.route("/getProfile").post(validateAdmin, StudentController.getBasicDetailsAdmin)

studentRoutes.use("/admin", adminStudentProfileRoutes)
export default studentRoutes