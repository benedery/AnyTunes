const User = require('../models/users.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/keys');

exports.create_user =
    (req, res, next) => {
        const { username, password } = req.body
        // simple validation
        if (!username || !password) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }
        // check for existing username
        User.findOne({ username })
            .then(user => {
                if (user) return res.status(400).json({ msg: 'Username already exists' })

                User.create({ username, password }, (err, user) => {
                    if (err) return res.status(400).json({ msg: 'cant register user' })
                    else
                        jwt.sign(
                            { id: user.id },
                            config.secret,
                            { expiresIn: 7200 },
                            (err, token) => {
                                if (err) throw err;
                                res.json({
                                    status: "success", msg: "User added successfully!!!",
                                    token,
                                    data: {
                                        id: user.id,
                                        username: user.username,
                                        queries: user.queries,
                                        isAdmin: user.isAdmin
                                    }
                                });
                            });
                }
                )
            })
    }

exports.auth_user = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    User.findOne({ username })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'User Does not exist' });
            // Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: 'Invalid Password' });

                    jwt.sign(
                        { id: user.id },
                        config.secret,
                        { expiresIn: 7200 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                status: "success", msg: "User login successfully!!",
                                token,
                                data: {
                                    id: user.id,
                                    username: user.username,
                                    queries: user.queries,
                                    isAdmin: user.isAdmin
                                }
                            });
                        }
                    )
                })
        })
}

exports.get_userdata = (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
}

exports.get_allusers = (req, res) => {
    User.findOne({ _id: req.user.id }, (err, user) => {
        if (user.isAdmin) {
            User.find({})
                .select('username')
                .select('_id')
                .then(users => res.json(users));
        }
        else res.status(401).json({ msg: "You are not an admin user" })
    })
}

exports.get_individualdata = (req, res) => {
    User.findOne({ _id: req.user.id }, (err, user) => {
        if (user.isAdmin) {
            User.findOne({ _id: req.params.id })
                .select('-password')
                .then(users => {
                    res.json(users)
                });
        }
        else res.status(401).json({ msg: "You are not an admin user" })
    })
}

exports.delete_user = (req, res) => {
    User.deleteOne({ _id: req.params.id }, (err) => {
        if (err) res.status(401).json({ msg: "user dont found" })
        else {
            User.find({})
                .select('username')
                .select('_id')
                .then(users => res.json({ status: "success", msg: "user deleted", users: users }))
        }
    })

}