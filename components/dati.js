const con = require("../connection")
const { nextTick } = require("process")

const dati = {
    risorse: async(req, res) => {
        const cibo = req.datiCibo
        const acqua = req.datiAcqua
        const persone = req.datiPersone
        const strutture = req.datiStrutture
        const dati = [cibo[0], cibo[1], cibo[2], cibo[3], cibo[4], cibo[5], cibo[6], cibo[7], acqua[0], persone[0], strutture[0], strutture[1], strutture[2], strutture[3]]
        res.render("generale", { dati })
    },
}

module.exports = dati