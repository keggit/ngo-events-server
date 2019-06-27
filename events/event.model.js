const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },  
    description: { type: String, required: true },
    category: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: {type: Date, required: true },
    location: { type: String, required: true },
    registrationAllowed: { type: Boolean, required: true},
    eventImage: { type: String, required: true },
    adultTicketPrice: { type: Number, required: true },
    childTicketPrice: { type: Number, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Event', schema);