const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');

exports.login = (req, res, next) =>{
    User.findOne({user_name:req.body.user_name})
    .exec((err, user) =>{
        if(err){return res.status(400).json({error})}
        if(!user){return res.status(401).json({message:'User not found'})}
        if(user.authenticate(req.body.password)){
            const startTime = new Date();
            const endTime = new Date(startTime);
            endTime.setMinutes(endTime.getMinutes()+5);
            // create token
            const token = jwt.sign({user:user},process.env.JWT_SECRET,{expiresIn:'5m'});
            const {user_name, password, phone, email, permission} = user;
            res.status(200).json(
               {
                   token,
                   start: startTime,
                   end: endTime,    
                   user: user
               }
            );
        }else{
            res.status(401).json(
                {
                    message: 'Authenticate Failed',    
                })
            }
    })
}
exports.requireLogin= (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(400).json({
            message: 'Token is not exists'
        })
    }
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token,process.env.JWT_SECRET);
    User.findOne({user_name:user.user_name})
    .exec((err, user) => {
        if(err){
            res.status(500).json({message:'token is invalid'})
        }
        next();
    })
}