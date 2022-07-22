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
            con.query("SELECT * FROM cibo WHERE id_isola = ? AND id_categoria = ?", [id_isola, inputCibo], async(error, result) => {
                let quantita = result[0].quantita
                let quantitaAcquistato = result[0].quantita_acquistato
                quantita = quantita + 20
                quantitaAcquistato = quantitaAcquistato + 1
                await con.query("UPDATE cibo SET quantita = ?, acquistato = ?, quantita_acquistato = ? WHERE id_isola = ? AND id_categoria = ?", [quantita, 1, quantitaAcquistato, id_isola, inputCibo], (error, result) => {})
                con.query("SELECT token FROM isole WHERE id = ?", [id_isola], async(error, result) => {
                    let quantitaToken = result[0].token
                    if (quantitaToken < 50) {} else {
                        quantitaToken = quantitaToken - 50
                        await con.query("UPDATE isole SET token = ? WHERE id = ? ", [quantitaToken, id_isola], (error, result) => {})
                    }
                })
            })
        }
        if (inputPersone) {
            con.query("SELECT quantita FROM persone WHERE id_isola = ? AND id_categoria = ?", [id_isola, inputPersone], async(error, result) => {
                let quantita = result[0].quantita
                quantita = quantita + 2
                await con.query("UPDATE persone SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantita, id_isola, inputPersone], (error, result) => {})
                con.query("SELECT token FROM isole WHERE id = ?", [id_isola], async(error, result) => {
                    let quantitaToken = result[0].token
                    if (quantitaToken < 50) {} else {
                        quantitaToken = quantitaToken - 50
                        await con.query("UPDATE isole SET token = ? WHERE id = ? ", [quantitaToken, id_isola], (error, result) => {})
                    }
                })
            })
        }
        if (inputStrutture) {
            con.query("SELECT quantita FROM strutture WHERE id_isola = ? AND id_categoria = ?", [id_isola, inputStrutture], async(error, result) => {
                let quantita = result[0].quantita
                quantita = quantita + 1
                await con.query("UPDATE strutture SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantita, id_isola, inputStrutture], (error, result) => {})
                con.query("SELECT token FROM isole WHERE id = ?", [id_isola], async(error, result) => {
                    let quantitaToken = result[0].token
                    if (quantitaToken < 50) {} else {
                        quantitaToken = quantitaToken - 50
                        await con.query("UPDATE isole SET token = ? WHERE id = ? ", [quantitaToken, id_isola], (error, result) => {})
                    }
                })
            })
        }
        return res.redirect("/shop")
    },
    vendita: (req, res, next) => {
        con.query("SELECT * FROM categorie_cibo", (error, result) => {
            const cibo = result
            con.query("SELECT * FROM categorie_acqua", (error, result) => {
                const acqua = result
                con.query("SELECT * FROM cibo", (error, result) => {
                    const quantita = result

                    function SortArray(x, y) {
                        if (x.id_categoria < y.id_categoria) { return -1; }
                        if (x.id_categoria > y.id_categoria) { return 1; }
                        return 0;
                    }
                    quantita.sort(SortArray)
                    let token = req.token
                    if (token == undefined) {
                        token = [{ token: "qualcosa è andato storo prova a ricaricare la pagina" }]
                        res.render("vendi", { cibo, acqua, token, quantita })
                    } else {
                        res.render("vendi", { cibo, acqua, token, quantita })
                    }
                })
            })
        })
    },
    handleVendita: (req, res, next) => {
        const { body } = req
        const { inputCibo, inputAcqua } = body
        let id_isola = req.session.user.id
        if (inputCibo) {
            con.query("SELECT quantita FROM cibo WHERE id_isola = ? AND id_categoria = ?", [id_isola, inputCibo], async(error, result) => {
                let quantita = result[0].quantita
                con.query("SELECT token FROM isole WHERE id = ?", [id_isola], async(error, result) => {
                    let quantitaToken = result[0].token
                    if (quantita < 100) {} else {
                        quantita = quantita - 100
                        await con.query("UPDATE cibo SET quantita = ?, acquistato = ? WHERE id_isola = ? AND id_categoria = ?", [quantita, 1, id_isola, inputCibo], (error, result) => {})

                        quantitaToken = quantitaToken + 1
                        await con.query("UPDATE isole SET token = ? WHERE id = ? ", [quantitaToken, id_isola], (error, result) => {})
                    }
                })
            })
        }
        if (inputAcqua) {
            con.query("SELECT quantita FROM acqua WHERE id_isola = ? AND id_categoria = ?", [id_isola, inputAcqua], async(error, result) => {
                let quantita = result[0].quantita
                con.query("SELECT token FROM isole WHERE id = ?", [id_isola], async(error, result) => {
                    let quantitaToken = result[0].token
                    if (quantita < 100) {} else {
                        quantita = quantita - 100
                        await con.query("UPDATE acqua SET quantita = ?, acquistato = ? WHERE id_isola = ? AND id_categoria = ?", [quantita, 1, id_isola, inputAcqua], (error, result) => {})
                        quantitaToken = quantitaToken + 1
                        await con.query("UPDATE isole SET token = ? WHERE id = ? ", [quantitaToken, id_isola], (error, result) => {})
                    }
                })
            })
        }
        return res.redirect("/vendi")
    }
}

module.exports = shop