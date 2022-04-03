const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
    }, { timestamps: true }
);

const Resource = mongoose.model('Resource', ResourceSchema);
module.exports = Resource