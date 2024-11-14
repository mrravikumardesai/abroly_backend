// models/CourseProgress.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/dbconfig';

const CourseProgress = sequelize.define('CourseProgress', {
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
    student_uuid: {
        type: DataTypes.STRING
    },
    course_uuid: {
        type: DataTypes.STRING
    },
    is_completed: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    },
    course_purchase_uuid: {
        type: DataTypes.STRING
    },
    sub_point_uuid: {
        type: DataTypes.STRING
    },
    point_uuid: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'course_progress',
    timestamps: true,
    paranoid: true
});

export default CourseProgress;
