const con = require("../connection")
const { nextTick } = require("process")

const shop = {
    shop: (req, res, next) => {
        con.query("SELECT * FROM categorie_cibo ", (error, result) => {
            const cibo = result
            con.query("SELECT * FROM categorie_persone ", (error, result) => {
                const persone = result
                con.query("SELECT * FROM categorie_strutture ", (error, result) => {
                    const strutture = result
                    const token = req.token
                    res.render("shop", { cibo, persone, strutture, token })
                })
            })
        })

    },
    handleShop: (req, res, next) => {
        const { body } = req
        const { inputCibo, inputPersone, inputStrutture } = body
        let id_isola = req.session.user.id
        if (inputCibo) {
            con.query("SELECT quantita FROM cibo WHERE id_isola = ? AND id_categoria = ?", [id_isola, inputCibo], async(error, result) => {
                let quantita = result[0].quantita
                quantita = quantita + 20
                await con.query("UPDATE cibo SET quantita = ?, acquistato = ? WHERE id_isola = ? AND id_categoria = ?", [quantita, 1, id_isola, inputCibo], (error, result) => {})
                con.query("SELECT token FROM isole WHERE id = ?", [id_isola], async(error, result) => {
                    let quantitaToken = result[0].token
                    quantitaToken = quantitaToken - 50
                    await con.query("UPDATE isole SET token = ? WHERE id = ? ", [quantitaToken, id_isola], (error, result) => {})
                })
            })
        }
        if (inputPersone) {
            con.query("SELECT quantita FROM persone WHERE id_isola = ? AND id_categoria = ?", [id_isola, inputPersone], (error, result) => {
                let quantita = result[0].quantita
                quantita = quantita + 2
                con.query("SELECT token FROM isole WHERE id = ?", [id_isola], async(error, result) => {
                    let quantitaToken = result[0].token
                    quantitaToken = quantitaToken - 50
                    con.query("UPDATE persone SET quantita = ?, acquistato = ? WHERE id_isola = ? AND id_categoria = ?", [quantita, 1, id_isola, inputPersone], (error, result) => {})
                    con.query("UPDATE isole SET token = ? WHERE id = ? ", [quantitaToken, id_isola], (error, result) => {})
                })
            })
        }
        if (inputStrutture) {
            con.query("SELECT quantita FROM strutture WHERE id_isola = ? AND id_categoria = ?", [id_isola, inputStrutture], (error, result) => {
                let quantita = result[0].quantita
                quantita = quantita + 1
                con.query("SELECT token FROM isole WHERE id = ?", [id_isola], async(error, result) => {
                    let quantitaToken = result[0].token
                    quantitaToken = quantitaToken - 50
                    con.query("UPDATE strutture SET quantita = ?, acquistato = ? WHERE id_isola = ? AND id_categoria = ?", [quantita, 1, id_isola, inputStrutture], (error, result) => {})
                    con.query("UPDATE isole SET token = ? WHERE id = ? ", [quantitaToken, id_isola], (error, result) => {})
                })
            })
        }
        return res.redirect("/shop")
    }
}

module.exports = shop