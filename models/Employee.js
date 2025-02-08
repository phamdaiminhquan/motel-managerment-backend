const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Liên kết với User
  position: { type: String, required: true }, // Chức vụ (Bảo trì, Dọn dẹp,...)
  status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE" },
  tasksCompleted: { type: Number, default: 0 }, // Số nhiệm vụ đã hoàn thành
}, { timestamps: true });

module.exports = mongoose.model("Employee", employeeSchema);
