import pg from 'pg'
import express from 'express'
import fs from 'fs'
import conn from './dbconnect.js'
import q from './queries.js'

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
    const hoy = await pool.query(q.hoy)
    const ayer = await pool.query(q.ayer)
    const totals = await pool.query(q.totals)
    const hoyData = hoy.rows
    const ayerData = ayer.rows
    const totData = {
        day_0: totals.rows[0],
        day_1: totals.rows[1]
    }
    //send data to client for use with D3
    fs.writeFile('public/data.json',JSON.stringify(totData), (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully");
            console.log("The written has the following contents:");
            console.log(fs.readFileSync("public/data.json", "utf8"));
        }
    }) //to be tested
    res.render('home', {hoyData, ayerData})
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
