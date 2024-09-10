import pg from 'pg'
const { Pool } = pg
import express from 'express'
const app = express()

//connect to db
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'andrewlogemann'
})

//app config
app.use(express.static('public'))
app.set('view engine','ejs')
app.use(express.urlencoded({ extended: true }));

//routes
app.get('/', (req,res) => {
    res.render('home')
})

app.post('/', (req,res) => {
    console.log('post!')
    res.redirect('/')
})

app.get('/new', (req, res) => {
    res.render('new')
})

//start server
app.listen(3000, () => {
    console.log('listening on port 3000')
})
