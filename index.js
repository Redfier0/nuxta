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
        res.redirect('/login')
    }
}

function azzeratutto(req, res) {
    con.query("UPDATE cibo SET quantita = 50 WHERE id_isola = 36 AND id_categoria = 1", (error, result) => {})
    con.query("UPDATE cibo SET quantita = 0 WHERE id_isola = 36 AND id_categoria = 2", (error, result) => {})
    con.query("UPDATE cibo SET quantita = 0 WHERE id_isola = 36 AND id_categoria = 3", (error, result) => {})
    con.query("UPDATE cibo SET quantita = 0 WHERE id_isola = 36 AND id_categoria = 4", (error, result) => {})
    con.query("UPDATE cibo SET quantita = 0 WHERE id_isola = 36 AND id_categoria = 5", (error, result) => {})
    con.query("UPDATE cibo SET quantita = 0 WHERE id_isola = 36 AND id_categoria = 6", (error, result) => {})
    con.query("UPDATE cibo SET quantita = 0 WHERE id_isola = 36 AND id_categoria =7", (error, result) => {})
    con.query("UPDATE cibo SET quantita = 0 WHERE id_isola = 36 AND id_categoria = 8", (error, result) => {})
    con.query("UPDATE persone SET quantita = 6 WHERE id_isola = 36 AND id_categoria = 1", (error, result) => {})
    con.query("UPDATE strutture SET quantita = 1 WHERE id_isola = 36 AND id_categoria = 1", (error, result) => {})
    con.query("UPDATE strutture SET quantita = 1 WHERE id_isola = 36 AND id_categoria = 2", (error, result) => {})
    con.query("UPDATE strutture SET quantita = 1 WHERE id_isola = 36 AND id_categoria = 3", (error, result) => {})
    con.query("UPDATE strutture SET quantita = 1 WHERE id_isola = 36 AND id_categoria = 4", (error, result) => {})
    res.redirect('/login')
}

app.get('/', home.home)

app.get('/shop', shop.shop)

app.get('/singup', account.singup)

app.get('/login', account.login)

app.get('/azzera', azzeratutto)

app.get('/generale',
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

app.get('/logout', account.logout)

app.post('/', home.pianetaHome)

app.post('/singup', account.handleSignup)

app.post('/login', account.handleLogin)

app.post('/shop', checkLogin, shop.handleShop)

app.listen(port, () => {})