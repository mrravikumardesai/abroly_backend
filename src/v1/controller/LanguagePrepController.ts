import { Response } from "express";
import { RequestWithUser } from "../../utils/types";
import { returnHelper } from "../../helpers/returnHelper";
import Courses from "../../model/Courses";

class LanguagePrepController{

    async addLanguage(req:RequestWithUser,res:Response){
        try {

            const {title,description} = req.body

            await Courses.create({
                title,
                description
            })

            return returnHelper(res,200,true,"Language Added!")

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

    async listLanguages(req:RequestWithUser,res:Response){
        try {

            const findLanguages = await Courses.findAll({})

            return res.status(200).json({
                success:true,
                data:findLanguages
            })
            
        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

}

export default new LanguagePrepController()