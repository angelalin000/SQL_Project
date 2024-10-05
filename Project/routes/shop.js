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
    const {shop_name, meals, meals_value}=req.body;
    sql = "INSERT INTO menu (shop_name, meals, meals_value) VALUES (?, ?, ?)";
    db.run(sql, [shop_name, meals, meals_value], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send(err.message);
        }
        console.log('inserted');
    });
    res.redirect('/shop.html');
    //return res.status(200).send('inserted');
})

router.get('/', function(req, res, next) {
    sql= "SELECT * FROM orders WHERE shop_name=?";
    db.all(sql, [req.query.param1], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
});

module.exports = router;
