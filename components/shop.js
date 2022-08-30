const con = require("../connection")
const { nextTick } = require("process")

const shop = {
    shop: (req, res, next) => {
        let id_isola = req.session.user.id
        con.query("SELECT * FROM isole WHERE id = ?", [id_isola], (error, result) => {
            let livelloEvoluzione = result[0].evoluzione
            con.query("SELECT * FROM categorie_cibo WHERE livello_evoluzione = ?", [livelloEvoluzione], (error, result) => {
                const cibo = result
                con.query("SELECT * FROM categorie_persone", (error, result) => {
                    const persone = result
                    con.query("SELECT * FROM categorie_strutture WHERE livello_evoluzione = ?", [livelloEvoluzione], (error, result) => {
                        const strutture = result
                        con.query("SELECT * FROM cibo WHERE id_isola = ?", [id_isola], (error, result) => {
                            const quantita = result
                            con.query("SELECT * FROM persone WHERE id_isola = ?", [id_isola], (error, result) => {
                                const quantitaPersone = result
                                con.query("SELECT * FROM strutture WHERE id_isola = ?", [id_isola], (error, result) => {
                                    const quantitaStrutture = result
                                    let quantitaAcquistato = quantita[0].quantita_acquistato + quantita[1].quantita_acquistato + quantita[2].quantita_acquistato + quantita[3].quantita_acquistato + quantita[4].quantita_acquistato + quantita[5].quantita_acquistato + quantita[6].quantita_acquistato + quantita[7].quantita_acquistato

                                    function SortArray(x, y) {
                                        if (x.id_categoria < y.id_categoria) { return -1; }
                                        if (x.id_categoria > y.id_categoria) { return 1; }
                                        return 0;
                                    }
                                    quantita.sort(SortArray)
                                    quantitaStrutture.sort(SortArray)
                                    const token = req.token
                                    res.render("shop", { cibo, persone, strutture, token, quantita, quantitaPersone, quantitaStrutture, quantitaAcquistato })
                                })
                            })
                        })
                    })
                })
            })
        })
    },
    handleShop: (req, res, next) => {
        const { body } = req
        const { inputCibo, inputStrutture } = body
        let id_isola = req.session.user.id
        con.query("SELECT * FROM isole WHERE id = ?", [id_isola], (error, result) => {
            const evoluzione = result[0].evoluzione
            if (inputCibo) {
                con.query("SELECT * FROM cibo WHERE id_isola = ? AND id_categoria = ?", [id_isola, inputCibo], (error, result) => {
                    let quantita = result[0].quantita
                    let quantitaAcquistato = result[0].quantita_acquistato
                    let ciboPrezzo = result[0].prezzo
                    con.query("SELECT * FROM cibo WHERE id_isola = ?", [id_isola], (error, result) => {
                        const acquistato = result[0].quantita_acquistato + result[1].quantita_acquistato + result[2].quantita_acquistato + result[3].quantita_acquistato + result[4].quantita_acquistato + result[5].quantita_acquistato + result[6].quantita_acquistato + result[7].quantita_acquistato
                        con.query("SELECT * FROM strutture WHERE id_isola = ? AND id_categoria = ?", [id_isola, 2], async(error, result) => {
                            let quantitaMassima = result[0].quantita * (evoluzione - 1)
                            if (quantitaMassima == 0) {
                                quantitaMassima = 25
                                if (quantitaMassima > acquistato) {
                                    quantita = quantita + 20
                                    quantitaAcquistato = quantitaAcquistato + 1
                                    con.query("UPDATE cibo SET quantita = ?, acquistato = ?, quantita_acquistato = ? WHERE id_isola = ? AND id_categoria = ?", [quantita, 1, quantitaAcquistato, id_isola, inputCibo], (error, result) => {})
                                    con.query("SELECT token FROM isole WHERE id = ?", [id_isola], async(error, result) => {
                                        let quantitaToken = result[0].token
                                        if (quantitaToken < ciboPrezzo) {} else {
                                            quantitaToken = quantitaToken - ciboPrezzo
                                            let percentualePrezzo = (ciboPrezzo / 100) * 50
                                            ciboPrezzo = ciboPrezzo + percentualePrezzo
                                            con.query("UPDATE isole SET token = ? WHERE id = ? ", [quantitaToken, id_isola], (error, result) => {})
                                            con.query("UPDATE cibo SET prezzo = ? WHERE id_isola = ? AND id_categoria = ?", [ciboPrezzo, id_isola, inputCibo], (error, result) => {})
                                        }
                                    })
                                } else {}
                            } else {
                                if (quantitaMassima > acquistato) {
                                    quantita = quantita + 20
                                    quantitaAcquistato = quantitaAcquistato + 1
                                    con.query("UPDATE cibo SET quantita = ?, acquistato = ?, quantita_acquistato = ? WHERE id_isola = ? AND id_categoria = ?", [quantita, 1, quantitaAcquistato, id_isola, inputCibo], (error, result) => {})
                                    con.query("SELECT token FROM isole WHERE id = ?", [id_isola], async(error, result) => {
                                        let quantitaToken = result[0].token
                                        if (quantitaToken < ciboPrezzo) {} else {
                                            quantitaToken = quantitaToken - ciboPrezzo
                                            let percentualePrezzo = (ciboPrezzo / 100) * 50
                                            ciboPrezzo = ciboPrezzo + percentualePrezzo
                                            con.query("UPDATE isole SET token = ? WHERE id = ? ", [quantitaToken, id_isola], (error, result) => {})
                                            con.query("UPDATE cibo SET prezzo = ? WHERE id_isola = ? AND id_categoria = ?", [ciboPrezzo, id_isola, inputCibo], (error, result) => {})
                                        }
                                    })
                                } else {}
                            }
                        })
                    })
                })
            }
        })

        if (inputStrutture) {
            con.query("SELECT * FROM strutture WHERE id_isola = ? AND id_categoria = ?", [id_isola, inputStrutture], async(error, result) => {
                let strutturePrezzo = result[0].prezzo
                let quantita = result[0].quantita
                con.query("SELECT token FROM isole WHERE id = ?", [id_isola], async(error, result) => {
                    let quantitaToken = result[0].token
                    if (quantitaToken < strutturePrezzo) {} else {
                        quantita = quantita + 1
                        con.query("UPDATE strutture SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantita, id_isola, inputStrutture], (error, result) => {})
                        quantitaToken = quantitaToken - strutturePrezzo
                        let percentualePrezzo = (strutturePrezzo / 100) * 65
                        strutturePrezzo = strutturePrezzo + percentualePrezzo
                        con.query("UPDATE isole SET token = ? WHERE id = ? ", [quantitaToken, id_isola], (error, result) => {})
                        con.query("UPDATE strutture SET prezzo = ? WHERE id_isola = ? AND id_categoria = ?", [strutturePrezzo, id_isola, inputStrutture], (error, result) => {})
                    }
                })
            })
        }
        return res.redirect("/shop")
    },
    vendita: (req, res, next) => {
        let id_isola = req.session.user.id
        con.query("SELECT * FROM isole WHERE id = ?", [id_isola], (error, result) => {
            let livelloEvoluzione = result[0].evoluzione
            con.query("SELECT * FROM categorie_cibo WHERE livello_evoluzione = ?", [livelloEvoluzione], (error, result) => {
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
                            res.render("vendi", { cibo, acqua, token, quantita, quantitaAcqua })
                        })
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