# authRouter

- POST /signup
- POST /login
- POST /logout

# profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

# connectionRequestRouter

- Status: interested, ignored, accepted, rejected

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId

- Combine both in one route:- POST /request/send/:status/:userId

- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

- Combine both in one route:- POST /request/review/:status/:requestId

# userRouter

- GET /user/connections
- GET /user/requests/received
- GET /user/feed
