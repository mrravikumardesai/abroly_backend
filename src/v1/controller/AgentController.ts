import { Request, Response } from "express";
import Agent from "../../model/Agent";
import { returnHelper } from "../../helpers/returnHelper";
import Jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import axios from "axios";
import { RequestWithUser } from "../../utils/types";
import { Op } from "sequelize";
import User from "../../model/User";

dotenv.config()



const CUSTOMERID: string | any = process.env.SMSCUSTOMERID


const secretTokenForJWT: string | any = process.env.ACCESS_TOKEN_SECRET

class AgentController {
    async validateOTP(req: Request, res: Response) {
        try {

            const {
                phone_number,
                country_code,
                otp,
                device_token,
                device_id,
                device_model,
                verificationId
            } = req.body

            const user = await Agent.findOne({
                where: {
                    phone_number,
                    country_code,
                }
            })

            if (user) {
                // console.log("HERE FIND USER");

                if (phone_number == "9799999999" || phone_number == "9799999998") {
                    const sendTokenData = {
                        user: {
                            uuid: user.dataValues.uuid,
                            role: user.dataValues.user_type
                        },
                    };

                    const accessToken = Jwt.sign({
                        user: sendTokenData
                    }, secretTokenForJWT, { expiresIn: "90d" });
                    // console.log(user, "FIND USER");

                    let isFirstTime = false
                    if (user.dataValues.is_verified == 0) {
                        isFirstTime = true
                    }

                    await Agent.update({
                        otp: "",
                        otp_expire: "",
                        is_verified: 1
                    }, {
                        where: {
                            uuid: user.dataValues.uuid
                        }
                    })

                    return res.status(200).json({
                        success: true,
                        message: "Login Success",
                        data: {
                            token: accessToken,
                            name: user.dataValues.username,
                            phone: user.dataValues.phone_number,
                            country_code: user.dataValues.country_code,
                            isFirstTime
                        }
                    })
                }

                axios.get(
                    `https://cpaas.messagecentral.com/auth/v1/authentication/token?country=IN&customerId=C-A970B869F85344C&email=constechifynetworks@gmail.com&key=UnV0dmlrQDQ2&scope=NEW`,).then(async (tokenResponse) => {
                        // console.log(tokenResponse, "tokenResponse---------------/n")
                        if (tokenResponse.status == 200 && tokenResponse.data.status == '200') {

                            await axios.get(
                                `https://cpaas.messagecentral.com/verification/v3/validateOtp?countryCode=91&mobileNumber=${phone_number}&verificationId=${verificationId}&customerId=${CUSTOMERID}&code=${otp}`, {
                                headers: {
                                    'authToken': tokenResponse.data.token
                                }
                            }
                            )
                                .then(async (otpResponse) => {

                                    // console.log(otpResponse, "THE VALIDATE RESPONSE")
                                    if (otpResponse.data.responseCode == 200) {

                                        // if otp is validate than only go for further flow

                                        const sendTokenData = {
                                            user: {
                                                uuid: user.dataValues.uuid,
                                                role: user.dataValues.user_type
                                            },
                                        };

                                        const accessToken = Jwt.sign({
                                            user: sendTokenData
                                        }, secretTokenForJWT, { expiresIn: "90d" });
                                        // console.log(user, "FIND USER");

                                        let isFirstTime = false
                                        if (user.dataValues.is_verified == 0) {
                                            isFirstTime = true
                                        }

                                        await Agent.update({
                                            otp: "",
                                            otp_expire: "",
                                            is_verified: 1
                                        }, {
                                            where: {
                                                uuid: user.dataValues.uuid
                                            }
                                        })

                                        return res.status(200).json({
                                            success: true,
                                            message: "Login Success",
                                            data: {
                                                token: accessToken,
                                                name: user.dataValues.username,
                                                phone: user.dataValues.phone_number,
                                                country_code: user.dataValues.country_code,
                                            }
                                        })

                                    }
                                    else if (otpResponse.data.responseCode == 702) {
                                        return res.status(200).json({
                                            success: false,
                                            message: "Invalid OTP!"
                                        })
                                    } else {
                                        return res.status(200).json({
                                            success: false,
                                            message: "OTP verification failed!"
                                        })
                                    }

                                })
                        }
                    }).catch((error: any) => {
                        console.error(error.message);

                        return res.status(200).json({
                            success: false,
                            message: "Failed to verify OTP!"
                        })
                    })

            } else {
                return res.status(401).json({
                    success: false,
                    message: "Invalid Request!"
                })
            }

        } catch (error: any) {
            return res.status(200).json({
                success: false,
                message: error.message
            })
        }
    }

