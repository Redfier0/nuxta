require('dotenv').config({ path: './env.env' });
const mysql = require("mysql")

const con = mysql.createConnection({
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_URL,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME
})

con.connect((err) => {
    if (err) {
        console.log(err.message)
        return
    } else {
        console.log("ok")
    }
})

module.exports = con