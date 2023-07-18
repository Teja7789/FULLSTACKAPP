FULL STACK APP

step 1: nodestatucodeToviews = res.statusCode=200; and res.statusCode=404;

step 2: nodeSeverRedirect Routes = direct to another page in node using

step 3: nodeAddedDegger = npm start and debugger to console the data  
package.json 
Debug 
"scripts": {
    "test": "npm start",
    "start": "node --inspect sever.js"
  },
step 4: expressSetup = npm i express npm i nodemon npm i lodash and  changed "start": "node --inspect sever.js"   to  "start": "node --inspect app.js"  

step 5: Express Intro code === app.js 
const express = require('express') // import
const app = express() //invoke

//port number , host , callback func
app.listen(3000);

//routes
// app.get('/', function (req, res) {
//     //   res.send('Hello World')
//     // res.write("Hello");
//     // res.end();
// debugger; // not work bcz express
//     res.send('<h1>Hello</h1>');
//     });
//automatically set routues like 404 etc,
// app.get('/', (req, res)  => {
//     // automatically sets  res.setHeader('Content-Type','text/html');
//     res.send('<h1>Hello</h1>')
// });

// app.get('/about', (req, res)  => {
//   res.send('<h1>About</h1>')
// });

// views html  files 
app.get('/', (req, res)  => {
// first way
    res.sendFile('/Users/SIVANANDINI/Desktop/FullstackApp/views/index.html')
});

app.get('/about', (req, res)  => {
    // second way
  res.sendFile('./views/about.html',{root:__dirname})
});



//redirect pages
app.get('/carrier', (req, res)  => {
    // from carrier to about page redirecting
  res.redirect('./about');  //check status code (302)== moved permantely
}); 

//404 -- only used at last keyword use not send- auotomatically  shows
app.use((req, res)  => {
 //use keyword for 404  and .statusCode(404) - this chaining is used
  res.status(404).sendFile('./views/404.html',{root:__dirname})
});

step 5 : expressHTTPMethods - methods.js === express get , post, patch and delete 
*imp - http://localhost:3000/user
const express = require('express') // import
const app = express() //invoke

//port number , host , callback func
app.listen(3000);

// HTTP METHODS

let users = {};

// GET method

app.get('/user',(req,res)=>{
    // console.log(req,"req");
    res.send(users);
})

// POST method

app.post('/user',(req,res)=>{
    console.log(req.body);
    users=req.body;
    res.json({
        message:"data received sucessfully",
        user:req.body
    });
});

// PATCH method - update

app.patch('/user',(req,res)=>{
    console.log("res.body",req.body);
    //update data in user obj
    let dataToBeUpdated=req.body;
    for(key in dataToBeUpdated){
        users[key]=dataToBeUpdated[key];
    }
   res.json({
    message:"data updated successfully"
   })
});

// DELETE method

app.delete('/user',(res,req)=>{
users={};
res.json({
    message:"data deleted successfully"
})
})

step 6 : Params(parameters) == http://localhost:3000/user/:id and queries == http://localhost:3000/user/iphone/?name=jaiRam&&id=3

C:\Users\SIVANANDINI\Desktop\FullstackApp\paramsAndQueries.js
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


app.get('/user',(req,res)=>{
    console.log(req.query,"req"); //queries
    res.send(users);
})

// POST method

app.post('/user',(req,res)=>{
    console.log(req.body);
    users=req.body;
    res.json({
        message:"data received sucessfully",
        user:req.body
    });
});

// PATCH method - update

app.patch('/user',(req,res)=>{
    console.log("res.body",req.body);
    //update data in user obj
    let dataToBeUpdated=req.body;
    for(key in dataToBeUpdated){
        users[key]=dataToBeUpdated[key];
    }
   res.json({
    message:"data updated successfully"
   })
});

// DELETE method

app.delete('/user',(res,req)=>{
users={};
res.json({
    message:"data deleted successfully"
})
})

//params == getuserById
app.get('user/:name',(req,res)=>{
    console.log(req.params.id);
   let paramId=req.params.id;
   let obj={};
   for(let i=0;i<users.length;i++){
    if(users[i]['id']==paramId){
        obj=users[i];
    }
   }
res.json({
    message:"re received",
    data:obj
});
});


step7: Mounting in Express  == methods,params,quries etc http://localhost:3000/user

1.MiniApp== FullstackApp\miniApps.js
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
//base route , router to use
app.use('/user',userRouter);

