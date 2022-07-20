const jwt = require('jsonwebtoken');
const config = require('../config/db.config');
const db = require('../models');
const User = db.user;

const jwToken = (req, res, next) => {
    let token = req.headers["authorization"];
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    jwt.verify(token, config.key, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        User.findOne({
            where: { 'userId': decoded.userId, isActive: true }
        }).then(data => {
            if (data) {
                req.userId = decoded.userId;
                next();
            } else {
                return res.status(401).send({
                    message: "No user found!"
                });
            }
        })
            .catch(err => {
                return res.status(401).send({
                    message: "Unauthorized! No user found!"
                });
            });
    })
}
module.exports = jwToken