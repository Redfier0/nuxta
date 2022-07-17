const con = require("../../connection")
const { nextTick } = require("process")

const struttureDue = {
    struttureDue: (req, res, next) => {
        let id_isola = req.session.user.id
        let dati_strutture = {}
        con.query("SELECT * FROM strutture WHERE id_isola = ? AND id_categoria = ?", [id_isola, 2], (error, result) => {
            let strutture = result
            strutture.filter(item => {
                if (item.quantita !== 0) {
                    con.query("SELECT nome FROM categorie_strutture WHERE id = ? ", [2], (error, result) => {
                        let nome = result
                        dati_strutture = { nome: nome[0].nome, quantita: item.quantita }
                        req.datiStruttureDue = dati_strutture
                        next()
                    })
                } else {
                    req.datiStruttureDue = {}
                    next()
                }
            })
        })
    },
}

module.exports = struttureDue