const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();
const PASSWORD = process.env.PASSWORD;

const adminAuth = (req, res, next) => {
  console.log("Admin auth is getting checked!");
  /* Write Logic of checking if the request i.e user is Authorized or not */
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("UnAuthorized request");
  } else {
    next(); /*here called the rH(fn) */
  }
};

const userAuth = async (req, res, next) => {
  try {
    // const cookies = req.cookies;
    const { token } = req.cookies;
    console.log("token", token);

    if (!token) {
      throw new Error("Token is not Valid");
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
  adminAuth,
  userAuth,
};
