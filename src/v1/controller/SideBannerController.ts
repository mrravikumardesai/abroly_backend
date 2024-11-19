import { Response } from "express";
import { returnHelper } from "../../helpers/returnHelper";
import { RequestWithUser } from "../../utils/types";
import SideBanner from "../../model/SideBanner";
import moment from "moment";
import { Op } from "sequelize";
import fs from 'fs'
import path from 'path'

class SideBannerController {

    // get avalible slots
    async avalibleSlot(req: RequestWithUser, res: Response) {
        try {
            const { requestedMonth, target_type }: any = req.body; // User may pass requested month (e.g., "2025-02")

            let startDate, endDate;

            if (!target_type) {
                return returnHelper(res, 200, false, "Please Select Target")
            }

            // If user doesn't pass a month, use the current month
            if (!requestedMonth) {
                const today = moment();
                startDate = moment(today).add(1, 'week');   // Start of the current month
                endDate = moment(today).endOf('month');  // End of the current month
            } else {
                // If the user requests a specific month, use the passed month
                startDate = moment(requestedMonth, 'YYYY-MM').add(1, 'week');  // Example: "2025-02"
                endDate = moment(startDate).endOf('month');
            }

            // Prepare an array to hold available slots for each week
            const availableSlots = [];

            // Loop through weeks within the requested month or current month
            for (let currentWeekStart = startDate.clone().startOf('week'); currentWeekStart.isBefore(endDate, 'day'); currentWeekStart.add(1, 'week')) {
                // If the currentWeekStart is before the next week, move it forward
                if (currentWeekStart.isBefore(moment().add(1, 'week').startOf('week'))) {
                    currentWeekStart = moment().add(1, 'week').startOf('week');
                }

                const currentWeekEnd = currentWeekStart.clone().endOf('week');

                // Fetch the latest banner for position 1 and 2
                const lastPosition1Banner = await SideBanner.findOne({
                    where: { position: "1", target_type, start_date: { [Op.lte]: currentWeekEnd.toDate() }, end_date: { [Op.gte]: currentWeekStart.toDate() } },
                    order: [["end_date", "DESC"]],
                });

                const lastPosition2Banner = await SideBanner.findOne({
                    where: { position: "2", target_type, start_date: { [Op.lte]: currentWeekEnd.toDate() }, end_date: { [Op.gte]: currentWeekStart.toDate() } },
                    order: [["end_date", "DESC"]],
                });

                // Prepare response object for this week
                const weekSlot = {
                    week_start: currentWeekStart.toDate(),
                    week_end: currentWeekEnd.toDate(),
                    position_1: {
                        isAvailable: !lastPosition1Banner // Position 1 is available if no banner is found
                    },
                    position_2: {
                        isAvailable: !lastPosition2Banner // Position 2 is available if no banner is found
                    }
                };

                // Add the slot for this week to the availableSlots array
                availableSlots.push(weekSlot);
            }

            // Return the available slots for the requested month or the current month
            return returnHelper(res, 200, true, "Available Slots", availableSlots);

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
            }).then(() => {
                fs.writeFileSync(
                    path.join("public/banners", image),
                    req.file.buffer
                );
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
            console.error("Error assigning listCamp:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }



}

export default new SideBannerController()