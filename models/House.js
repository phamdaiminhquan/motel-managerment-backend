const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },  // Tên nhà trọ
    address: { type: String, required: true }, // Địa chỉ
    type: { type: String, enum: ["Thường", "Ký túc xá"], default: "Thường" }, // Loại nhà trọ
    status: { type: String, enum: ["Còn phòng", "Hết phòng"], default: "Còn phòng" }, // Trạng thái
    rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }], // Danh sách phòng (liên kết tới model Room)
  },
  { timestamps: true } // Tự động thêm createdAt & updatedAt
);

module.exports = mongoose.model("House", houseSchema);
