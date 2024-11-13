// Get all the pending  connection request for the loggedIn User

const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate(
      "fromUserId",
      "firstName lastName photoUrl age gender about skills"
    );
    //  .populate("fromUserId",["firstName","lastName","age"])
    console.log(connectionRequest);

    res.json({
      message: "Data fetch Successfully",
      data: connectionRequest,
    });
  } catch (err) {
    req.statusCode(400).send("Error:" + err.message);
  }
});
module.exports = userRouter;
