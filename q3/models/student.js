const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
    rollno: { type: Number },
    name: { type: String },
    gender: { type: String },
    email: { type: String },
    contact: { type: Number },
    address: { type: String }
})
const Students = mongoose.model('students', studentSchema, 'students')
module.exports = Students
