const Bed = require("../models/Bed");

exports.getBedsByRoom = async (req, res) => {
  try {
    const beds = await Bed.find({ roomId: req.params.roomId });
    res.json(beds);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách giường" });
  }
};
exports.getBedById = async (req, res) => {
  try {
    const bed = await Bed.findById(req.params.bedId);
    if (!bed) return res.status(404).json({ message: "Giường không tồn tại" });
    res.json(bed);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy thông tin giường", error });
  }
};
exports.createBed = async (req, res) => {
  try {
    const bed = await Bed.create(req.body);
    res.status(201).json(bed);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo giường", error });
  }
};
exports.deleteBed = async (req, res) => {
  try {
    const bed = await Bed.findByIdAndDelete(req.params.bedId);
    if (!bed) return res.status(404).json({ message: "Giường không tồn tại" });
    res.json(bed);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa giường", error });
  }
};