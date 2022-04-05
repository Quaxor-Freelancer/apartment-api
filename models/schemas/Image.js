const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: {
        type: String,
        required: [true, 'Image url is required']
    } 
});

module.exports = ImageSchema