import { DataTypes } from "sequelize";
import sequelize from "../config/dbconfig";
import Agent from "./Agent"; // Import the Agent model for foreign key

const AgentProfile = sequelize.define('AgentProfile', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    agent_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Agent, // Reference to Agent table
            key: 'id',
        },
        onDelete: 'CASCADE', // Delete the profile if the agent is deleted
    },
    office_address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    postal_code: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    about: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    certifications: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    languages_spoken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    social_media_links: {
        type: DataTypes.JSON,
        allowNull: true, // Store as JSON for flexibility
    },
    operating_hours: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    contact_email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isEmail: true,
        },
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    whatsapp_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'agent_profiles', // Name of the profile table
    timestamps: true,
});


export default AgentProfile;
