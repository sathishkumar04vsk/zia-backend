const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const User = require("../modules/userModel");

exports.ListUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users, 200);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch users" });
    console.error("Error fetching users:", error);
  }
};

exports.CreateUser = async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.phone_number ||
      !req.body.password
    ) {
      return res.status(400).send({ error: "All fields are required" });
    }
    const { name, email, phone_number, password } = req.body;
    const user = await User.insertOne({ name, email, phone_number, password });
    res.send(user, 201);
  } catch (error) {
    res.status(500).send({ error: "Failed to create user" });
    console.error("Error creating user:", error);
  }
};

exports.GetUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send({ error: "Failed to fetch user" });
  }
};

exports.UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(typeof id);
    const { name, email, phone_number, password } = req.body;

    const user = await User.updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, email, phone_number, password } }
    );
    if (user.matchedCount === 0) {
      return res.status(404).send({ error: "User not found" });
    }
    res.status(202).send({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send({ error: "Failed to update user" });
  }
};

exports.DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(typeof id);
    const user = await User.deleteOne({ _id: new ObjectId(id) });
    if (user.deletedCount === 0) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send({ detail: "User deleted sucessfully!", data: user }, 204);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send({ error: "Failed to delete user" });
  }
};

// list food
// get food
// create food
// update food
// delete food

// list todo
// create todo
// update todo
// delete todo