    async validateOTPCustom(req: Request, res: Response) {
        try {

            const {
                phone_number,
                country_code,
                otp,
                device_token,
                device_id,
                device_model
            } = req.body

            const user = await Agent.findOne({
                where: {
                    phone_number,
                    country_code,
                }
            })

            if (user && (await bcrypt.compare(otp, user.dataValues.otp))) {


                if (new Date() > new Date(user.dataValues.otp_expire)) {
                    return res.status(200).json({
                        success: false,
                        message: "The OTP has expired!"
                    })
                } else {

                    const sendTokenData = {
                        user: {
                            uuid: user.dataValues.uuid,
                            role: user.dataValues.role
                        },
                    };

                    const accessToken = Jwt.sign({
                        user: sendTokenData
                    }, secretTokenForJWT, { expiresIn: "90d" });
                    // console.log(user, "FIND USER");

                    let isFirstTime = false
                    if (user.dataValues.is_verified == 0) {
                        isFirstTime = true
                    }

                    await Agent.update({
                        otp: "",
                        otp_expire: "",
                        is_verified: 1
                    }, {
                        where: {
                            uuid: user?.dataValues?.uuid
                        }
                    })

                    return res.status(200).json({
                        success: true,
                        message: "Login Success",
                        data: {
                            token: accessToken,
                            name: user?.dataValues?.username,
                            phone: user?.dataValues?.phone_number,
                            country_code: user?.dataValues?.country_code,
                        }
                    })
                }
            } else {
                return res.status(200).json({
                    success: false,
                    message: "invalid OTP!"
                })
            }

        } catch (error: any) {
            return res.status(200).json({
                success: false,
                message: error.message
            })
        }
    }
    async loginWithNumber(req: Request, res: Response) {
        try {

            const { phone: phone_number, country_code } = req.body

            const findUser = await Agent.findOne({
                where: {
                    phone_number,
                    country_code,
                }
            })

            if (findUser) {

                function generateOTP() {
                    // Generate a random 6-digit number
                    const otp = Math.floor(100000 + Math.random() * 900000);
                    return otp;
                }

                const createotp = generateOTP()

                console.log(createotp, "THE OTP");

                const otp = await bcrypt.hash(createotp + "", 10)

                function generateExpiryTime() {
                    // Get the current time
                    const currentTime = new Date();

                    // Add 5 minutes to the current time to get the expiration time
                    const expiryTime = new Date(currentTime.getTime() + 5 * 60000); // 5 minutes in milliseconds

                    return expiryTime;
                }

                const otp_expire = generateExpiryTime()

                await Agent.update({
                    otp,
                    otp_expire
                }, {
                    where: {
                        uuid: findUser.dataValues.uuid
                    }
                })

                if (phone_number == "9799999999" || phone_number == "9799999998") {
                    return res.status(200).json({
                        success: true,
                        message: "OTP has been sent successfully.",
                        verificationId: "demoid"
                    })
                }
                // otp: otp,
                // otp_expire
                // return res.status(200).json({
                //     success: true,
                //     message: "OTP has been sent successfully.",

                // })

                // var options = {
                //     'method': 'POST',
                //     'url': 'https://cpaas.messagecentral.com/verification/v3/send?countryCode=91&customerId=C-A970B869F85344C&senderId=UTOMOB&type=SMS&flowType=SMS&mobileNumber=7573949590&message=Welcome to Message Central. We are delighted to have you here! - Powered by U2opia',
                //     'headers': {
                //         'authToken': '***********'
                //     }
                // };
                // request(options, function (error, response) {
                //     if (error) throw new Error(error);
                //     console.log(response.body);
                // });
                // var request = require('request');
                // var options = {
                //     'method': 'GET',
                //     'url':
                //         'https://cpaas.messagecentral.com/auth/v1/authentication/token?country=IN&customerId=CX6CXXB61FB71XXX&email=demo@messagecental.com&key=<BASE64_Encoded_Password>&scope=NEW',
                //     'headers': {
                //         'accept': '*/*'
                //     }
                // };
                // request(options, function (error, response) {
                //     if (error) throw new Error(error);
                //     console.log(response.body);
                // });

                //  generate token 
                axios.get(
                    `https://cpaas.messagecentral.com/auth/v1/authentication/token?country=IN&customerId=${CUSTOMERID}&email=constechifynetworks@gmail.com&key=UnV0dmlrQDQ2&scope=NEW`,).then(async (tokenResponse) => {
                        // console.log(tokenResponse, "tokenResponse---------------/n")
                        if (tokenResponse.status == 200 && tokenResponse.data.status == '200') {
                            axios.post(
                                `https://cpaas.messagecentral.com/verification/v3/send?countryCode=91&customerId=${CUSTOMERID}&flowType=SMS&mobileNumber=${phone_number}`,
                                // `https://cpaas.messagecentral.com/verification/v3/send?countryCode=91&customerId=${CUSTOMERID}&senderId=UTOMOB&type=SMS&flowType=SMS&mobileNumber=${phone_number}&message=Your OTP is ${createotp}, Please do not share it with anyone`,
                                {},
                                {
                                    headers: {
                                        'authToken': tokenResponse.data.token
                                    }
                                }).then((response) => {
                                    // console.log(response, "RESPONSE---------\n")
                                    if (response.status == 200) {
                                        return res.status(200).json({
                                            success: true,
                                            message: "OTP has been sent successfully.",
                                            verificationId: response.data.data.verificationId
                                        })
                                    } else {
                                        return res.status(200).json({
                                            success: false,
                                            message: "Failed to send otp, Please try again after some time"
                                        })
                                    }
                                })
                                .catch((error) => {
                                    return res.status(200).json({
                                        success: false,
                                        message: "Failed to send otp, Please try again after some time"
                                    })
                                })
                        } else {
                            return res.status(200).json({
                                success: false,
                                message: "Failed to send otp, Please try again after some time"
                            })
                        }

                    })


            }
            else {
                return res.status(200).json({
                    success: false,
                    message: "Phone number not registred YET!"
                })

            }
        } catch (error: any) {
            return res.status(200).json({
                success: false,
                message: error.message
            })
        }
    }
    async loginWithNumberCustom(req: Request, res: Response) {
        try {

            const { phone: phone_number, country_code } = req.body

            const findUser = await Agent.findOne({
                where: {
                    phone_number,
                    country_code,
                    status:'active'
                }
            })


            if (findUser) {

                function generateOTP() {
                    // Generate a random 6-digit number
                    // const otp = Math.floor(100000 + Math.random() * 900000);
                    // generate 4 digit random number
                    const otp = Math.floor(1000 + Math.random() * 9000);
                    return otp;
                }

                const createotp = generateOTP()

                console.log(createotp, "THE OTP");

                const otp = await bcrypt.hash(createotp + "", 10)

                function generateExpiryTime() {
                    // Get the current time
                    const currentTime = new Date();

                    // Add 5 minutes to the current time to get the expiration time
                    const expiryTime = new Date(currentTime.getTime() + 5 * 60000); // 5 minutes in milliseconds

                    return expiryTime;
                }

                const otp_expire = generateExpiryTime()

                await Agent.update({
                    otp,
                    otp_expire
                }, {
                    where: {
                        uuid: findUser.dataValues.uuid
                    }
                })
                // otp: otp,
                // otp_expire
                return res.status(200).json({
                    success: true,
                    message: "OTP has been sent successfully.",

                })
            }
            else {

                // find if status is inactive
                const isInActiveAgent = await Agent.findOne({
                    where: {
                        phone_number,
                        country_code,
                        status:'inactive'
                    }
                })

                if(isInActiveAgent){
                    return returnHelper(res,200,false,"You're Profile deactivated from admin, please contact admin")
                }else{
                    return res.status(200).json({
                        success: false,
                        message: "Phone number not registred YET!"
                    })
                }

            }
        } catch (error: any) {
            return res.status(200).json({
                success: false,
                message: error.message
            })
        }
    }

