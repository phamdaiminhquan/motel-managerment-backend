const House = require("../models/House");
const Room = require("../models/Room");
const Bed = require("../models/Bed");

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

const getBedsByHouse = async (req, res) => {
    try {
        const { houseId } = req.params;
        const beds = await Bed.find({ house: houseId });
        res.status(200).json(beds);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách giường", error });
    }
};

// Thêm nhà trọ mới
const createHouse = async (req, res) => {
    try {
        console.log(req.body);
        const { name, address, status, type } = req.body;
        const newHouse = new House({ name, address, status, type });
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

// API thêm phòng vào nhà
const addRoomByHouse = async (req, res) => {
    try {
        const { houseId } = req.params;
        const { name, type, price } = req.body;

        // check houseId is valid
        const house = await House.findById(houseId);
        if (!house) {
            return res.status(404).json({ message: "ID nhà trọ không hợp lệ" });
        }

        // save new room
        const newRoom = new Room({ house: houseId, name, type, price });
        await newRoom.save();
        res.status(201).json(newRoom);
    } catch (error) {
        res.status(400).json({ message: "Lỗi khi thêm phòng", error });
    }
};

const addBedsByHouse = async (req, res) => {
    try {
        console.log(req.body);
        const { houseId } = req.params;
        const { name, status } = req.body;
        const newBed = new Bed({ house: houseId, name, status });
        await newBed.save();
        res.status(201).json(newBed);
    } catch (error) {
        res.status(400).json({ message: "Lỗi khi thêm giường", error });
    }
};

module.exports = { getHouses, getHouseRooms, createHouse, getHouseInfo, getBedsByHouse, addBedsByHouse, addRoomByHouse };
