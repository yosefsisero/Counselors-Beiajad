const { User } = require('../models');
const { UserService } = require('../services');
const { comparePasswords, createToken } = require('../utils')
const { roles } = require('../server/roles')

const { roles } = require('../server/roles')


module.exports = {



    findAll:(req, res)=>{
        //const { role } = req.params.role;
        //console.log(req.params)
        const permission = roles.can("admin").readAny('profile');
        if (permission.granted) {
            User.find()
            .then((resDB) => res.status(200).json(resDB))
            .catch((Error)=> console.log(Error)) 
        } else {
            // resource is forbidden for this user/role
            res.status(403).end();
        }
        
    },
    findAllAdmins:(req, res)=>{
        User.find({ rank: "admin"})

            .then((resDB) => res.status(200).json(resDB))
            .catch((Error)=> console.log(Error)) 
    },
    findAllDoctors:(req, res)=>{
        User.find({ rank: "doctor"})

            .then((resDB) => res.status(200).json(resDB))
            .catch((Error)=> console.log(Error)) 
    },
    findAllUsers:(req, res)=>{
        User.find({ rank: "user"})

            .then((resDB) => res.status(200).json(resDB))
            .catch((Error)=> console.log(Error)) 
    },
    findOne: (req, res) => {
      User.findById(req.params.id)
            .then((resDB) => res.status(200).json(resDB))
            .catch((Error)=> console.log(Error)) 
    },
    signup: async (req, res)=>{
        const { body } = req;
        try {
            const emailExist = await UserService.findOneByEmail(body.email)
            if (emailExist) res.status(400).json({message: 'Email taken'})
            else {const newUser = new User(body);
            const user = await newUser.save();
            user.password = undefined
            res.status(201).json(user);}
                 
        } catch (error) {
            res.status(400).json(error)
        }
    },
    login: async (req, res)=>{
        const { email, password } = req.body;
        try{
            const user = await UserService.findOneByEmail(email);
            if (!user) res.status(400).json({message: 'Email not valid'})
            const isValid = comparePasswords(password, user.password)
            if (!isValid) res.status(400).json({message: 'Password incorrect'})
            const token = createToken(user);
            if(!token) res.status(500).json({message: 'Error creating token'})
            res.status(200).json({message: 'successful login', token})
        } catch (error) {
            res.status(400).json(error)
       }
    },
    change:(req, res)=>{
        const { body } = req
        User.findByIdAndUpdate(req.params.id, body, {new: true})
           .then((resDB)=> res.status(200).json(resDB))
           .catch((err)=> res.status(400).json(err))
    },
    delete:(req, res)=>{
        User.findByIdAndDelete(req.params.id)
           .then((resDB)=> res.status(204).json(resDB))
           .catch((err)=> res.status(400).json(err))
    },
grantAccess : function(action, resource) {
    return async (req, res, next) => {
     try {
      const permission = roles.can(req.params.role)[action](resource);
      if (!permission.granted) {
       return res.status(401).json({
        error: "You don't have enough permission to perform this action"
       });
      }
      next()
     } catch (error) {
      next(error)
     }
    }
   },
   
   allowIfLoggedin : async (req, res, next) => {
    try {
     const user = res.locals.loggedInUser;
     if (!user)
      return res.status(401).json({
       error: "You need to be logged in to access this route"
      });
      req.user = user;
      next();
     } catch (error) {
      next(error);
     }
   }

}

