const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//schema defining user sessions
const sessionSchema = new Schema({
    totalUsers: {
        type: Number
    },
    choices: {
        type: Array
    },
    finalChoice: {
        type: String
    },
    userFinished: {
        type: Boolean
    }
})

module.exports = session = mongoose.model("Session Schema", sessionSchema);

