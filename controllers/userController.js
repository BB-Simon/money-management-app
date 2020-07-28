const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const registerValidator = require('../validators/registerValidator');
const loginValidator = require('../validators/loginValidator');
const User = require('../model/User');
const {serverError, resourceError} = require('../util/error')



// loging controller
module.exports = {
    login(req, res) {
        // Extract Data from user
        let {email, password} = req.body;
        // Validate Data
        let validate = loginValidator({email, password});
        if(!validate.isValid){
            return res.status(400).json(validate.error)
        }
        
        User.findOne({email})
            .then(user => {
                if(!user) {
                    return resourceError(res, "User Not Found");
                }
                bcrypt.compare(password, user.password, (err, result)=>{
                    if(err) {
                        return serverError(res, err);
                    }
                    if(!result){
                        return resourceError(res, 'Password Doesn\'t Match')
                    }

                    let token = jwt.sign({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        balance: user.balance,
                        income: user.income,
                        expense: user.expense,
                        transactions: user.transactions
                    }, 'SECRET', {expiresIn: '2h'})

                    res.status(200).json({
                        message: 'Login Successful',
                        token: `Bearer ${token}`
                    })
                })
            })
            .catch( error => serverError(res, error))
        
         
        // Check user availability
        // Compare Password
        // Generate Token nad Respose Back
    },
    // register
    register(req, res){
        // read client data
        let {name, email, password, confirmPassword} = req.body;
        let validate = registerValidator({name, email, password, confirmPassword})

        // validation check user data
        if(!validate.isValid){
            res.status(400).json(validate.error)
        } else {
            // check for duplicate user
            User.findOne({email})
                .then(user => {
                    if(user){
                        return resourceError(res, "Email is Already Exists");
                    }

                    bcrypt.hash(password, 11, (err, hash)=>{
                        if(err){
                            return resourceError(res, 'Server Error Ocurred');
                        }

                        let user = new User({
                            name,
                            email,
                            password: hash,
                            balance: 0,
                            income: 0,
                            expense: 0,
                            transactions: []
                        })
                        user
                          .save()
                          .then(user => {
                            res.status(201).json({
                              message: "user created successfully",
                              user
                            });
                          })
                          .catch(error => serverError(res, error));
                    })
                })
                .catch(error => serverError(res, error))
        
        
        // new user object
        // save to database
        // response back with new data
           
        
        }
    },
    getAllUsers(req, res){
        User.find()
            .then(users =>{
                if(users.length === 0){
                    res.status(200).json({
                        message: 'No User Found'
                    })
                } else {
                    res.status(200).json(users)
                }
            })
            .catch(error => serverError(res, error))
    }
}