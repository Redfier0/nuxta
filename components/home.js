const con = require("../connection")
const { nextTick } = require("process")

const home = {
    home: (req, res) => {
        if (req.session.user && req.session.user.loggato === true) {
            const loggato = req.session.user.loggato
            res.render("home", { loggato })
        } else {
            const loggato = null
            res.render("home", { loggato })
        }
    },
    pianetaHome: (req, res) => {
        if (req.session.user && req.session.user.loggato === true) {
            res.redirect("/generale")
        } else {
            res.redirect("/login")
        }
    }
}

module.exports = home