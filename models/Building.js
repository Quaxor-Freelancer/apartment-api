const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Image = require('./schemas/Image')

const FloorSchema =  new Schema({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: false
    },
    status: {
        type: Boolean,
        default: true
    },
    images: [{
        type: String
    }]
}, { timestamps: true })

const BuildingFacilitySchema =  new Schema({
    facilityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Facility',
        required: true
    },
    buildingFloorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building',
        required: true
    },
    code: {
        type: String,
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
    items:[{
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

const BuildingSchema = new Schema({
    buildingCode: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    buildingType: {
        type: String,
        enum: ['new', 'upcoming', 'future', 'default'],
        default: 'default'
    },
    facilities: [BuildingFacilitySchema],
    floors: [FloorSchema],
    images: [{
        type: String
    }],
    status: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });

const Building = mongoose.model('Building', BuildingSchema);
module.exports = Building