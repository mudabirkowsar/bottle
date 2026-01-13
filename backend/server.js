const express = require("express")
const cors = require("cors");
const connectDB = require("./models/db");
require("dotenv").config();

const app = express();

app.use(cors())
app.use(express.json())


connectDB();


app.get("/", (req, res) => {
    res.send("Hello")
})

app.listen(5000, (req, res) => {
    console.log("Server is running ")
})
