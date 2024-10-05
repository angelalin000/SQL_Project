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
    var ofood_time = new Date();
    var gfood_time = new Date(ofood_time.getTime() + 15 * 60000).toLocaleTimeString();  // 增加五分鐘
    ofood_time = ofood_time.toLocaleTimeString();
    const {client_orders, total, destination, phone, shop_name}=req.body;
    sql = "INSERT INTO orders (client_orders, ofood_time, gfood_time, total, destination, phone, shop_name) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.run(sql, [client_orders, ofood_time, gfood_time, total, destination, phone, shop_name], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send(err.message);
        }
        console.log('inserted');
    });
    res.redirect('/client.html');
    //return res.status(200).send('inserted');
})

router.get('/', function(req, res, next) {
    sql= "SELECT * FROM menu WHERE shop_name=?";
    db.all(sql, [req.query.param1], (err, rows) => {
        if (err) {
            res.send("error");
            throw err;
        }
        if (rows.length === 0) {
            // 沒有查到資料，回傳一個包含「查不到資料」訊息的 JSON 物件
            res.json({ message: "查不到資料" });
        } else {
            // 查到資料，回傳查詢結果的 JSON 物件
            res.json(rows);
        }

    });
});
module.exports = router;
