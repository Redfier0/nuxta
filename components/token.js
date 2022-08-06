const con = require("../connection")
const { nextTick } = require("process")

const token = {
    tokenGenerale: (req, res, next) => {
        let id_isola = req.session.user.id
        con.query("SELECT token FROM isole WHERE id = ?", [id_isola], async(error, result) => {
            let quantitaToken = result[0].token
            con.query("SELECT * FROM cibo WHERE id_isola = ?", [id_isola], (error, result) => {
                let quantitaAcquistato = result[0].quantita_acquistato + result[1].quantita_acquistato + result[2].quantita_acquistato + result[3].quantita_acquistato + result[4].quantita_acquistato + result[5].quantita_acquistato + result[6].quantita_acquistato + result[7].quantita_acquistato
                quantitaAcquistato = Math.floor(quantitaAcquistato / 2)
                quantitaToken = quantitaToken + quantitaAcquistato
                con.query("UPDATE isole SET token = ? WHERE id = ? ", [quantitaToken, id_isola], (error, result) => {})
            })
        })
        next()
    },
    tokenShop: (req, res, next) => {
        let id_isola = req.session.user.id
        con.query("SELECT token FROM isole WHERE id = ?", [id_isola], async(error, result) => {
            let token = result
            req.token = token
        })
        next()
    }
}

module.exports = token