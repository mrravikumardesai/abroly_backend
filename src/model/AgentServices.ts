import sequelize from "../config/dbconfig";

const { DataTypes } = require('sequelize');

const AgentServices = sequelize.define('AgentServices', {
    // Course Advisors
    courseAdvising: { type: DataTypes.BOOLEAN, defaultValue: false },
    courseSpecialization: { type: DataTypes.STRING },

    // University Recommendations
    universityRecommendations: { type: DataTypes.BOOLEAN, defaultValue: false },
    partneredUniversities: { type: DataTypes.TEXT }, // Use comma-separated values if array-like structure is needed

    // Field Expertise
    fieldsOfStudy: { type: DataTypes.TEXT }, // Comma-separated values (e.g., "Engineering,Business")

    // University Partners
    universityPartners: { type: DataTypes.BOOLEAN, defaultValue: false },
    universityPartnersList: { type: DataTypes.TEXT },

    // Country Specializations and Visa Assistance
    countrySpecializations: { type: DataTypes.TEXT }, // Comma-separated values (e.g., "UK,USA,Canada")
    visaConsultancy: { type: DataTypes.BOOLEAN, defaultValue: false },
    visaTypes: { type: DataTypes.STRING },
    visaSuccessRateTracking: { type: DataTypes.BOOLEAN, defaultValue: false },
    visaSuccessRate: { type: DataTypes.FLOAT }, // Optional for success rate percentage
    workVisaHelp: { type: DataTypes.BOOLEAN, defaultValue: false },

    // Application and Documentation Support
    applicationReview: { type: DataTypes.BOOLEAN, defaultValue: false },
    applicationTracking: { type: DataTypes.BOOLEAN, defaultValue: false },
    applicationDeadlines: { type: DataTypes.BOOLEAN, defaultValue: false },
    documentPreparation: { type: DataTypes.BOOLEAN, defaultValue: false },
    documentPreparationExamples: { type: DataTypes.TEXT }, // Use URLs as comma-separated values

    // Scholarship and Budget Planning
    scholarshipAssistance: { type: DataTypes.BOOLEAN, defaultValue: false },
    scholarshipsList: { type: DataTypes.TEXT },
    budgetPlanning: { type: DataTypes.BOOLEAN, defaultValue: false },

    // Language and Test Preparation
    languagePrep: { type: DataTypes.BOOLEAN, defaultValue: false },
    languageTests: { type: DataTypes.TEXT }, // Comma-separated values (e.g., "IELTS,TOEFL")
    testPreparation: { type: DataTypes.BOOLEAN, defaultValue: false },

    // Career and Internship Services
    careerConsulting: { type: DataTypes.BOOLEAN, defaultValue: false },
    careerConsultingAreas: { type: DataTypes.TEXT }, // Comma-separated values
    jobPlacement: { type: DataTypes.BOOLEAN, defaultValue: false },
    placementIndustries: { type: DataTypes.TEXT },
    internshipPrograms: { type: DataTypes.BOOLEAN, defaultValue: false },
    internshipPartners: { type: DataTypes.TEXT },

    // Accommodation and Health Insurance
    accommodationHelp: { type: DataTypes.BOOLEAN, defaultValue: false },
    accommodationTypes: { type: DataTypes.TEXT },
    healthInsuranceOptions: { type: DataTypes.BOOLEAN, defaultValue: false },
    insuranceProviders: { type: DataTypes.TEXT },

    // Additional Support Services
    partTimeJobOpportunities: { type: DataTypes.BOOLEAN, defaultValue: false },
    partTimeIndustries: { type: DataTypes.TEXT },
    sopWritingServices: { type: DataTypes.BOOLEAN, defaultValue: false },
    sopExamples: { type: DataTypes.TEXT },
    postGraduationJobAssistance: { type: DataTypes.BOOLEAN, defaultValue: false },
    postGraduationIndustries: { type: DataTypes.TEXT },
    flightTicketAssistance: { type: DataTypes.BOOLEAN, defaultValue: false },
}, {
    tableName: 'agent_services', // Optional: specify table name
    timestamps: true, // Disable timestamps if not needed
    paranoid:true
});

export default AgentServices
