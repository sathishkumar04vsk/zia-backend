const mongoose = require('mongoose')
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
    const { name,email, phone_number, password } = req.body;
    const user = await User.updateOne({_id:id},{name,email, phone_number,password})
    res.send(user,202)
}

exports.DeleteUser = async(req, res)=>{
    const { id } = req.params;
    const user = User.deleteOne({_id:id})
    res.send({"detail":"User deleted sucessfully!","data":user},204)
}

