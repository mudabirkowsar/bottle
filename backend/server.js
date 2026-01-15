const express = require("express")
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const orderRoutes = require("./routes/orderRoutes")
const queryRoutes = require("./routes/queryRoutes")

const app = express();

app.use(cors())
app.use(express.json())

connectDB();

app.get("/", (req, res) => {
    res.send("Hello")
})

app.use('/api/order', orderRoutes)
app.use('/api/query', queryRoutes)

app.listen(5000, (req, res) => {
    console.log("Server is running ")
})
