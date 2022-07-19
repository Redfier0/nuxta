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
                }, 1000)
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
                }, 1000)
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
                }, 1000)
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
                }, 1000)
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
                }, 1000)
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
                }, 1000)
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
                }, 1000)
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
                }, 1000)
            }
        })
        next()
    }
}

module.exports = incremento