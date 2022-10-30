require('dotenv').config({ path: '.env' });
const mysql = require("mysql")

const con = mysql.createConnection({
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_URL,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME
})

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con