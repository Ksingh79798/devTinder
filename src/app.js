// Ep-7 Diving into the APIs
/* must read Doc of official website:- MongoDb & Mongoose -> API -> model etc.... */
/* Create a Server */
const express = require("express");
const ConnectDB = require("./config/database");

const app = express();
const User = require("./models/user"); /* import User schema from model */

app.use(
  express.json()
); /* It just read json-obj & convert into JS-obj & then Add this JS-obj to this req-obj in the body */

/* Ex-:- If we not use [app.use(express.json());] then  clg(req.body);- Undefined */
app.post("/signup", async (req, res) => {
  /* M-1:- For Static Data */
  console.log(
    req.body
  ); /* undefined , so we use [app.use(express.json()); for show the data */

  // const user = new User({
  //   firstName: "karan",
  //   lastName: "Kumar",
  //   emailId: "ksingh79798@gmail.com",
  //   password: "123",
  //   age: "22",
  //   gender: "male",
  // });

  /* M-2:- For Dynamic Data, here we give the data from request body via Browser/Postman/Any outside Server */
  /* Also we use [app.use(express.json());] then  clg(req.body);- show the data of request body */
  const user = new User(req.body);
  console.log(req.body); /* show the data of request body */
  try {
    await user.save(); /* save the user [that we create instance of User-model here] in db  */
    res.send(
      "user added successfully"
    ); /* response is sending back in the response body [postman] from the API  */
  } catch (err) {
    res
      .status(400)
      .send("Error saving the user:" + err.name + " " + err.mmessage);
  }
});

/* ------------------------------------  CRUD Operation ------------------- */
/* Ex-1:- CREATE --> Push/Insert the user data into our DB */
app.post("/signup", async (req, res) => {
  console.log(req.body);
  console.log(res.body);
  const user = new User(req.body);

  try {
    await user.save();
    res.send(
      "user data added successfully"
    ); /* response is sending back in the response body [postman] from the API */
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
/* For Check API:- open postman--> POST Base_URL/signup --> write some data(json form) in Request Body --> SEND --> see msg in Res Body & the data added in MongoDb Compass */

/* Ex-2:- READ Operation --> get/fetch/find the user data from our DB */
app.get("/user", async (req, res) => {
  console.log(req.body);
  const userEmail =
    req.body
      .emailId; /* This email-id get from the request body via Browser/Postman/Any outside Server */

  try {
    // const users = await User.findOne({emailId: userEmail,});  --> It will return only one data in form of obj [i.e {Doc1} ] from our DB
    // const users = await User.findById({});  --> get data in form of Array from our DB via mongoDB Id
    // const users = await User.find({});  --> get all documents(data) in form of Array from our DB

    /* get specific data of users by using sepcific filteration via email-id */
    const users = await User.find({
      emailId: userEmail,
    });
    if (users.length === 0) {
      /* find();- it return Array so, apply length property for user data exist or not */
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
/* Postman--> GET Base_URL/user --> EmailID is copy from MondoDb & paste here as write as {"emailID":"ksingh79798@gmail.com"} in Req Body --> SEND --> see msg & data got back in form of ARRAY in Response body [Postman] */

/* Ex-3:- DELETE Operation --> Delete the user data from our DB */
app.delete("/user", async (req, res) => {
  console.log(req.body);
  const userId = req.body.userId;

  try {
    /* delete the specific data of users by using mongoDb _id */
    /* { _id : userId } --> shorthand is  userId */
    /* const user = await User.findByIdAndDelete( userId or { _id : userId }  */

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
/* Postman--> DELETE Base_URL/user --> write as {"userID":"mongoDb _id is copy & paste here"} in Req Body --> SEND --> see msg "user deleted successfully" in Response body [Postman] */

/* Ex-4:- UPDATE Operation --> Update the user data in our DB */
app.patch("/user", async (req, res) => {
  console.log(req.body);
  const userId = req.body.userId; /* userID find from here */
  // const data = req.body;  /* here data var will be whole object */

  try {
    /* update the specific data of users by using mongoDb _id */
    // const user = await User.findByIdAndUpdate(userId, data);
    // const user = await User.findByIdAndUpdate({ _id : userId }, data);
    // const user = await User.findByIdAndUpdate({ _id : userId}, {fName : "xyz"});
    // const user = await User.findByIdAndUpdate({ _id : userId}, data, {returnDocument: "before/after"}); --> By default, it will return the Doc which was before update
    // clg(user);
    const user = await User.findByIdAndUpdate({
      id: userId,
    });
    if (user.length === 0) {
      res.status(404).send("user updated successfully");
    } else {
      res.send(user);
    }
  } catch (err) {
    res
      .status(400)
      .send(
        "Error for Updating the user data in our DB:" +
          err.name +
          " " +
          err.mmessage
      );
  }
});
/* Postman--> PATCH Base_URL/user --> write as {"userID":"mongoDb id", "fName":"xyz" etc...} in Req Body --> SEND --> see msg "user updated successfully" in Response body [Postman] */
/* If you trying to Update Any field(as userId) which is not present in my Schema(User) then it will also not Add/Update in the DB bcz MongoDb internally ignores this field */
/* Best way:- 1st of all, Connect to the DB (in database.js) then listen to this server (in app.js) */
ConnectDB()
  .then(() => {
    console.log("DB Connection Establish");
    // 2nd listen to this server
    app.listen(3000, () => {
      console.log("Server is successfully started listening on port 3000....");
    });
  })
  .catch((err) => {
    console.log("DB Cannot be Established");
  });
