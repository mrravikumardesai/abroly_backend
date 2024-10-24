import express from 'express'
import { NextFunction, Request, Response } from "express";
import Jwt, { DecodeOptions, JsonWebTokenError, VerifyErrors } from "jsonwebtoken";
import { RequestWithUser } from '../utils/types';
import { Op } from 'sequelize';
import User from '../model/User';
import Admin from '../model/Admin';
import Agent from '../model/Agent';
import { returnHelper } from '../helpers/returnHelper';



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
    // await commmonValidate(req, res, next, ["admin"])
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
            
            const findUser = await Admin.findOne({
                where: {
                    uuid: user.user.uuid,
                    user_type: "admin"
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
const validateAdminOrManager = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    // console.log("ADMIN VALIDATION")
    await commmonValidate(req, res, next, ["admin", "manager"])
}

const validateGeneral = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    // console.log("GEN VALIDATIONS")
    await commmonValidate(req, res, next);
}
const validateAgent = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    // console.log("GEN VALIDATIONS")
    await agentValidate(req, res, next);
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
const agentValidate = async (req: RequestWithUser, res: Response, next: NextFunction, user_type: string | string[] = "all", activeSubscription: string = "general") => {
    let token;
    let authHeader: string | any = req.headers.authorization || req.headers.Authorization
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        // console.log(token,"TOKEN");
        
        if (!token) return res.status(401).json({ success: false, message: "Provide token" })
        try {
            const decoded: any = Jwt.verify(token, secretTokenForJWT); // Ensure correct type match
            if (!decoded || !decoded.user) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }
            
            const user = decoded.user as User;
            
            const findUser = await Agent.findOne({
                where: {
                    uuid: user.user.uuid,
                    status:"active"
                },
                attributes: ["uuid"]
            })
            if (findUser) {
                req.user = user;
                req.uuid = user.user.uuid
                next()
            }
            else {
                const inactiveAgent = await Agent.findOne({
                    where: {
                        uuid: user.user.uuid,
                        status:"inactive"
                    },
                    attributes: ["uuid"]
                })

                if(inactiveAgent){
                    return returnHelper(res,401,false,"Profile Inactive From Admin, Please contact Administrator for this website")
                }else{   
                    return res.status(401).json({ success: false, message: 'Unauthorized' });
                }
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




export { validateUser, validateAdmin, validateGeneral, validateAdminOrManager,validateAgent }