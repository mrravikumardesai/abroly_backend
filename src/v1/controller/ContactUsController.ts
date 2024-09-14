import { Response } from "express";
import { RequestWithUser } from "../../utils/types";
import { returnHelper } from "../../helpers/returnHelper";
import ContactUs from "../../model/ContactUs";

class ContactUsController {

    async addContactUs(req: RequestWithUser, res: Response) {
        try {

            const {
                name,
                number,
                email,
                message,
            } = req.body

            if(!name) return returnHelper(res,200,false,"Please Provide Name")
            if(!number) return returnHelper(res,200,false,"Please Provide number")
            if(!email) return returnHelper(res,200,false,"Please Provide email")
            if(!message) return returnHelper(res,200,false,"Please Provide message")

            await ContactUs.create({
                name,
                number,
                email,
                message,
            })

            return res.status(200).json({
                success: true,
                message: 'Thank You!'
            })

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

    async listContactUs(req:RequestWithUser,res:Response){
        try {
            const findAll = await ContactUs.findAll({
                order:[["createdAt","DESC"]]
            })

            return res.status(200).json({
                success:true, 
                message:'Records Found',
                data:findAll
            })
        } catch (error) {
            
        }
    }

}

export default new ContactUsController()