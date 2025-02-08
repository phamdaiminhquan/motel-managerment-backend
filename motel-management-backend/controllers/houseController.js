const House = require("../models/House");
const Room = require("../models/Room");

// Lấy danh sách tất cả nhà trọ
const getHouses = async (req, res) => {
    try {
        const houses = await House.find();
        res.status(200).json(houses);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách nhà trọ", error });
    }
};

const getHouseInfo = async (req, res) => {
    try {
        const { houseId } = req.params;
        const house = await House.findById(houseId);
        if (!house) {
            return res.status(404).json({ message: "Không tìm thấy nhà trọ" });
        }
        res.status(200).json(house);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy thống tin nhà trọ", error });
    }
};

// Thêm nhà trọ mới
const createHouse = async (req, res) => {
    try {
        console.log(req.body);
        const { name, address, status } = req.body;
        const newHouse = new House({ name, address, status });
        await newHouse.save();
        res.status(201).json(newHouse);
    } catch (error) {
        res.status(400).json({ message: "Lỗi khi tạo nhà trọ", error });
    }
};

// API lấy danh sách phòng của một nhà
const getHouseRooms = async (req, res) => {
    try {
        const { houseId } = req.params;
        const rooms = await Room.find({ house: houseId });
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách phòng", error });
    }
};

module.exports = { getHouses, getHouseRooms, createHouse, getHouseInfo };
