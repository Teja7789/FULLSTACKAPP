const express = require('express') // import
const app = express() //invoke
//mongoose
const mongoose = require('mongoose')
//npm validator
const emailValidator = require('email-validator')
//cookies
const cookiesParser =require('cookie-parser');
//middleware func -- post, front -> json
app.use(express.json()); //global middleware
//port number , host , callback func
app.listen(3000);
//cookies
app.use(cookiesParser());

// HTTP METHODS

// let users = [{
//     "id":1,
//     "name":"abishek"
// },
// {
//     "id":2,
//     "name":"jaiRam"
// },
// {
//     "id":3,
//     "name":"max"
// }




// ];
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

//cookies
userRouter
.route('/getCookies')
.get(getCookies)

userRouter
.route('/setCookies')
.get(setCookies)


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
    // let allUsers=await userModel.findOne({name:"Mani"}); //particular user is get
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
    //update data in user obj
    // let dataToBeUpdated=req.body;
    // for(key in dataToBeUpdated){
    //     users[key]=dataToBeUpdated[key];
    // }
   let  dataToBeUpdated=req.body;
    let user= await userModel.findOneAndUpdate({email:'testked12@gmail.com'},dataToBeUpdated);
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

//cookies
function getCookies(req,res){
  let cookie = req.cookies;
  console.log(cookie);
  res.send("cookies is received")
}

function setCookies(req,res){
//   res.setHeader('Set-Cookie','isLoggedIn=true');
res.cookie('isLoggedIn',true,{maxAge:1000*60*60*24, secure:true, httpOnly:true});
res.cookie('isPrimeMember',true);
  res.send('cookies has been set ');
}

//mongoose
const db_link ='mongodb+srv://teja128ce:CMcmkeMRoJLUvHk4@cluster0.cogw3qy.mongodb.net/';
mongoose.connect(db_link)
.then(function(db){
    // console.log(db) all mongodb properties
    console.log('db connected')
})
.catch(function(err){
console.log(err)
});

//Schema

const userSchema=mongoose.Schema({
    name:{
        type:String,
        require: true
    },
    email:{
        type:String,
        require: true,
        unique:true,
        validate: function(){
            return emailValidator.validate(this.email); //unique email
        }//regex -- libarary
    },
    password:{
        type:String,
        require: true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        require: true,
        minLength:8,
        validate: function(){
            return this.confirmPassword==this.password;
        }
    }

});

//hooks
// pre hooks - removes - before saving in db
// userSchema.pre('save',function(){
//     console.log('before saving in database',this)
// });
//conformpassword == password same db not store conformPassword

userSchema.pre('save',function(){
    // console.log('before saving in database',this)
    this.confirmPassword=undefined;
});
// post hooks -  after saving in db
userSchema.post('save',function(doc){
    console.log('after saving in database',doc)
});

//modal
const userModel = mongoose.model('userModel',userSchema);

//backend to frontend obj
// (async function createUser(){
// let user={
//     name:"test1a",
//     email:"test1c@gmail.com",
//     password:'m@123456789',
//     confirmPassword:'m@123456789',
// };
// let data = await userModel.create(user);
// // console.log(data);
// })()
