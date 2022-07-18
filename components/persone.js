const con = require("../connection")
const { nextTick } = require("process")

const persone = {
    persone: (req, res, next) => {
        let id_isola = req.session.user.id
        let dati_persone = {}
        con.query("SELECT * FROM persone WHERE id_isola = ? ", [id_isola], (error, result) => {
            let persone = result
            con.query("SELECT nome FROM categorie_persone ", (error, result) => {
                let nome = result
                dati_persone = [{ nome: nome[0].nome, quantita: persone[0].quantita }]
                req.datiPersone = dati_persone
                next()
            })
        })
    }
}

module.exports = persone;