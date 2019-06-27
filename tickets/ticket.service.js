const db = require('_helpers/db');
const Ticket = db.Ticket;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getByEmailAndEvent
};

async function getAll() {
    return await Ticket.find().select('-hash');
}

async function getById(id) {
    return await Ticket.findById(id).select('-hash');
}

async function getByEmailAndEvent(email){
    return await Ticket.findById(Ticket.findOne({userEmail: email})).ticket.id;
}

async function create(ticketParam) {
    // validate
    if (await Ticket.findOne({ userEmail: ticketParam.userEmail }) && await Ticket.findOne({eventName: ticketParam.eventName})) {
        throw 'Email "' + ticketParam.userEmail + '" has already registered for ' + ticketParam.eventName;
    }

    const ticket = new Ticket(ticketParam);

    // save ticket
    await ticket.save();
}

//broken
async function update(id, ticketParam) {
    const ticket = await Ticket.findById(id);

    // validate
    if (!ticket) throw 'Ticket not found';
    if (ticket.name !== ticketParam.name && await Ticket.findOne({ name: ticketParam.name })) {
        throw 'Ticket "' + ticketParam.ticket + '" is already taken';
    }

    // copy ticketParam properties to ticket
    Object.assign(ticket, ticketParam);

    await ticket.save();
}

async function _delete(id) {
    await Ticket.findByIdAndRemove(id);
}