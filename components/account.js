const con = require("../connection")
const { nextTick } = require("process")
const bcrypt = require("bcrypt")

const account = {
    login: (req, res) => {
        res.render("login")
    },

    logout: (req, res) => {
        req.session.user = {}
        res.redirect("/login")
    },

    handleLogin: (req, res, next) => {
        try {
            const { body } = req
            const { wallet, password } = body
            con.query("SELECT * FROM account WHERE wallet = ?", [wallet], async(error, result) => {
                if (error) {
                    throw error
                }
                let account = []
                if (result.length > 0) {
                    const validPsw = await bcrypt.compare(password, result[0].password)
                    if (validPsw) {
                        account = result
                        req.session.user = { loggato: true, id: result[0].id }
                        return res.redirect("/")
                    } else {
                        return res.redirect("/login")
                    }
                }
                return res.redirect("/login")
            })
        } catch (error) {
            return res.send(error)
        }

    },
    singup: (req, res, next) => {
        res.render("singup")
    },

    handleSignup: async(req, res, next) => {
        try {
            const { body } = req
            const { wallet, nome, password } = body
            let colore = req.cookies["colore"] ? req.cookies["colore"] : []
            const splitColore = colore.split("#")
            let codiceColore = "0x" + splitColore[1]
            if (wallet && nome && password) {
                const salt = await bcrypt.genSalt(10)
                const newPsw = await bcrypt.hash(password, salt)
                con.query("INSERT INTO account (wallet, password) VALUES (?, ?)", [wallet, newPsw], (error, result) => {
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
                        con.query("INSERT INTO cibo (id_isola, id_categoria, quantita, acquistato) VALUES (?, ?, ?, ?)", [id_isola, 1, 50, 1], (error, result) => {})
                        con.query("INSERT INTO cibo (id_isola, id_categoria, quantita) VALUES (?, ?, ?)", [id_isola, 2, 0], (error, result) => {})
                        con.query("INSERT INTO cibo (id_isola, id_categoria, quantita) VALUES (?, ?, ?)", [id_isola, 3, 0], (error, result) => {})
                        con.query("INSERT INTO cibo (id_isola, id_categoria, quantita) VALUES (?, ?, ?)", [id_isola, 4, 0], (error, result) => {})
                        con.query("INSERT INTO cibo (id_isola, id_categoria, quantita) VALUES (?, ?, ?)", [id_isola, 5, 0], (error, result) => {})
                        con.query("INSERT INTO cibo (id_isola, id_categoria, quantita) VALUES (?, ?, ?)", [id_isola, 6, 0], (error, result) => {})
                        con.query("INSERT INTO cibo (id_isola, id_categoria, quantita) VALUES (?, ?, ?)", [id_isola, 7, 0], (error, result) => {})
                        con.query("INSERT INTO cibo (id_isola, id_categoria, quantita) VALUES (?, ?, ?)", [id_isola, 8, 0], (error, result) => {})
                        con.query("INSERT INTO acqua (id_isola, id_categoria, quantita, acquistato) VALUES (?, ?, ?, ?)", [id_isola, 1, 75, 1], (error, result) => {})
                        con.query("INSERT INTO persone (id_isola, id_categoria, quantita,acquistato) VALUES (?, ?, ?, ?)", [id_isola, 1, 6, 1], (error, result) => {})
                        con.query("INSERT INTO strutture (id_isola, id_categoria, quantita, acquistato) VALUES (?, ?, ?, ?)", [id_isola, 1, 1, 1], (error, result) => {})
                        con.query("INSERT INTO strutture (id_isola, id_categoria, quantita) VALUES (?, ?, ?)", [id_isola, 2, 0], (error, result) => {})
                        con.query("INSERT INTO strutture (id_isola, id_categoria, quantita, acquistato) VALUES (?, ?, ?, ?)", [id_isola, 3, 1, 1], (error, result) => {})
                        con.query("INSERT INTO strutture (id_isola, id_categoria, quantita, acquistato) VALUES (?, ?, ?, ?)", [id_isola, 4, 1, 1], (error, result) => {})
                    })
                })
            }
            return res.redirect("/login")
        } catch (error) {
            res.send(error)
        }
    },


}

module.exports = account