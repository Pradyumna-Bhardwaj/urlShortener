const express = require('express');
const path = require('path')
const {connectToMongoDB} = require("./connection.js")
const urlRoute = require("./routes/url");

const app = express();
const PORT = 8001;

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.use(express.json());

app.use("/url", urlRoute);
// app.use("/test", urlRoute);

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(()=>console.log("MongoDB connected"));


app.listen(PORT, ()=>{console.log("Server started at port:", PORT)});