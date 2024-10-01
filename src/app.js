// Create a Server
const express = require("express");
const app = express();

// All routes are matching over here so, below all the routes never get a chance to execute
// app.use("/", (req, res) => {
//   res.send("HAAAAAAAAAAAAAA");
// });


// This will only handle GET call to  /user
app.get("/user", (req, res) => {
  res.send({ fname: "Vicky", lname: "Kumar" });
});

app.post("/user", (req, res) => {
  // Saving Data to DB
  res.send("data successfully saved to the DB");
});

app.delete("/user", (req, res) => {
  res.send("Deleted Successfully");
});

// This will match all the HTTP Methods API Calls to  /hello
app.use("/hello", (req, res) => {
  res.send("Hello, Hello, Hello");
});

app.listen(3000, () => {
  console.log("Server is successfully started listening on port 3000....");
});
