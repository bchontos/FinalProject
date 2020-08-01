const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// defines user properties
const LikesSchema = new Schema({
    userEmail: {
        type: String,
        required: true
    },
    restaurantID: {
        type: Number,
        required: true
    }
})

module.exports = Likes = mongoose.model("Likes", LikesSchema);