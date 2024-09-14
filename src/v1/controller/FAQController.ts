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

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }


    }

}


export default new FAQController() 