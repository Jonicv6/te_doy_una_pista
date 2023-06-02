const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');


//Devolvera todas las tuplas
router.get('/comment', (req, res) => {
    mysqlConnection.query('SELECT * FROM Comment', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            res.json({status: 'Error Get All Comment '});
        }
    });
});


//Devolvera una tupla en concreto
/*router.get('/comment/:idComment', (req, res) => {
    const { idComment } = req.params;

    mysqlConnection.query('SELECT * FROM Comment WHERE idComment = ?', [idComment], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            res.json({status: 'Error Get Comment '});
        }
    });
});*/

//Devolvera una lista segun pista
router.get('/comment/:track/', (req, res) => {
    let trackAux = req.params.track;

    mysqlConnection.query(`SELECT * FROM Comment WHERE track =  "` + trackAux + `" ORDER BY date`, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            res.json({status: 'Error Get ListComment for Track'});
        }
    });
});



//Añadira una nueva tupla
router.post('/comment/', (req, res) => {
    const { track, user, text, date, score } = req.body;

    const query = `INSERT INTO Comment VALUES (NULL, ${track}, '${user}', '${text}', '${date}', ${score})`;

    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            res.json({ Status: 'Comment Saved' , idComment: rows.insertId});
        } else {
            res.json({status: 'Error Comment Created', error: err});
        }
    });
});


//Actualizara una tupla especifica
router.put('/comment/:idComment', (req, res) => {
    const { track, user, text, date } = req.body;
    const { idComment } = req.params;
    const query = `UPDATE Comment SET track = ${track}, user = '${user}', text = '${text}', date = '${date}' WHERE Comment.idComment = ${idComment}`;
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Comment Updated' });
        } else {
            res.json({status: 'Error Comment Updated'});
        }
    });
});


//Eliminara una tupla especifica
router.delete('/comment/:idComment', (req, res) => {
    let idComment = req.params.idComment;
    mysqlConnection.query(`DELETE FROM Comment WHERE idComment = ${idComment}`, (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Comment Deleted' });
        } else {
            res.json({status: 'Error Comment Deleted'});
            console.log(err);
        }
    });
});

module.exports = router;
