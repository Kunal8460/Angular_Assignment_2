const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
    name: { type: String },
    gender: { type: String },
    email: { type: String },
    image: { type: String },
    gallery: { type: Array }
})
const profileModel = mongoose.model('profile', profileSchema, 'profiles')
module.exports = profileModel
