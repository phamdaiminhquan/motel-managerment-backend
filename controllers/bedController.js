const Bed = require("../models/Bed");

exports.getBedsByRoom = async (req, res) => {
  try {
    const beds = await Bed.find({ roomId: req.params.roomId });
    res.json(beds);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách giường" });
  }
};
