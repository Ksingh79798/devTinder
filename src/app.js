// Ep-11:-  Diving into the apis & Express Router
/* Create a Server */
const express = require("express");
const cookirParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");

require("dotenv").config();
const port = process.env.PORT;
const ConnectDB = require("./config/database");

const app = express();
const User = require("./models/user");
app.use(cookirParser());
app.use(express.json());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

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

app.delete("/user:userId", async (req, res) => {
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
          err.message
      );
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
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
      // "emailId",
    ];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("update not Allowed");
    }
    /* skills field(user Schema) validations */
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
      .send(
        "Update failed of the user data in our DB:" +
          err.name +
          "  " +
          err.message
      );
  }
});

ConnectDB()
  .then(() => {
    console.log("DB Connection Establish");
    app.listen(port, () => {
      console.log("Server is successfully started listening on port 3000....");
    });
  })
  .catch((err) => {
    console.log("DB Cannot be Established");
  });
