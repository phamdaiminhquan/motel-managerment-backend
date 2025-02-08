const mongoose = require("mongoose");

const bedSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  status: { type: String, enum: ["Trống", "Đã thuê"], default: "Trống" },
});

module.exports = mongoose.model("Bed", bedSchema);
