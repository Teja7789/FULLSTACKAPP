const mongoose = require('mongoose');
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