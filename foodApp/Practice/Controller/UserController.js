const userModel = require("../Models/UserModel");
//get method

// module.exports.getUser=async function getUser(req,res){
//     let allUsers=await userModel.find();
//     // let allUsers=await userModel.findOne({name:"Mani kv"}); //particular user is get
//     // res.send(users);
// //     res.json({message:'list of all users',
// // data:allUsers});
// if(allUsers){
//     return res.json(allUsers);
// }else{
//     return res.json({
//         message:'users not found'
//     });
// }
// };

// //post method

// module.exports.postUser=async function postUser(req,res){
//     console.log(req.body);
//     // users=req.body;
//   users = await userModel.create(req.body)
//     res.json({
//         message:"data received sucessfully",
//         user:req.body
//     });
// };

// //update method
// module.exports.updateUser=async function updateUser(req,res){
//     console.log("res.body",req.body);
//    let  dataToBeUpdated=req.body;
//     let user= await userModel.findOneAndUpdate({email:'test2b@gmail.com'},dataToBeUpdated);
//    res.json({
//     message:"data updated successfully",
//     data:user
//    })
// };

// //delete user
// module.exports.deleteUser=async function deleteUser(req,res){
//     // users={};
//     // let user=await userModel.findOneAndDelete({email:'testked12@gmail.com'});
//     let dataToBeDeleted=req.body;
//     let user=await userModel.findOneAndDelete(dataToBeDeleted); //delete from frontend
//     res.json({
//         message:"data deleted successfully",
//         data:user
//     });
//     };

//     //params id
// module.exports.getUserById=async function getUserById(req,res){
//     // console.log(req.params.id);
// //    let paramId=req.params.id;
// let paramId = await userModel.findById(req.params.id)
//    let obj={};
//    for(let i=0;i<users.length;i++){
//     if(users[i]['id']==paramId){
//         obj=users[i];
//     }
//    }
// res.json({
//     message:"user data received successfully",
//     data:obj
// });
// }

// function getCookies(req,res){
//     // res.setHeader('Set-Cookie','isLoggedIn=true')
// res.cookie('isLoggedIn', true,{maxAge:1000*60*60*24,secure: true, httpOnly: true });
// // res.cookie('isPrimeMember',true)
// res.cookie('cookie has been set');
// }

// function setCookies(req,res){
//     let cookies = req.cookie.isLoggedIn;
//     console.log(cookies);
//     res.send('cookie received');
// }

//get method
module.exports.getUser = async function getUser(req, res) {
  let id = req.params.id;
  let allUsers = await userModel.find(id);
  // let allUsers=await userModel.findOne({name:"Mani kv"}); //particular user is get
  // res.send(users);
  //     res.json({message:'list of all users',
  // data:allUsers});
  if (allUsers) {
    return res.json(allUsers);
  } else {
    return res.json({
      message: "user not found",
    });
  }
};

// //post method

// module.exports.postUser=async function postUser(req,res){
//     console.log(req.body);
//     // users=req.body;
//   users = await userModel.create(req.body)
//     res.json({
//         message:"data received sucessfully",
//         user:req.body
//     });
// };

//update method
module.exports.updateUser = async function updateUser(req, res) {
  console.log("res.body", req.body);
  try {
    let id = req.params.id;
    let user = await userModel.findById(id);
    let dataToBeUpdated = req.body;
    if (user) {
      const keys = [];
      for (let key in dataToBeUpdated) {
        keys.push(key);
      }
      for (let i = 0; i < keys.length; i++) {
        user[keys[i]] = dataToBeUpdated[keys[i]];
      }
      const updatedData = await user.save();
      res.json({
        message: "data updated successfully",
        data: user,
      });
    } else {
      res.json({
        message: "user not found",
        data: user,
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

//delete user
module.exports.deleteUser = async function deleteUser(req, res) {
  // users={};
  try {
    let id = req.params.id;
    // let user=await userModel.findOneAndDelete({email:'testked12@gmail.com'});
    // let dataToBeDeleted=req.body;

    let user = await userModel.findByIdAndDelete(id); //delete from frontend
    if (!user) {
      res.json({
        message: "user not found",
      });
    }
    res.json({
      message: "data deleted successfully",
      data: user,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

//params id
module.exports.getAllUser = async function getAllUser(req, res) {
  // console.log(req.params.id);
  //    let paramId=req.params.id;
  // let paramId = await userModel.findById(req.params.id)
  //    let obj={};
  //    for(let i=0;i<users.length;i++){
  //     if(users[i]['id']==paramId){
  //         obj=users[i];
  //     }
  //    }
  // res.json({
  //     message:"user data received successfully",
  //     data:obj
  // });
  let users = await userModel.find();
  if (users) {
    return res.json({
      message: "All users retrived",
      data: users,
    });
  } else {
    return res.json({
      message: "users not found",
    });
  }
};

