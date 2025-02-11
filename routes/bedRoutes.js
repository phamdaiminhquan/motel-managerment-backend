const express = require("express");
const { getBedsByRoom, createBed, getBedById, deleteBed } = require("../controllers/bedController");

const router = express.Router();

router.post("/create", createBed); // Thêm giường mới
router.get("/:roomId/beds", getBedsByRoom); // Lấy danh sách giường của một phòng
router.get("/:bedId", getBedById);

router.delete("/:bedId", deleteBed); // Xoá giường
module.exports = router;
