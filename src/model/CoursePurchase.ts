// models/CoursePurchase.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/dbconfig';

const CoursePurchase = sequelize.define('CoursePurchase', {
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
    course_uuid:{
        type:DataTypes.STRING
    },
    level:{
        type:DataTypes.STRING
    }
}, {
    tableName: 'course_purchase',
    timestamps: true,
    paranoid: true
});

export default CoursePurchase;
