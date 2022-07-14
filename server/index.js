const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'mpti'
});

app.post('/register', (req, res) => {
    const email = req.body.email
    const nama = req.body.nama
    const password = req.body.password

    db.query('INSERT INTO tb_pelanggan (email, nama, password) VALUES (?,?,?)', 
    [email, nama, password], 
    (err, result) => {
        console.log(err);
    });
});

app.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    db.query('SELECT * FROM tb_pelanggan WHERE email = ? AND password = ?', 
    [email, password], 
    (err, result) => {
        if (err)
            res.send({err: err});

        if (result.length > 0)
            res.send(result);
        else
            res.send({message: "email/password invalid!"})
        
    });
});

app.listen(3001, () => {
    console.log("Yeay, your server is running");
});