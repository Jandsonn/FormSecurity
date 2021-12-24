const { query } = require('express');
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

app.get('/people', (req,res) => {
    const sql = "SELECT * FROM people"
    
    conn.query(sql, function(err, data){
        
        if(err){
            console.log(err)
            return
        }

        const people = data

        console.log(people)

        res.render('people',{people})

    })
})

app.get('/people/:id',(req,res) =>{
    const id = req.params.id

    const sql = `SELECT * FROM  people where id = ${id}`

    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }

        const peop = data[0]
        res.render('peop',{peop})
    })
})


app.get('/people/edit/:id', (req,res) => {
    const id = req.params.id
    
    const sql =  `SELECT * FROM people WHERE id = ${id}`
    
      conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }

        const peop = data [0]

        res.render('editpeop' ,{ peop })

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
