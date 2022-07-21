const con = require("../connection")
const { nextTick } = require("process")

const dati = {
    risorse: async(req, res) => {
        let id_isola = req.session.user.id
        con.query("SELECT token FROM isole WHERE id = ?", [id_isola], async(error, result) => {
            const token = result
            const cibo = req.datiCibo
            const acqua = req.datiAcqua
            const persone = req.datiPersone
            const strutture = req.datiStrutture
            const dati = [cibo[0], cibo[1], cibo[2], cibo[3], cibo[4], cibo[5], cibo[6], cibo[7], acqua[0], persone[0], strutture[0], strutture[1], strutture[2], strutture[3]]
            res.render("generale", { dati, token })
        })
    },
}

module.exports = dati