const con = require("../connection");
const { nextTick } = require("process");

const dati = {
    risorse: async(req, res) => {
        const acquaUno = req.datiAcquaUno;
        const ciboUno = req.datiCiboUno;
        const ciboDue = req.datiCiboDue;
        const ciboTre = req.datiCiboTre;
        const ciboQuattro = req.datiCiboQuattro;
        const ciboCinque = req.datiCiboCinque;
        const ciboSei = req.datiCiboSei;
        const ciboSette = req.datiCiboSette;
        const ciboOtto = req.datiCiboOtto;
        const personeUno = req.datiPersoneUno;
        const struttureUno = req.datiStruttureUno;
        const struttureDue = req.datiStruttureDue;
        const struttureTre = req.datiStruttureTre;
        const struttureQuattro = req.datiStruttureQuattro;
        const dati = [
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
            struttureTre,
            struttureQuattro
        ];
        res.render("generale", { dati });
    },
};

module.exports = dati;