import { DataType, DataTypes, ModelDefined, Optional, TinyIntegerDataType } from "sequelize";
import sequelize from "../config/dbconfig";

const StudentBasicDetails = sequelize.define(
  'StudentBasicDetails',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    student_uuid: {
      type: DataTypes.STRING
    },
    study_abroad_intentions: {
      type: DataTypes.ENUM('Yes', 'No'),
    },
    study_abroad_reasons: {
      type: DataTypes.TEXT,
    },
    field_of_study: {
      type: DataTypes.STRING,
    },
    degree_level: {
      type: DataTypes.ENUM('Bachelor\'s', 'Master\'s', 'Ph.D.'),
    },
    career_goals: {
      type: DataTypes.TEXT,
    },
    preferred_job_roles: {
      type: DataTypes.TEXT,
    },
    course_selection: {
      type: DataTypes.STRING,
    },
    program_duration: {
      type: DataTypes.STRING,
    },
    test_scores: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    test_score_details: {
      type: DataTypes.JSON,  // {score: String, validity_period: Date}
    },
    preferred_country: {
      type: DataTypes.STRING,
    },
    university_preferences: {
      type: DataTypes.TEXT,
    },
    scholarship_requirements: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    scholarship_preferences: {
      type: DataTypes.TEXT,
    },
    budget: {
      type: DataTypes.STRING,
    },
    academic_performance: {
      type: DataTypes.STRING,
    },
    language_proficiency_scores: {
      type: DataTypes.TEXT,  // {exam_name: String, score: String, validity_period: Date}
    },
    work_experience: {
      type: DataTypes.STRING,
    },
    work_experience_details: {
      type: DataTypes.JSON,  // {role: String, company: String, duration: String}
    },
    interested_in_internships: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    preferred_internship_roles: {
      type: DataTypes.TEXT,
    },
    visa_type: {
      type: DataTypes.ENUM('Student Visa', 'Work Visa'),
    },
    accommodation_needs: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    accommodation_preferences: {
      type: DataTypes.TEXT,
    },
    health_insurance_needs: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    extracurricular_interests: {
      type: DataTypes.TEXT,
    },
    previous_applications: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    previous_application_details: {
      type: DataTypes.TEXT,
    },
    interested_in_part_time_jobs: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    interested_in_language_courses: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    application_documents: {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
  },
  {
    tableName: 'student_basic_details',
    paranoid: true,
    timestamps: true,
  }
)

export default StudentBasicDetails