// Sets up MongoDB credentials
// Set up for localhost only - Will need changed for heroku
// secretOrKey is used by passport
module.exports = {
    mongoURL: "mongodb://localhost/final" || "mongodb://<bywebb306>:<Wacwsc14>@ds157459.mlab.com:57459/heroku_2ln15lrx",
    secretOrKey: "secret"
}