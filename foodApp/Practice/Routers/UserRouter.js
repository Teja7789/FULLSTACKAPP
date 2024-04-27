const express = require("express"); // import
//cookies
const cookies = require("cookie");

// const userModel = require('../Models/UserModel');
//userRouter
const userRouter = express.Router();
//authHelper
// const protectedRoute = require('./authHelper')
// app.use(cookieParser());
// app.use(cookies());
// HTTP METHODS
//controller
const {
  getUser,
  getAllUser,
  postUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../Controller/UserController");
const {
  signup,
  login,
  isAuthorised,
  protectedRoute,
} = require("../Controller/authController");
let users = [
  {
    id: 1,
    name: "abishek",
  },
  {
    id: 2,
    name: "jaiRam",
  },
  {
    id: 3,
    name: "max",
  },
];

// userRouter
// .route('/')
// .get(protectedRoute,getUser)
// .post(postUser)
// .patch(updateUser)
// .delete(deleteUser)

// userRouter
// .route('/:id')
// .get(getUserById);
//cookies
// userRouter
// .route('/getCookies')
// .get(getCookies)

// userRouter
// .route('/setCookies')
// .get(setCookies)

// user options
userRouter.route("/:id").patch(updateUser).delete(deleteUser);

//authController
userRouter.route("/signup").post(signup);

userRouter.route("/login").post(login);

//profile page
userRouter.use(protectedRoute);
userRouter.route("/userProfile").get(getUser);

// admin specific function
userRouter.use(isAuthorised(["admin"]));
userRouter.route("/").get(getAllUser);

module.exports = userRouter;
