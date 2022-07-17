const con = require("../../connection")
const { nextTick } = require("process")

const acquaUno = {
    acquaUno: (req, res, next) => {
        let id_isola = req.session.user.id
        let dati_acqua = {}
        con.query("SELECT * FROM acqua WHERE id_isola = ?", [id_isola], (error, result) => {
            let acqua = result
            let quantitaAcqua = result[0].quantita
            setInterval(() => {
                quantitaAcqua = quantitaAcqua + 1
                con.query("UPDATE acqua SET quantita = ? WHERE id_isola = ?", [quantitaAcqua, id_isola], (error, result) => {})
            }, 100000)
            acqua.filter((item) => {
                con.query("SELECT nome FROM categorie_acqua WHERE id = ?", [1], (error, result) => {
                    let nome = result
                    dati_acqua = { nome: nome[0].nome, quantita: item.quantita }
                    req.datiAcquaUno = dati_acqua
                })
                next()
            })

        })
    }
}

module.exports = acquaUno