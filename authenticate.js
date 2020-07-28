const passport = require('passport')

module.exports = (req, res, next)=> {
    passport.authenticate('jwt', (err, user, info)=>{
        if(err){
            console.log(info);
            console.log(err);
            return next(err)
        }
        if(!user){
            res.status(200).json({
                message: 'Authentication failed'
            })
        }
        req.user = user
        return next()
    })(req, res, next)
}