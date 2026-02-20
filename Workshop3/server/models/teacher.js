const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    idNumber: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    }
});

module.exports = mongoose.model('Teacher', teacherSchema);
