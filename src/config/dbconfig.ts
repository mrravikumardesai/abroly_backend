import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config()

const MYSQL_DATABASE: string | any = process.env.MYSQL_DATABASE
const MYSQL_USER: string | any = process.env.MYSQL_USER
const MYSQL_PASSWORD: string | any = process.env.MYSQL_PASSWORD
const HOST: string | any = process.env.MYSQL_HOST

// console.log(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD)

const sequelize = process.env.LOCAL == "mac" ? new Sequelize(MYSQL_DATABASE, 'root', MYSQL_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        socketPath: '/Applications/XAMPP/xamppfiles/var/mysql/mysql.sock',
    }
}) : new Sequelize(
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
    {
        host: "localhost",
        dialect: "mysql",
    },
)


export default sequelize 