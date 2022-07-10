const con = require("../connection")
const { nextTick } = require("process")

const dati = {
    risorse: async(req, res) => {
        let cibo = req.dati_cibo
        let persone = req.dati_persone
        let strutture = req.dati_strutture
        let acqua = req.dati_acqua
        const dati = [cibo, persone, strutture, acqua]
        console.log(dati)
        console.log(strutture)
        res.render("generale", { dati })
    }

}

module.exports = dati