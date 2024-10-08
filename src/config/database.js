const mongoose = require("mongoose");

// Best way:- 1st of all, Connect to the DB (in database.js) then listen to this server (app.js)
// here 1st the Db connection Establish
const ConnectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://ksingh79798:6qcZOMThFNwTSZTp@cluster0.olusa.mongodb.net/devTinder"
  );
};
module.exports = ConnectDB;
