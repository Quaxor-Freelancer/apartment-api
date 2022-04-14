const mongoose = require('mongoose');

const employeeLoginSchema = mongoose.Schema({
    employeeId: {
        type: String,
        unique: true,
        required: [true, "Please add Employee Code"]
    },
    ip: {
        type: String
    },
    success: {
        type: Boolean
    }
}, { timestamps: true })

module.exports = mongoose.model("employeeLogin", employeeLoginSchema);