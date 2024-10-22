import { DataTypes } from "sequelize";
import sequelize from "../config/dbconfig";
import Agent from "./Agent";

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
    tour_post_limit: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    travel_lead_limit: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    profile_pinning_weeks: {
        type: DataTypes.STRING,
        defaultValue: 'none',  // Can store the duration as a string
    },
    event_banner_count: {
        type: DataTypes.STRING,  // Can store as string with format "1/event"
        defaultValue: 'none',
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
});

export default Subscription