import { DataTypes } from 'sequelize';
import sequelize from '../config/dbconfig';

const ServiceInfo = sequelize.define('ServiceInfo', {
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
    description: {
        type: DataTypes.TEXT,
    },
    file: {
        type: DataTypes.STRING,
    },
    access_file: {
        type: DataTypes.VIRTUAL,
        get(this: any) {
            return this.file && this.file !== "" ? `${process.env.LOCAL_PATH}public/service_info/${this.file}` : null
        },
    },
    section_type: {
        type: DataTypes.ENUM("text", "image"),
        defaultValue: 'text'
    },
    content_of: {
        type: DataTypes.ENUM("sop", "motivation", "cover", "language", "sim_card", "health_ins","career","visa_consultation","tourist_visa"),
    },
    order: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'service_info',
    timestamps: true,
    paranoid: true
});

export default ServiceInfo;
