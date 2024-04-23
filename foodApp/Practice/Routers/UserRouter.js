const express = require('express') // import
//cookies
const cookies = require('cookie');

const userModel = require('../Models/UserModel');
//userRouter
const userRouter=express.Router();
//authHelper
const protectedRoute = require('./authHelper')
// app.use(cookieParser());
// HTTP METHODS

let users = [{
    "id":1,
    "name":"abishek"
},
{
    "id":2,
    "name":"jaiRam"
},
{
    "id":3,
    "name":"max"
}
];



userRouter
.route('/')
.get(protectedRoute,getUser)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

userRouter 
.route('/:id')
.get(getUserById);
//cookies
userRouter
.route('/getCookies')
.get(getCookies)

userRouter
.route('/setCookies')
.get(setCookies)

//get method

async function getUser(req,res){
    let allUsers=await userModel.find();
    // let allUsers=await userModel.findOne({name:"Mani kv"}); //particular user is get
    // res.send(users);
//     res.json({message:'list of all users',
// data:allUsers});
if(allUsers){
    return res.json(allUsers);
}else{
    return res.json({
        message:'users not found'
    });
}
};

//post method

async function postUser(req,res){
    console.log(req.body);
    // users=req.body;
  users = await userModel.create(req.body)
    res.json({
        message:"data received sucessfully",
        user:req.body
    });
};

//update method
async function updateUser(req,res){
    console.log("res.body",req.body);
   let  dataToBeUpdated=req.body;
    let user= await userModel.findOneAndUpdate({email:'test2b@gmail.com'},dataToBeUpdated);
   res.json({
    message:"data updated successfully",
    data:user
   })
};

//delete user
async function deleteUser(req,res){
    // users={};
    // let user=await userModel.findOneAndDelete({email:'testked12@gmail.com'});
    let dataToBeDeleted=req.body;
    let user=await userModel.findOneAndDelete(dataToBeDeleted); //delete from frontend
    res.json({
        message:"data deleted successfully",
        data:user
    });
    };


    //params id
async function getUserById(req,res){
    // console.log(req.params.id);
//    let paramId=req.params.id;
let paramId = await userModel.findById(req.params.id)
   let obj={};
   for(let i=0;i<users.length;i++){
    if(users[i]['id']==paramId){
        obj=users[i];
    }
   }
res.json({
    message:"user data received successfully",
    data:obj
});
}


function getCookies(req,res){
    // res.setHeader('Set-Cookie','isLoggedIn=true')
res.cookie('isLoggedIn', true,{maxAge:1000*60*60*24,secure: true, httpOnly: true });
// res.cookie('isPrimeMember',true)
res.cookie('cookie has been set');
}

function setCookies(req,res){
    let cookies = req.cookie.isLoggedIn;
    console.log(cookies);
    res.send('cookie received');
}


module.exports=userRouter;