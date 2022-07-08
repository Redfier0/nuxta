const con = require("../connection")
const { nextTick } = require("process")


const dettagli = {
    dettagliUpdate: (req, res) => {
        try {
            const { body } = req
            const { nome, id_isola } = body
            console.log("id_isola", id_isola)
            let colore = req.cookies["colore"] ? req.cookies["colore"] : []
            const splitColore = colore.split("#")
            let codiceColore = "0x" + splitColore[1]
            if (nome) {
                //c'è da usale l'update e non l'insert trovare un modo di dare l'id
                //con.query("INSERT INTO isole (color, nome) VALUES (?, ?)", [codiceColore, nome], (error, result) => {})
                setInterval
                con.query("SELECT tempo FROM isole", (error, result) => {
                    let tempo = result[0].tempo
                        //con.query("INSERT INTO strutture (id_isola, id_categoria, quantita) VALUES (?, ?, ?)", [id, 4, 1], (error, result) => {})
                })
                return res.redirect("/singup")
            } else {
                return res.redirect("/singup")
            }
        } catch (error) {

            res.send(error)
        }
    },


}

module.exports = dettagli