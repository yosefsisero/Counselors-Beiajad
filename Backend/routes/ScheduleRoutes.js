const express = require('express');
const router = express.Router();

const { ScheduleController } = require('../controllers');
const { ScheduleValidator } = require('../validators')
const { verifyToken } = require('../middlewares')

router.get('/schedule', verifyToken, ScheduleController.findAll)
router.get('/schedule/:id', verifyToken, ScheduleController.findOne)

router.post('/schedule', ScheduleValidator.create, ScheduleController.create)

router.patch('/schedule/:id', verifyToken, ScheduleValidator.change, ScheduleController.change)
router.patch("/schedule/:id/checkout", verifyToken, ScheduleValidator.change, ScheduleController.change)

router.delete('/schedule/:id', verifyToken, ScheduleController.delete)

module.exports = router;

//Sacamos el verify token del post 
