// S-1:- Import mongoose
const mongoose = require("mongoose");
const validator = require("validator");

// S-2:- Create a Schema as (userSchema)
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 5,
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
      default: "https://www.pngwing.com/en/free-png-vodjo",
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
      validate(value) {
        /* Also we can Add custom validation fn on each fields as per nedd*/
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
  },
  { timestamps: true }
);

// S-3:- Create a model as (User)
const User = mongoose.model("User", userSchema);

// S-4:- Export this model
module.exports = User;

// S-3 & S-4 Also do :- module.exports = mongoose.model("User", userSchema);
