const mongoose = require("mongoose")


const connectDB = async ()=>{
    try {
        console.log(process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongodb Database Connected Successfully!")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB;