// studentsListing
import express from 'express'
import { validateAdmin, validateGeneral } from '../../middleware/authMiddleware'
import StudentController from '../controller/StudentController'
const studentRoutes = express.Router()

// admin
studentRoutes.route("/list").post(validateAdmin,StudentController.studentsListing)

// student add profile 
studentRoutes.route("/update_visa_profile").post(validateGeneral,StudentController.updateBasicDetails)
studentRoutes.route("/get_visa_profile").post(validateGeneral,StudentController.getBasicDetails)

// student details profile

export default studentRoutes