// Get all the pending  connection request for the loggedIn User

const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      // toUserId: loggedInUser._id,
      fromUserId: loggedInUser._id,
      status: "interested",
    }).populate("toUserId", USER_SAFE_DATA);
    //  .populate("fromUserId",["firstName","lastName","age"])
    // console.log(connectionRequest);
    console.log(connectionRequest);
    res.json({
      message: "Data fetch Successfully",
      data: connectionRequest,
    });
  } catch (err) {
    req.statusCode(400).send("Error:" + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        {
          fromUserId: loggedInUser._id,
          status: "accepted",
        },
      ],
    }).populate("toUserId", USER_SAFE_DATA);
    // .populate("fromUserId", ["firstName", "lastName", "age"]);

    const data = connectionRequest.map((data) => {
      if (data.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return data.toUserId;
      }
      return data.fromUserId;
    });
    // console.log("data", data);
    // console.log("CR:-", connectionRequest);
    res.json(data);
  } catch (err) {
    req.statusCode(400).send("Error:" + err.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    console.log("loggedInUser :->", loggedInUser);

    // pagination start
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;
    //  pagination end

    // Db call for CR
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id },
        {
          toUserId: loggedInUser._id,
        },
      ],
    }).select("fromUserId toUserId");
    console.log("CR: ->", connectionRequests);

    // corner-case:- hide user from feed
    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });
    console.log("hideUsersFromFeed:-", hideUsersFromFeed);

    // Db call for User
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        {
          _id: { $ne: loggedInUser._id },
        },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    console.log("users:- ", users);
    res.json({ data: users });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = userRouter;
