const con = require("../connection")
const { nextTick } = require("process")

const token = {
    tokenGenerale: (req, res, next) => {
        let id_isola = req.session.user.id
        con.query("SELECT token FROM isole WHERE id = ?", [id_isola], async(error, result) => {
            let quantitaToken = result[0].token
            quantitaToken = quantitaToken + 1
            con.query("UPDATE isole SET token = ? WHERE id = ? ", [quantitaToken, id_isola], (error, result) => {})
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