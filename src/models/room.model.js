var mongoose = require('mongoose');

var roomSchema = new mongoose.Schema({
    room_name: {
        type: String,
        require: true,
    },
    room_code: {
        type: String,
        require: true
    },
    room_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: '_room_type'
    },
    floor: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    adult: {
        type: Number,
        require: false
    },
    children: {
        type: Number,
        require: false
    },
    acreage: {
        type: Number,
        require: false
    },
    thumbnail: {
        type: String,
        require: false
    },
    album: {
        type: String,
        require: false
    },
    tag: {
        type: Array,
        require: false
    },
    status: {
        type: String,
        enum: ['avaliable', 'unavaliable', 'reserved'],
        default: 'avaliable'
    },
    description: {
        type: String,
        require: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('_room', roomSchema, 'room');