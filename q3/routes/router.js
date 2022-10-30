const router = require("express").Router()
const jwt = require("jsonwebtoken")
const verifyToken = require("../auth")
const Students = require("../models/student")
const path = require("path")
const e = require("express")
const { findByIdAndUpdate, findById, findOneAndUpdate } = require("../models/student")
const { response } = require("express")


router.get("/", (req, res) => {
    res.render("index", { msg: null })
})

router.post("/login", async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    // const response = await Students.findOne({ email: email })
    if (email === "admin@admin.com" && password === "admin123") {
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "30d" });
        req.session.token = token
        req.session.loggedin = true
        // req.session.email = email
        // req.session.password = password
        //  res.redirect("/dashboard")
        res.send({ email, password });
    } else {
        res.render("index", { msg: "Invalid Login Credentials" })
    }
})

router.get('/dashboard', verifyToken, async (req, res) => {
    // if (req.session.loggedin == true) {
    const students = await Students.find({})
    // res.render("dashboard", { email: req.session.email, students })
    res.render("dashboard", { students })
    // }

})

router.get("/create", (req, res) => {
    res.render("create")
})

router.post("/save", async (req, res) => {
    const newStudent = new Students({
        rollno: req.body.rollno,
        name: req.body.name,
        gender: req.body.gender,
        email: req.body.email,
        contact: req.body.contactno,
        address: req.body.address
    })
    const response = await Students.create(newStudent)
    res.redirect("/dashboard")
})

router.get("/edit/:id", async (req, res) => {
    const { id } = req.params
    const getStudent = await Students.findById({ _id: id })
    res.render("edit", { getStudent })
})
router.post("/update/:id", async (req, res) => {
    const { id } = req.params
    const updatedStudent = new Students({
        _id: id,
        rollno: req.body.rollno,
        name: req.body.name,
        gender: req.body.gender,
        email: req.body.email,
        contact: req.body.contactno,
        address: req.body.address
    })
    const response = await Students.findByIdAndUpdate({ _id: id }, updatedStudent, { new: true })
    if (response != null) {
        res.redirect("/dashboard")
    }
})

router.get("/delete/:id", async (req, res) => {
    const { id } = req.params
    const reponse = await Students.findByIdAndDelete({ _id: id })
    if (response != null) {
        res.redirect("/dashboard")
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