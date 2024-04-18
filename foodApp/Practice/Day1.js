const express = require('express') // import
//cookies
const cookie = require('cookie'); //not using
const cookieParser = require('cookie-parser');
const app = express() //invoke
//models/userModel
const  userModel = require("./Models/UserModel.js");
//user router
const userRouter = require('./Routers/UserRouter.js');
const authRouter = require('./Routers/AuthRouter.js');
//middleware func -- post, front -> json
app.use(express.json()); //global middleware
app.use(cookieParser()); //cookie-parser
//port number , host , callback func
app.listen(3000);

//base route , router to use
app.use('/user',userRouter);
app.use('/auth',authRouter);

