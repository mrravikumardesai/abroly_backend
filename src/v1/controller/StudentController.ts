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

        const validateStudentData = (data: any) => {
            const errors: string[] = [];

            if (!['Yes', 'No'].includes(data.study_abroad_intentions)) {
                errors.push('Study abroad intentions must be either "Yes" or "No".');
            }
            if (!data.field_of_study) {
                errors.push('Field of study is required.');
            }
            if (!['Bachelor\'s', 'Master\'s', 'Ph.D.'].includes(data.degree_level)) {
                errors.push('Degree level must be one of Bachelor\'s, Master\'s, or Ph.D.');
            }
            if (data.test_scores && !data.test_score_details) {
                errors.push('Test score details are required if test_scores is true.');
            }
            if (data.work_experience && !data.work_experience_details) {
                errors.push('Work experience details are required if work_experience is true.');
            }
            if (!['Student Visa', 'Work Visa'].includes(data.visa_type)) {
                errors.push('Visa type must be either "Student Visa" or "Work Visa".');
            }
            return errors;
        };

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

                const errors = validateStudentData(req.body);

                if (errors.length) {
                    return returnHelper(res, 200, false, errors[0])
                }

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



}

export default new StudentController()