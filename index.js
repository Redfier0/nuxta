const express = require("express")
const session = require("express-session")
const { urlencoded } = require("express")
const app = express()
const port = 3000
const bodyParser = require("body-parser")
const con = require("./connection")
const accivment = require("./components/accivment")
const account = require("./components/account")
const acquaUno = require("./components/acqua/acquaUno")
const ciboUno = require("./components/cibo/ciboUno")
const ciboDue = require("./components/cibo/ciboDue")
const ciboTre = require("./components/cibo/ciboTre")
const ciboQuattro = require("./components/cibo/ciboQuattro")
const ciboCinque = require("./components/cibo/ciboCinque")
const ciboSei = require("./components/cibo/ciboSei")
const ciboSette = require("./components/cibo/ciboSette")
const ciboOtto = require("./components/cibo/ciboOtto")
const eventi = require("./components/eventi")
const home = require("./components/home")
const personeUno = require("./components/persone/personeUno")
const ricompense = require("./components/ricompense")
const struttureUno = require("./components/strutture/struttureUno")
const struttureDue = require("./components/strutture/struttureDue")
const struttureTre = require("./components/strutture/struttureTre")
const struttureQuattro = require("./components/strutture/struttureQuattro")
const dati = require("./components/dati")
const shop = require("./components/shop")
const cookieParser = require("cookie-parser")

app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.use(cookieParser())
app.use(session({ secret: "nuxta" }))

function checkLogin(req, res, next) {
    if (req.session.user && req.session.user.loggato === true) {
        next()
    } else {
        res.redirect("/login")
    }
}

function azzeratutto(req, res) {

    res.redirect("/login")
}

app.get("/", home.home)

app.get("/singup", account.singup)

app.get("/login", account.login)

app.get("/generale",
    checkLogin,
    acquaUno.acquaUno,
    ciboUno.ciboUno,
    ciboDue.ciboDue,
    ciboTre.ciboTre,
    ciboQuattro.ciboQuattro,
    ciboCinque.ciboCinque,
    ciboSei.ciboSei,
    ciboSette.ciboSette,
    ciboOtto.ciboOtto,
    personeUno.personeUno,
    struttureUno.struttureUno,
    struttureDue.struttureDue,
    struttureTre.struttureTre,
    struttureQuattro.struttureQuattro,
    dati.risorse
)

app.get("/logout", account.logout)

app.post("/", home.pianetaHome)

app.post("/singup", account.handleSignup)

app.post("/login", account.handleLogin)

app.listen(port, () => {})