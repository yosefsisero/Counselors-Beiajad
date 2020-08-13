const { Schedule } = require('../models');
//const { UserService } = require('../services');
const { createToken } = require('../utils')



module.exports = {
    findAll:(req, res)=>{
       Schedule.find()
            .populate("user")
            .then((resDB) => res.status(200).json(resDB))
            .catch((Error)=> console.log(Error)) 
    },
    findOne: (req, res) => {
      Schedule.findById(req.params.id)
            .populate("user")
            .then((resDB) => res.status(200).json(resDB))
            .catch((Error)=> console.log(Error)) 
    },
    create:(req, res)=>{
        const { body } = req;
        const newSchedule = new Schedule(body);
        newSchedule.save()
        .then((resDB) => res.status(201).json(resDB))
        .catch((Error)=> console.log(Error))      
    },
    change:(req, res)=>{
        const { body } = req
       Schedule.findByIdAndUpdate(req.params.id, body, {new: true})
           .then((resDB)=> res.status(200).json(resDB))
           .catch((err)=> res.status(400).json(err))
    },
    checkout:(req, res) => {
        const { id } = req.params;
        Schedule.findById(id)
              .populate("user")
              .then((resDB) => res.status(200).json(resDB))
              .catch((err) => res.status(400).json(err));
    },
    delete:(req, res)=>{
        Schedule.findByIdAndDelete(req.params.id)
           .then((resDB)=> res.status(204).json(resDB))
           .catch((err)=> res.status(400).json(err))
    },
}   