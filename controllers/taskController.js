const mongoose = require("mongoose");
const Task = require("../models/Task");
const Expense = require("../models/Expense");

// 📌 1.1. Tạo nhiệm vụ mới
exports.createTask = async (req, res) => {
  try {
    const { description, houseId, roomId, priority, assignedTo } = req.body;

    // Chuyển đổi houseId và roomId thành ObjectId nếu có
    const taskData = {
      description,
      priority: priority || "MEDIUM",
    };

    if (houseId) {
      if (!mongoose.Types.ObjectId.isValid(houseId)) {
        return res.status(400).json({ message: "houseId không hợp lệ" });
      }
      taskData.houseId = new mongoose.Types.ObjectId(houseId);
    }

    if (roomId) {
      if (!mongoose.Types.ObjectId.isValid(roomId)) {
        return res.status(400).json({ message: "roomId không hợp lệ" });
      }
      taskData.roomId = new mongoose.Types.ObjectId(roomId);
    }

    if (assignedTo) {
      if (!mongoose.Types.ObjectId.isValid(assignedTo)) {
        return res.status(400).json({ message: "assignedTo không hợp lệ" });
      }
      taskData.assignedTo = new mongoose.Types.ObjectId(assignedTo);
    }

    const newTask = new Task(taskData);
    await newTask.save();

    res.status(201).json({ message: "Nhiệm vụ đã được tạo", task: newTask });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo nhiệm vụ", error });
  }
};


// 📌 1.2. Nhận nhiệm vụ
exports.assignTask = async (req, res) => {
  try {
    const { assignedTo } = req.body;
    const { taskId } = req.params;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Không tìm thấy nhiệm vụ" });

    task.assignedTo = assignedTo;
    task.status = "ASSIGNED";
    await task.save();

    res.status(200).json({ message: "Nhiệm vụ đã được giao", task });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi nhận nhiệm vụ", error });
  }
};

// 📌 1.3. Bắt đầu thực hiện nhiệm vụ
exports.startTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Không tìm thấy nhiệm vụ" });

    task.status = "IN_PROGRESS";
    task.startTime = new Date();
    await task.save();

    res.status(200).json({ message: "Nhiệm vụ đã bắt đầu", task });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi bắt đầu nhiệm vụ", error });
  }
};

// 📌 1.4. Hoàn tất nhiệm vụ

exports.completeTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { costIncurred, expenses } = req.body;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Không tìm thấy nhiệm vụ" });

    task.status = "COMPLETED";
    task.completionTime = new Date();
    task.costIncurred = costIncurred;

    // Nếu có chi phí, lưu vào collection `expenses`
    if (costIncurred && expenses.length > 0) {
      const newExpenses = expenses.map(expense => ({
        taskId: task._id,
        description: expense.description,
        amount: expense.amount,
      }));
      await Expense.insertMany(newExpenses); // ✅ Lưu vào bảng `expenses`
    }

    await task.save();
    res.status(200).json({ message: "Nhiệm vụ đã hoàn tất", task });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi hoàn tất nhiệm vụ", error });
  }
};


// 📌 1.5. Hủy nhiệm vụ
exports.cancelTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { reason } = req.body;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Không tìm thấy nhiệm vụ" });

    task.status = "CANCELED";
    task.cancelReason = reason;
    await task.save();

    res.status(200).json({ message: "Nhiệm vụ đã bị hủy", task });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi hủy nhiệm vụ", error });
  }
};

// 📌 3.1. Lấy danh sách nhiệm vụ theo trạng thái
exports.getTasks = async (req, res) => {
  try {
    const { status, assignedTo } = req.query;
    let filter = {};

    if (status) filter.status = status;
    if (assignedTo) filter.assignedTo = assignedTo;

    const tasks = await Task.find(filter)
      .select("description priority status assignedTo startTime completionTime cancelReason") // ✅ Chỉ lấy các trường cần thiết
      .populate("assignedTo", "name email")
      .lean(); // ✅ Giảm tải bộ nhớ bằng cách trả về Plain JS Object

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách nhiệm vụ", error });
  }
};


// 📌 3.2. Lấy chi tiết một nhiệm vụ
exports.getTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Không tìm thấy nhiệm vụ" });

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy thông tin nhiệm vụ", error });
  }
};
