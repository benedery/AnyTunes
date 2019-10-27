const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware')
const queryController = require('../controllers/query.controller')

router.get('/', authMiddleware, queryController.get_queries)
router.post('/', authMiddleware, queryController.post_query)
module.exports = router