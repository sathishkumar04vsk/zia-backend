const express = require("express");
const Routes = require("./routes/userRoutes")

const app = express();

app.use(express.json());

app.use('/api/users/',Routes)


app.listen(3000, () => {
  console.log("nodejs server is runing on localhost:3000!");
});
