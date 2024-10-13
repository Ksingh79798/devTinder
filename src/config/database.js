const MongoDb_Url = require("../app");
const mongoose = require("mongoose");
require("dotenv").config();

// Best way:- 1st of all, Connect to the DB (in database.js) then listen to this server (app.js)
// here 1st the Db connection Establish
const ConnectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
};
module.exports = ConnectDB;
