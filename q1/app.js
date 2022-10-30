const express = require("express")
const path = require("path")
const app = express();
const ejs = require("ejs")
const router = require("./routes/router")

app.set("view engine", "ejs")

app.use(express.static("./public"))
app.use("/css", express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css")))
app.use("/js", express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js")))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use("/", router)

app.listen(3400, () => {
    console.log("Server started at port 3400")
})