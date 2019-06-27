const express = require('express');
const router = express.Router();
const ticketService = require('./ticket.service');

// routes
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);
router.get('/emailevent/:email', getByEmailAndEvent);

module.exports = router;

function register(req, res, next) {
    ticketService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    ticketService.getAll()
        .then( tickets => res.json(tickets))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    ticketService.getById(req.ticket.sub)
        .then(ticket => ticket ? res.json(ticket) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    ticketService.getById(req.params.id)
        .then(ticket => ticket ? res.json(ticket) : res.sendStatus(404))
        .catch(err => next(err));
}

function getByEmailAndEvent(req, res, next) {
    ticketService.getByEmailAndEvent(req.body.email)
        .then(ticket => ticket ? res.json(ticket) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    ticketService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    ticketService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}