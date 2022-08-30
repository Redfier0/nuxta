const con = require("../connection")
const { nextTick } = require("process")

const strutture = {
    strutture: (req, res, next) => {
        let id_isola = req.session.user.id
        con.query("SELECT * FROM isole WHERE id = ?", [id_isola], (error, result) => {
            let livelloEvoluzione = result[0].evoluzione
            con.query("SELECT * FROM strutture WHERE id_isola = ?", [id_isola], (error, result) => {
                let strutture = result
                con.query("SELECT * FROM categorie_strutture WHERE livello_evoluzione = ? ", [livelloEvoluzione], (error, result) => {
                    let nome = result

                    function SortArray(x, y) {
                        if (x.id_categoria < y.id_categoria) { return -1; }
                        if (x.id_categoria > y.id_categoria) { return 1; }
                        return 0;
                    }
                    strutture.sort(SortArray)
                    let dati_strutture = [
                        { nome: nome[0].nome, quantita: strutture[0].quantita, img: nome[0].img },
                        { nome: nome[1].nome, quantita: strutture[1].quantita, img: nome[1].img },
                        { nome: nome[2].nome, quantita: strutture[2].quantita, img: nome[2].img },
                        { nome: nome[3].nome, quantita: strutture[3].quantita, img: nome[3].img },
                        { nome: nome[2].nome, quantita: strutture[4].quantita, img: nome[4].img },
                        { nome: nome[3].nome, quantita: strutture[5].quantita, img: nome[5].img }
                    ]
                    req.datiStrutture = dati_strutture
                    next()
                })
            })
        })
    }
}

module.exports = strutture;