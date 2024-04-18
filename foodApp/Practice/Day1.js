const express = require('express') // import
const app = express() //invoke
//models/userModel
const  userModel = require("./Models/UserModel.js");
//middleware func -- post, front -> json
app.use(express.json()); //global middleware
//port number , host , callback func
app.listen(3000);

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
//creating Mini App
const userRouter=express.Router();
//signUp route
const authRouter=express.Router();
//base route , router to use
app.use('/user',userRouter);
app.use('/auth',authRouter);


userRouter
.route('/')
.get(getUser)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

userRouter 
.route('/:id')
.get(getUserById);
//middleware
authRouter
.route('/signup')
.get(middleware1,getSignUp,middleware2) //path specific middleware
.post(postSignUp);
//middleware
function middleware1(req,res,next){
    console.log('middleware1 encourted');
    next();
}
function middleware2(req,res){
    console.log('middleware2 encourted');
    // next();
    console.log("middleware2 is ended req res cycle");
    res.sendFile('/public/index.html',{root:__dirname});
}
//get method

async function getUser(req,res){
    let allUsers=await userModel.find();
    // let allUsers=await userModel.findOne({name:"Mani kv"}); //particular user is get
    // res.send(users);
    res.json({message:'list of all users',
data:allUsers});
};

//post method

function postUser(req,res){
    console.log(req.body);
    users=req.body;
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
        // data:user
    });
    };


    //params id
function getUserById(req,res){
    console.log(req.params.id);
   let paramId=req.params.id;
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


