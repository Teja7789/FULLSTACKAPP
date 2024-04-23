const express = require('express') // import
const userModel = require('../Models/UserModel');
//authRouter
const authRouter=express.Router();
const cookie = require('cookie');
//JWT
// const  jwt = require('./authHelper');
// const JWT_KEY = require('./authHelper');
const  jwt = require('jsonwebtoken');
const JWT_KEY = "secretkey";
//middleware
authRouter
.route('/signup')
.get(middleware1,getSignUp,middleware2) //path specific middleware
.post(postSignUp);

authRouter
.route('/login')
.get(middleware1,getSignUp,middleware2) //path specific middleware
.post(loginUser);
//middleware
function middleware1(req,res,next){
    console.log('middleware1 encourted');
    next();
}
function middleware2(req,res){
    console.log('middleware2 encourted');
    // next();
    console.log("middleware2 is ended req res cycle");
    // res.sendFile('/public/index.html',{root:__dirname});
}
//signup
// middleware
function getSignUp(req,res,next){
    console.log("get user called");
    next();
// res.sendFile('/Users/SIVANANDINI/Desktop/FullstackApp/foodApp/public/index.html');
// res.sendFile('/public/index.html',{root:__dirname})
}

async function postSignUp(req,res){
    // let obj=req.body;
    let dataObj = req.body;
    let user=await userModel.create(dataObj);
    // const {  email,name, password } = req.body
    // console.log(obj,"backend");
    console.log(user,"backend");
    res.json({
        message:"user signed up",
        // data:obj
        dataObj: user
    });
}
async function loginUser(req,res){
    try{
    let data=req.body;
    if(data.email){
    let user=await userModel.findOne({email:data.email});
    if(user){
        if(user.password==data.password){
            let uid = user['_id'];
let token = jwt.sign({payload:uid},JWT_KEY);
             res.cookie('login',token
         ,{httpOnly:true,secure: true});
            return res.json({
                message:"user logined in",
                userDetails:data
            });
        }else{
            return res.json({
                message:"wrong crendentials"
            })
        }
    }
    else{
        return res.json({
            message:"user not found"
        })  
    }
}else{
    return res.json({
        message:"Empty field found"
    })   
}
     }
     catch(err){
return res.json({
    message:err.message
})  
     }
}
module.exports = authRouter;