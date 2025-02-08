const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Kết nối MongoDB
connectDB();

// Import routes
const houseRoutes = require("./routes/houseRoutes");
const roomRoutes = require("./routes/roomRoutes");
const bedRoutes = require("./routes/bedRoutes");

app.use("/api/houses", houseRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/beds", bedRoutes);

app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
