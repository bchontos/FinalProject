const express = require("express");
const router = express.Router();
const Likes = require("../../models/likes");
const passport = require("passport");

router.get("/not-mine", passport.authenticate(
    'jwt', { session: false } ), function(req, res) {
    const email = req.user.email;

    Likes.find({ userEmail: { $ne: email } })
        .then((likes) => {
            res.json(likes);
        });
});

router.get("/mine", passport.authenticate(
    'jwt', { session: false } ), function(req, res) {
    const email = req.user.email;

    Likes.find({ userEmail: email })
        .then((likes) => {
            res.json(likes);
        });
});

// This will let us add to and then update a user object 
// not working yet
router.post("/", passport.authenticate(
    'jwt', { session: false } ), function(req, res) {
    const {body, user} = req;
    const {email} = user;

    const like = new Likes({
        userEmail: email,
        restaurantID: req.body.restaurantID
    });
    like.save();

    res.json({});
});

router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;