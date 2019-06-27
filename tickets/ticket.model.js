const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new mongoose.Schema({
    userEmail: { type: String, required: true },  
    eventName: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: {type: String, required: true },
    phone: { type: String, required: true },
    adultQuantity: { type: Number, required: true},
    childQuantity: { type: Number, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Ticket', schema);