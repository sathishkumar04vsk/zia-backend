const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types;

const User = require("../modules/userModel")

exports.ListUsers = async(req, res)=>{
    const users = await User.find();
    res.send(users, 200)
};

exports.CreateUser = async(req, res) =>{
    const {name,email, phone_number, password} = req.body;
    const user = await User.insertOne({name,email, phone_number,password})
    res.send(user, 201)
}

exports.GetUser = async(req, res) =>{
    const { id } = req.params;
    const user = await User.findOne({_id:id})
    res.send(user)
}

exports.UpdateUser = async(req, res) =>{
    const { id } = req.params;
    console.log(typeof(id));
    const { name,email, phone_number, password } = req.body;
  
    const user = await User.updateOne({_id:new ObjectId(id)},{$set:{name,email, phone_number,password}})
    res.send(user,202)
}

exports.DeleteUser = async(req, res)=>{
    const { id } = req.params;
    const user = await User.deleteOne({_id:new ObjectId(id)})
    res.send({"detail":"User deleted sucessfully!","data":user},204)
}


// list food
// get food
// create food 
// update food 
// delete food

// list todo
// create todo
// update todo
// delete todo