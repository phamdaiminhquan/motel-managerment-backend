const express = require("express");
const { getRooms, getRoomById } = require("../controllers/roomController");

const router = express.Router();

router.get("/", getRooms);  // Lấy danh sách phòng
router.get("/:roomId", getRoomById); // Lấy chi tiết phòng

module.exports = router;
