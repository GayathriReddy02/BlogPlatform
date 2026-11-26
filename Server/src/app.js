const express = require("express");
const authRoutes = require("./routes/auth.routes");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL
}));

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.status(200).json({
        message: "Blog Platform API is running"
    });
});


app.use("/api/auth", authRoutes);

module.exports = app;