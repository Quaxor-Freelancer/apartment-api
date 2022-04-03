const mongoose = require('mongoose');

const useSchema = mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: [true, "Please add Customer Code"]
    },
    firstname: {
        type: String,
        required: [true, "Please add First name"]
    },
    lastname: {
        type: String,
        required: [true, "Please add Last name"]
    },
    email: {
        type: String,
        required: [true, "Please add an Email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add Password"]
    },
    phone: {
        type: String,
        required: [true, "Please add Phone"]
    },
    address: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true
    },
    accountRecovery: {
        OTP: {
            type: String,
            default: null
        },
        expirationTime: {
            type: mongoose.Schema.Types.Date,
            detault: null
        }
    }
}, { timestamps: true })

module.exports = mongoose.model("Customer", useSchema);





