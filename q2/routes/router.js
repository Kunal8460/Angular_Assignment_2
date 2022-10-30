const router = require("express").Router()
// const session = require("express-session")
// const FileStore = require('session-file-store')(session);
const path = require("path")
const e = require("express")


router.get("/", (req, res) => {
    res.render("index", { msg: null })
})
router.get('/dashboard', (req, res) => {
    if (req.session.loggedin == true) {
        res.render("dashboard", { email: req.session.email })
    }

})
router.post("/login", async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const response = await profileModel.findOne({ email: email })
    if (response.email === email && password === "kunal123") {
        req.session.email = email
        req.session.password = password
        req.session.loggedin = true
        res.redirect("/dashboard")
    } else {
        res.render("index", { msg: "Invalid Login Credentials" })
    }
})

router.get('/logout', (req, res) => {
    if (req.session.loggedin) {
        req.session.destroy(() => {
            console.log("Session Destroyed")
            res.redirect("/")
        })
    }
})

module.exports = router