const con = require("../connection")
const { nextTick } = require("process")

const dati = {
    risorse: async(req, res) => {
        const cibo = req.datiCibo
        const dati = cibo
        res.render("generale", { dati })
    },
}

module.exports = dati