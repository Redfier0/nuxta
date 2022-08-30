const con = require("../connection")
const { nextTick } = require("process")

const aumentoManuale = {
    aumentoCibo: (req, res, next) => {
        let id_isola = req.session.user.id
        const { body } = req
        const { inputMana, perDue } = body
        con.query("SELECT * FROM isole WHERE id = ?", [id_isola], (error, result) => {
            let mana = result[0].mana
            const evoluzione = result[0].evoluzione
            if (inputMana) {
                mana = mana + (evoluzione + 1)
                con.query("UPDATE isole SET mana = ? WHERE id = ?", [mana, id_isola], (error, result) => {})
            }
        })
        return res.redirect("/generale")
    }
}

module.exports = aumentoManuale