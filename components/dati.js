const con = require("../connection");
const { nextTick } = require("process");

const dati = {
    risorse: async(req, res) => {
        /* let acqua = req.acqua
             let cibo = req.cibo
             let persone = req.persone
             let strutture = req.strutture*/
        let acquaUno = req.datiAcquaUno;
        let ciboUno = req.datiCiboUno;
        let ciboDue = req.datiCiboDue;
        let ciboTre = req.datiCiboTre;
        let ciboQuattro = req.datiCiboQuattro;
        let ciboCinque = req.datiCiboCinque;
        let ciboSei = req.datiCiboSei;
        let ciboSette = req.datiCiboSette;
        let ciboOtto = req.datiCiboOtto;
        let personeUno = req.datiPersoneUno;
        let struttureUno = req.datiStruttureUno;
        let struttureDue = req.datiStruttureDue;
        let struttureTre = req.datiStruttureTre;
        let struttureQuattro = req.datiStruttureQuattro;
        let dati = [
            acquaUno,
            ciboUno,
            ciboDue,
            ciboTre,
            ciboQuattro,
            ciboCinque,
            ciboSei,
            ciboSette,
            ciboOtto,
            personeUno,
            struttureUno,
            struttureDue,
            //struttureTre,
            //struttureQuattro
        ];
        res.render("generale", { dati });
    },
};

module.exports = dati;