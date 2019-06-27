const db = require('_helpers/db');
const Event = db.Event;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Event.find().select('-hash');
}

async function getById(id) {
    return await Event.findById(id).select('-hash');
}

async function create(eventParam) {
    // validate
    if (await Event.findOne({ name: eventParam.name })) {
        throw 'Name "' + eventParam.name + '" is already taken';
    }

    const event = new Event(eventParam);

    // save event
    await event.save();
}

async function update(id, eventParam) {
    const event = await Event.findById(id);

    // validate
    if (!event) throw 'Event not found';
    if (event.name !== eventParam.name && await Event.findOne({ name: eventParam.name })) {
        throw 'Event "' + eventParam.event + '" is already taken';
    }

    // copy eventParam properties to event
    Object.assign(event, eventParam);

    await event.save();
}

async function _delete(id) {
    await Event.findByIdAndRemove(id);
}