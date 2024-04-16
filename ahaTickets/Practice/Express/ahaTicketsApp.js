// express
const express = require('express');
const app = express() //invoke
//routes
app.get('/',function(req,res){
res.send('Hello World, Express');
});

app.listen(3000);