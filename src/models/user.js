// S-1:- Import mongoose
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const PASSWORD = process.env.PASSWORD;

// S-2:- Create a Schema as (userSchema)
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    } /* or firstName : String, */,
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validator(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Address:" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validator(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("This is not Strong password:" + value);
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      validator(value) {
        if (!validator.isURL(value)) {
          throw new Error("This is Invalid URL address:" + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is a default about of the user!",
    },
    skills: {
      type: [String],
    },
    age: {
      type: Number,
      min: 18,
      max: 50,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: `{VALUE} is not a valid gender type`,
      },
      /* OR */
      // validate(value) {
      //   /* Also we can Add custom validation fn on each fields as per nedd*/
      //   if (!["male", "female", "others"].includes(value)) {
      //     throw new Error("Gender data is not valid");
      //   }
      // },
    },
  },
  { timestamps: true }
);

// userSchema.index({ firstName: 1, lastName: 1 });

//------------ Create the Schema methods into the mongoose Schema -----------
/* Create Token here*/
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, PASSWORD, {
    expiresIn: "7d",
  });
  return token;
};

/* Validate passwords here */
userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};

// S-3:- Create a model as (User)
const User = mongoose.model("User", userSchema);

// S-4:- Export this model
module.exports = User;

// S-3 & S-4 Also do :- module.exports = mongoose.model("User", userSchema);
