const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: [true, 'Role Title is required']
    },
    permissions: [
        {
            type: String
        }
    ],
    status: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Role = mongoose.model('role', RoleSchema);
module.exports = Role