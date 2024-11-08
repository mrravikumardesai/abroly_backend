// models/Application.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/dbconfig';

const AgentApplications = sequelize.define('AgentApplications', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
    },
    student_uuid:{
        type:DataTypes.STRING
    },
    application_uuid:{
        type:DataTypes.STRING
    },
    agent_uuid:{
        type:DataTypes.STRING
    },
    status:{
        type:DataTypes.ENUM("pending",'in_progress','completed',"rejected"),
        defaultValue:"pending"
    }
}, {
    tableName: 'agent_application',
    timestamps: true,
    paranoid: true
});

export default AgentApplications;
