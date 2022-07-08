const con = require("../connection")
const { nextTick } = require("process")


const account = {
    singUp: (req, res, next) => {
        res.render("singup")
    },

    handleSignUp: (req, res, next) => {
        try {
            const { body } = req
            const { wallet, nome } = body
            let colore = req.cookies["colore"] ? req.cookies["colore"] : []
            const splitColore = colore.split("#")
            let codiceColore = "0x" + splitColore[1]
            if (wallet && nome) {
                con.query("INSERT INTO account (wallet) VALUES (?)", [wallet], (error, result) => {
                    let id = result.insertId
                    con.query("INSERT INTO isole (id_account, colore, nome) VALUES (?, ?, ?)", [id, codiceColore, nome], (error, result) => {
                        let id_isola = result.insertId
                        con.query("SELECT tempo FROM isole", (error, result) => {
                            let tempo = result[0].tempo
                            setInterval(() => {
                                tempo = tempo + 1
                                con.query("UPDATE isole SET tempo = ? WHERE id = ?", [tempo, id_isola], (error, result) => {})
                            }, 10000)
                        })
                        con.query("INSERT INTO cibo (id_isola, id_categoria, quantita) VALUES (?, ?, ?)", [id_isola, 1, 50], (error, result) => {})
                        con.query("INSERT INTO acqua (id_isola, id_categoria, quantita) VALUES (?, ?, ?)", [id_isola, 1, 75], (error, result) => {})
                        con.query("INSERT INTO persone (id_isola, id_categoria, quantita) VALUES (?, ?, ?)", [id_isola, 1, 6], (error, result) => {})
                        con.query("INSERT INTO strutture (id_isola, id_categoria, quantita) VALUES (?, ?, ?)", [id_isola, 1, 1], (error, result) => {})
                        con.query("INSERT INTO strutture (id_isola, id_categoria, quantita) VALUES (?, ?, ?)", [id_isola, 3, 1], (error, result) => {})
                        con.query("INSERT INTO strutture (id_isola, id_categoria, quantita) VALUES (?, ?, ?)", [id_isola, 4, 1], (error, result) => {})
                    })
                })
            }
            return res.redirect("/singup")
        } catch (error) {
            res.send(error)
        }
        next()
    },


}

module.exports = account