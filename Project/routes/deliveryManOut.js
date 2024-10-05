var express = require('express');
var router = express.Router();

const sqlite = require('sqlite3').verbose();
db = new sqlite.Database("./db.sqlite", sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

router.post('/', (req, res) => {
    const {delivery_name, phone_number, email, password}=req.body;
    sql = "INSERT INTO delivery (delivery_name, phone_number, email, password) VALUES (?, ?, ?, ?)";
    db.run(sql, [delivery_name, phone_number, email, password], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send(err.message);
        }
        console.log('inserted');
    });
    res.redirect('/deliveryMan_signup.html');
    //return res.status(200).send('inserted');
})

router.get('/', function(req, res, next) {
    sql= "SELECT * FROM orders natural join shop";
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
});


module.exports = router;