    async signup(req: Request, res: Response) {
        try {

            const { phone_number, country_code, user_name: username, email } = req.body


            function generateOTP() {
                // Generate a random 6-digit number
                const otp = Math.floor(100000 + Math.random() * 900000);
                return otp;
            }

            const createotp = generateOTP()
            console.log(createotp, "THE OTP");

            const otp = await bcrypt.hash(createotp + "", 10)


            function generateExpiryTime() {
                // Get the current time
                const currentTime = new Date();

                // Add 5 minutes to the current time to get the expiration time
                const expiryTime = new Date(currentTime.getTime() + 5 * 60000); // 5 minutes in milliseconds

                return expiryTime;
            }

            const otp_expire = generateExpiryTime()


            // const encryptedPassword = await bcrypt.hash(password, 10)
            await Agent.create({
                email,
                username,
                phone_number,
                country_code,
                user_type: "user",
                otp: otp,
                otp_expire

            }).then((created: any) => {

                // send OTP TO USER

                axios.get(
                    `https://cpaas.messagecentral.com/auth/v1/authentication/token?country=IN&customerId=C-A970B869F85344C&email=constechifynetworks@gmail.com&key=UnV0dmlrQDQ2&scope=NEW`,).then(async (tokenResponse) => {
                        // console.log(tokenResponse, "tokenResponse---------------/n")
                        if (tokenResponse.status == 200 && tokenResponse.data.status == '200') {
                            axios.post(
                                `https://cpaas.messagecentral.com/verification/v3/send?countryCode=91&customerId=${CUSTOMERID}&flowType=SMS&mobileNumber=${phone_number}`,
                                // `https://cpaas.messagecentral.com/verification/v3/send?countryCode=91&customerId=${CUSTOMERID}&senderId=UTOMOB&type=SMS&flowType=SMS&mobileNumber=${phone_number}&message=Your OTP is ${createotp}, Please do not share it with anyone`,
                                {},
                                {
                                    headers: {
                                        'authToken': tokenResponse.data.token
                                    }
                                }).then((response) => {
                                    // console.log(response, "RESPONSE---------\n")
                                    if (response.status == 200) {
                                        return res.status(200).json({
                                            success: true,
                                            message: "OTP has been sent successfully.",
                                            verificationId: response.data.data.verificationId
                                        })
                                    } else {
                                        return res.status(200).json({
                                            success: false,
                                            message: "Failed to send otp, Please try again after some time"
                                        })
                                    }
                                })
                                .catch((error) => {
                                    return res.status(200).json({
                                        success: false,
                                        message: "Failed to send otp, Please try again after some time"
                                    })
                                })
                        } else {
                            return res.status(200).json({
                                success: false,
                                message: "Failed to send otp, Please try again after some time"
                            })
                        }

                    })


            }).catch(e => {
                // console.log(e)
                return res.status(200).json({
                    success: false,
                    message: e.message
                })
            })


        } catch (error: any) {
            return res.status(200).json({
                success: false,
                message: error.message
            })
        }
    }
    async signupCustom(req: Request, res: Response) {
        try {

            const { phone_number, country_code, user_name: username, email } = req.body


            function generateOTP() {
                // Generate a random 6-digit number
                const otp = Math.floor(1000 + Math.random() * 9000);
                return otp;
            }

            const createotp = generateOTP()
            console.log(createotp, "THE OTP");

            const otp = await bcrypt.hash(createotp + "", 10)


            function generateExpiryTime() {
                // Get the current time
                const currentTime = new Date();

                // Add 5 minutes to the current time to get the expiration time
                const expiryTime = new Date(currentTime.getTime() + 5 * 60000); // 5 minutes in milliseconds

                return expiryTime;
            }

            const otp_expire = generateExpiryTime()



            // const encryptedPassword = await bcrypt.hash(password, 10)
            await Agent.create({
                email,
                username,
                // password: encryptedPassword,
                phone_number,
                country_code,
                user_type: "user",
                otp: otp,
                otp_expire

            }).then((created: any) => {

                return res.status(200).json({
                    success: true,
                    message: "OTP has been sent successfully.",
                    verificationId: ""
                })

            }).catch(e => {
                // console.log(e)
                return res.status(200).json({
                    success: false,
                    message: e.message
                })
            })


        } catch (error: any) {
            return res.status(200).json({
                success: false,
                message: error.message
            })
        }
    }

