require("dotenv").config()
const cors = require('cors')
const express = require("express")
const path = require("path")
const app = express();
const ejs = require("ejs")
const router = require("./routes/router");
const mongoose = require("mongoose");
const session = require("express-session")
const FileStore = require('session-file-store')(session);

app.set("view engine", "ejs")

app.use(express.static("./public"))
app.use("/css", express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css")))
app.use("/js", express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js")))
app.use(cors())


app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({ path: './session-data' })
}));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use("/", router)

app.listen(3400, () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("Server started at port 3400")
    } catch (error) {
        console.log(error)
    }
})