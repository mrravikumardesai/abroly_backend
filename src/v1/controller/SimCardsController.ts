import { Response } from "express";
import { RequestWithUser } from "../../utils/types";
import { returnHelper } from "../../helpers/returnHelper";
import SimCards from "../../model/SimCards";

class SimCardsController {


    async addSimcard(req: RequestWithUser, res: Response) {
        try {

            const { name, details, url } = req.body

            await SimCards.create({
                name,
                details,
                url
            })

            return returnHelper(res, 200, true, "Created")

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }
    async updateSimcard(req: RequestWithUser, res: Response) {
        try {

            const { name, details, url, uuid } = req.body

            if (!uuid) {
                return returnHelper(res, 200, false, "Please Provide Required params")
            }

            const updateOptions = {
                ...(name && { name }),
                ...(details && { details }),
                ...(url && { url }),
            }

            await SimCards.update(updateOptions, {
                where: {
                    uuid
                }
            })

            return returnHelper(res, 200, true, "Updated")

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }
    async deleteSimcard(req: RequestWithUser, res: Response) {
        try {

            const { uuid } = req.body

            if (!uuid) {
                return returnHelper(res, 200, false, "Please Provide Required params")
            }


            await SimCards.destroy({
                where: {
                    uuid
                }
            })

            return returnHelper(res, 200, true, "Deleted!")

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }
    async listSimcard(req: RequestWithUser, res: Response) {
        try {

            const findAll = await SimCards.findAll({})

            return res.status(200).json({
                success: true,
                data: findAll
            })

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }


}


export default new SimCardsController()