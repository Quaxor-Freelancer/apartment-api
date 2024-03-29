const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Image = require('./schemas/Image')

const ApartmentSchema = new Schema({
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
    buildingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'buildings',
        required: true
    },
    floorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'buildings',
        required: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customers'
    },
    images: [Image],
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });


const Apartment = mongoose.model('apartment', ApartmentSchema);
module.exports = Apartment

