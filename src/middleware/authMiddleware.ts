import express from 'express'
import { NextFunction, Request, Response } from "express";
import Jwt, { DecodeOptions, JsonWebTokenError, VerifyErrors } from "jsonwebtoken";
import { RequestWithUser } from '../utils/types';
import { Op } from 'sequelize';
import User from '../model/User';



const secretTokenForJWT: string | any = process.env.ACCESS_TOKEN_SECRET

// interface for user typecast from token
interface User {
    user: {
        uuid: string,
        email: string,
        role: string
    }
}

const validateUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    await commmonValidate(req, res, next, ["user"])
}


const validateAdmin = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    // console.log("ADMIN VALIDATION")
    await commmonValidate(req, res, next, ["admin"])
}
const validateAdminOrManager = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    // console.log("ADMIN VALIDATION")
    await commmonValidate(req, res, next, ["admin", "manager"])
}

const validateGeneral = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    // console.log("GEN VALIDATIONS")
    await commmonValidate(req, res, next);
}

const commmonValidate = async (req: RequestWithUser, res: Response, next: NextFunction, user_type: string | string[] = "all", activeSubscription: string = "general") => {
    let token;
    let authHeader: string | any = req.headers.authorization || req.headers.Authorization
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        if (!token) return res.status(401).json({ success: false, message: "Provide token" })
        try {
            const decoded: any = Jwt.verify(token, secretTokenForJWT); // Ensure correct type match
            if (!decoded || !decoded.user) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }
            const user = decoded.user as User;

            const findUser = await User.findOne({
                where: user_type == "all" ? {
                    uuid: user.user.uuid,
                } : {
                    uuid: user.user.uuid,
                    user_type: user_type
                },
                attributes: ["uuid"]
            })
            // console.log(findUser,"THE USER ")
            if (findUser) {
                req.user = user;
                req.uuid = user.user.uuid
                next()
            }
            else {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }



        } catch (error) {
            return res
                .status(401)
                .json({ success: false, message: "Auth Failed" });
        }
    } else {
        return res.status(401).json({
            success: false,
            message: "Please provide token"
        })
    }
}




export { validateUser, validateAdmin, validateGeneral, validateAdminOrManager }