const con = require("../connection")
const { nextTick } = require("process")

const strutture = {
    strutture: (req, res, next) => {
        let id_isola = req.session.user.id
        let dati_strutture = {}
        con.query("SELECT * FROM strutture WHERE id_isola = ? ", [id_isola], (error, result) => {
            let strutture = result
            con.query("SELECT nome FROM categorie_strutture ", (error, result) => {
                let nome = result

                function SortArray(x, y) {
                    if (x.id_categoria < y.id_categoria) { return -1; }
                    if (x.id_categoria > y.id_categoria) { return 1; }
                    return 0;
                }
                strutture.sort(SortArray)
                dati_strutture = [{ nome: nome[0].nome, quantita: strutture[0].quantita },
                    { nome: nome[1].nome, quantita: strutture[1].quantita },
                    { nome: nome[2].nome, quantita: strutture[2].quantita },
                    { nome: nome[3].nome, quantita: strutture[3].quantita }
                ]
                req.datiStrutture = dati_strutture
                next()
            })
        })
    }
}

module.exports = strutture;