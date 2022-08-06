const express = require("express")
const session = require("express-session")
const { urlencoded } = require("express")
const cookieParser = require("cookie-parser")
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
const incremento = require("./components/incremento")
const token = require("./components/token")
const aumentoManuale = require("./components/aumentoManuale")

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

app.get('/shop', checkLogin, token.tokenShop, shop.shop)

app.get('/vendi', checkLogin, token.tokenShop, shop.vendita)

app.get('/singup', account.singup)

app.get('/login', account.login)

app.get('/generale',
    checkLogin,
    incremento.incremento,
    token.tokenGenerale,
    cibo.cibo,
    acqua.acqua,
    persone.persone,
    strutture.strutture,
    dati.risorse)

app.get('/logout', account.logout)

app.post('/', home.pianetaHome)

app.post('/singup', account.handleSignup)

app.post('/login', account.handleLogin)

app.post('/vendi', shop.handleVendita)

app.post('/shop', shop.handleShop)

app.post('/generale', aumentoManuale.aumentoCibo)

app.listen(port, () => {})