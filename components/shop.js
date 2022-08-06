const con = require("../connection")
const { nextTick } = require("process")

const shop = {
    shop: (req, res, next) => {
        let id_isola = req.session.user.id
        con.query("SELECT * FROM categorie_cibo", (error, result) => {
            const cibo = result
            con.query("SELECT * FROM categorie_persone", (error, result) => {
                const persone = result
                con.query("SELECT * FROM categorie_strutture", (error, result) => {
                    const strutture = result
                    con.query("SELECT * FROM cibo WHERE id_isola = ?", [id_isola], (error, result) => {
                        const quantita = result
                        con.query("SELECT * FROM persone WHERE id_isola = ?", [id_isola], (error, result) => {
                            const quantitaPersone = result
                            con.query("SELECT * FROM strutture WHERE id_isola = ?", [id_isola], (error, result) => {
                                const quantitaStrutture = result

                                function SortArray(x, y) {
                                    if (x.id_categoria < y.id_categoria) { return -1; }
                                    if (x.id_categoria > y.id_categoria) { return 1; }
                                    return 0;
                                }
                                quantita.sort(SortArray)
                                quantitaStrutture.sort(SortArray)
                                const token = req.token
                                res.render("shop", { cibo, persone, strutture, token, quantita, quantitaPersone, quantitaStrutture })
                            })
                        })
                    })
                })
            })
        })
    },
    handleShop: (req, res, next) => {
        const { body } = req
        const { inputCibo, inputPersone, inputStrutture } = body
        let id_isola = req.session.user.id
        if (inputCibo) {
            con.query("SELECT * FROM cibo WHERE id_isola = ? AND id_categoria = ?", [id_isola, inputCibo], (error, result) => {
                let quantita = result[0].quantita
                let quantitaAcquistato = result[0].quantita_acquistato
                let ciboPrezzo = result[0].prezzo
                con.query("SELECT * FROM cibo WHERE id_isola = ?", [id_isola], (error, result) => {
                    const acquistato = result[0].quantita_acquistato + result[1].quantita_acquistato + result[2].quantita_acquistato + result[3].quantita_acquistato + result[4].quantita_acquistato + result[5].quantita_acquistato + result[6].quantita_acquistato + result[7].quantita_acquistato
                    con.query("SELECT * FROM strutture WHERE id_isola = ? AND id_categoria = ?", [id_isola, 3], async(error, result) => {
                        const quantitaMassima = result[0].quantita
                        if (quantitaMassima > acquistato) {
                            quantita = quantita + 20
                            quantitaAcquistato = quantitaAcquistato + 1
                            con.query("UPDATE cibo SET quantita = ?, acquistato = ?, quantita_acquistato = ? WHERE id_isola = ? AND id_categoria = ?", [quantita, 1, quantitaAcquistato, id_isola, inputCibo], (error, result) => {})
                            con.query("SELECT token FROM isole WHERE id = ?", [id_isola], async(error, result) => {
                                let quantitaToken = result[0].token
                                if (quantitaToken < ciboPrezzo) {} else {
                                    quantitaToken = quantitaToken - ciboPrezzo
                                    let percentualePrezzo = (ciboPrezzo / 100) * 5
                                    ciboPrezzo = ciboPrezzo + percentualePrezzo
                                    con.query("UPDATE isole SET token = ? WHERE id = ? ", [quantitaToken, id_isola], (error, result) => {})
                                    con.query("UPDATE cibo SET prezzo = ? WHERE id_isola = ? AND id_categoria = ?", [ciboPrezzo, id_isola, inputCibo], (error, result) => {})
                                }
                            })
                        } else {}
                    })
                })
            })
        }
        if (inputPersone) {
            con.query("SELECT * FROM persone WHERE id_isola = ? AND id_categoria = ?", [id_isola, 1], (error, result) => {
                let quantita = result[0].quantita
                const acquistato = result[0].quantita_acquistato
                let personePrezzo = result[0].prezzo
                console.log(result)
                con.query("SELECT * FROM strutture WHERE id_isola = ? AND id_categoria = ?", [id_isola, 1], async(error, result) => {
                    const quantitaMassima = result[0].quantita
                    con.query("SELECT * FROM acqua WHERE id_isola= ? AND id_categoria = ?", [id_isola, 1], (error, result) => {
                        let quantitaAcqua = result[0].quantita
                        if (quantitaMassima > acquistato) {
                            quantita = quantita + 2
                            let quantitaAcquistato = quantitaAcqua + 1
                            quantitaAcquistato = quantitaAcquistato + 1
                            con.query("UPDATE persone SET quantita = ?, quantita_acquistato = ? WHERE id_isola = ? AND id_categoria = ?", [quantita, quantitaAcquistato, id_isola, 1], (error, result) => {})
                            con.query("SELECT token FROM isole WHERE id = ?", [id_isola], async(error, result) => {
                                let quantitaToken = result[0].token
                                if (quantitaToken < personePrezzo) {} else {
                                    quantitaToken = quantitaToken - personePrezzo
                                    let percentualePrezzo = (personePrezzo / 100) * 5
                                    personePrezzo = personePrezzo + percentualePrezzo
                                    con.query("UPDATE isole SET token = ? WHERE id = ? ", [quantitaToken, id_isola], (error, result) => {})
                                    con.query("UPDATE persone SET prezzo = ? WHERE id_isola = ? AND id_categoria = ?", [personePrezzo, id_isola, 1], (error, result) => {})
                                }
                            })
                        } else {}
                    })
                })
            })
        }
        if (inputStrutture) {
            con.query("SELECT * FROM strutture WHERE id_isola = ? AND id_categoria = ?", [id_isola, inputStrutture], async(error, result) => {
                let strutturePrezzo = result[0].prezzo
                let quantita = result[0].quantita
                if (quantita < 15) {
                    quantita = quantita + 1
                    con.query("UPDATE strutture SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantita, id_isola, inputStrutture], (error, result) => {})
                    con.query("SELECT token FROM isole WHERE id = ?", [id_isola], async(error, result) => {
                        let quantitaToken = result[0].token
                        if (quantitaToken < strutturePrezzo) {} else {
                            quantitaToken = quantitaToken - strutturePrezzo
                            let percentualePrezzo = (strutturePrezzo / 100) * 5
                            strutturePrezzo = strutturePrezzo + percentualePrezzo
                            con.query("UPDATE isole SET token = ? WHERE id = ? ", [quantitaToken, id_isola], (error, result) => {})
                            con.query("UPDATE strutture SET prezzo = ? WHERE id_isola = ? AND id_categoria = ?", [strutturePrezzo, id_isola, inputStrutture], (error, result) => {})
                        }
                    })
                } else {}
            })
        }
        return res.redirect("/shop")
    },
    vendita: (req, res, next) => {
        let id_isola = req.session.user.id
        con.query("SELECT * FROM categorie_cibo", (error, result) => {
            const cibo = result
            con.query("SELECT * FROM categorie_acqua ", (error, result) => {
                const acqua = result
                con.query("SELECT * FROM cibo WHERE id_isola = ?", [id_isola], (error, result) => {
                    const quantita = result
                    con.query("SELECT * FROM acqua WHERE id_isola = ?", [id_isola], (error, result) => {
                        const quantitaAcqua = result

                        function SortArray(x, y) {
                            if (x.id_categoria < y.id_categoria) { return -1; }
                            if (x.id_categoria > y.id_categoria) { return 1; }
                            return 0;
                        }
                        cibo.sort(SortArray)
                        quantita.sort(SortArray)
                        let token = req.token
                        if (token == undefined) {
                            token = [{ token: "qualcosa è andato storo prova a ricaricare la pagina" }]
                            res.render("vendi", { cibo, acqua, token, quantita, quantitaAcqua })
                        } else {
                            res.render("vendi", { cibo, acqua, token, quantita, quantitaAcqua })
                        }
                    })
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
                        con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantita, id_isola, inputCibo], (error, result) => {})
                        quantitaToken = quantitaToken + 1
                        con.query("UPDATE isole SET token = ? WHERE id = ? ", [quantitaToken, id_isola], (error, result) => {})
                    }
                })
            })
        }
        if (inputAcqua) {
            con.query("SELECT quantita FROM acqua WHERE id_isola = ? AND id_categoria = ?", [id_isola, 1], async(error, result) => {
                let quantita = result[0].quantita
                con.query("SELECT token FROM isole WHERE id = ?", [id_isola], async(error, result) => {
                    let quantitaToken = result[0].token
                    if (quantita < 100) {} else {
                        quantita = quantita - 100
                        con.query("UPDATE acqua SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantita, id_isola, 1], (error, result) => {})
                        quantitaToken = quantitaToken + 1
                        con.query("UPDATE isole SET token = ? WHERE id = ? ", [quantitaToken, id_isola], (error, result) => {})
                    }
                })
            })
        }
        return res.redirect("/vendi")
    }
}

module.exports = shop