const express = require("express");
const { getRooms, getRoomById, createRoom } = require("../controllers/roomController");
const { getBedsByRoom } = require("../controllers/bedController");
const router = express.Router();

router.get("/", getRooms);  // Lấy danh sách phòng
router.get("/:roomId/beds", getBedsByRoom); // Thêm phòng mới
router.get("/:roomId", getRoomById); // Lấy chi tiết phòng

module.exports = router;
