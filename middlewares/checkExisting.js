const db = require('../models');
const User = db.user;


const checkExisting = (req, res, next) => {
    let phone = req.body.phoneNumber;
    User.findOne({
        where: {
            phoneNumber: phone
        }
    }).then(user => {
        if (user) {
            res.status(202).send({
                success: false,
                httpStatusCode: 202,
                message: "Failed! Phone number is already exists!"
            });
            return;
        }
        next();
    });
};

module.exports = checkExisting;