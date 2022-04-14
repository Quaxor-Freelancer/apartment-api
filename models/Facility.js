const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Image = require('./schemas/Image')

const FacilitySchema = new Schema({
    facilityCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Facility',
        required: true
    },
    buildingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building',
        required: true
    },
    floorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building',
        required: true
    },
    code: {
        type: String,
        unique: true,
        required: true
    },
    common: {
        type: Boolean,
        default: true
    },
    name: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: false
    },
    divisible: {
        type: Boolean,
        default: false
    },
    items: [{
        code: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    }],
    status: {
        type: Boolean,
        default: true
    },
    images: [Image]
}, { timestamps: true })


const Facility = mongoose.model('facility', FacilitySchema);
module.exports = Facility