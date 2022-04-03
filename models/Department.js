const mongoose = require('mongoose');

const useSchema = mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: [true, "Please add Department code"]
    },
    title: {
        type: String,
        required: [true, "Please add First name"]
    },
    description: {
        type: String,
        required: false
    }
}, { timestamps: true })

module.exports = mongoose.model("Department", useSchema);
