import express from 'express'
import { validateAdmin, validateUser } from '../../middleware/authMiddleware'
import QuizController from '../controller/QuizController'

const quizRoutes = express.Router()

quizRoutes.route("/add").post(validateAdmin, QuizController.addQuestion)
quizRoutes.route("/update").post(validateAdmin, QuizController.updateQuestion)
quizRoutes.route("/list").post(validateAdmin, QuizController.listQuestions)
quizRoutes.route("/delete").post(validateAdmin, QuizController.deleteQuestion)


const studenRoutes = express.Router()

// student quiz get 
studenRoutes.route("/get_quiz").post(validateUser,QuizController.getQuizQuestions)
studenRoutes.route("/submit_quiz").post(validateUser,QuizController.submitQuiz)
// student quiz one question submit 

// student quiz score get

// is student submitted quiz get 

quizRoutes.use("/student", studenRoutes)


export default quizRoutes