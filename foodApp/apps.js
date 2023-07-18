const express = require('express') // import
const app = express() //invoke

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

authRouter
.route('/signup')
.get(getSignUp)
.post(postSignUp);



//get method

function getUser(req,res){
    // console.log(req.query,"req");
    res.send(users);
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

function updateUser(req,res){
    console.log("res.body",req.body);
    //update data in user obj
    let dataToBeUpdated=req.body;
    for(key in dataToBeUpdated){
        users[key]=dataToBeUpdated[key];
    }
   res.json({
    message:"data updated successfully"
   })
};

//delete user
function deleteUser(res,req){
    users={};
    res.json({
        message:"data deleted successfully"
    })
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
function getSignUp(req,res){
// res.sendFile('/Users/SIVANANDINI/Desktop/FullstackApp/foodApp/public/index.html');
res.sendFile('/public/index.html',{root:__dirname})
}

function postSignUp(req,res){
    let obj=req.body;
    // const {  email,name, password } = req.body
    console.log(obj,"backend");
    res.json({
        message:"user signed up",
        resp:obj
    });
}