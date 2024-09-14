import { Response } from "express";
import { returnHelper } from "../../helpers/returnHelper";
import { RequestWithUser } from "../../utils/types";
import VisaType from "../../model/VisaType";

class VisaTypeController {


    async createVisaType(req: RequestWithUser, res: Response) {

        try {
            const { title } = req.body

            if (!title) {
                return res.status(200).json({
                    success: false,
                    message: "Please Provide title"
                })
            }

            await VisaType.create({
                title
            })

            return returnHelper(res, 200, true, "Category Created")

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }
    async updateVisaType(req: RequestWithUser, res: Response) {

        try {
            const { title, uuid } = req.body

            if (!uuid) {
                return res.status(200).json({
                    success: false,
                    message: "Please Provide key"
                })
            }
            const findVisaType = await VisaType.findOne({
                where:{
                    uuid:uuid
                }
            })

            if(!findVisaType){
                return returnHelper(res,200,false,"Update Failed!")
            }

            await VisaType.update({
                title
            }, {
                where: {
                    uuid
                }
            })

            return returnHelper(res, 200, true, "Category Updated")

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }
    async deleteVisaType(req: RequestWithUser, res: Response) {

        try {
            const { uuid } = req.body

            if (!uuid) {
                return res.status(200).json({
                    success: false,
                    message: "Please Provide key"
                })
            }

            await VisaType.destroy({
                where: {
                    uuid
                }
            })

            return returnHelper(res, 200, true, "Category Deleted")

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

    async listVisaType(req:RequestWithUser,res:Response){

        try {
            const list = await VisaType.findAll({
                attributes:[
                    "uuid",
                    "title",
                    "createdAt"
                ]
            })

            return res.status(200).json({
                success:true,
                message:"List Found",
                data:list
            })
        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }
}

export default new VisaTypeController()