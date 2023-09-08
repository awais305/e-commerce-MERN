const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/users", require("./routes/user"));
app.use("/api/v1/products", require("./routes/product"));
app.use("/api/v1/carts", require("./routes/cart"));
app.use("/api/v1/orders", require("./routes/order"));
app.use("/api/v1/checkout", require("./routes/stripe"));

app.listen(3000, () => {
  console.log('Running on port 3000!');
  connect();
});