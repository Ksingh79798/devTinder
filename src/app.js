// Ep-05 Middlewares & Error Handlers  [ Part-02 ]
// Create a Server
const express = require("express");
const app = express();

//Ex-1:- We can also create one rH with the same route
// It return in console [1,2] & In Postman [Res2]
app.get("/user", (req, res, next) => {
  console.log("1");
  next();
});

app.get("/user", (req, res, next) => {
  console.log("2");
  res.send("Res2");
});

//Ex:-1.1 If i changed the order of rH bce Order is matter a lot
// It return in console [2] & In Postman [Res2]
app.get("/user", (req, res, next) => {
  console.log("2");
  res.send("Res2");
});

app.get("/user", (req, res, next) => {
  console.log("1");
  next();
});

//Ex:-1.2 It return in console [2,1] & In Postman Error:- [cannot Get /user]
app.get("/user", (req, res, next) => {
  console.log("2");
  // res.send("Res2");
  next();
});

app.get("/user", (req, res, next) => {
  console.log("1");
  next(); /*Error here*/ /*If we comment this next() fn at this line then is goes to infinite-loop */
});

//Ex:-1.3 If we comment this next() fn at this line then is goes to infinite-loop
app.get("/user", (req, res, next) => {
  console.log("2");
  // res.send("Res2");
  next();
});

app.get("/user", (req, res, next) => {
  console.log("1");
  // next();
});

// Ex:-2:-It return in console ["Handling /user route"] & In postman [1nd Route Handler]
// GET /users => It checks all the app.methods("matching route") fn one-by-one till its gives response back to the server
// GET /user => middleware chain/Method chain => request handler
// Create a Middlewares
app.use("/", (req, res, next) => {
  // res.send("Handling /user route");
  next();
});
// create multiple rH known as seperate rH
app.get(
  "/user",
  (req, res, next) => {
    console.log("Handling /user route");
    next();
  },
  (req, res, next) => {
    /*This is actually a rH which is actually sending the data back to the server */
    res.send("1st Route Handler");
    // next();
  },
  (req, res, next) => {
    res.send("2st Route Handler");
  }
);

//========================   Why do we need middlewares? ===================    Time:-36:00 mints
// Ex-3:- here we write same logic code in both rH, so this is not good way for writing middlewares
app.get("/admin/getAllData", (req, res) => {
  /* Write Logic of checking if the request i.e user is Authorized or not */
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (isAdminAuthorized) {
    res.send("All Data Sent");
  } else {
    res.status(401).send("UnAuthorized request");
  }
});

app.get("/admin/deleteUser", (req, res) => {
  /* Write Logic of checking if the request i.e user is Authorized or not */
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (isAdminAuthorized) {
    res.send("Deleted a User");
  } else {
    res.status(401).send("UnAuthorized request");
  }
});

// Ex-4:- Good Way is use:- app.use("/admin",()=>{write Logic for Authorization});
// so, It Handle Auth middleware for all request(get,post,delete,etc),
app.use("/admin", (req, res) => {
  console.log("Admin auth is getting checked!");
  /* Write Logic of checking if the request i.e user is Authorized or not */
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("UnAuthorized request");
  } else {
    next(); /*here called the rH(fn) */
  }
});
app.get("/user", (req, res) => {
  res.send("user Data sent");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("All Data sent");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted a User");
});

// Ex-5:- Best way bcz here we create middleware folder (create auth.js file)

const {
  adminAuth,
  userAuth,
} = require("./middlewares/auth"); /* 1st Import Middlewares */
app.use("/admin", adminAuth); /* here directly write auth handler */
app.use(
  "/user",
  userAuth
); /* app.use("/user", userAuth, ()=>{.......}); If i have just one route so, also write like this */

app.get("/user", (req, res) => {
  res.send("user Data sent");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("All Data sent");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted a User");
});

app.post("/user/login", (req, res) => {
  /* here don't need userAuth middleware */
  res.send("login Successfully");
});

app.get("/user/data", userAuth, (req, res) => {
  /* pass userAuth middleware bcz we need here*/
  res.send("Data Sent Successfully");
});

// Ex-5.1:- Also seperatly use middlewares as per need
const { adminAuth, userAuth } = require("./middlewares/auth");

/* app.use("/user", userAuth, ()=>{.......}); If i have just one route so, also write like this */
app.get("/user/data", userAuth, (req, res) => {
  /* pass userAuth middleware bcz we need here*/
  res.send("Data Sent Successfully");
});

app.post("/user/login", (req, res) => {
  /* here don't need userAuth middleware */
  res.send("login Successfully");
});

app.get("/admin/getAllData", adminAuth, (req, res) => {
  res.send("All Data sent");
});

app.listen(3000, () => {
  console.log("Server is successfully started listening on port 3000....");
});
