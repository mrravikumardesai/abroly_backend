import { DataTypes } from "sequelize";
import sequelize from "../config/dbconfig";

const QuizAnswers = sequelize.define("QuizAnswers", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    question_uuid: {
        type: DataTypes.STRING,
    },
    answer: {
        type: DataTypes.ENUM('a', 'b', 'c', 'd'),
    },
    is_right_answer: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    },
    course_uuid: {
        type: DataTypes.STRING
    },
    student_uuid: {
        type: DataTypes.STRING
    },
    purchase_uuid: {
        type: DataTypes.STRING
    }
},
    {
        tableName: 'quiz_answers',
        timestamps: true,
    }
)


export default QuizAnswers