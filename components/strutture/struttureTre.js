const con = require("../../connection")
const { nextTick } = require("process")

const struttureTre = {
    struttureTre: (req, res, next) => {
        let id_isola = req.session.user.id
        let dati_strutture = {}
        con.query("SELECT * FROM strutture WHERE id_isola = ?", [id_isola], (error, result) => {
            let strutture = result
            strutture.filter(item => {
                con.query("SELECT nome FROM categorie_strutture WHERE id = ? ", [3], (error, result) => {
                    let nome = result
                    dati_strutture = { nome: nome[0].nome, quantita: item.quantita }
                    req.datiStruttureTre = dati_strutture
                    next()
                })
            })
        })
    },
}

module.exports = struttureTre