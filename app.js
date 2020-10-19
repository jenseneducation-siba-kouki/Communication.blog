const express = require('express')
const app = express()
const path = require("path");
const cookieParser = require("cookie-parser");
const navRoutes = require("./routes/nav");


app.set("view engine", "ejs")

app.use(express.static(path.join(__dirname, "/public")));
app.use( express.urlencoded({extended: true}) )
app.use(express.json());
app.use(cookieParser());

app.use("/", navRoutes);


app.listen(8000, () => console.log("Server started"))
