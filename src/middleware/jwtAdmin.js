const expressjwt = require('express-jwt');
const userModel = require('../models/users/user');

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
    const user = await userModel.find();
    const isAdmin = user.role.name === 'admin';
    if (user.role === isAdmin) {
        return done(null, true);
    }
    return done(null, false);
}

const authorization = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'sayangmamah');
        req.userId = decoded.userId;
        req.userRole = decoded.userRole;
        next();
    } else {
        res.status(401).json({
            message: 'Unauthorized'
        })
    }
}

module.exports = {
    authJwtAdmin,
    authorization
}