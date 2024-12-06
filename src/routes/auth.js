const express = require("express");
const bcrypt = require("bcrypt");
const { validateSignupData } = require("../utils/validation");
const User = require("../models/user");

// const router = express.Router(); /* use in Company */
const authRouter = express.Router(); /* use for beginer */

authRouter.post("/signup", async (req, res) => {
  // console.log(req.body);
  try {
    // S-1:- Validation of data(when it came from req.body)
    validateSignupData(req); /* Validating the signup data */
    /* Extracting the fields as per need */
    const { firstName, lastName, emailId, password } = req.body;

    // S-2:- Encrypt/Hash the password & then Store in DB
    const passwordHash = await bcrypt.hash(
      password,
      10
    ); /* Encrypting the pass here */

    // Create a new instance of the user model
    // const user = new User(req.body); /* this is Bad way here we get all the data */
    /* Best way is to explicitly mention all the fields as per need*/
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash /* storing the pass here */,
    });
    // console.log(
    //   `Data added successfully of` + " " + user.firstName + " " + user.lastName
    // );

    const savedUser = await user.save();
    const token = await savedUser.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.json({ message: "User Added successfully!", data: savedUser });
  } catch (err) {
    // console.log(err);
    res.status(400).send("ERROR hai:" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    /* S-1:- Get the data from req.body */
    const { emailId, password } = req.body;
    console.log(req.body);
    /* S-2:- Check user is exist or not in my DB */
    // console.log(req.body);
    const user = await User.findOne({
      emailId: emailId,
    });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    /* S-3:- Check pass is valid or not */
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      console.log("Token:..." + token);

      console.log(
        user.firstName + " " + user.lastName + " " + "is Login Successful!"
      );
      res.send(user);
    } else {
      throw new Error("Invalid Credential!");
    }
  } catch (err) {
    res.status(400).send("ERROR :" + " " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expiresIn: new Date(Date.now()),
  });
  res.send("Logout Seccessfull!");
});

module.exports = authRouter;
