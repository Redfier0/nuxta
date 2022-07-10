const con = require("../connection")
const { nextTick } = require("process")

const acqua = {
    acqua: (req, res, next) => {
        let id_isola = req.session.user.id
        let dati_acqua = []
        con.query("SELECT * FROM acqua WHERE id_isola = ?", [id_isola], (error, result) => {
            let acqua = result
            acqua.filter(item => {
                let id_categoria = item.id_categoria
                con.query("SELECT nome FROM categorie_acqua WHERE id = ?", [id_categoria], (error, result) => {
                    let nome = result
                    nome.filter(element => {
                        return dati_acqua = { nome: element.nome, quantita: item.quantita }
                    })
                    req.dati_acqua = dati_acqua
                    next()
                })
            });
        })

    }
}

module.exports = acqua