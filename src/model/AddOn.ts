// models/AddOn.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/dbconfig';

const AddOn = sequelize.define('AddOn', {
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
    subscription_uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'subscription',
            key: 'uuid'
        }
    },
    agent_uuid: {
        type: DataTypes.STRING,
    },
    leads_remaining: {
        type: DataTypes.STRING
    },
    team_member_limit: {
        type: DataTypes.STRING
    },
    job_post_limit: {
        type: DataTypes.STRING
    },
    job_post_extend_days: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'addon',
    timestamps: true,
    paranoid: true
});

export default AddOn;
