const express = require("express");
const userRoutes = require("./routes/userRoutes");
const foodRoutes = require("./routes/foodRoutes");
const authRoutes = require("./routes/authRoutes");
const cros = require("cors");
const authenticate = require("./middlewares/authMiddleware");

const connectDB = require("./config/db");
const dontenv = require('dotenv');

dontenv.config();

const app = express();
connectDB();
app.use(express.json());
app.use(cros({
  origin: process.env.FRONTEND_URL || "http://localhost:5000",
}));

app.use('/api/users/', authenticate, userRoutes)
app.use('/api/foods/', authenticate, foodRoutes)
app.use('/api/auth/', authRoutes)

app.listen(3000, () => {
  console.log("nodejs server is runing on localhost:3000!");
});
