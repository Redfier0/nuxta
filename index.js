const express = require("express")
const session = require('express-session')
const { urlencoded } = require("express")
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const con = require("./connection")
const accivment = require("./components/accivment")
const account = require("./components/account")
const acqua = require("./components/acqua")
const cibo = require("./components/cibo")
const dettagli = require("./components/dettagli")
const eventi = require("./components/eventi")
const persone = require("./components/persone")
const ricompense = require("./components/ricompense")
const strutture = require("./components/strutture")
const cookieParser = require("cookie-parser")

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs")
app.use(cookieParser())

app.get('/singup', account.singUp)

app.post('/singup', account.handleSignUp)

app.listen(port, () => {})