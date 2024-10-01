// Create a Server
const express = require("express");
const app = express();

// app.use((req, res) => {
//   res.send("Hello from the server");
// });

// create aa route handler
app.use("/hello", (req, res) => {
  res.send("Hello from the server");
});

app.listen(3000, () => {
  console.log("Server is successfully started listening on port 3000....");
});
