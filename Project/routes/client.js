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
    const {client_name, phone_number, email, password}=req.body;
    sql = "INSERT INTO client (client_name, phone_number, email, password) VALUES (?, ?, ?, ?)";
    db.run(sql, [client_name, phone_number, email, password], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send(err.message);
        }
        console.log('inserted');
    });
    res.redirect('/client_login.html');
    //return res.status(200).send('inserted');
})

router.get('/', function(req, res, next) {
    sql= "SELECT * FROM client WHERE email=? and password=?";
    db.all(sql, [req.query.param1, req.query.param2], (err, rows) => {
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
