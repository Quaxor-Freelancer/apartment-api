const mongoose = require('mongoose');

const useSchema = mongoose.Schema({
    employeeCode: {
        type: String,
        required: [true, "Please add Employee Code"]
    },
    firstname: {
        type: String,
        required: [true, "Please add First name"]
    },
    lastname: {
        type: String,
        required: [true, "Please add Last name"]
    },
    username: {
        type: String,
        required: [true, "Please add Username"]
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
    department: {
        type: String,
    },
    jobRoleId: {
        type: mongoose.Types.ObjectId,
        ref: "Role"
    },
    reportTo: {
        type: mongoose.Types.ObjectId,
        ref: "Employee"
    },
    status: {
        type: String,
        enum: ["active", "leave" , "absent", "terminated"],
        required: [true],
        default: "active"
    },  
    loginEnabled: {
        type: Boolean,
        default: false
    }   
}, { timestamps: true })

module.exports = mongoose.model("Employee", useSchema);





