import pg from 'pg'
import express from 'express'
import conn from './dbconnect.js'

//initialize app/db
const app = express()
const { Pool } = pg
const pool = new Pool(conn)

//app config
app.use(express.static('public'))
app.set('view engine','ejs')
app.use(express.urlencoded({ extended: true }));

//routes
app.get('/', async (req,res) => {
    const result = await pool.query('select * from meals')
    const { rows } = result
    res.render('home', rows)
})

app.post('/', async (req,res) => {
    const { type,description,calories } = req.body
    const result = await pool.query('insert into meals (type, description, calories) values ($1,$2,$3)',[type, description, calories])
    res.redirect('/')
})

app.get('/new', (req, res) => {
    res.render('new')
})

//start server
app.listen(3000, () => {
    console.log('listening on port 3000')
})
