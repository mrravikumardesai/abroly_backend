import { Response } from "express";
import { RequestWithUser } from "../../utils/types";
import { returnHelper } from "../../helpers/returnHelper";
import Calendar from "../../model/Calendar";
import { Op } from "sequelize";
import User from "../../model/User";
import Agent from "../../model/Agent";

class CalendarController {

    // add task sub agent
    async eventCreate(req: RequestWithUser, res: Response) {

        try {

            const {
                assgin_to,
                title,
                description,
                application_uuid,
                event_type,
                start_time,
                end_time,
                date,
            } = req.body

            if (!title) {
                return returnHelper(res, 200, false, "Please Provide Title")
            }

            if (!event_type) {
                return returnHelper(res, 200, false, "Please Select Event Type")
            }

            const eventMustBe = ['event', 'reminder', 'followup', 'task']

            if (!eventMustBe.includes(event_type)) {
                return returnHelper(res, 200, false, "Provide Valid event type")
            }

            if (!start_time) {
                return returnHelper(res, 200, false, "Please Provide event Start Time")
            }
            if (!end_time) {
                return returnHelper(res, 200, false, "Please Provide event End Time")
            }
            if (!date) {
                return returnHelper(res, 200, false, "Please Provide event Date")
            }

            await Calendar.create({
                assign_by: req.user?.user?.uuid,
                title,
                assgin_to: assgin_to ? assgin_to : req.user?.user?.uuid,
                description,
                application_uuid,
                event_type,
                start_time,
                end_time,
                date,
            })

            return returnHelper(res, 200, true, "Event Added")

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

    // list
    async listEvents(req: RequestWithUser, res: Response) {
        try {

            const { date, event_type } = req.body

            if (!date) {
                return returnHelper(res, 200, false, "Please Select Date")
            }

            // month

            const startDate = new Date(date)

            // months first date
            startDate.setDate(1)

            const endDate = new Date(startDate)

            // end date - month's last date
            endDate.setMonth(startDate.getMonth() + 1)
            endDate.setDate(endDate.getDate() - 1)

            console.log(startDate.toDateString(), "START DATE");
            console.log(endDate.toDateString(), "END DATE");

            const whereCondition = {
                assgin_to: req.user?.user?.uuid,
                date: {
                    [Op.between]: [new Date(startDate), new Date(endDate)]
                },
                ...(event_type && {
                    event_type: {
                        [Op.in]: [...event_type]
                    }
                })
            }

            const findRecordsForThisMonth = await Calendar.findAll({
                where: whereCondition,
                attributes: [
                    "uuid",
                    "title",
                    "description",
                    "application_uuid",
                    "event_type",
                    "start_time",
                    "end_time",
                    "is_done",
                    "date",
                    "createdAt",
                ]
            })

            return returnHelper(res, 200, true, "Records Found", findRecordsForThisMonth)

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

    async actionEvent(req: RequestWithUser, res: Response) {

        try {

            const { uuid, status } = req.body

            if (!uuid || !status) {
                return returnHelper(res, 200, false, "Please Provide All Params")
            }

            const findEvent = await Calendar.findOne({
                where: {
                    uuid: uuid,
                    assgin_to: req.user?.user?.uuid
                }
            })


            if (!findEvent) {
                return returnHelper(res, 200, false, "Post Not Found")
            }

            await Calendar.update({
                is_done: status == "done" ? 1 : 0
            }, {
                where: {
                    uuid: findEvent?.dataValues?.uuid
                }
            })

            return returnHelper(res, 200, true, "Updated!")

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

    async eventAddAgent(req: RequestWithUser, res: Response) {

        try {

            const {
                assgin_to,
                title,
                description,
                application_uuid,
                event_type,
                start_time,
                end_time,
                date,
            } = req.body

            if (!title) {
                return returnHelper(res, 200, false, "Please Provide Title")
            }

            if (!event_type) {
                return returnHelper(res, 200, false, "Please Select Event Type")
            }

            const eventMustBe = ['event', 'reminder', 'followup', 'task']

            if (!eventMustBe.includes(event_type)) {
                return returnHelper(res, 200, false, "Provide Valid event type")
            }

            if (!start_time) {
                return returnHelper(res, 200, false, "Please Provide event Start Time")
            }
            if (!end_time) {
                return returnHelper(res, 200, false, "Please Provide event End Time")
            }
            if (!date) {
                return returnHelper(res, 200, false, "Please Provide event Date")
            }

            await Calendar.create({
                assign_by: req.user?.user?.uuid,
                title,
                assgin_to: assgin_to ? assgin_to : req.user?.user?.uuid,
                description,
                application_uuid,
                event_type,
                start_time,
                end_time,
                date,
            })

            return returnHelper(res, 200, true, "Event Added")

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

    async agentListEvent(req: RequestWithUser, res: Response) {
        try {

            const { date, event_type } = req.body

            if (!date) {
                return returnHelper(res, 200, false, "Please Select Date")
            }

            // month

            const startDate = new Date(date)

            // months first date
            startDate.setDate(1)

            const endDate = new Date(startDate)

            // end date - month's last date
            endDate.setMonth(startDate.getMonth() + 1)
            endDate.setDate(endDate.getDate() - 1)

            const whereCondition = {
                assign_by: req.user?.user?.uuid,
                date: {
                    [Op.between]: [new Date(startDate), new Date(endDate)]
                },
                ...(event_type && {
                    event_type: {
                        [Op.in]: [...event_type]
                    }
                })
            }

            const findRecordsForThisMonth = await Calendar.findAll({
                where: whereCondition,
                attributes: [
                    "uuid",
                    "title",
                    "description",
                    "application_uuid",
                    "assgin_to",
                    "assign_by",
                    "event_type",
                    "start_time",
                    "end_time",
                    "is_done",
                    "date",
                    "createdAt",
                ],
                include: [
                    {
                        model: Agent,
                        as: "to_assign",  // Ensure this matches the association alias
                        attributes:["access_profile","designation","profile_image","username"]
                    },
                    // {
                    //     model: Agent,
                    //     as: "by_assign",  // Ensure this matches the association alias
                    // }
                ]
            })

            return returnHelper(res, 200, true, "Records Found", findRecordsForThisMonth)

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }
}

export default new CalendarController()