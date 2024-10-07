{ Episode-3:- Creating Our Express Server }

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

{ Ep-4 :- Routing & Request Handlers }

[part-01]

- Initialize a git
- create a .gitignore file
- create a remote repo on github

[part-02]

- push all code to remote origin
- play with routes & route extension Ex:- /, /hello, /hello/2, /test, /xyz, etc

[part-03]

- install postman app & make a workspace/collection -> Test API call
- write logic to handle GET, POST, PATCH, DELETE, API calls & test them on postman

[part-04]

- Explore different types of routing & use of ?, +, (),* in the routes
- use of Regex in routes as /a/, /.*fly$/
- How to read query params in the routes- req.query
- How to read dynamics routes- req.params

{ Episode-5:- Middlewares & Error Handlers}

[part-01]

- create multiple route Handlers(rH):- play with code
- learn next() fn & errors along with res.send();
- do practice:- app.use("/route",rH1,[rH2,rH3],rH4,rH5);

[part-02]

- what is Middlewares? Why do we need it?
- How Express JS basically handle requests behind the scenes?
- Diff b/w app.use() & app.all()
- Write a dummy auth middleware for admin
- Write a dummy auth middleware for all user routes, except /user/login
 
   
[part-03]
- Error Handling using app.use("/",(err,req,res,next)=>{...});
- try() & catch() block

{ Ep-06 Database, Schema & Models | Mongoose  }

[Part-01]
- Create a free cluster on mongoDB official Website Known as Mongo Atlas
- Install mongoose library
- Connect your Application to the DB(devTinder), not to the cluster
- call the ConnectDB fn & connect to Db before starting application on port 3000