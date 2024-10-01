// Create a Server
const express = require("express");
const app = express();

app.use("/", (req, res) => {
  res.send("Hello Vicky");
});

app.use("/hello", (req, res) => {
  res.send("Hello, Hello, Hello");
});

app.use("/hello/2", (req, res) => {
  res.send("abcde");
});

app.use("/test", (req, res) => {
  res.send("Hello from the server");
});

app.listen(3000, () => {
  console.log("Server is successfully started listening on port 3000....");
});
