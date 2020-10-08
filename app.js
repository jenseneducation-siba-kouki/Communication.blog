const express = require('express')
const app = express()


app.set("view engine", "ejs")


app.use( express.urlencoded({extended: true}) )
app.use(express.static('public'))

app.get('/', (req,res) => {
    res.render("index")
})

app.get('/register', (req,res) => {
    res.render("register")
})


app.listen(8000, () => console.log("Server started"))
