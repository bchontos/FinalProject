// express - helps with routing
const express = require("express");
// cors - middleware for express
const cors = require("cors");
// mongoose - helps work with MongoDB
const mongoose = require("mongoose");
// passport - authentication middleware
const passport = require("passport");
// body-parser - parses for middleware
const bodyParser = require("body-parser");
// provides routes for passport
const Users = require("./api/routes/users");
const Likes = require("./api/routes/Likes");

// Creates express app and configures middleware needed for authentication
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Gets url from keys, then connects to database unless there's an error
const db = require("./config/keys").mongoURL;
mongoose.connect((process.env.MONGODB_URI || db))
    .then(() => console.log("Connected to database!"))
    .catch((err) => console.log(err))

// makes passport use the configurations and user routes
require("./config/passport") (passport)
app.use(passport.initialize());
app.use("/api/users", Users);
app.use("/api/likes", Likes);

// set up port and shows when it runs
const port = process.env.PORT || 3001;
app.listen(port, () => console.log("Listening on port", port));
