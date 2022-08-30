const con = require("../connection")
const { nextTick } = require("process")

const evoluzione = {
    evoluzione: (req, res, next) => {
        let id_isola = req.session.user.id
        const { body } = req
        const { evoluzione } = body

        function SortArray(x, y) {
            if (x.id_categoria < y.id_categoria) { return -1; }
            if (x.id_categoria > y.id_categoria) { return 1; }
            return 0;
        }
        con.query("SELECT * FROM isole WHERE id = ?", [id_isola], (error, result) => {
            let mana = result[0].mana
            let livelloEvoluzione = result[0].evoluzione
            if (evoluzione && mana >= 10000) {
                if (livelloEvoluzione < 4) {
                    mana = mana - 10000
                    livelloEvoluzione = livelloEvoluzione + 1
                    con.query("UPDATE isole SET evoluzione = ? WHERE id = ?", [livelloEvoluzione, id_isola], (error, result) => {})
                    con.query("UPDATE isole SET mana = ? WHERE id = ?", [mana, id_isola], (error, result) => {})
                    con.query("UPDATE strutture SET livello_evoluzione = ? WHERE id = ? AND id_isola = ?", [livelloEvoluzione, 1, id_isola], (error, result) => {})
                    con.query("UPDATE strutture SET livello_evoluzione = ? WHERE id = ? AND id_isola = ?", [livelloEvoluzione, 2, id_isola], (error, result) => {})
                    con.query("UPDATE strutture SET livello_evoluzione = ? WHERE id = ? AND id_isola = ?", [livelloEvoluzione, 3, id_isola], (error, result) => {})
                    con.query("UPDATE strutture SET livello_evoluzione = ? WHERE id = ? AND id_isola = ?", [livelloEvoluzione, 4, id_isola], (error, result) => {})
                    con.query("UPDATE strutture SET livello_evoluzione = ? WHERE id = ? AND id_isola = ?", [livelloEvoluzione, 5, id_isola], (error, result) => {})
                    con.query("UPDATE strutture SET livello_evoluzione = ? WHERE id = ? AND id_isola = ?", [livelloEvoluzione, 6, id_isola], (error, result) => {})
                    con.query("UPDATE cibo SET livello_evoluzione = ? WHERE id = ? AND id_isola = ?", [livelloEvoluzione, 1, id_isola], (error, result) => {})
                    con.query("UPDATE cibo SET livello_evoluzione = ? WHERE id = ? AND id_isola = ?", [livelloEvoluzione, 2, id_isola], (error, result) => {})
                    con.query("UPDATE cibo SET livello_evoluzione = ? WHERE id = ? AND id_isola = ?", [livelloEvoluzione, 3, id_isola], (error, result) => {})
                    con.query("UPDATE cibo SET livello_evoluzione = ? WHERE id = ? AND id_isola = ?", [livelloEvoluzione, 4, id_isola], (error, result) => {})
                    con.query("UPDATE cibo SET livello_evoluzione = ? WHERE id = ? AND id_isola = ?", [livelloEvoluzione, 5, id_isola], (error, result) => {})
                    con.query("UPDATE cibo SET livello_evoluzione = ? WHERE id = ? AND id_isola = ?", [livelloEvoluzione, 6, id_isola], (error, result) => {})
                    con.query("UPDATE cibo SET livello_evoluzione = ? WHERE id = ? AND id_isola = ?", [livelloEvoluzione, 7, id_isola], (error, result) => {})
                    con.query("UPDATE cibo SET livello_evoluzione = ? WHERE id = ? AND id_isola = ?", [livelloEvoluzione, 8, id_isola], (error, result) => {})
                }
            }
        })
        next()
    }
}

module.exports = evoluzione