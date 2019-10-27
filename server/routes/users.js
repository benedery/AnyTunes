const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const config = require('../config/keys');
const userController = require('../controllers/users.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.post("/login", userController.auth_user)
router.post("/register", userController.create_user)
router.get("/userdata", authMiddleware, userController.get_userdata)
router.get("/allusers", authMiddleware, userController.get_allusers)
router.delete("/deleteuser/:id", authMiddleware, userController.delete_user)

module.exports = router