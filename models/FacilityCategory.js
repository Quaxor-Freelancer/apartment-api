const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FacilityCategorySchema = new Schema({
    code: {
        type: String,
        unique: true,
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

const FacilityCategory = mongoose.model('FacilityCategory', FacilityCategorySchema);
module.exports = FacilityCategory