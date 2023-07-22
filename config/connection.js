// declare/desctructure variables in relation to mongoose
const { connect, connection } = require('mongoose');

const conString =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/social_net_DB"
;

connect(conString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;


/* 
                     Atlas Instructions for Heroku

------------------------------------------------------------------
    Make your Heroku app,  and visit:

>>> https://dashboard.heroku.com/apps/ <<<

    Select the app name, and add your Atlas connection string as a 
    Config variable. Node will look for this environment variable.
    If it doesn't exist, it will assume that you are running this 
    application locally.
*/