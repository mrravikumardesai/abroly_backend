import { Response } from "express";
import { returnHelper } from "../../helpers/returnHelper";
import { RequestWithUser } from "../../utils/types";
import ContentWriting from "../../model/ContentWriting";

class ContentWritingController{
    


    async add(req:RequestWithUser,res:Response){
        try {

            const {name} = req.body

            await ContentWriting.create({name})
            
            return returnHelper(res,200,true,"Added!")


        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }
    async update(req:RequestWithUser,res:Response){
        try {

            const {key,description,name} = req.body

            if(!key){
                return returnHelper(res,200,false,"Provide Required Params")
            }

            const updateParams = {
                ...(name && {name}),
                ...(description && {description}),
            }

            await ContentWriting.update(updateParams,{
                where:{
                    key
                }
            })
            
            return returnHelper(res,200,true,"Updated!")

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }
    async list(req:RequestWithUser,res:Response){
        try {
     
            const allData = await ContentWriting.findAll({})
            
            return res.status(200).json({
                success:true,
                data:allData
            })

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }







}


export default new ContentWritingController()