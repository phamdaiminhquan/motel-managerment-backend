const Room = require("../models/Room");

exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách phòng" });
  }
};

exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);
    if (!room) return res.status(404).json({ message: "Phòng không tồn tại" });
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy thông tin phòng" });
  }
};
