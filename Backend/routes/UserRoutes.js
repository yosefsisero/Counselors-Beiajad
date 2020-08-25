const express = require('express');
const router = express.Router();

const { UserController } = require('../controllers');
const { UserValidator } = require('../validators')
const { verifyToken } = require('../middlewares')

router.get('/users', verifyToken, UserController.findAll)
router.get('/users/:id', verifyToken, UserController.findOne)

router.patch('/users/:id', verifyToken, UserController.change)

router.delete('/users/:id', verifyToken, UserController.delete)

module.exports = router;