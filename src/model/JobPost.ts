import { DataTypes } from 'sequelize';
import sequelize from '../config/dbconfig';

const JobPost = sequelize.define('JobPost', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    agent_uuid: {
        type: DataTypes.STRING,
    },
    jobType: {
        type: DataTypes.ENUM('Full-time', 'Part-time', 'Temporary/Contract', 'Internship'),
        defaultValue: "Full-time"
    },
    country: {
        type: DataTypes.STRING,
    },
    jobRole: {
        type: DataTypes.STRING,
    },
    salaryMin: {
        type: DataTypes.INTEGER,
    },
    salaryMax: {
        type: DataTypes.INTEGER,
    },
    experienceRequired: {
        type: DataTypes.INTEGER, // number of years
    },
    educationLevel: {
        type: DataTypes.STRING,
    },
    workPermit: {
        type: DataTypes.ENUM('Employment Visa (ECR)', 'Employment Visa (ECNR)'),
    },
    overtime: {
        type: DataTypes.BOOLEAN,
    },
    accommodation: {
        type: DataTypes.BOOLEAN,
    },
    transportation: {
        type: DataTypes.BOOLEAN,
    },
    food: {
        type: DataTypes.STRING,
    },
    medicalInsurance: {
        type: DataTypes.BOOLEAN,
    },
    workHours: {
        type: DataTypes.STRING,
    },
    agentCharges: {
        type: DataTypes.STRING, // fee description or range
    },
    skillsRequired: {
        type: DataTypes.STRING, // comma-separated skills
    },
    description: {
        type: DataTypes.TEXT, // comma-separated skills
    },
    applicationDeadline: {
        type: DataTypes.DATE,
    },
    
}, {
    tableName: 'job_posts',
    timestamps: true,
    paranoid:true
});

export default JobPost;
