import { DataTypes } from "sequelize";
import sequelize from "../config/dbconfig";

const SideBanner = sequelize.define('SideBanner', {
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
    },
    campaign_title: {
        type: DataTypes.TEXT,
    },
    image: {
        type: DataTypes.TEXT,
    },
    access_image: {
        type: DataTypes.VIRTUAL,
        get(this: any) {
            return this.image && this.image !== "" ? `${process.env.LOCAL_PATH}public/banners/${this.image}` : null
        },
    },
    start_date: {
        type: DataTypes.DATE,
    },
    end_date: {
        type: DataTypes.DATE,
    },
    responses: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    status: {
        type: DataTypes.ENUM("accept", "reject", "pending"),
        defaultValue: "pending",
    },
    position: {
        type: DataTypes.ENUM("1", "2"),
        defaultValue: "1"
    },
    reason: {
        type: DataTypes.TEXT
    },
    target_type: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'side_banner',
    timestamps: true,
    paranoid: true
});

export default SideBanner