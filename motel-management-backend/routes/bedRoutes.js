const express = require("express");
const { getBedsByRoom } = require("../controllers/bedController");

const router = express.Router();

router.get("/:roomId/beds", getBedsByRoom); // Lấy danh sách giường của một phòng

module.exports = router;
