const con = require("../connection")
const { nextTick } = require("process")

const cibo = {
    cibo: (req, res, next) => {
        let id_isola = req.session.user.id
        let dati_cibo = {}
        con.query("SELECT * FROM cibo WHERE id_isola = ? ", [id_isola], (error, result) => {
            let cibo = result
            con.query("SELECT nome FROM categorie_cibo ", (error, result) => {
                let nome = result

                function SortArray(x, y) {
                    if (x.id_categoria < y.id_categoria) { return -1; }
                    if (x.id_categoria > y.id_categoria) { return 1; }
                    return 0;
                }
                cibo.sort(SortArray)
                dati_cibo = [{ nome: nome[0].nome, quantita: cibo[0].quantita },
                    { nome: nome[1].nome, quantita: cibo[1].quantita },
                    { nome: nome[2].nome, quantita: cibo[2].quantita },
                    { nome: nome[3].nome, quantita: cibo[3].quantita },
                    { nome: nome[4].nome, quantita: cibo[4].quantita },
                    { nome: nome[5].nome, quantita: cibo[5].quantita },
                    { nome: nome[6].nome, quantita: cibo[6].quantita },
                    { nome: nome[7].nome, quantita: cibo[7].quantita }
                ]
                req.datiCibo = dati_cibo
                next()
            })
        })
    }
}

module.exports = cibo;