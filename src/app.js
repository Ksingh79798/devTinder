// Ep-06 Database, Schema & Models | Mongoose  [ Part-01 ]
// Create a Server
const express = require("express");
const ConnectDB = require("./config/database");
// require("./config/database");

const app = express();

// Ex-2:- For Good Way - here 1st listen to this server then Connect to the DB
// app.listen(3000, () => {
//   console.log("Server is successfully started listening on port 3000....");
// });

// Ex-3:- for Best way- 1st:- Connect to the DB then 2nd:- listen to this server
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
