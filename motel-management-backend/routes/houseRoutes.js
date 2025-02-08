const express = require("express");
const { getHouses, getHouseRooms, createHouse, getHouseInfo } = require("../controllers/houseController");

const router = express.Router();

router.get("/", getHouses);  // Lấy danh sách nhà trọ
router.post("/", createHouse); // Thêm nhà trọ mới

router.get("/:houseId", getHouseInfo);
router.get("/:houseId/rooms", getHouseRooms); // API lấy danh sách phòng của nhà

module.exports = router;
