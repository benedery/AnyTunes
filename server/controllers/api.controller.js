const fetch = require('node-fetch');

exports.api_search = (req, res) => {
    let searchTerm = req.params.param.split(' ').join('+')
    fetch(`https://itunes.apple.com/search?term=${searchTerm}&limit=25`)
        .then(res => res.json())
        .then(data => res.json(data))
        .catch(err => {
            res.status(400).json('cant find result with provided search')
        })
};