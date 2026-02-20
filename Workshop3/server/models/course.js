const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    credits: {
        required: true,
        type: Number
    },
    teacherID: {
        required: true,
        type: mongoose.Schema.Types.ObjectId, //clave foranea a Teacher
  }
})

module.exports = mongoose.model('Course', courseSchema)