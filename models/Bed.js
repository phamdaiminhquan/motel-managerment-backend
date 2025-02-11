const mongoose = require("mongoose");
const House = require("./House");

const bedSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", default: null },
  house: { type: mongoose.Schema.Types.ObjectId, ref: "House", default: null },
  status: { type: String, enum: ["Trống", "Đã thuê"], default: "Trống" },
});

module.exports = mongoose.model("Bed", bedSchema);