    async kycTokenType(req: RequestWithUser, res: Response) {

        try {

            const role: string = req.user?.user.role || "guest"
            console.log(role, "ROLE");

            const roles = ["agent","sub-agent"]
            if (!roles.includes(role)) {
                return res.status(401).json({
                    success: false,
                    message: "Auth Failed"
                })
            } else {

                const findUser: any = await Agent.findOne({
                    where: {
                        uuid: req.uuid
                    },
                    attributes: [
                        "uuid",
                        "username",
                        "email",
                        "profile_image",
                        "status",
                        "designation",
                        "role",
                        "access_profile",
                        "is_verified",
                        "phone_number",
                        "country_code"
                    ]
                })
                return res.status(200).json({
                    success: true,
                    data: {
                        role: role,
                        profile: findUser?.access_profile || "",
                        name: findUser?.dataValues.username,
                        designation: findUser?.dataValues.designation,
                        phone: findUser?.dataValues.phone_number,
                        country_code: findUser?.dataValues.country_code,
                        is_firstTime: findUser?.dataValues.is_verified == 1 ? false : true
                    }
                })
            }

        } catch (error: any) {
            return res.status(200).json({
                success: false,
                message: error.message
            })
        }

    }


    async agentListing(req: RequestWithUser, res: Response) {
        try {

            const { search, offset } = req.body

            const searchCondition = search
                ? {
                    [Op.or]: [
                        { phone_number: { [Op.like]: `%${search}%` } },  // search by phone number
                        { username: { [Op.like]: `%${search}%` } },      // search by username
                        { email: { [Op.like]: `%${search}%` } },         // search by email
                    ],
                    role: "agent"
                }
                : {role: "agent"};

            const total = await Agent.count({
                where: searchCondition
            })
            const findAllAgents = await Agent.findAll({
                where: searchCondition,
                attributes: [
                    "uuid",
                    "phone_number",
                    "username",
                    "email",
                    "role",
                    "status",
                    "is_verified",
                    "profile_image",
                    "access_profile",
                    "createdAt",
                ],
                offset: offset,
                limit: 5,
                order: [["createdAt", "DESC"]]
            })

            return res.status(200).json({
                success: true,
                message: "Records Found",
                data: findAllAgents,
                total
            })

        } catch (error: any) {
            return res.status(200).json({
                success: false,
                message: error.message
            })
        }
    }

