const express = require("express");
const router = express.Router();

const mysqlConnection = require("../database");

//Devolvera todas las tuplas
router.get("/track", (req, res) => {
    mysqlConnection.query("SELECT * FROM Track", (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            res.json({status: 'Error Get All Track '});
        }
    });
});

//Devolvera todas las tuplas segun pabellon y deporte
router.get("/track/:idSportCenter/:sport", (req, res) => {
    var idSportCenter = req.params.idSportCenter;
    var sport = req.params.sport;
    mysqlConnection.query(
        `SELECT t.idTrack, t.sportCenter, t.name, t.sport, t.type, t.price FROM Track t JOIN SportCenter s ON s.idSportCenter = t.sportCenter WHERE t.sportCenter=  "` +
        idSportCenter +
        `" AND t.sport LIKE "%` +
        sport +
        `%"`,
        (err, rows, fields) => {
            if (!err) {
                res.json(rows);
            } else {
                res.json({status: 'Error Get Track for Sportcenter and Sport '});
            }
        }
    );
});

//Devolvera una tupla en concreto
router.get("/track/:idTrack", (req, res) => {
    const { idTrack } = req.params;
    console.log(idTrack);
    mysqlConnection.query(
        "SELECT * FROM Track WHERE idTrack = ?",
        [idTrack],
        (err, rows, fields) => {
            if (!err) {
                res.json(rows[0]);
            } else {
                res.json({status: 'Error Get Track '});
            }
        }
    );
});

//Añadira una nueva tupla
router.post("/track/", (req, res) => {
    const { idTrack, sportCenter, name, sport, type, price } = req.body;

    const query = `
        CALL trackAddOrEdit(?, ?, ?, ?, ?, ?);
    `;
    mysqlConnection.query(
        query,
        [idTrack, sportCenter, name, sport, type, price],
        (err, rows, fields) => {
            if (!err) {
                res.json({ Status: "Track Saved" });
            } else {
                res.json({status: 'Error Created Track '});
            }
        }
    );
});

//Actualizara una tupla especifica
router.put("/track/:idTrack", (req, res) => {
    const { sportCenter, name, sport, type, price } = req.body;
    const { idTrack } = req.params;
    const query = "CALL trackAddOrEdit(?, ?, ?, ?, ?, ?);";
    mysqlConnection.query(
        query,
        [idTrack, sportCenter, name, sport, type, price],
        (err, rows, fields) => {
            if (!err) {
                res.json({ status: "Track Updated" });
            } else {
                res.json({status: 'Error Updated Track '});
            }
        }
    );
});

//Eliminara una tupla especifica
router.delete("/track/:idTrack", (req, res) => {
    const { idTrack } = req.params;
    mysqlConnection.query(
        "DELETE FROM Track WHERE idTrack =?",
        [idTrack],
        (err, rows, fields) => {
            if (!err) {
                res.json({ status: "Track Deleted" });
            } else {
                res.json({status: 'Error Deleted Track '});
            }
        }
    );
});

module.exports = router;
