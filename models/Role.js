const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: [true, 'Role Title is required']
    },
    premissions: [
        {
            type: String
        }
    ],
    status: {
        type: Boolean,
        default: false
    } 
}, { timestamps: true });

const Role = mongoose.model('Role', RoleSchema);
module.exports = Role