const User = require('../models/users.models');

exports.get_queries = (req, res) => {
    User.findById(req.user.id)
        .select('queries')
        .then(query => res.json(query))
}

exports.post_query = (req, res) => {
    const query = req.body.query
    User.findOne({ _id: req.user.id }, (err, user) => {
        const searchTerm = user.queries.find(o => o.name == query)
        const queries = user.queries
        if (searchTerm) {
            searchTerm.timeSearched = searchTerm.timeSearched + 1
        }
        if (!searchTerm) {
            let newQuery = { name: query, timeSearched: 1 }
            queries.push(newQuery)
        }
        user.markModified('queries');
        user.save(err => {
            if (err) console.log(err)
            res.json(user)
        })
    })
}

exports.reset_queries = (req, res) => {
    // check admin privliges by middleware
    User.findOne({ _id: req.user.id }, (err, user) => {
        console.log(user)
        if (user.isAdmin) {
            // reset queries
            User.findOne({ _id: req.params.id }).select('-password').exec((err, user) => {
                user.queries = [];
                user.markModified('queries');
                user.save(err => {
                    if (err) console.log(err)
                    res.json(user)
                })
            })
        }
        else res.status(401).json({ msg: "You are not an admin user" })
    })
}