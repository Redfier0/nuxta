const con = require("../connection")
const { nextTick } = require("process")

const cibo = {
    cibo: (req, res, next) => {
        let id_isola = req.session.user.id
        let dati_cibo = []
        con.query("SELECT * FROM cibo WHERE id_isola = ?", [id_isola], (error, result) => {
            let cibo = result
            cibo.filter(item => {
                let id_categoria = item.id_categoria
                con.query("SELECT nome FROM categorie_cibo WHERE id = ?", [id_categoria], (error, result) => {
                    let nome = result
                    nome.filter(element => {
                        return dati_cibo = { nome: element.nome, quantita: item.quantita }
                    })
                    req.dati_cibo = dati_cibo
                    next()
                })
            });
        })

    }
}

module.exports = cibo