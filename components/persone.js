const con = require("../connection")
const { nextTick } = require("process")

const persone = {
    persone: (req, res, next) => {
        let id_isola = req.session.user.id
        let dati_persone = []
        con.query("SELECT * FROM persone WHERE id_isola = ?", [id_isola], (error, result) => {
            let persone = result
            persone.filter(item => {
                let id_categoria = item.id_categoria
                con.query("SELECT nome FROM categorie_persone WHERE id = ?", [id_categoria], (error, result) => {
                    let nome = result
                    nome.filter(element => {
                        return dati_persone = { nome: element.nome, quantita: item.quantita }
                    })
                    req.dati_persone = dati_persone
                    next()
                })
            });
        })
    }
}

module.exports = persone