// S-1:- Import mongoose
const mongoose = require("mongoose");

// S-2:- Create a Schema as (userSchema)
const userSchema = new mongoose.Schema({
  firstName: { type: String } /* or firstName : String, */,
  lastName: String,
  emaidId: String,
  password: Number,
  age: Number,
  gender: String,
});

// S-3:- Create a model as (User)
const User = mongoose.model("User", userSchema);

// S-4:- Export this model
module.exports = User;

// S-3 & S-4 Also do :- module.exports = mongoose.model("User", userSchema);
