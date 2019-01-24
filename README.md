# TESTING Mongodb Express Aangular NodeJS with typescript
[![CircleCI](https://circleci.com/gh/oshri/testing-mean/tree/master.svg?style=svg)](https://circleci.com/gh/oshri/testing-mean/tree/master)

The frontend and backend is made from scratch. Whole stack in TypeScript.

URL: https://testing-mean-app.herokuapp.com/

# Tools and technologies used:

1. Mongoose.js (MongoDB): database
2. Express.js: backend framework
3. Angular 2+: frontend framework
4. Node.js: runtime environment
5. Jest:
6. 


## Prerequisites
1. Install [Node.js](https://nodejs.org) and [MongoDB](https://www.mongodb.com)
2. Install Angular CLI: `npm i -g @angular/cli`
3. Install Yarn: `npm i -g yarn`
3. From project root folder install all the dependencies: `yarn`


## Create DB for development:

```sh
mongo
use testing-mean
db.createUser({user: "admin", pwd: "admin", roles: ["dbOwner"]})
```

## Create DB for testing:

```sh
mongo
use testing-mean-testing
db.createUser({user: "admin", pwd: "admin", roles: ["dbOwner"]})
```

## Run
### Development mode
`yarn dev`: [concurrently](https://github.com/kimmobrunfeldt/concurrently) execute MongoDB, Angular build, TypeScript compiler and Express server.


# Projects Structure
## Server

## Clent
