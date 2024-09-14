import { Request, Response } from "express";


export const returnHelper = (res:Response,status:number,success:boolean,message:string) =>{
    return res.status(status).json({
        success:success,
        message:message
    })
}