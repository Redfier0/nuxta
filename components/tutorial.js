const con = require("../connection")
const { nextTick } = require("process")

const tutorial = {
    tutorialPrincipale: (req, res, next) => {
        let id_isola = req.session.user.id
        con.query("SELECT * FROM isole WHERE id = ?", [id_isola], (error, result) => {
            const tutorial = result[0].tutorial
            if (tutorial == 0) {
                req.tutorial = 0
            } else {
                req.tutorial = 1
            }
        })
        next()
    },
    tutorialSecondario: (req, res, next) => {
        let id_isola = req.session.user.id
        con.query("SELECT * FROM tutorial WHERE id_isola = ?", [id_isola], (error, result) => {
            const livelloTutorial = result

            function SortArray(x, y) {
                if (x.step < y.step) { return -1; }
                if (x.step > y.step) { return 1; }
                return 0;
            }
            livelloTutorial.sort(SortArray)
            req.livelloTutorial = livelloTutorial
        })
        next()
    },
    handleTutorial: (req, res, next) => {
        let id_isola = req.session.user.id
        const { body } = req
        const { tutorial } = body
        if (tutorial) {
            con.query("UPDATE tutorial SET finito = ? WHERE id_isola = ? AND step = ?", [1, id_isola, tutorial], (error, result) => {})
        }
        next()
    }
}

module.exports = tutorial