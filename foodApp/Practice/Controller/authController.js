const express = require("express"); // import
const userModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const JWT_KEY = "secretkey";
//signup user
module.exports.signup = async function postSignUp(req, res) {
  try {
    // let obj=req.body;
    let dataObj = req.body;
    let user = await userModel.create(dataObj);
    // const {  email,name, password } = req.body
    // console.log(obj,"backend");
    console.log(user, "backend");
    if (user) {
      res.json({
        message: "user signed up",
        // data:obj
        dataObj: user,
      });
    } else {
      res.json({
        message: "error whileuser signed up",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//login user
module.exports.login = async function login(req, res) {
  try {
    let data = req.body;
    if (data.email) {
      let user = await userModel.findOne({ email: data.email });
      if (user) {
        if (user.password == data.password) {
          let uid = user["_id"];
          let token = jwt.sign({ payload: uid }, JWT_KEY);
          res.cookie("login", token, { httpOnly: true, secure: true });
          return res.json({
            message: "user logined in",
            userDetails: data,
          });
        } else {
          return res.json({
            message: "wrong crendentials",
          });
        }
      } else {
        return res.json({
          message: "user not found",
        });
      }
    } else {
      return res.json({
        message: "Empty field found",
      });
    }
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
};

//isAuthorised to check the user role admin,restarnt , delivery boy

module.exports.isAuthorised = function isAuthorised(roles) {
  return function (req, res, next) {
    if (roles.includes(req.role) == true) {
      next();
    } else {
      res.status(401).json({
        message: "operation not allowed",
      });
    }
  };
};

//protectedRoute
module.exports.protectedRoute = async function protectedRoute(req, res, next) {
  try {
    let token;
    if (req.cookies.login) {
      // console.log(req.cookies.login,"JWT")
      token = req.cookies.login;
      let payload = jwt.verify(token, JWT_KEY);
      //   if(isVerified){
      //    next();
      //   }else{ res.send("user not  verified");
      // }
      // {payload:kflkdmvl}
      if (payload) {
        const user = await userModel.findById(payload.payload);
        req.role = user.role;
        req.id = user.id;
        console.log(req.role, req.id, payload.payload, "payload  token");
        next();
      } else {
        res.json({
          message: "please login again",
        });
      }
    } else {
      res.json({
        message: "please login",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};
