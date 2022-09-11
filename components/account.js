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
                console.log(result)
                console.log(process.env.DATABASE_PASSWORD)
                const id_account = result[0].id
                const passwordAccount = result[0].password
                con.query("SELECT * FROM isole WHERE id_account = ?", [id_account], async(error, result) => {
                    if (error) {
                        throw error
                    }
                    let account = []
                    if (result.length > 0) {
                        const validPsw = await bcrypt.compare(password, passwordAccount)
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
            if (wallet && nome && password) {
                con.query("SELECT * FROM account WHERE wallet = ?", [wallet], async(error, result) => {
                    if (result.length == 0) {
                        const salt = await bcrypt.genSalt(10)
                        const newPsw = await bcrypt.hash(password, salt)
                        con.query("INSERT INTO account (wallet, password) VALUES (?, ?)", [wallet, newPsw], (error, result) => {
                            let id = result.insertId
                            con.query("INSERT INTO isole (id_account, nome) VALUES (?, ?)", [id, nome], (error, result) => {
                                let id_isola = result.insertId
                                con.query("SELECT tempo FROM isole", (error, result) => {
                                    let tempo = result[0].tempo
                                    setInterval(() => {
                                        tempo = tempo + 1
                                        con.query("UPDATE isole SET tempo = ? WHERE id = ?", [tempo, id_isola], (error, result) => {})
                                    }, 60000)
                                })
                                con.query("INSERT INTO cibo (id_isola, id_categoria, quantita) VALUES (?, ?, ?)", [id_isola, 2, 0], (error, result) => {})
                                con.query("INSERT INTO cibo (id_isola, id_categoria, quantita) VALUES (?, ?, ?)", [id_isola, 3, 0], (error, result) => {})
                                con.query("INSERT INTO cibo (id_isola, id_categoria, quantita) VALUES (?, ?, ?)", [id_isola, 4, 0], (error, result) => {})
                                con.query("INSERT INTO cibo (id_isola, id_categoria, quantita) VALUES (?, ?, ?)", [id_isola, 5, 0], (error, result) => {})
                                con.query("INSERT INTO cibo (id_isola, id_categoria, quantita) VALUES (?, ?, ?)", [id_isola, 6, 0], (error, result) => {})
                                con.query("INSERT INTO cibo (id_isola, id_categoria, quantita) VALUES (?, ?, ?)", [id_isola, 7, 0], (error, result) => {})
                                con.query("INSERT INTO cibo (id_isola, id_categoria, quantita) VALUES (?, ?, ?)", [id_isola, 8, 0], (error, result) => {})
                                con.query("INSERT INTO strutture (id_isola, id_categoria, quantita) VALUES (?, ?, ?)", [id_isola, 1, 1], (error, result) => {})
                                con.query("INSERT INTO strutture (id_isola, id_categoria, quantita) VALUES (?, ?, ?)", [id_isola, 2, 0], (error, result) => {})
                                con.query("INSERT INTO strutture (id_isola, id_categoria, quantita) VALUES (?, ?, ?)", [id_isola, 4, 1], (error, result) => {})
                                con.query("INSERT INTO tutorial (id_isola, step ) VALUES (?, ?)", [id_isola, 1], (error, result) => {})
                                con.query("INSERT INTO tutorial (id_isola, step ) VALUES (?, ?)", [id_isola, 2], (error, result) => {})
                                con.query("INSERT INTO tutorial (id_isola, step ) VALUES (?, ?)", [id_isola, 3], (error, result) => {})
                                con.query("INSERT INTO tutorial (id_isola, step ) VALUES (?, ?)", [id_isola, 4], (error, result) => {})
                                con.query("INSERT INTO tutorial (id_isola, step ) VALUES (?, ?)", [id_isola, 5], (error, result) => {})
                                con.query("INSERT INTO tutorial (id_isola, step ) VALUES (?, ?)", [id_isola, 6], (error, result) => {})
                                con.query("INSERT INTO tutorial (id_isola, step ) VALUES (?, ?)", [id_isola, 7], (error, result) => {})
                                con.query("INSERT INTO tutorial (id_isola, step ) VALUES (?, ?)", [id_isola, 8], (error, result) => {})
                                con.query("INSERT INTO cibo (id_isola, id_categoria, quantita, acquistato, quantita_acquistato) VALUES (?, ?, ?, ?, ?)", [id_isola, 1, 50, 1, 1], (error, result) => {})
                                con.query("INSERT INTO acqua (id_isola, id_categoria, quantita) VALUES (?, ?, ?)", [id_isola, 1, 75], (error, result) => {})
                                con.query("INSERT INTO persone (id_isola, id_categoria, quantita, quantita_acquistato) VALUES (?, ?, ?, ?)", [id_isola, 1, 6, 1], (error, result) => {})
                                con.query("INSERT INTO strutture (id_isola, id_categoria, quantita) VALUES (?, ?, ?)", [id_isola, 3, 0], (error, result) => {})
                                con.query("INSERT INTO strutture (id_isola, id_categoria, quantita) VALUES (?, ?, ?)", [id_isola, 5, 0], (error, result) => {})
                                con.query("INSERT INTO strutture (id_isola, id_categoria, quantita) VALUES (?, ?, ?)", [id_isola, 6, 0], (error, result) => {})
                                return res.redirect("/login")
                            })
                        })
                    } else {
                        return res.redirect("/singup")
                    }
                })
            }
        } catch (error) {
            res.send(error)
        }
    },


}

module.exports = account