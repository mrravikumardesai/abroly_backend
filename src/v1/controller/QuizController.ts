import { Response } from "express"
import { returnHelper } from "../../helpers/returnHelper"
import { RequestWithUser } from "../../utils/types"
import QuizQuestions from "../../model/QuizQuestions"

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
                level:leval
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
                ...(options && { options:JSON.stringify(options) }),
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



}

export default new QuizController()