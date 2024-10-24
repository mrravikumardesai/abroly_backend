import { Op } from "sequelize";
import JobPost from "../../model/JobPost";
import { RequestWithUser } from "../../utils/types";
import { Response } from "express";
import { returnHelper } from "../../helpers/returnHelper";
import JobApplicants from "../../model/JobApplicants";
import User from "../../model/User";
import sequelize from "../../config/dbconfig";
import Subscription from "../../model/Subscription";


class JobPostController {


    async canJobPost(req: RequestWithUser, res: Response) {
        try {

            const today = new Date()

            // here check for active subscription 
            const activeSubscription = await Subscription.findOne({
                where: {
                    agent_uuid: req.user?.user?.uuid,
                    job_post_end_date: {
                        [Op.gte]: today
                    }
                }
            })

            return res.status(200).json({
                success: true,
                message: 'Job Post created successfully',
                data: activeSubscription ? {
                    endOn: activeSubscription?.dataValues?.job_post_end_date,
                    job_post_limit: activeSubscription?.dataValues?.job_post_limit,
                } : null
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }


    async createJobPost(req: RequestWithUser, res: Response) {
        try {
            const {
                jobType, country, jobRole, salaryMin, salaryMax, experienceRequired,
                educationLevel, workPermit, overtime, accommodation, transportation, food,
                medicalInsurance, workHours, agentCharges, skillsRequired, applicationDeadline,
                description
            } = req.body;

            // validations

            if (!jobType) {
                return res.status(200).json({
                    success: false,
                    message: 'Job Type is required.',
                });
            }

            if (!country) {
                return res.status(200).json({
                    success: false,
                    message: 'Country of employment is required.',
                });
            }

            if (!jobRole) {
                return res.status(200).json({
                    success: false,
                    message: 'Job Role/Position is required.',
                });
            }

            if (!salaryMin || !salaryMax) {
                return res.status(200).json({
                    success: false,
                    message: 'Both minimum and maximum salary are required.',
                });
            }

            if (isNaN(salaryMin) || isNaN(salaryMax)) {
                return res.status(200).json({
                    success: false,
                    message: 'Salary values should be numeric.',
                });
            }

            if (!experienceRequired) {
                return res.status(200).json({
                    success: false,
                    message: 'Experience level is required.',
                });
            }

            if (!educationLevel) {
                return res.status(200).json({
                    success: false,
                    message: 'Education level is required.',
                });
            }

            if (!workPermit) {
                return res.status(200).json({
                    success: false,
                    message: 'Work permit information is required.',
                });
            }

            if (overtime === undefined) {  // Can be true/false, so use undefined check
                return res.status(200).json({
                    success: false,
                    message: 'Overtime availability is required.',
                });
            }

            if (accommodation === undefined) {
                return res.status(200).json({
                    success: false,
                    message: 'Accommodation information is required.',
                });
            }

            if (transportation === undefined) {
                return res.status(200).json({
                    success: false,
                    message: 'Transportation availability is required.',
                });
            }

            if (!food) {
                return res.status(200).json({
                    success: false,
                    message: 'Food provision details are required.',
                });
            }

            if (medicalInsurance == undefined) {
                return res.status(200).json({
                    success: false,
                    message: 'Medical insurance information is required.',
                });
            }

            if (!workHours) {
                return res.status(200).json({
                    success: false,
                    message: 'Work hours information is required.',
                });
            }

            if (!agentCharges) {
                return res.status(200).json({
                    success: false,
                    message: 'Agent charges information is required.',
                });
            }
            if (!description) {
                return res.status(200).json({
                    success: false,
                    message: 'Please Provide Description for job post',
                });
            }

            // if (!skillsRequired || !Array.isArray(skillsRequired) || skillsRequired.length === 0) {
            //     return res.status(200).json({
            //         success: false,
            //         message: 'At least one skill is required.',
            //     });
            // }

            if (!applicationDeadline) {
                return res.status(200).json({
                    success: false,
                    message: 'Application deadline is required.',
                });
            }

            // here check for active subscription 
            const activeSubscription = await Subscription.findOne({
                where: {
                    agent_uuid: req.user?.user?.uuid,
                    job_post_end_date: {
                        [Op.gte]: new Date()
                    },
                    job_post_limit: {
                        [Op.gt]: 0
                    }
                }
            })

            if (!activeSubscription) {
                return returnHelper(res, 200, false, "You Can not add job post, Please purchase package for job post")
            }


            const newJobPost = await JobPost.create({
                agent_uuid: req.user?.user?.uuid,
                jobType, country, jobRole, salaryMin, salaryMax, experienceRequired,
                educationLevel, workPermit, overtime, accommodation, transportation, food,
                medicalInsurance, workHours, agentCharges, skillsRequired, applicationDeadline,
                description, job_post_end_date: activeSubscription?.dataValues?.job_post_end_date
            }).then(async () => {
                // activeSubscription

                // decrese number
                var job_post_limit = +activeSubscription.dataValues.job_post_limit
                job_post_limit -= 1

                await Subscription.update({
                    job_post_limit
                }, {
                    where: {
                        uuid: activeSubscription?.dataValues?.uuid
                    }
                })
            })

            return res.status(200).json({
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
    async updateJobPost(req: RequestWithUser, res: Response) {
        try {
            const {
                jobType, country, jobRole, salaryMin, salaryMax, experienceRequired,
                educationLevel, workPermit, overtime, accommodation, transportation, food,
                medicalInsurance, workHours, agentCharges, skillsRequired, applicationDeadline, uuid
            } = req.body;

            // validations

            if (!uuid) {
                return res.status(200).json({
                    success: false,
                    message: 'Somethig went wrong',
                });
            }

            const updateParams = {
                ...(jobType !== undefined && { jobType }),
                ...(country !== undefined && { country }),
                ...(jobRole !== undefined && { jobRole }),
                ...(salaryMin !== undefined && { salaryMin }),
                ...(salaryMax !== undefined && { salaryMax }),
                ...(experienceRequired !== undefined && { experienceRequired }),
                ...(educationLevel !== undefined && { educationLevel }),
                ...(workPermit !== undefined && { workPermit }),
                ...(overtime !== undefined && { overtime }),
                ...(accommodation !== undefined && { accommodation }),
                ...(transportation !== undefined && { transportation }),
                ...(food !== undefined && { food }),
                ...(medicalInsurance !== undefined && { medicalInsurance }),
                ...(workHours !== undefined && { workHours }),
                ...(agentCharges !== undefined && { agentCharges }),
                ...(skillsRequired !== undefined && { skillsRequired }),
                ...(applicationDeadline !== undefined && { applicationDeadline }),
            }


            const newJobPost = await JobPost.update(updateParams, {
                where: {
                    agent_uuid: req.user?.user?.uuid,
                    uuid: uuid
                }
            });

            return res.status(200).json({
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
    async deleteJobPost(req: RequestWithUser, res: Response) {
        try {
            const {
                uuid
            } = req.body;

            // validations

            if (!uuid) {
                return res.status(200).json({
                    success: false,
                    message: 'Opps, something went wrong',
                });
            }


            const findJobPost = await JobPost.findOne({
                where: {
                    uuid,
                    agent_uuid: req.user?.user?.uuid
                }
            })

            if (!findJobPost) {
                return returnHelper(res, 200, false, "Please Delete Valid Job Post")
            }

            await JobPost.destroy({
                where: {
                    uuid
                }
            })

            return res.status(200).json({
                success: true,
                message: 'Job Post Deleted successfully',
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
            const { jobType, country, jobRole, salaryMin, salaryMax, experienceRequired, educationLevel, limit, offset } = req.body;

            // Build dynamic filter conditions
            const filterConditions: any = {
                job_post_end_date: {
                    [Op.gte]: new Date()
                }
            };

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

            const total = await JobPost.count({
                where: filterConditions,
            });

            // Query the job posts based on the dynamic filter conditions
            const jobPosts = await JobPost.findAll({
                where: filterConditions,
                attributes: [
                    "uuid",
                    "jobRole",
                    "country",
                    "jobType",
                    "salaryMin",
                    "salaryMax",
                    "experienceRequired",
                    "educationLevel",
                    "skillsRequired",
                    "overtime",
                    "accommodation",
                    "transportation",
                    "medicalInsurance",
                    "food",
                    "applicationDeadline",
                    "createdAt"
                ],
                limit: limit ? +limit : 10,
                offset: offset ? +offset : 0,
                order: [["createdAt", "DESC"]]
            });

            return res.status(200).json({
                success: true,
                data: jobPosts,
                total: total
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
    async detailJobPost(req, res) {
        try {
            const { uuid } = req.body;

            // Build dynamic filter conditions
            const filterConditions: any = {};

            if (!uuid) {
                return returnHelper(res, 200, false, "Please Provide Required Params")
            }

            // Query the job posts based on the dynamic filter conditions
            const jobPost = await JobPost.findOne({
                where: {
                    uuid,
                    job_post_end_date: {
                        [Op.gte]: new Date()
                    }
                },
                paranoid: false
            });

            return res.status(200).json({
                success: true,
                data: jobPost,
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
    async isApplied(req: RequestWithUser, res: Response) {
        try {
            const { uuid } = req.body;

            if (!uuid) {
                return returnHelper(res, 200, false, "Please Provide Required Params")
            }

            // Query the job posts based on the dynamic filter conditions
            const jobPost = await JobApplicants.findOne({
                where: {
                    job_post_uuid: uuid,
                    user_uuid: req.user?.user?.uuid
                },
            });

            return res.status(200).json({
                success: true,
                data: jobPost,
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
    async apply(req: RequestWithUser, res: Response) {
        try {
            const { uuid } = req.body;

            if (!uuid) {
                return returnHelper(res, 200, false, "Please Provide Required Params")
            }

            // Query the job posts based on the dynamic filter conditions
            const jobPost = await JobApplicants.findOne({
                where: {
                    job_post_uuid: uuid,
                    user_uuid: req.user?.user?.uuid
                },
            });

            if (jobPost) {
                return returnHelper(res, 200, false, "Already Applied for this job ")
            }

            await JobApplicants.create({
                job_post_uuid: uuid,
                user_uuid: req.user?.user?.uuid
            });

            return res.status(200).json({
                success: true,
                message: "Applied"
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
    async applicants(req: RequestWithUser, res: Response) {
        try {
            const { uuid, offset, limit, search } = req.body;

            if (!uuid) {
                return returnHelper(res, 200, false, "Please Provide Required Params")
            }

            let searchCondition = {};
            if (search) {
                searchCondition = {
                    [Op.or]: [
                        { name: { [Op.like]: `%${search}%` } },
                        { email: { [Op.like]: `%${search}%` } },
                        { mobile: { [Op.like]: `%${search}%` } }
                    ]
                };
            }
            // Count total number of applicants with search conditions
            const total = await JobApplicants.count({
                where: {
                    job_post_uuid: uuid,
                },
                include: [{
                    model: User,
                    as: "applicant_user",
                    where: searchCondition // Search condition applied to the User model
                }]
            });

            // Find users based on job post with pagination and search
            const findRecords = await JobApplicants.findAll({
                where: {
                    job_post_uuid: uuid
                },
                include: [{
                    model: User,
                    as: "applicant_user",
                    where: searchCondition, // Search condition applied to the User model
                    attributes: [
                        "uuid",
                        "access_profile",
                        "createdAt",
                        "email",
                        "phone_number",
                        "profile_image"
                    ],
                    paranoid: false

                }],
                limit: limit ? +limit : 10,
                offset: offset ? +offset : 0,
                attributes: [
                    "createdAt",
                    "uuid",
                    "status"
                ]
            });

            return res.status(200).json({
                success: true,
                message: "Applied",
                data: findRecords?.map(item => {
                    return {
                        ...item?.dataValues?.applicant_user?.dataValues,
                        item_uuid: item.dataValues?.uuid,
                        status: item.dataValues?.status,
                        item_createdAt: item.dataValues?.createdAt,
                    }
                }),
                total
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // change_status

    async changeStatus(req: RequestWithUser, res: Response) {
        try {
            const { uuid, status } = req.body;
            if (!uuid || !status) {
                return returnHelper(res, 200, false, "Please Provide Required Params")
            }

            // find job post applicant 
            const findApplicant = await JobApplicants.findOne({
                where: {
                    uuid
                }
            })

            if (!findApplicant) {
                return returnHelper(res, 200, false, "Something went Wrong!")
            }

            // find job post 
            const findJobPost = await JobPost.findOne({
                where: {
                    uuid: findApplicant.dataValues.job_post_uuid,
                    agent_uuid: req.user?.user?.uuid
                }
            })

            if (!findJobPost) {
                return returnHelper(res, 200, false, "Job Post Not Found")
            }

            await JobApplicants.update({
                status
            }, {
                where: {
                    uuid
                }
            })

            return returnHelper(res, 200, true, "Status Changed")


        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async historyJobPost(req: RequestWithUser, res: Response) {
        try {
            const { offset, limit } = req.body;

            // Count total number of applicants with search conditions
            const total = await JobApplicants.count({
                where: {
                    user_uuid: req.user?.user?.uuid,
                },
            });

            // Find users based on job post with pagination and search
            const findRecords = await JobApplicants.findAll({
                where: {
                    user_uuid: req.user?.user?.uuid,
                },
                include: [{
                    model: JobPost,
                    as: "applicant_job",
                    paranoid: false,
                    attributes: [
                        "uuid",
                        "jobRole",
                        "jobType",
                        "country",
                        "salaryMin",
                        "salaryMax",
                        "experienceRequired",
                        "deletedAt",
                    ]
                }],
                limit: limit ? +limit : 10,
                offset: offset ? +offset : 0,
                attributes: [
                    "createdAt",
                    "uuid",
                    "status"
                ],
                order: [["createdAt", "DESC"]]
            });

            return res.status(200).json({
                success: true,
                message: "Applied",
                data: findRecords?.map(item => {
                    return {
                        ...item?.dataValues?.applicant_job?.dataValues,
                        status: item.dataValues?.status,
                        item_createdAt: item.dataValues?.createdAt,
                    }
                }),
                total
            });

        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Fetch all job posts created by a specific agent
    async getAgentJobPosts(req: RequestWithUser, res: Response) {
        try {

            const { status } = req.params

            const whereCondition = {
                agent_uuid: req.user?.user?.uuid,
            }

            if (status == "active") {
                whereCondition["job_post_end_date"] = {
                    [Op.gte]: new Date()
                }
            }

            if (status == "inactive") {
                whereCondition["job_post_end_date"] = {
                    [Op.lt]: new Date()
                }
            }

            const agentJobPosts = await JobPost.findAll({
                where: whereCondition,
                attributes: {
                    include: [
                        [
                            sequelize.fn('COUNT', sequelize.col('job_applicants.uuid')),
                            'applicant_count' // Alias for the count of applicants
                        ]
                    ]
                },
                include: [
                    {
                        model: JobApplicants,
                        as: 'job_applicants',
                        attributes: [] // We don’t need to include applicant details, just count
                    }
                ],
                group: ['JobPost.uuid'], // Group by job post to avoid duplication
                order: [["createdAt", "DESC"]]
            });

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
