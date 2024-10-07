const mongoose = require("mongoose");

// Ex-1:- connect to devTinder Db
// mongoose.connect(
//   "mongodb+srv://ksingh79798:6qcZOMThFNwTSZTp@cluster0.olusa.mongodb.net/devTinder"
// );

// Ex-2:- good way:- use async-await bcz connect() fn return promise
// const ConnectDB = async () => {
//   await mongoose.connect(
//     "mongodb+srv://ksingh79798:6qcZOMThFNwTSZTp@cluster0.olusa.mongodb.net/devTinder"
//   );
// };

// ConnectDB()
//   .then(() => {
//     console.log("Db connection Established!");
//   })
//   .catch((err) => {
//     clg("Db cannot be Established!");
//   });

// Ex-3:- Best way:- 1st of all, Connect to the DB then listen to this server
// here 1st the Db connection Establish
const ConnectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://ksingh79798:6qcZOMThFNwTSZTp@cluster0.olusa.mongodb.net/devTinder"
  );
};
module.exports = ConnectDB;
