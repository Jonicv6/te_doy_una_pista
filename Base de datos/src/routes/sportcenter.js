const express = require("express");
const router = express.Router();

const mysqlConnection = require("../database");

//Devolvera todas las tuplas
router.get("/sportcenter", (req, res) => {
  mysqlConnection.query("SELECT * FROM SportCenter", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      res.json({status: 'Error Get All SportCenter '});
    }
  });
});

//Devolvera una tupla en concreto
router.get("/sportcenter/:idSportCenter", (req, res) => {
  const { idSportCenter } = req.params;
  console.log(idSportCenter);
  mysqlConnection.query(
    `SELECT * FROM SportCenter WHERE idSportCenter = ?`,
    [idSportCenter],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    }
  );
});

//Devolver una lista de SportCenter segun la ciudad y el deporte
router.get("/sportcenter/:cityAux/:sportAux", (req, res) => {
  var cityAux = req.params.cityAux;
  var sportAux  = req.params.sportAux;
  //console.log(cityAux + " - " + sportAux);
  mysqlConnection.query(
    `SELECT s.idSportCenter, s.name, s.street, s.city, s.postalcode, s.province, s.country, s.latitude, s.longitude FROM SportCenter s JOIN Track t ON s.idSportCenter = t.sportCenter WHERE s.city = "`+cityAux+`" AND t.sport LIKE "%`+sportAux+`%" GROUP BY s.idSportCenter`,
    
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        res.json({status: 'Error Updated SportCenter '});
      }
    }
  );
});

//Añadira una nueva tupla
router.post("/sportcenter/", (req, res) => {
  const {
    idSportCenter,
    name,
    street,
    city,
    postalcode,
    province,
    country,
    longitude,
    latitude,
  } = req.body;

  const query = `
        CALL sportcenterAddOrEdit(?, ?, ?, ?, ?, ?, ? , ?, ?);
    `;
  mysqlConnection.query(
    query,
    [
      idSportCenter,
      name,
      street,
      city,
      postalcode,
      province,
      country,
      longitude,
      latitude,
    ],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: "SportCenter Saved" });
      } else {
        res.json({status: 'Error Created SportCenter '});
      }
    }
  );
});

//Actualizara una tupla especifica
router.put("/sportcenter/:idSportCenter", (req, res) => {
  const {
    name,
    street,
    city,
    postalcode,
    province,
    country,
    longitude,
    latitude,
  } = req.body;
  const { idSportCenter } = req.params;
  const query = "CALL sportcenterAddOrEdit(?, ?, ?, ?, ?, ?, ?, ?, ?);";
  mysqlConnection.query(
    query,
    [
      idSportCenter,
      name,
      street,
      city,
      postalcode,
      province,
      country,
      longitude,
      latitude,
    ],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "SportCenter Updated" });
      } else {
        res.json({status: 'Error Updated SportCenter '});
      }
    }
  );
});

//Eliminara una tupla especifica
router.delete("/sportcenter/:idSportCenter", (req, res) => {
  const { idSportCenter } = req.params;
  mysqlConnection.query(
    "DELETE FROM SportCenter WHERE idSportCenter =?",
    [idSportCenter],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "SportCenter Deleted" });
      } else {
        res.json({status: 'Error Deleted SportCenter '});
      }
    }
  );
});

module.exports = router;
