const express = require('express') // import
const app = express() //invoke

//port number , host , callback func
app.listen(3000);

// HTTP METHODS
app.get('/',(req,res)=>{
    // console.log(req,"req");
    res.send("Hi");
})
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