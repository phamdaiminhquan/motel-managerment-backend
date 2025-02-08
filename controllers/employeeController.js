const Employee = require("../models/Employee");
const User = require("../models/User");
const bcrypt = require("bcrypt");

// 📌 1.1. Tạo nhân viên mới
exports.createEmployee = async (req, res) => {
  try {
    const { name, email, phone, password, position } = req.body;

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    // Mã hóa mật khẩu
    const passwordHash = await bcrypt.hash(password, 10);

    // Tạo user mới với role EMPLOYEE
    const newUser = new User({
      name,
      email,
      phone,
      passwordHash,
      role: "EMPLOYEE",
    });
    await newUser.save();

    // Tạo nhân viên với userId
    const newEmployee = new Employee({
      userId: newUser._id,
      position,
    });
    await newEmployee.save();

    res.status(201).json({ message: "Nhân viên đã được tạo", employee: newEmployee });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo nhân viên", error });
  }
};

// 📌 1.2. Lấy danh sách nhân viên
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", "name email phone role")
      .select("position status tasksCompleted");
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách nhân viên", error });
  }
};
