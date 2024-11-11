{---------------- Episode-3:- Creating Our Express Server ---------------- }

- Create a gitHub Repository
- Initialize the Repository
- Diff b/w node_modules, package.json, package_lock.json
- install express
- create a server
- Listen to port 3000
- Write request handlers for /hello, /test
- Install nodemon & Update scripts inside package.json
- what are Dependencies?
- Diff b/w carret(^) and tilde(~)
- What is the use of "-g" while npm install

{--------------- Ep-4 :- Routing & Request Handlers ---------------------- }

[part-1]

- Initialize a git
- create a .gitignore file
- create a remote repo on github

[part-2]

- push all code to remote origin
- play with routes & route extension Ex:- /, /hello, /hello/2, /test, /xyz, etc

[part-3]

- install postman app & make a workspace/collection -> Test API call
- write logic to handle GET, POST, PATCH, DELETE, API calls & test them on postman

[part-4]

- Explore different types of routing & use of ?, +, (),* in the routes
- use of Regex in routes as /a/, /.*fly$/
- How to read query params in the routes- req.query
- How to read dynamics routes- req.params

{------------- Episode-5:- Middlewares & Error Handlers--------------------}

[part-1]

- create multiple route Handlers(rH):- play with code
- learn next() fn & errors along with res.send();
- do practice:- app.use("/route",rH1,[rH2,rH3],rH4,rH5);

[part-2]

- what is Middlewares? Why do we need it?
- How Express JS basically handle requests behind the scenes?
- Diff b/w app.use() & app.all()
- Write a dummy auth middleware for admin
- Write a dummy auth middleware for all user routes, except /user/login
 
   
[part-3]
- Error Handling using app.use("/",(err,req,res,next)=>{...});
- try() & catch() block

{ -------------- Ep-06 Database, Schema & Models | Mongoose --------------- }

[Part-1]
- Create a free cluster on mongoDB official Website Known as Mongo Atlas
- Install mongoose library
- Connect your Application to the DB(devTinder), not to the cluster
- call the ConnectDB fn & connect to Db before starting application on port 3000

[Part-2]
- create a userSchema & user model
[Part-3]
- create post /signup API to insert data to the db
- push some documents using API calls from postman
- Error Handling by using try, catch

{--------------  Ep-7 Diving into the APIs  -------------------}

- Diff b/w JS object & JSON
- Add the express.json(); middleware to your app
- make your /signup API Dynamic to receive data from the END-USER(Browser/Postman/Any outside Server)
- user.findOne() with duplicate email-Ids, which obj will returned ? ans:- return Arbitrary Doc
- API :- Get user by email
- API :- Feed API --> GET/feed -> get all the users from the db
- create Delete user API
- Diff b/w PATCH & PUT
- API create a Update user
- Explore the MongoDb & Mongoose Doc for model fn/methods
- What are options in a model.findOneAndUpdate() method, explore more about it
- API :- Update the user with Email-id

{--------------  Ep-8  Data Sanitization & Schema Validation  -------------------}
-                  [part-1:- Schema level validation]
- Explore Schema Types options from the mongoose Doc
- add required,unique,lowercase,min,minLength,trim,default, ...etc
- improve the DB Schema- PUT all appropriate Validations on each field in Schema
- add timestapms to the userSchema
                     [part-2:- API level validation]
- Add API level validation on PATCH request & signup POST api
- Data Sanitization:- Add API Validation for each Fields
- Install validator via npm
- Explore validator library fn on npm & use validator fn for password,email,photoUrl,...etc
- NEVER TRUST-> (req.body) data

{--------------  Ep-9  Encrypting Passwords  -------------------}
- create utils folder & create validation.js file & here we Improve /signup api by doing validation of data & Encrypt the password 
- install bcrypt package
- create passwordHash using bcrypt.hash() & save the user is encrypted password
- for hash password:- Explore the bcrypt Library on npm
- Create login Api
- compare  passwords & throw errors if email or password is invalid

{-------------------- Ep- 10 Authentication, JWT & Cookies ------------------ }

Install cookie-parser
Just send a Dummy cookie to user
Create GET/profile Api & Check if you get the Cookie
install jsonwebtoken
In login APi, after email & pass validation, Create a JWT Token & send it to user in cookie
read the cookie inside your profile api & find the logged in user
Write the userAuth middleware
add the userAuth middleware in profile api & add new sendConnection request api
set the expiry of JWT Token & cookies to 7 days
create userSchema method to getJWT()
create userSchema method to comparePassword(passwordInputByUser)

{------ Ep- 11 Diving into the APIs & Express Router ------- }

- Explore Tinder Apis
- create a list of all api you can think of in devTinder
- Group multiple routes under respective routers
- Read the Doc of express.router()
- Create the route folder for managing auth,profile,request routers
- create authRouter, profilerouter, requestRouter
- import these routers in app.js
- create POST /logout API
- create PATCH /profile/edit API
- create PATCH  /profile/password API :- for forgot Password
- make you validate all the data in every POST,PATCH,....api
