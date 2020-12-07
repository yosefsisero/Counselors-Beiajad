const express = require('express');
const router = express.Router();

const { UserController } = require('../controllers');
const { UserValidator } = require('../validators')
const { verifyToken } = require('../middlewares')

router.get('/users', verifyToken,  UserController.findAll)
router.get('/users/:id', verifyToken, UserController.findOne)
router.get('/role/:id', verifyToken, UserController.findRole)
router.get('/admins', verifyToken,  UserController.findAllAdmins)
router.get('/doctors', verifyToken, UserController.findAllDoctors)
router.get('/usuarios', verifyToken, UserController.findAllUsers)
router.patch('/allusers/:id', verifyToken, UserValidator.change, UserController.change)
router.delete('/allusers/:id', verifyToken, UserController.delete)

module.exports = router;