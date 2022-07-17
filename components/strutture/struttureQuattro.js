const con = require("../../connection")
const { nextTick } = require("process")

const struttureQuattro = {
    struttureQuattro: (req, res, next) => {
        let id_isola = req.session.user.id
        let dati_strutture = {}
        con.query("SELECT * FROM strutture WHERE id_isola = ? AND id_categoria = ?", [id_isola, 4], (error, result) => {
            let strutture = result
            strutture.forEach((item) => {
                con.query("SELECT nome FROM categorie_strutture WHERE id = ? ", [4], (error, result) => {
                    let nome = result
                    dati_strutture = { nome: nome[0].nome, quantita: item.quantita }
                    req.datiStruttureQuattro = dati_strutture
                    next()
                })
            })
        })
    },
}

module.exports = struttureQuattro