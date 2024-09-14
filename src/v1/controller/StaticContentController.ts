import { Response } from "express";
import { RequestWithUser } from "../../utils/types";
import { returnHelper } from "../../helpers/returnHelper";
import StaticContent from "../../model/StaticContent";

class StaticContentController {


    async createStatic(req: RequestWithUser, res: Response) {

        try {

            const { title, url, description } = req.body

            const isExist = await StaticContent.findOne({
                where: {
                    url
                }
            })

            if (isExist) {
                return returnHelper(res, 200, false, "Already Exist")
            }

            await StaticContent.create({
                title, url, description
            })

            return returnHelper(res, 200, true, "Page Added")


        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }

    }

    async listStaticContent(req: RequestWithUser, res: Response) {
        try {

            const findAllStaticPages = await StaticContent.findAll({})

            return res.status(200).json({
                success: true,
                data: findAllStaticPages
            })

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

    async detailsStaicContent(req: RequestWithUser, res: Response) {
        try {
            const { url } = req.body

            if (!url) {
                return returnHelper(res, 200, false, "Please Provide Valid URL")
            }
            const details = await StaticContent.findOne({
                where: {
                    url: url
                }
            })

            if (!details) {
                return returnHelper(res, 200, false, "Page Not Found")
            } else {
                return res.status(200).json({
                    success: true,
                    data: details
                })
            }

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }
    async deleteStaicContent(req: RequestWithUser, res: Response) {
        try {
            const { uuid } = req.body

            if (!uuid) {
                return returnHelper(res, 200, false, "Please Provide Valid uuid")
            }
            const details = await StaticContent.findOne({
                where: {
                    uuid: uuid
                }
            })

            if (!details) {
                return returnHelper(res, 200, false, "Page Not Found")
            } else {

                await StaticContent.destroy({
                    where: {
                        uuid: uuid
                    }
                })
                
                return res.status(200).json({
                    success: true,
                    message:"Deleted"
                })
            }

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }
    async updateStaticContent(req: RequestWithUser, res: Response) {
        try {
            const { url, title, description } = req.body

            if (!url) {
                return returnHelper(res, 200, false, "Please Provide Valid URL")
            }

            const updateParams = {
                ...(title && { title }),
                ...(description && { description }),
            }
            const details = await StaticContent.update(updateParams, {
                where: {
                    url
                }
            })

            return returnHelper(res, 200, true, "Updated")


        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

}


export default new StaticContentController()