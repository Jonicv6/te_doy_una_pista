const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');


//Devolvera todas las tuplas
router.get('/reserve', (req, res) => {
    mysqlConnection.query('SELECT * FROM Reserve', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            res.json({ status: 'Error Get All Reserve ' });
        }
    });
});


//Devolvera una tupla en concreto
router.get('/reserve/:idReserve', (req, res) => {
    const { idReserve } = req.params;

    mysqlConnection.query('SELECT * FROM Reserve WHERE idReserve = ?', [idReserve], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            res.json({ status: 'Error Get Reserve ' });
        }
    });
});

//Devolvera una tupla segun pista y fecha
router.get('/reserve/:track/:date/', (req, res) => {
    let trackAux = req.params.track;
    let dateAux = req.params.date;

    mysqlConnection.query(`SELECT * FROM Reserve WHERE track =  "` + trackAux + `" AND date = "` + dateAux + `"`, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            res.json({ status: 'Error Get ListReserve for Track and Date' });
        }
    });
});

//Devolvera todas las tuplas, unicamente la columna hora, segun pabellon y tipo de la pista
router.get("/reserve/:idSportCenter/:date/:type", (req, res) => {
    var idSportCenter = req.params.idSportCenter;
    var dateAux = req.params.date;
    var type = req.params.type;
    mysqlConnection.query(
        `SELECT hour FROM Reserve WHERE date = "` + dateAux + `" AND track IN (SELECT t.idTrack FROM Track t JOIN SportCenter s ON s.idSportCenter = t.sportCenter WHERE t.sportCenter=  "` +
        idSportCenter +
        `" AND t.type LIKE "%` +
        type +
        `%") GROUP BY hour`,
        (err, rows, fields) => {
            if (!err) {
                res.json(rows);
            } else {
                res.json({ status: 'Error Get Hour' });
            }
        }
    );
});


//Añadira una nueva tupla
router.post('/reserve/', (req, res) => {
    const { track, date, hour, user } = req.body;

    const query = `INSERT INTO Reserve VALUES (NULL, ${track}, '${date}', '${hour}', '${user}')`;
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            res.status(200).json({ code: '200', status: 'Reserve Saved', idReserve: rows.insertId });
        } else {
            res.status(500).json({ code: '500', status: 'Error Reserve Created' });
        }
    });
});


//Actualizara una tupla especifica
router.put('/reserve/:idReserve', (req, res) => {
    const { track, date, hour, user } = req.body;
    const { idReserve } = req.params;
    const query = `UPDATE Reserve SET track = ${track}, date = '${date}', hour = '${hour}', user = '${user}' WHERE Reserve.idReserve = ${idReserve}`;
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Reserve Updated' });
        } else {
            res.json({ status: 'Error Reserve Updated' });
        }
    });
});


//Eliminara una tupla especifica
router.delete('/reserve/:idReserve', (req, res) => {
    let idReserve = req.params.idReserve;
    mysqlConnection.query(`DELETE FROM Reserve WHERE idReserve = ${idReserve}`, (err, rows, fields) => {
        if (!err) {
            res.status(200).json({ code: '200', status: 'Reserve Deleted' });
        } else {
            res.status(500).json({ code: '500', status: 'Error Reserve Deleted' });
            console.log(err);
        }
    });
});

module.exports = router;
