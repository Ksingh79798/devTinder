// Ep-05 Middlewares & Error Handlers  Part-01
// Create a Server
const express = require("express");
const app = express();

// Ex-1:-It goes in infinite-loop in Postman/Client/Server as [Sending request...]
app.use("/user", (req, res) => {});

// Ex-2:-It also goes in infinite-loop in Postman/Client as [Sending request...]
app.use("/user", (req, res) => {
  console.log("Handling the route user1");
});

// Ex-3:- It return in Postman as [Responding1] & In console "Handling the route user1"
app.use("/user", (req, res) => {
  console.log("Handling the route user1");
  res.send("Responding1");
});

// Ex-4:-It return in Postman as [Responding1] & In console "Handling the route user1"
app.use(
  "/user",
  (req, res) => {
    console.log("Handling the route user1");
    res.send("Responding1");
  },
  (req, res) => {
    console.log("Handling the route user2");
    res.send("Responding2");
  }
);

// Ex-4.1:-It goes in infinite-loop in Postman/Client as [Sending request...]
app.use(
  "/user",
  (req, res) => {
    console.log("Handling the route user1");
    // res.send("Responding1");
  },
  (req, res) => {
    console.log("Handling the route user2");
    res.send("Responding2");
  }
);

// Ex-5:-It return in console [1,2,Error]  & In Postman [Res1]
app.use(
  "/user",
  (req, res, next) => {
    console.log("1");
    res.send("Res1");
    next(); /*now called next rH here*/
  },
  (req, res) => {
    console.log("2");
    res.send(
      "Res2"
    ); /* get Error here bcz we don't send again another response to client/server in same path(/user) */
  }
);

// Ex-5.1:-It return in console [1,2]  & In Postman [Res2]
app.use(
  "/user",
  (req, res, next) => {
    console.log("1");
    // res.send("Res1");
    next();
  },
  (req, res) => {
    console.log("2");
    res.send("Res2");
  }
);

// Ex-6:-It return in console [1,2,Error]  & In Postman [Res2]
app.use(
  "/user",
  (req, res, next) => {
    console.log("1");
    next();
    res.send(
      "Res1"
    ); /*get Error here bcz allready send response(Res2) to client/server */
  },
  (req, res) => {
    console.log("2");
    res.send("Res2");
  }
);

// Ex-7:-It return in console [1,2]  & In Postman [Res2]
app.use(
  "/user",
  (req, res, next) => {
    console.log("1");
    // res.send("Res1");
    next();
  },
  (req, res) => {
    console.log("2");
    res.send("Res2");
  },
  // below all these rH will never execute/called bcz they can only be called if next() fn was called
  (req, res) => {
    console.log("3");
    res.send("Res3");
  },
  (req, res) => {
    console.log("4");
    res.send("Res4");
  },
  (req, res) => {
    console.log("5");
    res.send("Res5");
  }
);

// Ex-8:-It return in console [1,2,3,4,5]  & In Postman [Res5]
app.use(
  "/user",
  (req, res, next) => {
    console.log("1");
    // res.send("Res1");
    next();
  },
  (req, res, next) => {
    console.log("2");
    // res.send("Res2");
    next();
  },
  (req, res, next) => {
    console.log("3");
    // res.send("Res3");
    next();
  },
  (req, res, next) => {
    console.log("4");
    //res.send("Res4");
    next();
  },
  (req, res) => {
    console.log("5");
    res.send("Res5");
  }
);

// Ex-8.1:-It return in console [1,2,3,4,5,Error]  & In Postman [Res5]
app.use(
  "/user",
  (req, res, next) => {
    console.log("1");
    // res.send("Res1");
    next();
  },
  (req, res, next) => {
    console.log("2");
    // res.send("Res2");
    next();
  },
  (req, res, next) => {
    console.log("3");
    // res.send("Res3");
    next();
  },
  (req, res, next) => {
    console.log("4");
    //res.send("Res4");
    next();
  },
  (req, res, next) => {
    console.log("5");
    res.send("Res5");
    next(); /*get Error: [cannot GET /user] bcz after this line we don't defined any rH */
  }
);

// Ex-8.2:-If last next() fn is comment then It goes in infinite-loop in Postman/Client as [Sending request...]
app.use(
  "/user",
  (req, res, next) => {
    console.log("1");
    // res.send("Res1");
    next();
  },
  (req, res, next) => {
    console.log("2");
    // res.send("Res2");
    next();
  },
  (req, res, next) => {
    console.log("3");
    // res.send("Res3");
    next();
  },
  (req, res, next) => {
    console.log("4");
    //res.send("Res4");
    next();
  },
  (req, res, next) => {
    console.log("5");
    res.send("Res5");
    // next();
  }
);

// Also Wrapping these route handlers(Fn) indise Arrays
// app.use("/route", [rh1, rH2, rH3, rH4, rH5]);  or
// app.use("/route", [rh1, rH2], rH3, rH4, rH5);  or
// app.use("/route", rh1, [rH2], rH3, rH4, rH5);  or
// app.use("/route", rh1, [rH2, rH3], rH4, rH5);

app.listen(3000, () => {
  console.log("Server is successfully started listening on port 3000....");
});
