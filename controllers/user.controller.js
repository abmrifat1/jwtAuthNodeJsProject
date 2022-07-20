const db = require('../models');
const User = db.user;
const Rent = db.rent;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/db.config');
const { checkExisting } = require('../middlewares');

const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalElements, rows: content } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalElements / limit);

    return { totalElements, content, totalPages, currentPage };
};

exports.getAll = (req, res) => {
    let { currentPage, itemPerPage } = req.query;
    let itemsLimit, itemsOffset;

    if (currentPage !== 'all') {
        currentPage = Number(currentPage);
        itemPerPage = Number(itemPerPage);
        const { limit, offset } = getPagination(currentPage, itemPerPage);
        itemsLimit = limit;
        itemsOffset = offset;
    } else {
        itemsLimit = undefined;
        itemsOffset = 0;
    };

    User.findAndCountAll({
        attributes: { exclude: ['pin'] },
        limit: itemsLimit,
        offset: itemsOffset,
        where: { isActive: true },
        include: [
            {
                model: Rent, as: 'rentList'
            }]
    })
        .then(data => {

            const response = getPagingData(data, currentPage, itemsLimit);
            res.status(200).json({
                message: 'User list',
                data: response
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving User list."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.userId;

    User.findOne({
        where: { 'userId': id, isActive: true },
        attributes: { exclude: ['pin'] }
    }).then(data => {
        return res.status(200).json({ data: data });
    })
        .catch(err => {
            res.status(202).send({
                message: err.message || "Error retrieving User with userId=" + id
            });
        });
}

exports.create = async (req, res) => {
    const obj = req.body;
    if (!obj) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    let user = req.body;
    user.pin = bcrypt.hashSync(user.pin, 8);

    User.create(user).then(data => {
        let createToken = {
            userId: user.userId,
            fullName: user.fullName,
            phoneNumber: user.phoneNumber,
            key: config.key
        };

        var token = jwt.sign(createToken, config.key, {
            algorithm: 'HS512',
            expiresIn: 8164800
        });

        res.send({
            message: 'User successfully created.',
            data: data,
            token: token
        })
    }).catch(err => {
        res.send({
            message: err.message || 'Some error occurred while creating the User.'
        });
    })
}

exports.signin = (req, res) => {
    User.findOne({
        where: {
            phoneNumber: req.body.phoneNumber,
            isActive: true
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({ success: false, message: "Invalid phone number or user not found" });
        }
        var checkPassword = bcrypt.compareSync(
            req.body.pin, user.pin
        );
        if (!checkPassword) {
            return res.status(400).send({
                accessToken: null,
                message: "Invalid password!"
            });
        }

        let createToken = {
            userId: user.userId,
            fullName: user.fullName,
            phoneNumber: user.phoneNumber,
            key: config.key
        };

        var token = jwt.sign(createToken, config.key, {
            algorithm: 'HS512',
            expiresIn: 8164800
        });

        let userData = {
            userId: user.userId,
            fullName: user.fullName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            accessToken: token
        };
        res.status(200).send({ data: userData });

    }).catch(err => {
        res.status(500).send({ message: err.message || 'Some error occurred while creating the User.' });
    })
}

exports.update = (req, res) => {
    const id = req.body.userId;

    if (req.body.pin) {
        req.body.pin = bcrypt.hashSync(req.body.pin, 8);
    };

    User.update(req.body, {
        where: { userId: id }
    }).then(num => {
        if (num[0] == 1) {
            res.status(200).send({ message: 'User successfully updated.' });
        } else {
            res.status(202).send({
                message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
            });
        }
        console.log('num', num);
    }).catch(err => {
        res.status(500).send({ message: err.message || 'Some error occurred while updating the User.' });
    })
}

exports.delete = (req, res) => {
    const id = req.params.userId;

    User.update({ isActive: false }, {
        where: { userId: id }
    }).then(num => {
        if (num[0] == 1) {
            res.status(200).send({ message: 'User successfully Deleted.' });
        } else {
            res.status(202).send({
                message: `Cannot delete User with id=${id}. Maybe User was not found or req.body is empty!`
            });
        }
        console.log('num', num);
    }).catch(err => {
        res.status(500).send({ message: err.message || 'Some error occurred while deleting the User.' });
    })
}