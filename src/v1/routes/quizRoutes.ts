import express from 'express'
import { validateAdmin } from '../../middleware/authMiddleware'
import QuizController from '../controller/QuizController'

const quizRoutes = express.Router()

quizRoutes.route("/add").post(validateAdmin, QuizController.addQuestion)
quizRoutes.route("/update").post(validateAdmin, QuizController.updateQuestion)
quizRoutes.route("/list").post(validateAdmin, QuizController.listQuestions)
quizRoutes.route("/delete").post(validateAdmin, QuizController.deleteQuestion)

export default quizRoutes