const mongoose = require("mongoose");

const managerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Liên kết với User
  houseId: { type: mongoose.Schema.Types.ObjectId, ref: "House", required: true }, // Nhà trọ mà họ quản lý
  status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE" },
}, { timestamps: true });

module.exports = mongoose.model("Manager", managerSchema);
