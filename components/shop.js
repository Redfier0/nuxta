const con = require("../connection")
const { nextTick } = require("process")

const shop = {
    shop: (req, res, next) => {
        con.query("SELECT * FROM categorie_cibo ", (error, result) => {
            const cibo = result
            res.render("shop", { cibo })
        })

    },
    handleShop: (req, res, next) => {
        const { body } = req
        const { inputCibo } = body
        let id_isola = req.session.user.id
        if (inputCibo) {
            con.query("SELECT quantita FROM cibo WHERE id_isola = ? AND id_categoria = ?", [id_isola, inputCibo], (error, result) => {
                let quantita = result[0].quantita
                quantita = quantita + 20
                con.query("UPDATE cibo SET quantita = ?, acquistato = ? WHERE id_isola = ? AND id_categoria = ?", [quantita, 1, id_isola, inputCibo], (error, result) => {})
            })
        }
        return res.redirect("/shop")
    }
}

module.exports = shop