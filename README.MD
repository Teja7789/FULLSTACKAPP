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


step7: Mounting in Express  == methods,params,quries etc

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

step8: backend connecting  to frontend

signup form- post request to backend  //post api need to updated by login page