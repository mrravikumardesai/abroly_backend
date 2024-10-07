import { Response } from "express";
import { returnHelper } from "../../helpers/returnHelper";
import { RequestWithUser } from "../../utils/types";
import ContentWriting from "../../model/ContentWriting";
import ContentWritingSubPoints from "../../model/ContentWritingSubPoints";

class ContentWritingController {



    async add(req: RequestWithUser, res: Response) {
        try {

            const { name } = req.body

            await ContentWriting.create({ name })

            return returnHelper(res, 200, true, "Added!")


        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }
    async update(req: RequestWithUser, res: Response) {
        try {

            const { key, description, name } = req.body

            if (!key) {
                return returnHelper(res, 200, false, "Provide Required Params")
            }

            const updateParams = {
                ...(name && { name }),
                ...(description && { description }),
            }

            await ContentWriting.update(updateParams, {
                where: {
                    key
                }
            })

            return returnHelper(res, 200, true, "Updated!")

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }
    async list(req: RequestWithUser, res: Response) {
        try {

            const allData = await ContentWriting.findAll({})

            return res.status(200).json({
                success: true,
                data: allData
            })

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }
    async addSubPoints(req: RequestWithUser, res: Response) {
        try {

            const { points, content_writing_uuid } = req.body


            if (!points) {
                return returnHelper(res, 200, false, "Provide Points")
            }

            await ContentWritingSubPoints.destroy({
                where:{
                    content_writing_uuid
                }
            })


            if (points && points.length !== 0) {
                // return returnHelper(res, 200, false, "Provide Points")
                await Promise.all(
                    points.map(async (item: any,index:number) => {
                        await ContentWritingSubPoints.create({
                            content_writing_uuid,
                            title: item.title,
                            description: item.description,
                            point_order:index
                        })
                    })
                )
            }

            return returnHelper(res, 200, true, "Updated")

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

    async listSubPoints(req: RequestWithUser, res: Response) {
        try {

            const { uuid } = req.body

            const listContent = await ContentWritingSubPoints.findAll({
                where: {
                    content_writing_uuid:uuid
                },
                order:[["point_order","ASC"]]
            })

            return res.status(200).json({
                success:true,
                message:"Found",
                data:listContent
            })

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }








}


export default new ContentWritingController()