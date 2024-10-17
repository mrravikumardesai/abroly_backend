import { Op } from "sequelize";
import JobPost from "../../model/JobPost";
import { RequestWithUser } from "../../utils/types";
import { Response } from "express";


class JobPostController {
    async createJobPost(req: RequestWithUser, res: Response) {
        try {
            const {
                jobType, country, jobRole, salaryMin, salaryMax, experienceRequired,
                educationLevel, workPermit, overtime, accommodation, transportation, food,
                medicalInsurance, workHours, agentCharges, skillsRequired, applicationDeadline
            } = req.body;

            // validations

            if (!jobType) {
                return res.status(400).json({
                    success: false,
                    message: 'Job Type is required.',
                });
            }

            if (!country) {
                return res.status(400).json({
                    success: false,
                    message: 'Country of employment is required.',
                });
            }

            if (!jobRole) {
                return res.status(400).json({
                    success: false,
                    message: 'Job Role/Position is required.',
                });
            }

            if (!salaryMin || !salaryMax) {
                return res.status(400).json({
                    success: false,
                    message: 'Both minimum and maximum salary are required.',
                });
            }

            if (isNaN(salaryMin) || isNaN(salaryMax)) {
                return res.status(400).json({
                    success: false,
                    message: 'Salary values should be numeric.',
                });
            }

            if (!experienceRequired) {
                return res.status(400).json({
                    success: false,
                    message: 'Experience level is required.',
                });
            }

            if (!educationLevel) {
                return res.status(400).json({
                    success: false,
                    message: 'Education level is required.',
                });
            }

            if (!workPermit) {
                return res.status(400).json({
                    success: false,
                    message: 'Work permit information is required.',
                });
            }

            if (overtime === undefined) {  // Can be true/false, so use undefined check
                return res.status(400).json({
                    success: false,
                    message: 'Overtime availability is required.',
                });
            }

            if (accommodation === undefined) {
                return res.status(400).json({
                    success: false,
                    message: 'Accommodation information is required.',
                });
            }

            if (transportation === undefined) {
                return res.status(400).json({
                    success: false,
                    message: 'Transportation availability is required.',
                });
            }

            if (!food) {
                return res.status(400).json({
                    success: false,
                    message: 'Food provision details are required.',
                });
            }

            if (!medicalInsurance) {
                return res.status(400).json({
                    success: false,
                    message: 'Medical insurance information is required.',
                });
            }

            if (!workHours) {
                return res.status(400).json({
                    success: false,
                    message: 'Work hours information is required.',
                });
            }

            if (!agentCharges) {
                return res.status(400).json({
                    success: false,
                    message: 'Agent charges information is required.',
                });
            }

            if (!skillsRequired || !Array.isArray(skillsRequired) || skillsRequired.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'At least one skill is required.',
                });
            }

            if (!applicationDeadline) {
                return res.status(400).json({
                    success: false,
                    message: 'Application deadline is required.',
                });
            }


            const newJobPost = await JobPost.create({
                agent_uuid: req.user?.user?.uuid,
                jobType, country, jobRole, salaryMin, salaryMax, experienceRequired,
                educationLevel, workPermit, overtime, accommodation, transportation, food,
                medicalInsurance, workHours, agentCharges, skillsRequired, applicationDeadline
            });

            return res.status(201).json({
                success: true,
                message: 'Job Post created successfully',
                data: newJobPost
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    async filterJobPosts(req, res) {
        try {
            const { jobType, country, jobRole, salaryMin, salaryMax, experienceRequired, educationLevel } = req.query;

            // Build dynamic filter conditions
            const filterConditions: any = {};

            if (jobType) {
                filterConditions.jobType = jobType;
            }

            if (country) {
                filterConditions.country = country;
            }

            if (jobRole) {
                filterConditions.jobRole = jobRole;
            }

            if (salaryMin) {
                filterConditions.salaryMin = { [Op.gte]: salaryMin };
            }

            if (salaryMax) {
                filterConditions.salaryMax = { [Op.lte]: salaryMax };
            }

            if (experienceRequired) {
                filterConditions.experienceRequired = { [Op.gte]: experienceRequired };
            }

            if (educationLevel) {
                filterConditions.educationLevel = educationLevel;
            }

            // Query the job posts based on the dynamic filter conditions
            const jobPosts = await JobPost.findAll({
                where: filterConditions,
            });

            return res.status(200).json({
                success: true,
                data: jobPosts
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
    // Fetch all job posts created by a specific agent
    async getAgentJobPosts(req: RequestWithUser, res: Response) {
        try {

            const agentJobPosts = await JobPost.findAll({
                where: {
                    agent_uuid: req.user?.user?.uuid,
                }
            });

            if (!agentJobPosts.length) {
                return res.status(404).json({
                    success: false,
                    message: 'No job posts found for this agent',
                });
            }

            return res.status(200).json({
                success: true,
                data: agentJobPosts,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}

export default new JobPostController();
