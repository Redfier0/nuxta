const con = require("../connection")
const { nextTick } = require("process")

const acqua = {
    acqua: (req, res, next) => {
        let id_isola = req.session.user.id
        let dati_acqua = {}
        con.query("SELECT * FROM acqua WHERE id_isola = ? ", [id_isola], (error, result) => {
            let acqua = result
            con.query("SELECT nome FROM categorie_acqua ", (error, result) => {
                let nome = result
                dati_acqua = [{ nome: nome[0].nome, quantita: acqua[0].quantita }]
                req.datiAcqua = dati_acqua
                next()
            })
        })
    }
}

module.exports = acqua;