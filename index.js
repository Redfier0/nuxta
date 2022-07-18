const express = require("express")
const session = require("express-session")
const { urlencoded } = require("express")
const app = express()
const port = 3000
const bodyParser = require("body-parser")
const con = require("./connection")
const accivment = require("./components/accivment")
const account = require("./components/account")
const acqua = require("./components/acqua")
const cibo = require("./components/cibo")
const persone = require("./components/persone")
const strutture = require("./components/strutture")
const eventi = require("./components/eventi")
const home = require("./components/home")
const ricompense = require("./components/ricompense")
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


app.get('/', home.home)

app.get('/shop', checkLogin, shop.shop)

app.get('/singup', account.singup)

app.get('/login', account.login)

app.get('/generale', checkLogin, cibo.cibo, acqua.acqua, persone.persone, strutture.strutture, dati.risorse)

app.get('/logout', account.logout)

app.post('/', home.pianetaHome)

app.post('/singup', account.handleSignup)

app.post('/login', account.handleLogin)

app.post('/shop', shop.handleShop)

app.listen(port, () => {})