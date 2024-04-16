const express = require('express');

const app = express();

app.listen(9999);

app.get('/',(req,res) =>{
    res.send("Hiii");
});



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

app.get('/about',(req,res)=>{
    res.send('about Page');
});

app.get('/about-us',(req,res)=>{
    res.redirect('/about');
});

app.use((req,res)=>{
    res.status(404).send('<h1>Page Not Found :)</h1>')
})