//mongoose
const mongoose = require('mongoose')
//npm validator
const emailValidator = require('email-validator')
//hashing by bcrypt
const bcrypt = require('bcrypt');
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
//remove hook -- check

//bcrypt
// userSchema.pre('save',async function(){
//     let salt = await bcrypt.genSalt();
//     let hashedString = await bcrypt.hash(this.password,salt);
// console.log(hashedString , "hashedString of Password");
// this.password = hashedString;
// })

//modal
const userModel = mongoose.model('userModel',userSchema);

module.exports = userModel;