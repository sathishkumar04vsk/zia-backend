const express = require("express");
const userRoutes = require("./routes/userRoutes");
const foodRoutes = require("./routes/foodRoutes");

const connectDB = require("./config/db");
const dontenv = require('dotenv');

dontenv.config();

const app = express();
connectDB();
app.use(express.json());

app.use('/api/users/',userRoutes)
app.use('/api/foods/',foodRoutes)


app.listen(3000, () => {
  console.log("nodejs server is runing on localhost:3000!");
});
