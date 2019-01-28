var router = require('express').Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
router.use(bodyParser.json())

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'sekolahku'
})

db.connect(()=>{
    console.log('Terhubung ke MySQL!')
});

// route POST data SIGNUP !
router.post('/signup', (req, res)=>{
    var sql = 'insert into users set ?'
    var data = { 
        username: req.body.username, 
        email: req.body.email, 
        password: req.body.password
    }
    
    db.query(sql, data, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send({
            username: req.body.username, 
            email: req.body.email,
            status: 'SignUp Sukses!'
        })
    });
})

// route POST data LOGIN
router.post('/login', (req, res)=>{
    var sql = `select * from users where username = '${req.body.username}' or email = '${req.body.email}'`;
    db.query(sql, (err, result)=>{
        if(err) {throw err;
        } 
        else if (result == 0){
            res.send({
                "login": "failed",
                "status": "Akun tidak terdaftar"
            })
        }
        else {
            if (req.body.password != result[0].password){
                res.send({
                    "login": "failed",
                    "status": "Password salah"
                })
            }
            else {
                res.send({
                    "login": "Ok!",
                    "status": "Login Sukses!"
                })
            }
        }
    console.log(result);
    })
})


module.exports = router;