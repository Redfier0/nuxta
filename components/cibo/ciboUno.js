const con = require("../../connection")
const { nextTick } = require("process")

const ciboUno = {
    ciboUno: (req, res, next) => {
        let id_isola = req.session.user.id
        let dati_cibo = {}
        con.query("SELECT * FROM cibo WHERE id_isola = ?", [id_isola], (error, result) => {
            let cibo = result
            let quantitaCibo = result[0].quantita
            setInterval(() => {
                quantitaCibo = quantitaCibo + 1
                con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ?", [quantitaCibo, id_isola], (error, result) => {})
            }, 100000)
            cibo.filter((item) => {
                con.query("SELECT nome FROM categorie_cibo WHERE id = ?", [1], (error, result) => {
                    let nome = result
                    dati_cibo = { nome: nome[0].nome, quantita: item.quantita }
                    req.datiCiboUno = dati_cibo
                    next()
                })
            })
        })
    }
}

module.exports = ciboUno;