const express = require('express');
const router = express.Router();

const { UserController } = require('../controllers');
const { UserValidator } = require('../validators')
const { verifyToken } = require('../middlewares')

router.get('/allusers', verifyToken, UserController.findAll)
router.get('/allusers/:id', verifyToken, UserController.findOne)
router.get('/admins', verifyToken, UserController.findAllAdmins)
router.get('/doctors', verifyToken, UserController.findAllDoctors)
router.get('/users', verifyToken, UserController.findAllUsers)
router.patch('/users/:id', verifyToken, UserValidator.change, UserController.change)
router.delete('/users/:id', verifyToken, UserController.delete)

module.exports = router;