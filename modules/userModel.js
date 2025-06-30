const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    // _id: new mongoose.Types.ObjectId,
    name: String,
    email: String,
    phone_number: Number,
    password: String,
})


module.exports = mongoose.model("User",userSchema)