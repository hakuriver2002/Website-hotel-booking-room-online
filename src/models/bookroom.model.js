var mongoose = require('mongoose');

var bookRoomSchema = new mongoose.Schema({
    book_id:{
        type: String,
        require: true,
        default: 'BR' + Date.now() 
    },
    room_code: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    adult:{
        type: Number,
        require: true
    },
    children:{
        type: Number,
        require: true
    },
    transaction_date: {
        type: Date,
        default: Date.now
    },
    checkin:{
        type: Date,
        require: true
    },
    checkout:{
        type: Date,
        require: true
    },
    fullname:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    phone:{
        type: String,
        require: true
    },
    note:{
        type: String,
        require: false
    },
    payment:{
        type: String,
        require: false        
    },
    status_booking: {
        type: String,
        enum: ['pending', 'confirmed', 'canceled', 'checkin', 'checkout'],
        require: 'pending'
    },
    status_payment: {
        type: String,
        enum: ['pending', 'paid', 'unpaid', 'refund'],
        default: 'pending'
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

module.exports = mongoose.model('_bookroom', bookRoomSchema, 'bookroom');