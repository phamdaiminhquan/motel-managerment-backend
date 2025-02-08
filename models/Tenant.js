const mongoose = require("mongoose");

const tenantSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Liên kết với User
  contractId: { type: mongoose.Schema.Types.ObjectId, ref: "Contract", required: true }, // Hợp đồng thuê
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true }, // Phòng đang thuê
  bedId: { type: mongoose.Schema.Types.ObjectId, ref: "Bed", default: null }, // Giường (nếu có)
  status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE" },
}, { timestamps: true });

module.exports = mongoose.model("Tenant", tenantSchema);
