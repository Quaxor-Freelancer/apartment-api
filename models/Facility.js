const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FacilitySchema = new Schema({
    code: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: false
    },
    icon: {
        type: String,
        required: false
    },
    status: {
        type: Boolean,
        default: true
    }
    }, { timestamps: true }
);

const Facility = mongoose.model('Facility', FacilitySchema);
module.exports = Facility