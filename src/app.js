// Ep-8 Data Sanitization & Schema Validation
/* Create a Server */
const express = require("express");

require("dotenv").config();
const port = process.env.PORT;
// console.log("Port:", port);

const ConnectDB = require("./config/database");

const app = express();
const User = require("./models/user"); /* import User schema from model */

app.use(express.json());

/* ------------------------------------  CRUD Operation ------------------- */
/* Ex-1:- CREATE --> Push/Insert the user data into our DB */
app.post("/signup", async (req, res) => {
  console.log("post /signup :", req.body);
  const user = new User(req.body);

  try {
    await user.save();
    res.send("user data added successfully");
  } catch (err) {
    res
      .status(400)
      .send(
        "Error for saving the data of user in DB:" +
          err.name +
          " " +
          err.mmessage
      );
  }
});

/* Ex-2:- READ Operation --> get/fetch/find the user data from our DB */
app.get("/user", async (req, res) => {
  console.log("/user route:", req.body);
  const userEmail =
    req.body
      .emailId; /* This email-id get from the request body via Browser/Postman/Any outside Server */

  try {
    const users = await User.find({
      emailId: userEmail,
    });
    if (users.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res
      .status(400)
      .send(
        "Error for fetching the user data from DB:" +
          err.name +
          " " +
          err.mmessage
      );
  }
});

/* Ex-3:- DELETE Operation --> Delete the user data from our DB */
app.delete("/user", async (req, res) => {
  console.log(req.body);
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete({
      id: userId,
    });
    if (user.length === 0) {
      res.status(404).send("user deleted successfully");
    } else {
      res.send(user);
    }
  } catch (err) {
    res
      .status(400)
      .send(
        "Error for Deleting the user data from DB:" +
          err.name +
          " " +
          err.mmessage
      );
  }
});
/* Ex-4:- UPDATE Operation --> Update the user data in our DB via Dynamic userId(get from URL) */
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;/* here I need my userID otherwise how would i fetch that which doc will i update */
  const data = req.body;
  try {
    /* API Level Validation */
    const ALLOWED_UPDATES = [
      "photoUrl",
      "password",
      "age",
      "gender",
      "about",
      "skills",
    ];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("update not Allowed");
    }
    /* skills field validations */
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    const user = await User.findByIdAndUpdate(
      {
        _id: userId,
      },
      data,
      { returnDocument: "after", runValidators: true }
    );
    console.log(user);
    res.status(200).send("user updated successfully");
  } catch (err) {
    res
      .status(400)
      .send("Update failed of the user data in our DB:" + err.mmessage);
  }
});

ConnectDB()
  .then(() => {
    console.log("DB Connection Establish");
    // 2nd listen to this server
    app.listen(port, () => {
      console.log("Server is successfully started listening on port 3000....");
    });
  })
  .catch((err) => {
    console.log("DB Cannot be Established");
  });
