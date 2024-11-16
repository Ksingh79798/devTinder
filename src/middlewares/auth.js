const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();
const PASSWORD = process.env.PASSWORD;

const userAuth = async (req, res, next) => {
  try {
    // const cookies = req.cookies;
    const { token } = req.cookies;
    console.log("token", token);

    if (!token) {
      return res.status(401).send("Please Login");
    }
    const decodemsg = await jwt.verify(token, PASSWORD);
    console.log("decodemsg", decodemsg);

    const { _id } = decodemsg;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("user not found");
    }
    // res.send(user);
    req.user = user; /* I have just attached of user into request */
    next();
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
};

module.exports = {
  userAuth,
};
