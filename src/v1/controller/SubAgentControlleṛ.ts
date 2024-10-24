import { Response } from "express"
import Agent from "../../model/Agent"
import { RequestWithUser } from "../../utils/types"
import { returnHelper } from "../../helpers/returnHelper"
import { Op } from "sequelize"
import Subscription from "../../model/Subscription"

class SubAgentControlleṛ {

    async canAddSubAgents(req: RequestWithUser, res: Response) {
        try {

            // here check for active subscription 
            const activeSubscription = await Subscription.findOne({
                where: {
                    agent_uuid: req.user?.user?.uuid,
                    team_member_limit: {
                        [Op.gt]: 0
                    }
                },
                attributes: ["team_member_limit"]
            })

            return res.status(200).json({
                success: true,
                message: 'Records Found',
                data: activeSubscription ? { limit: activeSubscription?.dataValues?.team_member_limit } : null
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async addSubAgent(req: RequestWithUser, res: Response) {
        try {

            const { phone_number, country_code, user_name: username, email, designation } = req.body

            if (!phone_number) {
                returnHelper(res, 200, false, "Please Provide Phone number")
            }
            if (!username) {
                returnHelper(res, 200, false, "Please Provide User Name")
            }
            if (!email) {
                returnHelper(res, 200, false, "Please Provide Email")
            }

            const activeSubscription = await Subscription.findOne({
                where: {
                    agent_uuid: req.user?.user?.uuid,
                },
                attributes: ["team_member_limit", "uuid"]
            })

            if (!activeSubscription) {
                return returnHelper(res, 200, false, "You can not add sub users, please check your subscription")
            }

            await Agent.create({
                email,
                username,
                phone_number,
                designation,
                country_code,
                role: "sub-agent",
                parent_uuid: req.user?.user?.uuid
            }).then(async (created: any) => {

                // here we've to reduce limit of sub members
                await Subscription.update({
                    team_member_limit: +activeSubscription?.dataValues?.team_member_limit - 1
                }, {
                    where: {
                        uuid: activeSubscription?.dataValues?.uuid
                    }
                })

                return res.status(200).json({
                    success: true,
                    message: "Sub Agent Created",
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

    async agentUpdate(req: RequestWithUser, res: Response) {
        try {

            const { user_name: username, email, uuid, designation } = req.body

            if (!uuid) {
                return returnHelper(res, 200, false, "Please Provide All Params")
            }
            const updateParams = {
                ...(username && { username }),
                ...(email && { email }),
                ...(designation && { designation }),
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

    async deleteSubAgent(req: RequestWithUser, res: Response) {
        try {

            const { uuid } = req.body

            if (!uuid) {
                return returnHelper(res, 200, false, "Please Provide All Params")
            }

            const findSubAgent = await Agent.findOne({
                where: {
                    uuid: uuid,
                    parent_uuid: req.user?.user?.uuid
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

    async toggleSubAgent(req: RequestWithUser, res: Response) {
        try {

            const { uuid, action } = req.body

            if (!uuid) {
                return returnHelper(res, 200, false, "Please Provide All Params")
            }

            const findSubAgent = await Agent.findOne({
                where: {
                    uuid: uuid,
                    parent_uuid: req.user?.user?.uuid
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
                message: "Sub Agent Deleted",
            })

        } catch (error: any) {
            return res.status(200).json({
                success: false,
                message: error.message
            })
        }
    }

    async listSubAgent(req: RequestWithUser, res: Response) {
        try {

            const { search, offset } = req.body

            const searchCondition = search
                ? {
                    [Op.or]: [
                        { phone_number: { [Op.like]: `%${search}%` } },  // search by phone number
                        { username: { [Op.like]: `%${search}%` } },      // search by username
                        { email: { [Op.like]: `%${search}%` } },         // search by email
                    ],
                    parent_uuid: req.user?.user?.uuid,
                    role: "sub-agent"
                }
                : {
                    parent_uuid: req.user?.user?.uuid,
                    role: "sub-agent"
                };

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
                    "designation",
                    "status",
                    "is_verified",
                    "profile_image",
                    "access_profile",
                    "createdAt",
                ],
                offset: offset,
                limit: 10,
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




}


export default new SubAgentControlleṛ()