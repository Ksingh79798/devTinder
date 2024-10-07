const mongoose = require("mongoose");

// here 1st the Db connection Establish
const ConnectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://ksingh79798:6qcZOMThFNwTSZTp@cluster0.olusa.mongodb.net/devTinder"
  );
};
module.exports = ConnectDB;
