const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    floorId:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'buildings'
    },
    ownerId:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customers'
    },
    images: [{
        type: String
    }],
    status: {
        type: Boolean,
        default: true
    }
    }, { timestamps: true });


    const Apartment = mongoose.model('Apartment', ApartmentSchema);
    module.exports = Apartment

