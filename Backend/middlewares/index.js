const jwt = require('jsonwebtoken');

// const { roles } = require('../server/roles')


module.exports = {
    verifyToken: (req, res, next)=>{
        try{
            const { authorization } = req.headers;
            // Bearer y el token que le mandamos
            // authorization.split -> ['Bearer', 'token']
            const token = authorization.split(' ')[1] // El 0 es Bearer y 1 es el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.decoded = decoded;
            next();     
        } catch(err){
            res.status(401).json({message: 'Auth error', err})
        }
    },

    //--
// grantAccess : function(action, resource) {
//     return async (req, res, next) => {
//      try {
//       const permission = roles.can(req.user.role)[action](resource);
//       if (!permission.granted) {
//        return res.status(401).json({
//         error: "You don't have enough permission to perform this action"
//        });
//       }
//       next()
//      } catch (error) {
//       next(error)
//      }
//     }
//    },
   
//    allowIfLoggedin : async (req, res, next) => {
//     try {
//      const user = res.locals.loggedInUser;
//      if (!user)
//       return res.status(401).json({
//        error: "You need to be logged in to access this route"
//       });
//       req.user = user;
//       next();
//      } catch (error) {
//       next(error);
//      }
//    },
//--

}