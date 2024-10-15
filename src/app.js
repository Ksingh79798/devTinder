// Ep-8 Data Sanitization & Schema Validation
/* Create a Server */
const express = require("express");
const bcrypt = require("bcrypt");

require("dotenv").config();
const port = process.env.PORT;
// console.log("Port:", port);

const ConnectDB = require("./config/database");

const app = express();
const User = require("./models/user"); /* import User schema from model */
const { validateSignupData } = require("./utils/validation");
app.use(express.json());

/* ------------------------------------  CRUD Operation ------------------- */
/* Ex-1:- CREATE --> Push/Insert the user data into our DB */
app.post("/signup", async (req, res) => {
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
    await user.save();
    res.send("user data added successfully");
  } catch (err) {
    console.log(err);
    res.status(400).send("ERROR hai:" + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    /* S-1:- Get the data from req.body */
    const { emailId, password } = req.body;
    /* S-2:- Check user is exist or not in my DB */
    const user = await User.findOne({
      emailId: emailId,
    });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    /* S-3:- Check pass is valid or not */
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.send("Login Successfull!");
    } else {
      throw new Error("Invalid Credential!");
    }
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
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
          err.message
      );
  }
});
/* Ex-4:- UPDATE Operation --> Update the user data in our DB via Dynamic userId(get from URL) */
app.patch("/user/:userId", async (req, res) => {
  const userId =
    req.params
      ?.userId; /* here I need my userID otherwise how would i fetch that which doc will i update */
  const data = req.body;
  console.log("1", data);
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
    console.log("2", isUpdateAllowed);
    if (!isUpdateAllowed) {
      throw new Error("update not Allowed");
    }
    /* skills field(user Schema) validations */
    console.log("3");
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    console.log("4");
    const user = await User.findByIdAndUpdate(
      {
        _id: userId,
      },
      data,
      { returnDocument: "after", runValidators: true }
    );
    console.log("5");
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
/* Postman--> PATCH Base_URL/user/userId --> write as {"userID":"mongoDb id", "fName":"xyz" etc...} in Req Body --> SEND --> see msg "user updated successfully" in Response body [Postman] */

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
