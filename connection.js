require('dotenv').config({ path: './.env' });
const mysql = require("mysql")

const con = mysql.createPool({
    host: "localhost",
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
})

module.exports = con