    async agentCreate(req: Request, res: Response) {
        try {

            const { phone_number, country_code, user_name: username, email } = req.body

            await Agent.create({
                email,
                username,
                phone_number,
                country_code,
                user_type: "agent",
            }).then((created: any) => {
                return res.status(200).json({
                    success: true,
                    message: "Agent Created",
                })
            }).catch(e => {
                // console.log(e)
                return res.status(200).json({
                    success: false,
                    message: e.message
                })
            })


        } catch (error: any) {
            return res.status(200).json({
                success: false,
                message: error.message
            })
        }
    }

    async agentUpdate(req: Request, res: Response) {
        try {

            const { user_name: username, email, uuid } = req.body

            if (!uuid) {
                return returnHelper(res, 200, false, "Please Provide All Params")
            }
            const updateParams = {
                ...(username && { username }),
                ...(email && { email }),
            }
            await Agent.update(updateParams, {
                where: {
                    uuid
                }
            })
            return res.status(200).json({
                success: true,
                message: "Agent Updated",
            })

        } catch (error: any) {
            return res.status(200).json({
                success: false,
                message: error.message
            })
        }
    }

    async deleteAgent(req: RequestWithUser, res: Response) {
        try {

            const { uuid } = req.body

            if (!uuid) {
                return returnHelper(res, 200, false, "Please Provide All Params")
            }

            const findSubAgent = await Agent.findOne({
                where: {
                    uuid: uuid,
                }
            })

            if (!findSubAgent) {
                return returnHelper(res, 200, false, "Provide Valid Sub Agent To Delete")
            }

            await Agent.destroy({
                where: {
                    uuid: findSubAgent.dataValues.uuid
                }
            })

            return res.status(200).json({
                success: true,
                message: "Sub Agent Deleted",
            })

        } catch (error: any) {
            return res.status(200).json({
                success: false,
                message: error.message
            })
        }
    }

    async toggleAgent(req: RequestWithUser, res: Response) {
        try {

            const { uuid, action } = req.body

            if (!uuid) {
                return returnHelper(res, 200, false, "Please Provide All Params")
            }

            const findSubAgent = await Agent.findOne({
                where: {
                    uuid: uuid,
                }
            })

            if (!findSubAgent) {
                return returnHelper(res, 200, false, "Provide Valid Sub Agent To Delete")
            }

            await Agent.update({ status: action }, {
                where: {
                    uuid: findSubAgent.dataValues.uuid
                }
            })

            return res.status(200).json({
                success: true,
                message: "Status Updated",
            })

        } catch (error: any) {
            return res.status(200).json({
                success: false,
                message: error.message
            })
        }
    }
}

export default new AgentController()