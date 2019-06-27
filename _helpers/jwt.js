const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../users/user.service');
const eventService = require('../events/event.service');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register',
            '/users',   //should require auth
            '/events',  //should require auth
            '/events/register',
            '/tickets'  //should require auth
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);
    //const event = await eventService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

   

    done();
};