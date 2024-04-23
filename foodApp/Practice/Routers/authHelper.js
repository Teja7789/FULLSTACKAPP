// let flag = true;
const  jwt = require('jsonwebtoken');
const JWT_KEY = "secretkey";
function protectedRoute(req,res,next){
    if(req.cookies.login){
        console.log(req.cookies.login,"JWT")
        let isVerified = jwt.verify(req.cookies.login,JWT_KEY);
      if(isVerified){
       next();
      }else{ res.send("user not  verified");
    } 
    }else{
        return res.json({
            message:'operation not allowed'
        });
    }
}
module.exports=protectedRoute;