userRouter
.route('/')
.get(getUser)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/:id')
.get(getUserById);

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
    message:"re received",
    data:obj
});
}

step8: backend connecting  to frontend == http://localhost:3000/auth/signup

signupform-post request to backend//post api need to updated by login page not required canbe resolved by app.use(express.json());

step9: expressMiddleware  == processing of funtions between req and res in a sequence of code
types of Middleware = 
1.app.use() => global Middleware
2.app.httpmethods => specific path middleware
benefits
1.error handling
2.404.pages
3.logger functions can be used
4.app.use(express.json()) = Middleware pass json objects to js objects

How to use
1.function(res,req,next){
    ..
    next();
}
2.with error hanling function(res,req,next,err){
    ..
    next();
}

code :  http://localhost:3000/auth/signup
const express = require('express') // import
const app = express() //invoke
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
// middleware
function getSignUp(req,res,next){
    console.log("get user called");
    next();
// res.sendFile('/Users/SIVANANDINI/Desktop/FullstackApp/foodApp/public/index.html');
// res.sendFile('/public/index.html',{root:__dirname})
}

function postSignUp(req,res){
    let obj=req.body;
    // const {  email,name, password } = req.body
    console.log(obj,"backend");
    res.json({
        message:"user signed up",
        data:obj
    });
}

step10: mongoDB == express mongodb
username:teja128ce
password:CMcmkeMRoJLUvHk4
Where would you like to connect from?
Enable access for any network(s) that need to read and write data to your cluster.

local
My Local Environment
Use this to add network IP addresses to the IP Access List. This can be modified at any time.
ADVANCED

cloud
Cloud Environment
Use this to configure network access between Atlas and your cloud or on-premise environment. Specifically, set up IP Access Lists, Network Peering, and Private Endpoints.
We added your current IP address. You can connect to your cluster locally from this device.

Set your network security with any of the following options
Only an IP address you add to your Access List will be able to connect to your project's clusters. You can manage existing IP entries via the Network Access Page.

IP Address
Enter IP Address
Description
Enter description

Add My Current IP Address

Add Entry
IP Access List

Description


IP Address	Comment	Status	Actions
0.0.0.0/0  (includes your current IP address)

My IP AddressYou will only be able to connect to your cluster from the following list of IP Addresses:

IP Address	Comment	Status	Actions
0.0.0.0/0  (includes your current IP address)  (includes your current IP address)

connect tab: mongodb+srv://teja128ce:<password>@cluster0.cogw3qy.mongodb.net/

//foodApp project - userModels
code:
const express = require('express') // import
const app = express() //invoke
//mongoose
const mongoose = require('mongoose')
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
// middleware
function getSignUp(req,res,next){
    console.log("get user called");
    next();
// res.sendFile('/Users/SIVANANDINI/Desktop/FullstackApp/foodApp/public/index.html');
// res.sendFile('/public/index.html',{root:__dirname})
}

function postSignUp(req,res){
    let obj=req.body;
    // const {  email,name, password } = req.body
    console.log(obj,"backend");
    res.json({
        message:"user signed up",
        data:obj
    });
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
        unique:true
    },
    password:{
        type:String,
        require: true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        require: true,
        minLength:8
    }

});

//modal
const userModel = mongoose.model('userModel',userSchema);

//backend to frontend obj
(async function createUser(){
let user={
    name:"Mani",
    email:"tested@gmail.com",
    password:'123456789',
    confirmPassword:'123456789',
};
let data = await userModel.create(user);
console.log(data);
})()
step11: mongoose hooks
a.2 types prehooks and post hooks
how to implement -- used npm  email validatorand conform password not saving in db bcz pwd == conformpwd
const express = require('express') // import
const app = express() //invoke
//mongoose
const mongoose = require('mongoose')
//npm validator
const emailValidator = require('email-validator')
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
// middleware
function getSignUp(req,res,next){
    console.log("get user called");
    next();
// res.sendFile('/Users/SIVANANDINI/Desktop/FullstackApp/foodApp/public/index.html');
// res.sendFile('/public/index.html',{root:__dirname})
}

function postSignUp(req,res){
    let obj=req.body;
    // const {  email,name, password } = req.body
    // console.log(obj,"backend");
    res.json({
        message:"user signed up",
        data:obj
    });
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
(async function createUser(){
let user={
    name:"test1a",
    email:"test1c@gmail.com",
    password:'m@123456789',
    confirmPassword:'m@123456789',
};
let data = await userModel.create(user);
// console.log(data);
})()
