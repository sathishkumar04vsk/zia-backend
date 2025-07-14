const mongoose = require("mongoose");
const User = require("../modules/userModel");
const bcrypt = require("bcryptjs");
const { ObjectId } = mongoose.Types;
const jwt = require("jsonwebtoken");

exports.RegisterUser = async (req, res) => {
  try {
    const { name, email, phone_number, password } = req.body;

    if (!name || !email || !phone_number || !password) {
      return res.status(400).send({ error: "All fields are required" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      phone_number,
      password: hashedPassword,
    });

    await user.save();
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    await User.updateOne(
      { _id: user._id },
      { $set: { token } } 
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.status(201).send({ message: "User registered successfully", user, token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send({ error: "Failed to register user" });
  }
}


exports.LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ error: "Invalid password" });
    }

   
    // Generate a token or session here if needed
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

     await User.updateOne(
      { _id: user._id },
      { $set: { token } } 
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.status(200).send({ message: "User Login successful", user, token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send({ error: "Failed to log in user" });
  }
}

