require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const orderRoutes = require("./routes/orderRoutes");

app.use("/api/orders", orderRoutes);

console.log("MONGO_URI =", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch(err => {
    console.log(err);
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Server Running");
});