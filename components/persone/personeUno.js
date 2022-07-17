const con = require("../../connection")
const { nextTick } = require("process")

const persone = {
    personeUno: (req, res, next) => {
        let id_isola = req.session.user.id
        let dati_persone = {}
        con.query("SELECT * FROM persone WHERE id_isola = ?", [id_isola], (error, result) => {
            let persone = result
            let quantitaPersone = result[0].quantita
            setInterval(() => {
                quantitaPersone = quantitaPersone + 1
                con.query("UPDATE persone SET quantita = ? WHERE id_isola = ?", [quantitaPersone, id_isola], (error, result) => {})
            }, 100000)
            persone.filter(item => {
                con.query("SELECT nome FROM categorie_persone WHERE id = ?", [1], (error, result) => {
                    let nome = result
                    dati_persone = { nome: nome[0].nome, quantita: item.quantita }
                    req.datiPersoneUno = dati_persone
                    next()
                })
            })
        })
    }
}

module.exports = persone