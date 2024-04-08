var mongoose = require('mongoose');

var roomTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    shortcode: {
        type: String,
        require: true
    },
});

module.exports = mongoose.model('_room_type', roomTypeSchema, 'room_type');