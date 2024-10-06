// Ep-05 Middlewares & Error Handlers  [ Part-03 ]
// Create a Server
const express = require("express");
const app = express();

// Ex-1:- OP - [Some error in contact support Team]
app.use("/", (err, req, res, next) => {
  if (err) {
    // Log your Error here
    res.status(500).send("Something Went Wrong");
  }
});

// Good Way is use try() & catch() block
app.get("/getUserData", (req, res) => {
  try {
    // Write some Logic of DB call & get user data
    throw new customError("xyz");
    res.send("user Data Sent");
  } catch (err) {
    res.status(500).send("Some error in contact support Team");
    // clg(err.name);     -customError
    // clg(err.message);  -xyz
  }
});

// Ex-2:- If Change the order then also :- OP - [Some error in contact support Team]
app.get("/getUserData", (req, res) => {
  try {
    throw new customError("xyz");
    res.send("user Data Sent");
  } catch (err) {
    res.status(500).send("Some error in contact support Team");
    
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something Went Wrong");
  }
});

// Ex-3:- If we don't use try() & catch() block then OP - [Error : xyz] So, route orders are matter a lot
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something Went Wrong");
  }
});

app.get("/getUserData", (req, res) => {
  throw new customError("xyz");
  res.send("user Data Sent");
});

// Ex-4:- OP - [Something Went Wrong] So, route orders are matter a lot
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something Went Wrong");
  }
});

app.get("/getUserData", (req, res) => {
  throw new customError("xyz");
  res.send("user Data Sent");
});
// This is wildcard("/") error handling,so Always write towards end/last of your Apps bcz Anything breaks it will be caught over here
app.use("/", (err, req, res, next) => {
  if (err) {
    // Log your Error here
    res.status(500).send("Something Went Wrong");
  }
});

app.listen(3000, () => {
  console.log("Server is successfully started listening on port 3000....");
});
