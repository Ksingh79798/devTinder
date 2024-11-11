const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

requestRouter.post("/request", async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    console.log("Sending Connection Request");
    res.send(
      user.firstName + " " + user.lastName + "" + "Sent the connection Request"
    );
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

module.exports = requestRouter;
