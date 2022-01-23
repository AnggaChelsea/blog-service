const expressjwt = require('express-jwt');
const userModel = require('../models/user');

function authJwtAdmin() {
    require("dotenv").config();
    const secret = process.env.SCRET_KEY;
    return expressjwt({
        secret,
        algorithms: ['HS256'],
        revoke: revokeadmin
    }).unless({
        path: [
            '/user/login',
            '/user/register',
        ]
    })
}

async function revokeadmin(req, payload, done) {
    const user = await userModel.findById(req.id);
    const isSeller = users.role.name === 'seller';
    if (user.role === isSeller) {
        return done(null, true);
    }
    return done(null, false);
}


module.exports = authJwtAdmin;