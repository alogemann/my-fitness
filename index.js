import express from 'express'
const app = express()

//app config
app.use(express.static('public'))
app.set('view engine','ejs')

//routes
app.get('/', (req,res) => {
    res.render('home')
})

//start server
app.listen(3000, () => {
    console.log('listening on port 3000')
})
