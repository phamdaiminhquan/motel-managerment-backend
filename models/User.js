const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  role: { type: String, enum: ["ADMIN", "MANAGER", "EMPLOYEE", "TENANT"], required: true },
  passwordHash: { type: String, required: true }, // Lưu mật khẩu đã mã hóa (bcrypt)
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
