const express = require('express');
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express();

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/',(req,res) => {
    res.render('home')
})

app.post('/people/insertpeople',(req,res) => {

     const name = req.body.name
     const email = req.body.email
     const age = req.body.age
     const taxpayer = req.body.taxpayer

     const bagagem = `INSERT INTO people (name, email, age, taxpayer) VALUES ('${name}', '${email}', '${age}',  '${taxpayer}')` 
    
     conn.query(bagagem, function(err){
         if(err){
             console.log(err)
         }
         res.redirect('/')
     })

})

const conn = mysql.createConnection({
    host:'127.0.0.1',
    user:'jandson',
    password:'Jandefake3*',
    database:'nodemysql1',
})

conn.connect(function(err){
    if(err){
        console.log(err)
    }

    console.log('Connected in mysql');
    app.listen(3000)

})
