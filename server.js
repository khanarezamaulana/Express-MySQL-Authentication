var express = require('express');
var mysql = require('mysql');
var mysqlRoute = require('./Route/mysqlRoute')

var app = express()
app.use(mysqlRoute)

// route
app.get('/', (req, res)=>{
    res.send('Express ♥ MySQL')
})

app.listen(2001, ()=>{
    console.log('Server aktif diport 2001!')
})