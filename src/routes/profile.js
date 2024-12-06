const express = require("express");
const profileRouter = express.Router();
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

// view profile
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    // console.log(user);
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

// Edit profile
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Credentials");
    }

    const loggedInUser = req.user;
    console.log("loggedInUser 1:" + loggedInUser);

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    console.log("loggedInUser 2:" + loggedInUser);

    await loggedInUser.save();

    // res.send(`${loggedInUser.firstName}, your Profile updated Successfully!`);
    /* Or */
    res.json({
      message: `${loggedInUser.firstName}, your Profile updated Successfully!`,
      data: loggedInUser /* give data to the user back */,
    });
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

// forgot Password
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { password } = req.body;
    console.log(password);
    // write Logic here
    res.send("forgotPassword");
  } catch (err) {
    res.send("Error in Forgot password");
  }
});

module.exports = profileRouter;
