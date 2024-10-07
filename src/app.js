// Ep-06 Database, Schema & Models | Mongoose  [ Part-3 ]
// Create a Server
const express = require("express");
const ConnectDB = require("./config/database");

const app = express();

//=========== Create our 1st API which will insert the data into the DB  ===========
// Ex-1:-
// const User = require("./models/user");
// app.post("/signup", (req, res) => {
//   // here we Write some logic to insert data into that db

//   const userObj = {
//     // here we insert static dummy data as
//     firstName: "Vicky",
//     lastName: "Kumar",
//     emailId: "ksingh79798@gmail.com",
//     password: "123",
//     age: "22",
//     gender: "male",
//     -id : "xyz123" ,
//   };

//   // Create a new instance of the User model or We creating a new user with this static data(userObj)
//   const user = new User(userObj);
// });

// Ex-2:- To save this static data into db we use save() fn:- it return promise, so we use Async-Await
// const User = require("./models/user");
// app.post("/signup", async (req, res) => {
//   // ------------- here we Write some logic to insert data into that db ----------------
//   // Create a new instance of the User model or We creating a new user with this static data(userObj)
//   const user = new User({
//     firstName: "Vicky",
//     lastName: "Kumar",
//     emailId: "ksingh79798@gmail.com",
//     password: "123",
//     age: "22",
//     gender: "male",
//   });
//   await user.save();
//   res.send(
//     "user added successfully"
//   ); /* sending back the response from the API */
// });

// Ex-3:- Whenever we doing DB operation (CRUD) then Always Wrap them inside a try() & catch() block
const User = require("./models/user");
app.post("/signup", async (req, res) => {
  // ------------- here we Write some logic to insert data into that db ----------------
  // Create a new instance of the User model or We creating a new user with this static data(userObj)
  const user = new User({
    firstName: "Vicky",
    lastName: "Kumar",
    emailId: "ksingh79798@gmail.com",
    password: "xyz",
    age: "22",
    gender: "male",
  });

  try {
    await user.save();
    res.send(
      "user added successfully"
    ); /* sending back the response from the API */
  } catch (err) {
    res
      .status(400)
      .send("Error saving the user:" + err.name + " " + err.mmessage);
  }
});

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
