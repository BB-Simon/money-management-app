const validator = require('validator');

const validate = user =>{
    let error = {};

    if(!user.name) {
        error.name = 'Please Provide Your Name'
    }

    if(!user.email){
        error.email = 'Please Provide Your Email'
    } else if (!validator.isEmail(user.email)) {
        error.email = 'Plaese Provide with a Valid Email'
    }

    if(!user.password){
        error.password = 'Please Provide a Passowrd'
    } else if(user.password.length < 6) {
        error.password = 'Password Must be Greater or Equal to 6 Character'
    }

    if(!user.confirmPassword) {
        error.confirmPassword = 'Please Provide with Confirmation Password'
    } else if(user.confirmPassword !== user.password) {
        error.confirmPassword = 'Passowrd Dosen\'t Match'
    }

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = validate;