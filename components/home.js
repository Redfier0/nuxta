const con = require("../connection")
const { nextTick } = require("process")

const home = {
    home: (req, res) => {
        res.render("home")
    },
    pianetaHome: (req, res) => {
        if (req.session.user && req.session.user.loggato === true) {
            res.redirect("/generale")
        } else {
            console.log("ok")
            res.redirect("/login")
        }
    }
}

module.exports = home