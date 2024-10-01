// Create a Server
const express = require("express");
const app = express();

app.get("/abc", (req, res) => {
  res.send({ fname: "Vicky", lname: "Kumar" });
});

app.get("/ab?c", (req, res) => {
  res.send({ fname: "Vicky", lname: "Kumar" });
});

app.get("/ab+c", (req, res) => {
  res.send({ fname: "Vicky", lname: "Kumar" });
});

app.get("ab*cd", (req, res) => {
  res.send({ fname: "Vicky", lname: "Kumar" });
});

// Also do group together
app.get("/a(bc)?d", (req, res) => {
  res.send({ fname: "Vicky", lname: "Kumar" });
});

app.get("/a(bc)+d", (req, res) => {
  res.send({ fname: "Vicky", lname: "Kumar" });
});

// Also write Regrex over here
app.get(/a/, (req, res) => {
  res.send({ fname: "Vicky", lname: "Kumar" });
});

app.get(/.*fly$/, (req, res) => {
  res.send({ fname: "Vicky", lname: "Kumar" });
});

// For fetch/get query param in my controller/route handlers we use req.query,
//write in postman as:- Base_Url/user?userId=101  or Base_Url/user?userId=101&password=testing
app.get("/user", (req, res) => {
  console.log(req.query);
  res.send({ fname: "Vicky", lname: "Kumar" });
});

//  : means Dynamic Routes, for fetch D.R we use req.params
// Base_url/user/707
app.get("/user/:userId", (req, res) => {
  console.log(req.params);
  res.send({ fname: "Vicky", lname: "Kumar" });
});

// Base_url/user/707/vicky/testing
app.get("/user/:userId/:name/:password", (req, res) => {
  console.log(req.params);
  res.send({ fname: "Vicky", lname: "Kumar" });
});

app.listen(3000, () => {
  console.log("Server is successfully started listening on port 3000....");
});
