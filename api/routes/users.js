const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Users = require("../../models/users");
const validator = require("../../validators/validators");

// a login post request that checks for a user based off of their email
// it checks if the password matches
// if so it returns a token and confirms with success
router.post("/login", (req, res) => {
    const {errors, isValid} = validator.loginValidator(req.body);
    if (!isValid) {
        res.status(404).json(errors);
    }
    Users.findOne({ email: req.body.email })
    .then((user) => {
        if (!user) res.status(404).json({"email" : "That email doesn't exist!"});
        bcrypt.compare(req.body.password, user.password)
        .then((isMatch) => {
            if (!isMatch) res.status(400).json({"password" : "That password doesn't match!"})
            else {
                const payload = {
                    id: user.id,
                    name: user.name
                }
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 900000
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer token: " + token
                        })
                    }
                )
            }
        })
    })
})

// A register post request that makes sure email is unique
// if so bcrypt hashes the password
router.post("/register", (req, res) => {
    const {errors, isValid} = validator.registerValidator(req.body);
    if (!isValid) {
        res.status(404).json(errors);
    }
    Users.findOne({email: req.body.email})
    .then((user) => {
        if(user) {
            res.status(404).json({"email" : "That email is already registered!"})
        }
        else {
            const registerUser = new Users({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(registerUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    registerUser.password = hash;
                    registerUser.save()
                    .then((user) => res.json(user))
                    .catch((err) => console.log(err));
                })
            })
        }
    })
    .catch((err) => console.log(err));
})

// Get request for full info on user (password stays hashed)
// Needs to be queried with just the id
// personal working example http://localhost:3001/api/users/info/5f10a3f7cf540508fc41558f
router.get("/info/:id", function(req, res) {
    Users.findById(req.params.id)
    .then(userInfo => res.json(userInfo))
    .catch(err => res.status(422).json(err));
});

// This will let us add to and then update a user object 
// not working yet
router.put("/update/:id", function(req, res) {
    Users.findByIdAndUpdate(
        req.params.id, 
        { $push: [req.body] }, { new: true, runValidators: true })
    .then(newInfo => res.json(newInfo))
    .catch(err => res.status(422).json(err));
});

module.exports = router;