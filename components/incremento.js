const con = require("../connection")
const { nextTick } = require("process")
const { persone } = require("./persone")

const incremento = {
    incremento: (req, res, next) => {
        let id_isola = req.session.user.id
        con.query("SELECT * FROM cibo WHERE id_isola = ? AND acquistato = ?", [id_isola, 1], async(error, result) => {
            let cibo = result
            con.query("SELECT * FROM persone WHERE id_isola = ?", [id_isola], async(error, result) => {
                let persone = result
                con.query("SELECT * FROM acqua WHERE id_isola = ?", [id_isola], async(error, result) => {
                    let acqua = result
                    con.query("SELECT * FROM strutture WHERE id_isola = ? ", [id_isola], async(error, result) => {
                        let strutture = result

                        function SortArray(x, y) {
                            if (x.id_categoria < y.id_categoria) { return -1; }
                            if (x.id_categoria > y.id_categoria) { return 1; }
                            return 0;
                        }
                        cibo.sort(SortArray)
                        strutture.sort(SortArray)
                        const quantitaMassimaCasa = strutture[0].quantita * 12
                        const numeroPersone = persone[0].quantita / cibo.length
                        const fiume = strutture[3].quantita
                        const pozzo = strutture[1].quantita
                        const aggiungiAcquaFiume = fiume * 4 / 10
                        const aggiungiAcquaPozzo = pozzo * 3 / 10
                        const aggiungiAcqua = aggiungiAcquaFiume + aggiungiAcquaPozzo

                        if (cibo.length == 1) {
                            let quantitaCibo = cibo[0].quantita
                            const id_categoria = cibo[0].id_categoria
                            quantitaCibo = quantitaCibo + numeroPersone
                            con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCibo, id_isola, id_categoria], (error, result) => {})
                        }
                        if (cibo.length == 2) {
                            let quantitaCibo = cibo[0].quantita
                            let quantitaCiboDue = cibo[1].quantita
                            const id_categoria = cibo[0].id_categoria
                            const id_categoriaDue = cibo[1].id_categoria
                            quantitaCibo = quantitaCibo + numeroPersone
                            quantitaCiboDue = quantitaCiboDue + numeroPersone
                            con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCibo, id_isola, id_categoria], (error, result) => {})
                            con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboDue, id_isola, id_categoriaDue], (error, result) => {})
                        }
                        if (cibo.length == 3) {
                            let quantitaCibo = cibo[0].quantita
                            let quantitaCiboDue = cibo[1].quantita
                            let quantitaCiboTre = cibo[2].quantita
                            const id_categoria = cibo[0].id_categoria
                            const id_categoriaDue = cibo[1].id_categoria
                            const id_categoriaTre = cibo[2].id_categoria
                            quantitaCibo = quantitaCibo + numeroPersone
                            quantitaCiboDue = quantitaCiboDue + numeroPersone
                            quantitaCiboTre = quantitaCiboTre + numeroPersone
                            con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCibo, id_isola, id_categoria], (error, result) => {})
                            con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboDue, id_isola, id_categoriaDue], (error, result) => {})
                            con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboTre, id_isola, id_categoriaTre], (error, result) => {})
                        }
                        if (cibo.length == 4) {
                            let quantitaCibo = cibo[0].quantita
                            let quantitaCiboDue = cibo[1].quantita
                            let quantitaCiboTre = cibo[2].quantita
                            let quantitaCiboQuattro = cibo[3].quantita
                            const id_categoria = cibo[0].id_categoria
                            const id_categoriaDue = cibo[1].id_categoria
                            const id_categoriaTre = cibo[2].id_categoria
                            const id_categoriaQuattro = cibo[3].id_categoria
                            quantitaCibo = quantitaCibo + numeroPersone
                            quantitaCiboDue = quantitaCiboDue + numeroPersone
                            quantitaCiboTre = quantitaCiboTre + numeroPersone
                            quantitaCiboQuattro = quantitaCiboQuattro + numeroPersone
                            con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCibo, id_isola, id_categoria], (error, result) => {})
                            con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboDue, id_isola, id_categoriaDue], (error, result) => {})
                            con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboTre, id_isola, id_categoriaTre], (error, result) => {})
                            con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboQuattro, id_isola, id_categoriaQuattro], (error, result) => {})
                        }
                        if (cibo.length == 5) {
                            let quantitaCibo = cibo[0].quantita
                            let quantitaCiboDue = cibo[1].quantita
                            let quantitaCiboTre = cibo[2].quantita
                            let quantitaCiboQuattro = cibo[3].quantita
                            let quantitaCiboCinque = cibo[4].quantita
                            const id_categoria = cibo[0].id_categoria
                            const id_categoriaDue = cibo[1].id_categoria
                            const id_categoriaTre = cibo[2].id_categoria
                            const id_categoriaQuattro = cibo[3].id_categoria
                            const id_categoriaCinque = cibo[4].id_categoria
                            quantitaCibo = quantitaCibo + numeroPersone
                            quantitaCiboDue = quantitaCiboDue + numeroPersone
                            quantitaCiboTre = quantitaCiboTre + numeroPersone
                            quantitaCiboQuattro = quantitaCiboQuattro + numeroPersone
                            quantitaCiboCinque = quantitaCiboCinque + numeroPersone
                            con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCibo, id_isola, id_categoria], (error, result) => {})
                            con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboDue, id_isola, id_categoriaDue], (error, result) => {})
                            con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboTre, id_isola, id_categoriaTre], (error, result) => {})
                            con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboQuattro, id_isola, id_categoriaQuattro], (error, result) => {})
                            con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboCinque, id_isola, id_categoriaCinque], (error, result) => {})
                        }
                        if (cibo.length == 6) {
                            let quantitaCibo = cibo[0].quantita
                            let quantitaCiboDue = cibo[1].quantita
                            let quantitaCiboTre = cibo[2].quantita
                            let quantitaCiboQuattro = cibo[3].quantita
                            let quantitaCiboCinque = cibo[4].quantita
                            let quantitaCiboSei = cibo[5].quantita
                            const id_categoria = cibo[0].id_categoria
                            const id_categoriaDue = cibo[1].id_categoria
                            const id_categoriaTre = cibo[2].id_categoria
                            const id_categoriaQuattro = cibo[3].id_categoria
                            const id_categoriaCinque = cibo[4].id_categoria
                            const id_categoriaSei = cibo[5].id_categoria
                            quantitaCibo = quantitaCibo + numeroPersone
                            quantitaCiboDue = quantitaCiboDue + numeroPersone
                            quantitaCiboTre = quantitaCiboTre + numeroPersone
                            quantitaCiboQuattro = quantitaCiboQuattro + numeroPersone
                            quantitaCiboCinque = quantitaCiboCinque + numeroPersone
                            quantitaCiboSei = quantitaCiboSei + numeroPersone
                            con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCibo, id_isola, id_categoria], (error, result) => {})
                            con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboDue, id_isola, id_categoriaDue], (error, result) => {})
                            con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboTre, id_isola, id_categoriaTre], (error, result) => {})
                            con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboQuattro, id_isola, id_categoriaQuattro], (error, result) => {})
                            con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboCinque, id_isola, id_categoriaCinque], (error, result) => {})
                            con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboSei, id_isola, id_categoriaSei], (error, result) => {})
                        }
                        if (cibo.length == 7) {
                            let quantitaCibo = cibo[0].quantita
                            let quantitaCiboDue = cibo[1].quantita
                            let quantitaCiboTre = cibo[2].quantita
                            let quantitaCiboQuattro = cibo[3].quantita
                            let quantitaCiboCinque = cibo[4].quantita
                            let quantitaCiboSei = cibo[5].quantita
                            let quantitaCiboSette = cibo[6].quantita
                            const id_categoria = cibo[0].id_categoria
                            const id_categoriaDue = cibo[1].id_categoria
                            const id_categoriaTre = cibo[2].id_categoria
                            const id_categoriaQuattro = cibo[3].id_categoria
                            const id_categoriaCinque = cibo[4].id_categoria
                            const id_categoriaSei = cibo[5].id_categoria
                            const id_categoriaSette = cibo[6].id_categoria
                            quantitaCibo = quantitaCibo + numeroPersone
                            quantitaCiboDue = quantitaCiboDue + numeroPersone
                            quantitaCiboTre = quantitaCiboTre + numeroPersone
                            quantitaCiboQuattro = quantitaCiboQuattro + numeroPersone
                            quantitaCiboCinque = quantitaCiboCinque + numeroPersone
                            quantitaCiboSei = quantitaCiboSei + numeroPersone
                            quantitaCiboSette = quantitaCiboSette + numeroPersone
                            con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCibo, id_isola, id_categoria], (error, result) => {})
                            con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboDue, id_isola, id_categoriaDue], (error, result) => {})
                            con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboTre, id_isola, id_categoriaTre], (error, result) => {})
                            con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboQuattro, id_isola, id_categoriaQuattro], (error, result) => {})
                            con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboCinque, id_isola, id_categoriaCinque], (error, result) => {})
                            con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboSei, id_isola, id_categoriaSei], (error, result) => {})
                            con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboSette, id_isola, id_categoriaSette], (error, result) => {})
                        }
                        if (cibo.length == 8) {
                            let quantitaCibo = cibo[0].quantita
                            let quantitaCiboDue = cibo[1].quantita
                            let quantitaCiboTre = cibo[2].quantita
                            let quantitaCiboQuattro = cibo[3].quantita
                            let quantitaCiboCinque = cibo[4].quantita
                            let quantitaCiboSei = cibo[5].quantita
                            let quantitaCiboSette = cibo[6].quantita
                            let quantitaCiboOtto = cibo[7].quantita
                            const id_categoria = cibo[0].id_categoria
                            const id_categoriaDue = cibo[1].id_categoria
                            const id_categoriaTre = cibo[2].id_categoria
                            const id_categoriaQuattro = cibo[3].id_categoria
                            const id_categoriaCinque = cibo[4].id_categoria
                            const id_categoriaSei = cibo[5].id_categoria
                            const id_categoriaSette = cibo[6].id_categoria
                            const id_categoriaOtto = cibo[7].id_categoria
                            quantitaCibo = quantitaCibo + numeroPersone
                            quantitaCiboDue = quantitaCiboDue + numeroPersone
                            quantitaCiboTre = quantitaCiboTre + numeroPersone
                            quantitaCiboQuattro = quantitaCiboQuattro + numeroPersone
                            quantitaCiboCinque = quantitaCiboCinque + numeroPersone
                            quantitaCiboSei = quantitaCiboSei + numeroPersone
                            quantitaCiboSette = quantitaCiboSette + numeroPersone
                            quantitaCiboOtto = quantitaCiboOtto + numeroPersone
                            con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCibo, id_isola, id_categoria], (error, result) => {})
                            con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboDue, id_isola, id_categoriaDue], (error, result) => {})
                            con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboTre, id_isola, id_categoriaTre], (error, result) => {})
                            con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboQuattro, id_isola, id_categoriaQuattro], (error, result) => {})
                            con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboCinque, id_isola, id_categoriaCinque], (error, result) => {})
                            con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboSei, id_isola, id_categoriaSei], (error, result) => {})
                            con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboSette, id_isola, id_categoriaSette], (error, result) => {})
                            con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboOtto, id_isola, id_categoriaOtto], (error, result) => {})
                        }
                        if (quantitaMassimaCasa > persone[0].quantita) {
                            if (persone.length == 1) {
                                let quantitaPersone = persone[0].quantita
                                if (acqua[0].quantita >= 700) {
                                    quantitaPersone = quantitaPersone + 1
                                    con.query("UPDATE persone SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaPersone, id_isola, 1], (error, result) => {})
                                    if (acqua[0].quantita >= 1500) {
                                        quantitaPersone = quantitaPersone + 1
                                        con.query("UPDATE persone SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaPersone, id_isola, 1], (error, result) => {})
                                        if (acqua[0].quantita >= 3000) {
                                            quantitaPersone = quantitaPersone + 1
                                            con.query("UPDATE persone SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaPersone, id_isola, 1], (error, result) => {})
                                            if (acqua[0].quantita >= 5000) {
                                                quantitaPersone = quantitaPersone + 1
                                                con.query("UPDATE persone SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaPersone, id_isola, 1], (error, result) => {})
                                                if (acqua[0].quantita >= 7000) {
                                                    quantitaPersone = quantitaPersone + 1
                                                    con.query("UPDATE persone SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaPersone, id_isola, 1], (error, result) => {})
                                                    if (acqua[0].quantita >= 10000) {
                                                        quantitaPersone = quantitaPersone + 1
                                                        con.query("UPDATE persone SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaPersone, id_isola, 1], (error, result) => {})
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        } else {}
                        if (acqua.length == 1) {
                            let quantitaAcqua = acqua[0].quantita
                            quantitaAcqua = quantitaAcqua + aggiungiAcqua
                            con.query("UPDATE acqua SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaAcqua, id_isola, 1], (error, result) => {})
                        }
                    })
                })
            })
        })
        next()
    },

}

module.exports = incremento