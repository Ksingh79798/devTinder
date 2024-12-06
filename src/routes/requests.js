const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
// const app = express();
// app.use(express.json());

// Sender Side
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      // corner-case-1:- random status name accepted, for avoid so check status
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid Status type:" + status });
      }

      // Corner-Case-2:- Don't allow to send the C.R to itself.. so go in models-> cR.js
      // corner-case-3:- check :toUserId bcz i'm sending a CR to a person which is not even there in my db
      const toUser = await User.findById(toUserId);
      if (!toUserId) {
        return res.status(404).json({
          message: "user is not found",
        });
      } /* now userId is only work for existing in our DB */
      //   console.log(toUser);

      // corner-case-4:- If there is an existing CR, so check
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res.status(400).send({
          message: "Connection request already exist",
        });
      }

      // create instance of C.R
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      //   save CR in db
      const connectionRequestData = await connectionRequest.save();
      //   console.log("Sending Connection Request");
      res.json({
        message:
          req.user.firstName +
          " " +
          req.user.lastName +
          "" +
          " " +
          status +
          " the connection Request to" +
          " " +
          toUser.firstName +
          " " +
          toUser.lastName,

        data: connectionRequestData,
      });
    } catch (err) {
      res.status(400).send("ERROR:" + err.message);
    }
  }
);

// Receiver Side
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;
      // validation Start
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "status not allowed",
        });
      }

      // Find one CR by using _id, toUserId, status
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        // fromUserId: loggedInUser._id,
        status: "interested",
      });

      console.log("CR", connectionRequest);
      // If don't find any CR
      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection Request not Found" });
      }
      // validation End
      // Modify the status
      connectionRequest.status = status;
      // Save CR in DB
      const data = await connectionRequest.save();
      res.json({
        message: "Connection Request" + " " + status,
        data,
      });
    } catch (err) {
      res.status(400).send("Error:" + err.message);
    }
  }
);

module.exports = requestRouter;
