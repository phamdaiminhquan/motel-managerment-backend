const express = require("express");
const { createEmployee, getEmployees } = require("../controllers/employeeController");

const router = express.Router();

router.post("/", createEmployee); // Tạo nhân viên
router.get("/", getEmployees); // Lấy danh sách nhân viên

module.exports = router;
