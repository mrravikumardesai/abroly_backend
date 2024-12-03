import { Op } from "sequelize";
import { RequestWithUser } from "../../utils/types";
import User from "../../model/User";
import { Response } from "express";
import { returnHelper } from "../../helpers/returnHelper";
import StudentBasicDetails from "../../model/StudentBasicDetails";

class StudentController {
    // students 
    async studentsListing(req: RequestWithUser, res: Response) {
        try {

            const { search, offset } = req.body

            const searchCondition = search
                ? {
                    [Op.or]: [
                        { phone_number: { [Op.like]: `%${search}%` } },  // search by phone number
                        { username: { [Op.like]: `%${search}%` } },      // search by username
                        { email: { [Op.like]: `%${search}%` } },         // search by email
                    ]
                }
                : {};

            const total = await User.count({
                where: searchCondition
            })
            const findAllAgents = await User.findAll({
                where: searchCondition,
                attributes: [
                    "uuid",
                    "phone_number",
                    "username",
                    "email",
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


    async updateBasicDetails(req: RequestWithUser, res: Response) {

        const {
            study_abroad_intentions,
            study_abroad_reasons,
            field_of_study,
            degree_level,
            career_goals,
            preferred_job_roles,
            course_selection,
            program_duration,
            test_scores,
            test_score_details,
            preferred_country,
            university_preferences,
            scholarship_requirements,
            scholarship_preferences,
            budget,
            academic_performance,
            language_proficiency_scores,
            work_experience,
            work_experience_details,
            interested_in_internships,
            preferred_internship_roles,
            visa_type,
            accommodation_needs,
            accommodation_preferences,
            health_insurance_needs,
            extracurricular_interests,
            previous_applications,
            previous_application_details,
            interested_in_part_time_jobs,
            interested_in_language_courses,
            application_documents,
        } = req.body;


        try {

            const findStudentDetails = await StudentBasicDetails.findOne({
                where: {
                    student_uuid: req.user?.user?.uuid
                }
            })

            if (!findStudentDetails) {

                // const errors = validateStudentData(req.body);

                // if (errors.length) {
                //     return returnHelper(res, 200, false, errors[0])
                // }

                // create one 
                await StudentBasicDetails.create({
                    study_abroad_intentions,
                    study_abroad_reasons,
                    field_of_study,
                    degree_level,
                    career_goals,
                    preferred_job_roles,
                    course_selection,
                    program_duration,
                    test_scores,
                    test_score_details,
                    preferred_country,
                    university_preferences,
                    scholarship_requirements,
                    scholarship_preferences,
                    budget,
                    academic_performance,
                    language_proficiency_scores,
                    work_experience,
                    work_experience_details,
                    interested_in_internships,
                    preferred_internship_roles,
                    visa_type,
                    accommodation_needs,
                    accommodation_preferences,
                    health_insurance_needs,
                    extracurricular_interests,
                    previous_applications,
                    previous_application_details,
                    interested_in_part_time_jobs,
                    interested_in_language_courses,
                    application_documents,
                    student_uuid: req.user?.user?.uuid
                })

            }


            // update

            const updateParams = {
                ...(study_abroad_intentions !== undefined && { study_abroad_intentions }),
                ...(study_abroad_reasons !== undefined && { study_abroad_reasons }),
                ...(field_of_study !== undefined && { field_of_study }),
                ...(degree_level !== undefined && { degree_level }),
                ...(career_goals !== undefined && { career_goals }),
                ...(preferred_job_roles !== undefined && { preferred_job_roles }),
                ...(course_selection !== undefined && { course_selection }),
                ...(program_duration !== undefined && { program_duration }),
                ...(test_scores !== undefined && { test_scores }),
                ...(test_score_details !== undefined && { test_score_details }),
                ...(preferred_country !== undefined && { preferred_country }),
                ...(university_preferences !== undefined && { university_preferences }),
                ...(scholarship_requirements !== undefined && { scholarship_requirements }),
                ...(scholarship_preferences !== undefined && { scholarship_preferences }),
                ...(budget !== undefined && { budget }),
                ...(academic_performance !== undefined && { academic_performance }),
                ...(language_proficiency_scores !== undefined && { language_proficiency_scores }),
                ...(work_experience !== undefined && { work_experience }),
                ...(work_experience_details !== undefined && { work_experience_details }),
                ...(interested_in_internships !== undefined && { interested_in_internships }),
                ...(preferred_internship_roles !== undefined && { preferred_internship_roles }),
                ...(visa_type !== undefined && { visa_type }),
                ...(accommodation_needs !== undefined && { accommodation_needs }),
                ...(accommodation_preferences !== undefined && { accommodation_preferences }),
                ...(health_insurance_needs !== undefined && { health_insurance_needs }),
                ...(extracurricular_interests !== undefined && { extracurricular_interests }),
                ...(previous_applications !== undefined && { previous_applications }),
                ...(previous_application_details !== undefined && { previous_application_details }),
                ...(interested_in_part_time_jobs !== undefined && { interested_in_part_time_jobs }),
                ...(interested_in_language_courses !== undefined && { interested_in_language_courses }),
                ...(application_documents !== undefined && { application_documents }),
            }

            await StudentBasicDetails.update(updateParams, {
                where: {
                    student_uuid: req?.user?.user?.uuid
                }
            })

            return returnHelper(res, 200, true, "Profile Updated")


        } catch (error: any) {
            return res.status(200).json({
                success: false,
                message: error.message
            })
        }
    }

    async getBasicDetails(req: RequestWithUser, res: Response) {

        try {

            const findStudentDetails = await StudentBasicDetails.findOne({
                where: {
                    student_uuid: req.user?.user?.uuid
                },
                attributes: [
                    "study_abroad_intentions",
                    "study_abroad_reasons",
                    "field_of_study",
                    "degree_level",
                    "career_goals",
                    "preferred_job_roles",
                    "course_selection",
                    "program_duration",
                    "test_scores",
                    "test_score_details",
                    "preferred_country",
                    "university_preferences",
                    "scholarship_requirements",
                    "scholarship_preferences",
                    "budget",
                    "academic_performance",
                    "language_proficiency_scores",
                    "work_experience",
                    "work_experience_details",
                    "interested_in_internships",
                    "preferred_internship_roles",
                    "visa_type",
                    "accommodation_needs",
                    "accommodation_preferences",
                    "health_insurance_needs",
                    "extracurricular_interests",
                    "previous_applications",
                    "previous_application_details",
                    "interested_in_part_time_jobs",
                    "interested_in_language_courses",
                    "application_documents",
                ]
            })

            return returnHelper(res, 200, true, "Profile Found", findStudentDetails)


        } catch (error: any) {
            return res.status(200).json({
                success: false,
                message: error.message
            })
        }
    }
    async getProfileCompletionProgress(req: RequestWithUser, res: Response) {
        try {
            const findStudentDetails = await StudentBasicDetails.findOne({
                where: {
                    student_uuid: req.user?.user?.uuid
                }
            });

            if (!findStudentDetails) {
                return returnHelper(res, 200, true, "No profile found", { completionPercentage: 0, missingFields: [] });
            }

            const totalFields = 31; // Total number of fields in StudentBasicDetails
            let filledFields = 0;
            const missingFields: string[] = [];

            // Check each field for completion
            for (const key in findStudentDetails.dataValues) {
                if (findStudentDetails.dataValues[key] !== null && findStudentDetails.dataValues[key] !== "") {
                    filledFields++;
                } else {
                    missingFields.push(key); // Collect missing fields
                }
            }

            const completionPercentage = (filledFields / totalFields) * 100;

            return returnHelper(res, 200, true, "Profile completion progress", { completionPercentage, missingFields });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }




    async getBasicDetailsAdmin(req: RequestWithUser, res: Response) {

        try {

            const { student_uuid } = req.body

            const findStudentDetails = await StudentBasicDetails.findOne({
                where: {
                    student_uuid
                },
                attributes: [
                    "study_abroad_intentions",
                    "study_abroad_reasons",
                    "field_of_study",
                    "degree_level",
                    "career_goals",
                    "preferred_job_roles",
                    "course_selection",
                    "program_duration",
                    "test_scores",
                    "test_score_details",
                    "preferred_country",
                    "university_preferences",
                    "scholarship_requirements",
                    "scholarship_preferences",
                    "budget",
                    "academic_performance",
                    "language_proficiency_scores",
                    "work_experience",
                    "work_experience_details",
                    "interested_in_internships",
                    "preferred_internship_roles",
                    "visa_type",
                    "accommodation_needs",
                    "accommodation_preferences",
                    "health_insurance_needs",
                    "extracurricular_interests",
                    "previous_applications",
                    "previous_application_details",
                    "interested_in_part_time_jobs",
                    "interested_in_language_courses",
                    "application_documents",
                ]
            })

            const student_information = await User.findOne({
                where: {
                    uuid: student_uuid
                },
                attributes: [
                    "access_profile",
                    "country_code",
                    "createdAt",
                    "email",
                    "is_verified",
                    "phone",
                    "phone_number",
                    "profile_image",
                    "status",
                    "updatedAt",
                    "username",
                ]
            })

            return returnHelper(res, 200, true, "Profile Found", { student_information: student_information, basic_profile: findStudentDetails })


        } catch (error: any) {
            return res.status(200).json({
                success: false,
                message: error.message
            })
        }
    }



}

export default new StudentController()