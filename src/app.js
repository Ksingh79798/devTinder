// Ep-06 Database, Schema & Models | Mongoose  [ Part-2 ]
// Create a Server
const express = require("express");
const ConnectDB = require("./config/database");

const app = express();

// Best way:- 1st of all, Connect to the DB (in database.js) then listen to this server (in app.js)
ConnectDB()
  .then(() => {
    console.log("DB Connection Establish");
    // 2nd listen to this server
    app.listen(3000, () => {
      console.log("Server is successfully started listening on port 3000....");
    });
  })
  .catch((err) => {
    console.log("DB Cannot be Established");
  });
