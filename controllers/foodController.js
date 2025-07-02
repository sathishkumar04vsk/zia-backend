const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const Food = require("../modules/foodModel");

exports.ListFoods = async (req, res) => {
    try {
        const foods = await Food.find();
        res.status(200).send(foods);
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch foods" });
    }
}

exports.CreateFood = async (req, res) => {
    try {
        if (!req.body.name || !req.body.restorant_name || !req.body.price || !req.body.rating || !req.body.image || !req.body.location || !req.body.expected_delivery_time) {
            return res.status(400).send({ error: "All fields are required" });
        }
        const { name, restorant_name, price, rating, image, location, expected_delivery_time } = req.body;
        const food = new Food({ name, restorant_name, price, rating, image, location, expected_delivery_time });
        await food.save();
        res.status(201).send(food);
    } catch (error) {
        res.status(500).send({ error: "Failed to create food" });
    }
}


exports.GetFood = async (req, res) => {
    try {
        const { id } = req.params;
        const food = await Food.findOne({ _id: new ObjectId(id) });

        if (!food) {
            return res.status(404).send({ error: "Food not found" });
        }
        res.status(200).send(food);
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch food" });
    }
}


exports.UpdateFood = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, restorant_name, price, rating, image, location, expected_delivery_time } = req.body;

        const food = await Food.updateOne(
            { _id: new ObjectId(id) },
            { $set: { name, restorant_name, price, rating, image, location, expected_delivery_time } }
        );

        if (food.matchedCount === 0) {
            return res.status(404).send({ error: "Food not found" });
        }
        res.status(200).send({ message: "Food updated successfully" });
    } catch (error) {
        res.status(500).send({ error: "Failed to update food" });
    }
}


exports.DeleteFood = async (req, res) => {
    try {
        const { id } = req.params;
        const food = await Food.deleteOne({ _id: new ObjectId(id) });

        if (food.deletedCount === 0) {
            return res.status(404).send({ error: "Food not found" });
        }
        res.status(200).send({ message: "Food deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: "Failed to delete food" });
    }
}