import { Response } from "express";
import { RequestWithUser } from "../../utils/types";
import Faq from "../../model/Faq";
import { returnHelper } from "../../helpers/returnHelper";

class FAQController {

    async addFaq(req: RequestWithUser, res: Response) {

        try {

            const { question, answer } = req.body

            await Faq.create({
                question,
                answer
            })

            return returnHelper(res, 200, true, "Inserted New Record")

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }

    }
    async updateFaq(req: RequestWithUser, res: Response) {

        try {

            const { question, answer, uuid } = req.body

            if (!uuid) {
                return returnHelper(res, 200, false, "Provide Required Params")
            }

            const updateParams = {
                ...(question && { question }),
                ...(answer && { answer }),
            }

            await Faq.update(updateParams, {
                where: {
                    uuid
                }
            })

            return returnHelper(res, 200, true, "Updated Record")

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }

    }
    async deleteFaq(req: RequestWithUser, res: Response) {

        try {

            const { uuid } = req.body

            if (!uuid) {
                return returnHelper(res, 200, false, "Provide Required Params")
            }

            await Faq.destroy({
                where: {
                    uuid
                }
            })

            return returnHelper(res, 200, true, "Deleted Record")

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }

    }
    async listFaq(req: RequestWithUser, res: Response) {

        try {

            const allFaq = await Faq.findAll({
                attributes:["uuid","question","answer","createdAt"]
            })

            return res.status(200).json({
                success: true,
                message: "FAQ Found",
                data: allFaq
            })

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }

    }



}


export default new FAQController() 