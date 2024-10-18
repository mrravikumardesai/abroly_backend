// studentsListing
import express from 'express'
import { validateAdmin } from '../../middleware/authMiddleware'
import StudentController from '../controller/StudentController'
const studentRoutes = express.Router()

studentRoutes.route("/list").post(validateAdmin,StudentController.studentsListing)

export default studentRoutes