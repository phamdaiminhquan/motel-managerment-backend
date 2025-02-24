const express = require("express");
const { getHouses, getHouseRooms, createHouse, getHouseInfo, getBedsByHouse, addBedsByHouse, addRoomByHouse } = require("../controllers/houseController");

const router = express.Router();

router.get("/", getHouses);  // Lấy danh sách nhà trọ
router.post("/", createHouse); // Thêm nhà trọ mới

router.get("/:houseId/rooms", getHouseRooms); // API lấy danh sách phòng của nhà
router.post("/:houseId/rooms", addRoomByHouse); // API thêm phòng vào nhà

router.get("/:houseId/beds", getBedsByHouse); // ✅ Lấy danh sách giường theo nhà trọ
router.post("/:houseId/beds", addBedsByHouse); // ✅ Thêm giường vào nhà trọ

router.get("/:houseId", getHouseInfo);
module.exports = router;
