import { DataTypes } from "sequelize";
import sequelize from "../config/dbconfig";

const QuizQuestions = sequelize.define("QuizQuestions", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    question_text: {
        type: DataTypes.STRING,
    },
    options: {
        type: DataTypes.TEXT,
    },
    right_answer: {
        type: DataTypes.ENUM('a', 'b', 'c', 'd'),
    },
    quiz_uuid: {
        type: DataTypes.STRING
    },
    course_uuid: {
        type: DataTypes.STRING
    },
    level: {
        type: DataTypes.ENUM("level1", "level2", "level3")
    }
},
    {
        tableName: 'quiz_questions',
        timestamps: true,
    }
)


export default QuizQuestions