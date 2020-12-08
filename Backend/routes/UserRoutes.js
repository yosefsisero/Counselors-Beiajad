const express = require('express');
const router = express.Router();

const { UserController } = require('../controllers');
const { UserValidator } = require('../validators')
const { verifyToken } = require('../middlewares')

router.get('/users/:id', verifyToken,  UserController.findAll)
router.get('/users/:id', verifyToken, UserController.findOne)
router.get('/admins/:id', verifyToken,  UserController.findAllAdmins)
router.get('/doctors/:id', verifyToken, UserController.findAllDoctors)
router.get('/usuarios/:id', verifyToken, UserController.findAllUsers)

router.patch('/editusers/:id', verifyToken, UserValidator.changeUsers, UserController.changeUsers)
router.patch('/editdoctors/:id', verifyToken, UserValidator.changeDoctors, UserController.changeDoctors)
router.patch('/editadmins/:id', verifyToken, UserValidator.changeAdmins, UserController.changeAdmins)

router.delete('/deleteusers/:id/:id', verifyToken, UserController.deleteUsers)
router.delete('/deletedoctors/:id', verifyToken, UserController.deleteDoctors)
router.delete('/deleteadmins/:id', verifyToken, UserController.deleteAdmins)



module.exports = router;