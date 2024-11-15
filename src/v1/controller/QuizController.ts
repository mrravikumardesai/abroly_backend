import { Response } from "express"
import { returnHelper } from "../../helpers/returnHelper"
import { RequestWithUser } from "../../utils/types"
import QuizQuestions from "../../model/QuizQuestions"
import CoursePurchase from "../../model/CoursePurchase"
import QuizAnswers from "../../model/QuizAnswers"
import CourseProgress from "../../model/CourseProgress"

class QuizController {

    async addQuestion(req: RequestWithUser, res: Response) {
        try {

            const { question_text,
                options,
                right_answer,
                course_uuid,
                leval
            } = req.body

            if (
                !question_text ||
                !options ||
                !right_answer ||
                !course_uuid ||
                !leval
            ) {
                console.log(req.body);

                return returnHelper(res, 200, false, "Provide All Fields")
            }

            await QuizQuestions.create({
                question_text,
                options: JSON.stringify(options),
                right_answer,
                course_uuid,
                level: leval
            })

            return returnHelper(res, 200, true, "Question Added")

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }


    async listQuestions(req: RequestWithUser, res: Response) {
        try {

            const {
                course_uuid,
                level
            } = req.body

            if (
                !course_uuid ||
                !level
            ) {
                return returnHelper(res, 200, false, "Provide All Fields")
            }

            const allQuestions = await QuizQuestions.findAll({
                where: {
                    course_uuid,
                    level
                }
            })

            return res.status(200).json({
                success: true,
                message: "Record Found",
                data: allQuestions
            })

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }


    async updateQuestion(req: RequestWithUser, res: Response) {
        try {

            const { question_text,
                options,
                right_answer,
                uuid
            } = req.body

            if (
                !uuid
            ) {
                return returnHelper(res, 200, false, "Provide All Fields")
            }


            const updateParams = {
                ...(question_text && { question_text }),
                ...(options && { options: JSON.stringify(options) }),
                ...(right_answer && { right_answer }),
            }

            await QuizQuestions.update(updateParams, {
                where: {
                    uuid
                }
            })

            return returnHelper(res, 200, true, "Question Update")

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

    async deleteQuestion(req: RequestWithUser, res: Response) {
        try {

            const {
                uuid
            } = req.body

            if (
                !uuid
            ) {
                return returnHelper(res, 200, false, "Provide All Fields")
            }


            await QuizQuestions.destroy({
                where: {
                    uuid
                }
            })

            return returnHelper(res, 200, true, "Question Deleted")

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

    async getQuizQuestions(req: RequestWithUser, res: Response) {

        try {

            const { purchase_uuid } = req.body

            if (!purchase_uuid) {
                return returnHelper(res, 200, false, "Invalid Action")
            }

            const findPurchases = await CoursePurchase.findOne({
                where: {
                    student_uuid: req?.uuid,
                    uuid: purchase_uuid
                },
                attributes: [
                    "course_uuid",
                    "is_quiz_submited",
                    "quiz_score",
                    "level",
                ]
            })

            if (!findPurchases) {
                return returnHelper(res, 200, false, "Invalid Action")
            }

            console.log(findPurchases, "PURCHASED");

            const findQuiz = await QuizQuestions.findAll({
                where: {
                    course_uuid: findPurchases?.dataValues?.course_uuid,
                    level: findPurchases?.dataValues?.level,
                },
                attributes: [
                    "uuid",
                    "question_text",
                    "options",
                    "course_uuid",
                    "level"
                ]
            })

            return returnHelper(res, 200, true, "Quiz Found", {
                questions: findQuiz,
                purchase: findPurchases
            })

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

    async submitQuiz(req: RequestWithUser, res: Response) {
        try {

            const { answers, purchase_uuid } = req.body

            if (answers == undefined) {
                return returnHelper(res, 200, false, "")
            }

            if (answers.length == 0) {
                return returnHelper(res, 200, false, "Please Attempt Any one question")
            }


            // first check the progress is done or not
            const findPurchases = await CoursePurchase.findOne({
                where: {
                    student_uuid: req?.uuid,
                    uuid: purchase_uuid
                },
                attributes: [
                    "uuid",
                    "level",
                    "course_uuid",
                    "completed_at",
                    "is_quiz_submited",
                    "createdAt"
                ],
            })

            if (!findPurchases) {
                return returnHelper(res, 200, false, "Invalid Action")
            }

            // progress check
            const incompleteCount = await CourseProgress.count({
                where: {
                    student_uuid: req?.uuid,
                    course_purchase_uuid: purchase_uuid,
                    is_completed: 0
                }
            })

            if (incompleteCount > 0) {
                return returnHelper(res, 200, false, "Please Complete Course Progress to 100% First")
            }

            // process for submit answers
            await Promise.all(answers.map(async (item: any) => {

                // find the questions is exist or not
                const findQuestion = await QuizQuestions.findOne({
                    where: {
                        uuid: item?.question_uuid
                    },
                    attributes: ["uuid", "right_answer"]
                })

                if (findQuestion) {
                    const isExist = await QuizAnswers.findOne({
                        where: {
                            question_uuid: item?.question_uuid,
                            purchase_uuid
                        },
                        attributes: ["uuid"]
                    })


                    let right_answer = "a"

                    if (findQuestion) {
                        right_answer = findQuestion?.dataValues?.right_answer
                    }

                    if (!isExist) {

                        // create
                        await QuizAnswers.create({
                            question_uuid: item?.question_uuid,
                            purchase_uuid,
                            answer: item?.answer,
                            course_uuid: findPurchases?.dataValues?.course_uuid,
                            is_right_answer: right_answer == item?.answer ? 1 : 0
                        })

                    } else {

                        // create
                        await QuizAnswers.update({
                            question_uuid: item?.question_uuid,
                            purchase_uuid,
                            answer: item?.answer,
                            course_uuid: findPurchases?.dataValues?.course_uuid,
                            is_right_answer: right_answer == item?.answer ? 1 : 0
                        }, {
                            where: {
                                uuid: isExist?.dataValues?.uuid
                            }
                        })
                    }
                }
            }))

            // count all level and course questions
            const allQuestions = await QuizQuestions.count({
                where: {
                    course_uuid: findPurchases?.dataValues?.course_uuid,
                    level: findPurchases?.dataValues?.level,
                }
            })

            // count right answers
            const rightAnswersCount = await QuizAnswers.count({
                where: {
                    purchase_uuid,
                    is_right_answer: 1
                }
            })

            const calculatePercentage = (rightAnswers, totalQuestions) => {
                if (totalQuestions === 0) return 0; // Prevent division by zero

                const percentage = (rightAnswers / totalQuestions) * 100;

                // Round to 2 decimal places
                return Math.round(percentage * 100) / 100;
            };

            // count percentage
            const quizScore = calculatePercentage(rightAnswersCount, allQuestions);


            // update scope and is submitted 1
            await CoursePurchase.update({
                quiz_score: quizScore,
                is_quiz_submited: 1,
                completed_at: findPurchases?.dataValues?.is_quiz_submited == 1 ? undefined : new Date()
            }, {
                where: {
                    uuid: purchase_uuid
                }
            })

            return returnHelper(res, 200, true, "Quiz Submitted")

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }



}

export default new QuizController()