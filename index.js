const express = require('express');
const path = require('path')
const cookieParser = require('cookie-parser')
const {connectToMongoDB} = require("./connection.js")
const {restrictToLoggedinUserOnly, checkAuth} = require("./middlewares/auth.js")

const urlRoute = require("./routes/url");
const staticRouter = require("./routes/staticRouter.js");
const userRoute = require("./routes/user.js")

const app = express();
const PORT = 8001;

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use("/", checkAuth, staticRouter);
app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(()=>console.log("MongoDB connected"));


app.listen(PORT, ()=>{console.log("Server started at port:", PORT)});