const con = require("../../connection")
const { nextTick } = require("process")

const ciboSette = {
    ciboSette: (req, res, next) => {
        let id_isola = req.session.user.id
        let dati_cibo = {}
        con.query("SELECT * FROM cibo WHERE id_isola = ? AND id_categoria = ?", [id_isola, 7], (error, result) => {
            let cibo = result
            let quantitaCibo = result[0].quantita
            cibo.filter(item => {
                if (item.quantita !== 0) {
                    setInterval(() => {
                        quantitaCibo = quantitaCibo + 1
                        con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ?", [quantitaCibo, id_isola], (error, result) => {})
                    }, 1000)
                    con.query("SELECT nome FROM categorie_cibo WHERE id = ?", [7], (error, result) => {
                        let nome = result
                        dati_cibo = { nome: nome[0].nome, quantita: item.quantita }
                        req.datiCiboSette = dati_cibo
                        next()
                    })
                } else {
                    req.datiCiboSette = {}
                    next()
                }
            })

        })
    },
}

module.exports = ciboSette