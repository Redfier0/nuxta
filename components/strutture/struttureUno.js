const con = require("../../connection")
const { nextTick } = require("process")

const struttureUno = {
    struttureUno: (req, res, next) => {
        let id_isola = req.session.user.id
        let dati_strutture = {}
        con.query("SELECT * FROM strutture WHERE id_isola = ? AND id_categoria", [id_isola = 1], (error, result) => {
            let strutture = result
            strutture.filter(item => {
                con.query("SELECT nome FROM categorie_strutture WHERE id = ? ", [1], (error, result) => {
                    let nome = result
                    dati_strutture = { nome: nome[0].nome, quantita: item.quantita }
                    req.datiStruttureUno = dati_strutture
                    next()
                })
            })
        })
    },
}

module.exports = struttureUno