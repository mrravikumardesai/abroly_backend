import { DataTypes } from "sequelize";
import sequelize from "../config/dbconfig";

const Subscription = sequelize.define('Subscription', {
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
    agent_uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'agent',
            key: 'uuid'
        }
    },
    package_uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'package',
            key: 'uuid'
        }
    },
    leads_remaining: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    team_member_limit: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    job_post_limit: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    job_post_start_date: {
        type: DataTypes.DATE
    },
    job_post_end_date: {
        type: DataTypes.DATE
    },
    subscription_start_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    status: {
        type: DataTypes.ENUM("active", "expired"),
        defaultValue: "active",
    },
}, {
    tableName: 'subscription',
    timestamps: true,
    paranoid: true
});

export default Subscription