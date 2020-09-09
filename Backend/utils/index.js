const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports = {
    comparePasswords: (passwordReq, passwordHashed)=> {
        return bcrypt.compareSync(passwordReq, passwordHashed)
    },
    createToken: (user)=>{
        const payload = {
            id: user._id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            exp: Math.floor(Date.now() / 1000) + (0.5 * 60) //Estamos dandole un tiempo de expiracion al token
        };
        try{
            const token = jwt.sign(payload, process.env.JWT_SECRET);
            return token
        }catch{
            return undefined
        }
    }
};
