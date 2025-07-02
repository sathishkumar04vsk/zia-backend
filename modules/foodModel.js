const mongoose = require('mongoose');


const foodSchema = new mongoose.Schema({
    name: String,
    restorant_name: String,
    price: Number,
    rating: Number,
    image: String,
    location: String,
    expected_delivery_time: String
})

module.exports = mongoose.model("Food", foodSchema);