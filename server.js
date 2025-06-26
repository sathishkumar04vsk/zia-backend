const express = require("express");
const Routes = require("./routes/userRoutes");
const connectDB = require("./config/db");
const dontenv = require('dotenv');

dontenv.config();

const app = express();
connectDB();
app.use(express.json());

app.use('/api/users/',Routes)


app.listen(3000, () => {
  console.log("nodejs server is runing on localhost:3000!");
});
