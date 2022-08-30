const con = require("../connection")
const { nextTick } = require("process")

const cibo = {
    cibo: (req, res, next) => {
        let id_isola = req.session.user.id
        con.query("SELECT * FROM isole WHERE id = ?", [id_isola], (error, result) => {
            let livelloEvoluzione = result[0].evoluzione
            con.query("SELECT * FROM cibo WHERE id_isola = ? ", [id_isola], (error, result) => {
                let cibo = result
                con.query("SELECT * FROM categorie_cibo WHERE livello_evoluzione = ?", [livelloEvoluzione], (error, result) => {
                    let nome = result

                    function SortArray(x, y) {
                        if (x.id_categoria < y.id_categoria) { return -1; }
                        if (x.id_categoria > y.id_categoria) { return 1; }
                        return 0;
                    }
                    cibo.sort(SortArray)
                    let dati_cibo = [
                        { nome: nome[0].nome, quantita: cibo[0].quantita, img: nome[0].img },
                        { nome: nome[1].nome, quantita: cibo[1].quantita, img: nome[1].img, },
                        { nome: nome[2].nome, quantita: cibo[2].quantita, img: nome[2].img, },
                        { nome: nome[3].nome, quantita: cibo[3].quantita, img: nome[3].img, },
                        { nome: nome[4].nome, quantita: cibo[4].quantita, img: nome[4].img, },
                        { nome: nome[5].nome, quantita: cibo[5].quantita, img: nome[5].img, },
                        { nome: nome[6].nome, quantita: cibo[6].quantita, img: nome[6].img, },
                        { nome: nome[7].nome, quantita: cibo[7].quantita, img: nome[7].img, }
                    ]
                    req.datiCibo = dati_cibo
                    next()
                })
            })
        })
    }
}

module.exports = cibo;