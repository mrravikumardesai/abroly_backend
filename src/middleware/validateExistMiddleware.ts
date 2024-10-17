import { NextFunction, Request, Response } from "express";
import User from "../model/User";
import Agent from "../model/Agent";

const emailExistMw = async (req: Request, res: Response, next: NextFunction) => {

    const { email } = req.body

    if (!email) return res.status(200).json({ success: false, message: "Please provide email address" })

    const emailExistOrNot = await User.findOne({ where: { email: email } })

    if (emailExistOrNot) {
        return res.status(200).json({
            success: false,
            message: "Email Address already in use",
        })
    }
    next()
}

const numberExistMw = async (req: Request, res: Response, next: NextFunction) => {

    const { phone_number } = req.body

    if (!phone_number) return res.status(200).json({ success: false, message: "Please provide phone number address" })

    const phoneNumberExistOrNot = await User.findOne({ where: { phone_number } })

    if (phoneNumberExistOrNot) {
        return res.status(200).json({
            success: false,
            message: "Phone number is already registered!",
        })
    }
    next()
}
const AgentNumberExistMw = async (req: Request, res: Response, next: NextFunction) => {

    const { phone_number } = req.body

    if (!phone_number) return res.status(200).json({ success: false, message: "Please provide phone number address" })

    const phoneNumberExistOrNot = await Agent.findOne({ where: { phone_number } })
    console.log(phoneNumberExistOrNot,"phoneNumberExistOrNot");
    
    if (phoneNumberExistOrNot) {
        return res.status(200).json({
            success: false,
            message: "Phone number is already registered!",
        })
    }
    next()
}



const userNameExistMw = async (req: Request, res: Response, next: NextFunction) => {

    const { user_name: username } = req.body

    if (!username) return res.status(200).json({ success: false, message: "Please provide username" })
    const userNameExistOrNot = await User.findOne({ where: { username: username } })

    if (userNameExistOrNot) {
        return res.status(200).json({
            success: false,
            message: "user name already in use",

        })
    }
    next()
}


export {
    emailExistMw,
    userNameExistMw,
    numberExistMw,
    AgentNumberExistMw
}