// is-empty is used to check if a value ...
const isEmpty = require("is-empty");
// validator ... validates inputs
const validator = require("validator");

// checks if inputs are valid and not empty for login
module.exports.loginValidator = loginValidator = function validateLoginInput(data){
    const errors = {}
    data.email = !(isEmpty(data.email)) ? data.email: "";
    data.password = !(isEmpty(data.password)) ? data.password: "";
    
    if (validator.isEmpty(data.email)) {
        errors.email = "Email is required!"
    }
    if (validator.isEmpty(data.password)) {
        errors.password = "Password is required!"
    }
    if (!validator.isEmail(data.email)) {
        errors.email = "Please provide a valid email!"
    }
    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}

// checks if inputs are valid and not empty for register
module.exports.registerValidator = registerValidator = function validateRegisterInput(data){
    const errors = {}
    data.email = !(isEmpty(data.email)) ? data.email: "";
    data.password = !(isEmpty(data.password)) ? data.password: "";
    data.name = !(isEmpty(data.name)) ? data.name: "";
    
    if (validator.isEmpty(data.email)) {
        errors.email = "Email is required!"
    }
    if (validator.isEmpty(data.password)) {
        errors.password = "Password is required!"
    }
    if (validator.isEmpty(data.name)) {
        errors.name = "Name is required!"
    }
    if (!validator.isEmail(data.email)) {
        errors.email = "Please provide a valid email!"
    }
    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}