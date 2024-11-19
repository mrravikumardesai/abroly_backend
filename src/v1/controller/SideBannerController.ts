import { Response } from "express";
import { returnHelper } from "../../helpers/returnHelper";
import { RequestWithUser } from "../../utils/types";
import SideBanner from "../../model/SideBanner";
import moment from "moment";
import { Op } from "sequelize";
import fs from 'fs'
import path from 'path'
import Subscription from "../../model/Subscription";

class SideBannerController {

    // get avalible slots
    async availableSlot(req: RequestWithUser, res: Response) {
        try {
            const { requestedMonth, target_type }: any = req.body; // User passes requestedMonth (e.g., "2025-02")

            if (!target_type) {
                return returnHelper(res, 200, false, "Please Select Target");
            }

            if (!requestedMonth) {
                return returnHelper(res, 200, false, "Please provide requestedMonth in 'YYYY-MM' format.");
            }

            // Parse the start and end of the requested month
            const start_date = moment(requestedMonth, 'YYYY-MM').startOf('month').toDate();
            const end_date = moment(requestedMonth, 'YYYY-MM').endOf('month').toDate();

            // Fetch the latest banner for position 1 within the requested month
            const lastPosition1Banner = await SideBanner.findOne({
                where: {
                    position: "1",
                    target_type,
                    start_date: { [Op.lte]: end_date },
                    end_date: { [Op.gte]: start_date },
                },
                order: [["end_date", "DESC"]],
            });

            // Fetch the latest banner for position 2 within the requested month
            const lastPosition2Banner = await SideBanner.findOne({
                where: {
                    position: "2",
                    target_type,
                    start_date: { [Op.lte]: end_date },
                    end_date: { [Op.gte]: start_date },
                },
                order: [["end_date", "DESC"]],
            });

            // Prepare the slot object for the requested month
            const monthSlot = {
                start_date,
                end_date,
                position_1: {
                    isAvailable: !lastPosition1Banner, // Position 1 is available if no banner is found
                },
                position_2: {
                    isAvailable: !lastPosition2Banner, // Position 2 is available if no banner is found
                },
            };

            // Return the available slot for the requested month
            return returnHelper(res, 200, true, "Available Slot", [monthSlot]);
        } catch (error: any) {
            return returnHelper(res, 500, false, error.message);
        }
    }


    async assignSlot(req: RequestWithUser, res: Response) {
        const { campaign_title, start_date, end_date, position, target_type } = req.body;

        // Validate input fields
        if (!campaign_title || !start_date || !end_date || !position || !target_type) {
            return returnHelper(res, 200, false, "Please Provide Required Fields")
        }

        // here check for active subscription 
        const activeSubscription = await Subscription.findOne({
            where: {
                agent_uuid: req.user?.user?.uuid,
                achievement_banner: {
                    [Op.gt]: 0
                },
                leads_remaining: {
                    [Op.gt]: 0
                }
            },
            order: [["createdAt", "DESC"]]
        })

        if (!activeSubscription) {
            return returnHelper(res, 200, false, "You Can not higlight your highlights, Please purchase package or add on to do this action")
        }

        // image name
        const image = `${Date.now()}-${Math.floor(
            1000 + Math.random() * 9000
        )}${path.parse(req.file.originalname).ext}`;


        try {
            // Check for overlapping slots
            const conflictingBanner = await SideBanner.findOne({
                where: {
                    position, // Same position
                    target_type,
                    [Op.or]: [
                        {
                            start_date: { [Op.between]: [start_date, end_date] }, // Overlaps with the provided range
                        },
                        {
                            end_date: { [Op.between]: [start_date, end_date] }, // Overlaps with the provided range
                        },
                        {
                            [Op.and]: [
                                { start_date: { [Op.lte]: start_date } }, // Starts before and ends after
                                { end_date: { [Op.gte]: end_date } },
                            ],
                        },
                    ],
                },
            });

            if (conflictingBanner) {
                return returnHelper(res, 200, false, "The requested slot is already occupied, Please refresh the page")
            }

            // Create a new banner record
            const newBanner = await SideBanner.create({
                agent_uuid: req?.uuid,
                campaign_title,
                image,
                start_date,
                end_date,
                position,
                target_type: target_type,
                status: "pending", // Default status
            }).then(async() => {
                fs.writeFileSync(
                    path.join("public/banners", image),
                    req.file.buffer
                );

                // update subscriptioon
                await Subscription.update({
                    achievement_banner: Number(activeSubscription?.dataValues?.achievement_banner) - 1
                },{
                    where:{
                        uuid:activeSubscription?.dataValues?.uuid
                    }
                })
            })

            return res.status(201).json({
                success: true,
                message: "Slot assigned successfully",
                data: newBanner,
            });
        } catch (error) {
            console.error("Error assigning slot:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    async listCamp(req: RequestWithUser, res: Response) {
        try {

            let { find_for } = req.params

            if (!find_for) {
                find_for = "current"
            }

            let whereCondition = find_for == "current" ? {
                end_date: {
                    [Op.gt]: new Date()
                },
                agent_uuid: req?.uuid
            } : {
                end_date: {
                    [Op.lt]: new Date()
                },
                agent_uuid: req?.uuid
            }

            const findAll = await SideBanner.findAll({
                where: whereCondition,
            })

            return returnHelper(res, 200, true, "Records Found", findAll)

        } catch (error) {
            console.error("Error in listCamp:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    async canAssign(req: RequestWithUser, res: Response) {
        try {

            const activeSubscription = await Subscription.findOne({
                where: {
                    agent_uuid: req.user?.user?.uuid,
                    achievement_banner: {
                        [Op.gt]: 0
                    },
                    leads_remaining: {
                        [Op.gt]: 0
                    }
                },
                order: [["createdAt", "DESC"]]
            })

            return returnHelper(res, 200, true, "Records Found", {
                can_assign: activeSubscription ? true : false,
                remaining: activeSubscription?.dataValues?.achievement_banner
            })

        } catch (error) {
            console.error("Error in canAssign:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }


}

export default new SideBannerController()