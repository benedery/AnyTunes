const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api.controller')

router.get("/search/:param", apiController.api_search)

module.exports = router

