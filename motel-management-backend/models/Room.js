const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Tên phòng (P101, P102,...)
    house: { type: mongoose.Schema.Types.ObjectId, ref: "House" }, // Thuộc về nhà nào
    type: { type: String, enum: ["Phòng riêng", "Phòng giường"], required: true }, // Loại phòng
    status: { type: String, enum: ["Trống", "Đã thuê"], default: "Trống" }, // Trạng thái
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
