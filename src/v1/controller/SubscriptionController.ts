import { Response } from "express";
import { RequestWithUser } from "../../utils/types";
import Subscription from "../../model/Subscription"; // Ensure you have the Subscription model
import { returnHelper } from "../../helpers/returnHelper";
import { validateAddSubscription, validateUpdateSubscription } from "../validations/subscriptionValidators";
import Package from "../../model/Packages";
import { Op } from "sequelize";
import AddOn from "../../model/AddOn";
// Import validation functions

class SubscriptionController {

    async addSubscription(req: RequestWithUser, res: Response) {
        try {

            const { agent_uuid, package_uuid } = req.body;

            const findPackage = await Package.findOne({
                where: {
                    uuid: package_uuid
                },
                attributes: [
                    "uuid",
                    "leadLimit",
                    "teamLimit",
                    "jobPostLimit",
                    "job_post_days",
                ]
            })

            if (!findPackage) {
                return returnHelper(res, 200, false, "Package Not Found")
            }
            // start date and end date 
            const startDate = new Date()

            const endDate = new Date()

            endDate.setDate(startDate.getDate() + +findPackage?.dataValues?.job_post_days)

            const subscription = await Subscription.create({
                agent_uuid,
                package_uuid,
                leads_remaining: findPackage?.dataValues?.leadLimit,
                team_member_limit: findPackage?.dataValues?.team_member_limit,
                job_post_limit: findPackage?.dataValues?.jobPostLimit,
                job_post_start_date: startDate,
                job_post_end_date: endDate,
                subscription_start_date: new Date()
            });

            return returnHelper(res, 200, true, "New Subscription Assigned", subscription);

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message);
        }
    }

    async assignCustomSubscription(req: RequestWithUser, res: Response) {
        try {

            const { agent_uuid,
                leadLimit,
                teamLimit,
                jobPostLimit,
                job_post_days,
            } = req.body;

            if (!agent_uuid) {
                return returnHelper(res, 200, false, "Please Provide Agent ")
            }

            // start date and end date 
            const startDate = new Date()

            const endDate = new Date()

            endDate.setDate(startDate.getDate() + +job_post_days)

            const subscription = await Subscription.create({
                agent_uuid,
                package_uuid: "",
                leads_remaining: leadLimit,
                team_member_limit: teamLimit,
                job_post_limit: jobPostLimit,
                job_post_start_date: startDate,
                job_post_end_date: endDate,
                subscription_start_date: new Date()
            });

            return returnHelper(res, 200, true, "Custom Subscription Assigned");

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message);
        }
    }
    async customAddOn(req: RequestWithUser, res: Response) {
        try {

            const {
                subscription_uuid,
                leadLimit,
                teamLimit,
                jobPostLimit,
                job_post_days,
            } = req.body;

            const updateParms = {}

            if (!subscription_uuid) {
                return returnHelper(res, 200, false, "Please Add Subscription First")
            }

            // find subscription
            const findSubscription = await Subscription.findOne({
                where: {
                    uuid: subscription_uuid,
                },
                order: [["createdAt", "DESC"]]
            })

            if (!findSubscription) {
                return returnHelper(res, 200, false, "Please Add Any subscription first")
            }

            // team members limit
            if (teamLimit && teamLimit !== "") {
                updateParms["team_member_limit"] = +teamLimit + +findSubscription.dataValues.team_member_limit
            }

            // lead limit
            if (leadLimit && leadLimit !== "") {
                updateParms["leads_remaining"] = +leadLimit + +findSubscription.dataValues.leads_remaining
            }

            // jobPostLimit
            if (jobPostLimit && jobPostLimit !== "") {
                updateParms["job_post_limit"] = +jobPostLimit + +findSubscription.dataValues.job_post_limit
            }

            // job_post_days 
            if (job_post_days && job_post_days !== "") {
                const job_post_end_date = new Date(findSubscription?.dataValues?.job_post_end_date)
                job_post_end_date.setDate(job_post_end_date.getDate() + +job_post_days)
                updateParms["job_post_end_date"] = job_post_end_date
            }

            // now create ADD ON 
            await AddOn.create({
                agent_uuid: findSubscription.dataValues.agent_uuid,
                leads_remaining: leadLimit,
                team_member_limit: teamLimit,
                job_post_limit: jobPostLimit,
                job_post_extend_days: job_post_days,
                subscription_uuid
            })

            // update subscription 
            await Subscription.update(updateParms, {
                where: {
                    uuid: subscription_uuid
                }
            })

            return returnHelper(res, 200, true, "Add on Assigned");

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message);
        }
    }

    async listAddOnes(req: RequestWithUser, res: Response) {
        try {

            const { agent_uuid, offset, limit } = req.body

            if (!agent_uuid) {
                return returnHelper(res, 200, false, "Pelase Provide Required Params")
            }

            const total = await AddOn.count({
                where: {
                    agent_uuid
                },
            })

            const findAddedAddOnes = await AddOn.findAll({
                where: {
                    agent_uuid
                },
                attributes: [
                    "uuid",
                    "leads_remaining",
                    "team_member_limit",
                    "job_post_limit",
                    "job_post_extend_days",
                    "createdAt"
                ],
                order: [["createdAt", "DESC"]],
                offset: offset ? +offset : 0,
                limit: limit ? +limit : 0
            })

            // return returnHelper(res, 200, true, "Records Found", { data: findAddedAddOnes, total })
            return res.status(200).json({
                success: true,
                message: "Records Found",
                data: findAddedAddOnes,
                total
            })

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message);
        }
    }

    async updateSubscription(req: RequestWithUser, res: Response) {
        try {
            const { error } = validateUpdateSubscription(req.body);
            if (error) return returnHelper(res, 400, false, error.details[0].message);

            const { uuid } = req.body;
            if (!uuid) {
                return returnHelper(res, 400, false, "Provide Required Params");
            }

            const updateParams = { ...req.body };

            await Subscription.update(updateParams, {
                where: { uuid }
            });

            return returnHelper(res, 200, true, "Updated Subscription");
        } catch (error: any) {
            return returnHelper(res, 500, false, error.message);
        }
    }

    async deleteSubscription(req: RequestWithUser, res: Response) {
        try {
            const { uuid } = req.body;
            if (!uuid) {
                return returnHelper(res, 400, false, "Provide Required Params");
            }

            await Subscription.destroy({
                where: { uuid }
            });

            return returnHelper(res, 200, true, "Deleted Subscription");
        } catch (error: any) {
            return returnHelper(res, 500, false, error.message);
        }
    }

    async listSubscriptions(req: RequestWithUser, res: Response) {
        try {
            const allSubscriptions = await Subscription.findAll({
                attributes: ["uuid", "agent_uuid", "package_uuid", "leads_remaining", "team_member_limit", "job_post_limit", "tour_post_limit", "travel_lead_limit", "profile_pinning_weeks", "event_banner_count", "createdAt"]
            });

            return returnHelper(res, 200, true, "Subscriptions Found", allSubscriptions);
        } catch (error: any) {
            return returnHelper(res, 500, false, error.message);
        }
    }

    async getSubscriptionByUUID(req: RequestWithUser, res: Response) {
        try {
            const { uuid } = req.params;
            const subscription = await Subscription.findOne({ where: { uuid } });
            if (!subscription) return returnHelper(res, 404, false, "Subscription not found");

            return returnHelper(res, 200, true, "Subscription Found", subscription);
        } catch (error: any) {
            return returnHelper(res, 500, false, error.message);
        }
    }

    async getSubscriptionsByAgentUUID(req: RequestWithUser, res: Response) {
        try {
            const { agent_uuid } = req.params;
            const subscriptions = await Subscription.findOne({
                where: {
                    agent_uuid, leads_remaining: {
                        [Op.gt]: 0
                    }
                },
                include: [
                    {
                        model: Package,
                        attributes: ["name"],
                        paranoid: false
                    }
                ],
                attributes: [
                    "uuid",
                    "leads_remaining",
                    "subscription_start_date",
                    "team_member_limit",
                    "job_post_limit",
                    "job_post_start_date",
                    "job_post_end_date",
                ],
                order: [["createdAt", "DESC"]]
            });

            return returnHelper(res, 200, true, "Subscriptions Found", subscriptions);
        } catch (error: any) {
            return returnHelper(res, 500, false, error.message);
        }
    }
}

export default new SubscriptionController();
