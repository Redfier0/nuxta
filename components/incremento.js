const con = require("../connection")
const { nextTick } = require("process")

const incremento = {
    incrementoCibo: (req, res, next) => {
        let id_isola = req.session.user.id
        con.query("SELECT * FROM cibo WHERE id_isola = ? AND acquistato = ?", [id_isola, 1], async(error, result) => {
            let cibo = result

            function SortArray(x, y) {
                if (x.id_categoria < y.id_categoria) { return -1; }
                if (x.id_categoria > y.id_categoria) { return 1; }
                return 0;
            }
            cibo.sort(SortArray)

            if (cibo.length == 1) {
                let quantitaCibo = cibo[0].quantita
                const id_categoria = cibo[0].id_categoria
                setInterval(() => {
                    quantitaCibo = quantitaCibo + 1
                    con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCibo, id_isola, id_categoria], (error, result) => {})
                }, 10000)
            }
            if (cibo.length == 2) {
                let quantitaCibo = cibo[0].quantita
                let quantitaCiboDue = cibo[1].quantita
                const id_categoria = cibo[0].id_categoria
                const id_categoriaDue = cibo[1].id_categoria
                setInterval(() => {
                    quantitaCibo = quantitaCibo + 1
                    quantitaCiboDue = quantitaCiboDue + 1
                    con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCibo, id_isola, id_categoria], (error, result) => {})
                    con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboDue, id_isola, id_categoriaDue], (error, result) => {})
                }, 10000)
            }
            if (cibo.length == 3) {
                let quantitaCibo = cibo[0].quantita
                let quantitaCiboDue = cibo[1].quantita
                let quantitaCiboTre = cibo[2].quantita
                const id_categoria = cibo[0].id_categoria
                const id_categoriaDue = cibo[1].id_categoria
                const id_categoriaTre = cibo[2].id_categoria
                setInterval(() => {
                    quantitaCibo = quantitaCibo + 1
                    quantitaCiboDue = quantitaCiboDue + 1
                    quantitaCiboTre = quantitaCiboTre + 1
                    con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCibo, id_isola, id_categoria], (error, result) => {})
                    con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboDue, id_isola, id_categoriaDue], (error, result) => {})
                    con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboTre, id_isola, id_categoriaTre], (error, result) => {})
                }, 10000)
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
                setInterval(() => {
                    quantitaCibo = quantitaCibo + 1
                    quantitaCiboDue = quantitaCiboDue + 1
                    quantitaCiboTre = quantitaCiboTre + 1
                    quantitaCiboQuattro = quantitaCiboQuattro + 1
                    con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCibo, id_isola, id_categoria], (error, result) => {})
                    con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboDue, id_isola, id_categoriaDue], (error, result) => {})
                    con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboTre, id_isola, id_categoriaTre], (error, result) => {})
                    con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboQuattro, id_isola, id_categoriaQuattro], (error, result) => {})
                }, 10000)
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
                setInterval(() => {
                    quantitaCibo = quantitaCibo + 1
                    quantitaCiboDue = quantitaCiboDue + 1
                    quantitaCiboTre = quantitaCiboTre + 1
                    quantitaCiboQuattro = quantitaCiboQuattro + 1
                    quantitaCiboCinque = quantitaCiboCinque + 1
                    con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCibo, id_isola, id_categoria], (error, result) => {})
                    con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboDue, id_isola, id_categoriaDue], (error, result) => {})
                    con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboTre, id_isola, id_categoriaTre], (error, result) => {})
                    con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboQuattro, id_isola, id_categoriaQuattro], (error, result) => {})
                    con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboCinque, id_isola, id_categoriaCinque], (error, result) => {})
                }, 10000)
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
                setInterval(() => {
                    quantitaCibo = quantitaCibo + 1
                    quantitaCiboDue = quantitaCiboDue + 1
                    quantitaCiboTre = quantitaCiboTre + 1
                    quantitaCiboQuattro = quantitaCiboQuattro + 1
                    quantitaCiboCinque = quantitaCiboCinque + 1
                    quantitaCiboSei = quantitaCiboSei + 1
                    con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCibo, id_isola, id_categoria], (error, result) => {})
                    con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboDue, id_isola, id_categoriaDue], (error, result) => {})
                    con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboTre, id_isola, id_categoriaTre], (error, result) => {})
                    con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboQuattro, id_isola, id_categoriaQuattro], (error, result) => {})
                    con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboCinque, id_isola, id_categoriaCinque], (error, result) => {})
                    con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboSei, id_isola, id_categoriaSei], (error, result) => {})
                }, 10000)
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
                setInterval(() => {
                    quantitaCibo = quantitaCibo + 1
                    quantitaCiboDue = quantitaCiboDue + 1
                    quantitaCiboTre = quantitaCiboTre + 1
                    quantitaCiboQuattro = quantitaCiboQuattro + 1
                    quantitaCiboCinque = quantitaCiboCinque + 1
                    quantitaCiboSei = quantitaCiboSei + 1
                    quantitaCiboSette = quantitaCiboSette + 1
                    con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCibo, id_isola, id_categoria], (error, result) => {})
                    con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboDue, id_isola, id_categoriaDue], (error, result) => {})
                    con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboTre, id_isola, id_categoriaTre], (error, result) => {})
                    con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboQuattro, id_isola, id_categoriaQuattro], (error, result) => {})
                    con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboCinque, id_isola, id_categoriaCinque], (error, result) => {})
                    con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboSei, id_isola, id_categoriaSei], (error, result) => {})
                    con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboSette, id_isola, id_categoriaSette], (error, result) => {})
                }, 10000)
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
                setInterval(() => {
                    quantitaCibo = quantitaCibo + 1
                    quantitaCiboDue = quantitaCiboDue + 1
                    quantitaCiboTre = quantitaCiboTre + 1
                    quantitaCiboQuattro = quantitaCiboQuattro + 1
                    quantitaCiboCinque = quantitaCiboCinque + 1
                    quantitaCiboSei = quantitaCiboSei + 1
                    quantitaCiboSette = quantitaCiboSette + 1
                    quantitaCiboOtto = quantitaCiboOtto + 1
                    con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCibo, id_isola, id_categoria], (error, result) => {})
                    con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboDue, id_isola, id_categoriaDue], (error, result) => {})
                    con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboTre, id_isola, id_categoriaTre], (error, result) => {})
                    con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboQuattro, id_isola, id_categoriaQuattro], (error, result) => {})
                    con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboCinque, id_isola, id_categoriaCinque], (error, result) => {})
                    con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboSei, id_isola, id_categoriaSei], (error, result) => {})
                    con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboSette, id_isola, id_categoriaSette], (error, result) => {})
                    con.query("UPDATE cibo SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaCiboOtto, id_isola, id_categoriaOtto], (error, result) => {})
                }, 10000)
            }
        })
        next()
    },
    incrementoAcqua: (req, res, next) => {
        let id_isola = req.session.user.id
        con.query("SELECT * FROM acqua WHERE id_isola = ? AND acquistato = ?", [id_isola, 1], async(error, result) => {
            let acqua = result
            let quantitaAcqua = acqua[0].quantita
            setInterval(() => {
                quantitaAcqua = quantitaAcqua + 1
                con.query("UPDATE acqua SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaAcqua, id_isola, 1], (error, result) => {})
            }, 10000)
        })
        next()
    },
    incrementoPersone: (req, res, next) => {
        let id_isola = req.session.user.id
        con.query("SELECT * FROM persone WHERE id_isola = ? AND acquistato = ?", [id_isola, 1], async(error, result) => {
            let persone = result
            let quantitaPersone = persone[0].quantita
            setInterval(() => {
                quantitaPersone = quantitaPersone + 1
                con.query("UPDATE persone SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaPersone, id_isola, 1], (error, result) => {})
            }, 10000)
        })
        next()
    },
    incrementoStrutture: (req, res, next) => {
        let id_isola = req.session.user.id
        con.query("SELECT * FROM strutture WHERE id_isola = ? AND acquistato = ?", [id_isola, 1], async(error, result) => {
            let strutture = result

            function SortArray(x, y) {
                if (x.id_categoria < y.id_categoria) { return -1; }
                if (x.id_categoria > y.id_categoria) { return 1; }
                return 0;
            }
            strutture.sort(SortArray)

            if (strutture.length == 1) {
                let quantitaStrutture = strutture[0].quantita
                const id_categoria = strutture[0].id_categoria
                setInterval(() => {
                    quantitaStrutture = quantitaStrutture + 1
                    con.query("UPDATE strutture SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaStrutture, id_isola, id_categoria], (error, result) => {})
                }, 10000)
            }
            if (strutture.length == 2) {
                let quantitaStrutture = strutture[0].quantita
                let quantitaStruttureDue = strutture[1].quantita
                const id_categoria = strutture[0].id_categoria
                const id_categoriaDue = strutture[1].id_categoria
                setInterval(() => {
                    quantitaStrutture = quantitaStrutture + 1
                    quantitaStruttureDue = quantitaStruttureDue + 1
                    con.query("UPDATE strutture SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaStrutture, id_isola, id_categoria], (error, result) => {})
                    con.query("UPDATE strutture SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaStruttureDue, id_isola, id_categoriaDue], (error, result) => {})
                }, 10000)
            }
            if (strutture.length == 3) {
                let quantitaStrutture = strutture[0].quantita
                let quantitaStruttureDue = strutture[1].quantita
                let quantitaStruttureTre = strutture[2].quantita
                const id_categoria = strutture[0].id_categoria
                const id_categoriaDue = strutture[1].id_categoria
                const id_categoriaTre = strutture[2].id_categoria
                setInterval(() => {
                    quantitaStrutture = quantitaStrutture + 1
                    quantitaStruttureDue = quantitaStruttureDue + 1
                    quantitaStruttureTre = quantitaStruttureTre + 1
                    con.query("UPDATE strutture SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaStrutture, id_isola, id_categoria], (error, result) => {})
                    con.query("UPDATE strutture SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaStruttureDue, id_isola, id_categoriaDue], (error, result) => {})
                    con.query("UPDATE strutture SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaStruttureTre, id_isola, id_categoriaTre], (error, result) => {})
                }, 10000)
            }
            if (strutture.length == 4) {
                let quantitaStrutture = strutture[0].quantita
                let quantitaStruttureDue = strutture[1].quantita
                let quantitaStruttureTre = strutture[2].quantita
                let quantitaStruttureQuattro = strutture[3].quantita
                const id_categoria = strutture[0].id_categoria
                const id_categoriaDue = strutture[1].id_categoria
                const id_categoriaTre = strutture[2].id_categoria
                const id_categoriaQuattro = strutture[3].id_categoria
                setInterval(() => {
                    quantitaStrutture = quantitaStrutture + 1
                    quantitaStruttureDue = quantitaStruttureDue + 1
                    quantitaStruttureTre = quantitaStruttureTre + 1
                    quantitaStruttureQuattro = quantitaStruttureQuattro + 1
                    con.query("UPDATE strutture SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaStrutture, id_isola, id_categoria], (error, result) => {})
                    con.query("UPDATE strutture SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaStruttureDue, id_isola, id_categoriaDue], (error, result) => {})
                    con.query("UPDATE strutture SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaStruttureTre, id_isola, id_categoriaTre], (error, result) => {})
                    con.query("UPDATE strutture SET quantita = ? WHERE id_isola = ? AND id_categoria = ?", [quantitaStruttureQuattro, id_isola, id_categoriaQuattro], (error, result) => {})
                }, 10000)
            }
        })
        next()
    },
}

module.exports = incremento