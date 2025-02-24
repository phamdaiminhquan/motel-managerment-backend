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
const taskRoutes = require("./routes/taskRoutes"); // ✅ Thêm routes quản lý nhiệm vụ
const expenseRoutes = require("./routes/expenseRoutes"); // ✅ Thêm routes quản lý chi phí
const employeeRoutes = require("./routes/employeeRoutes");
const authRoutes = require("./routes/authRoutes");

// Định nghĩa các endpoint
app.use("/api/houses", houseRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/beds", bedRoutes);
app.use("/api/tasks", taskRoutes); // ✅ API nhiệm vụ
app.use("/api/expenses", expenseRoutes); // ✅ API chi phí
app.use("/api/employees", employeeRoutes);
app.use("/api/auth", authRoutes);

// Lắng nghe kết nối
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
