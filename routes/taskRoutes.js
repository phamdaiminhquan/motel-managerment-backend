const express = require("express");
const {
  createTask,
  assignTask,
  startTask,
  completeTask,
  cancelTask,
  getTasks,
  getTaskById
} = require("../controllers/taskController");

const router = express.Router();

// 📌 1.1. Tạo nhiệm vụ
router.post("/", createTask);

// 📌 1.2. Nhận nhiệm vụ
router.patch("/:taskId/assign", assignTask);

// 📌 1.3. Bắt đầu thực hiện nhiệm vụ
router.patch("/:taskId/start", startTask);

// 📌 1.4. Hoàn tất nhiệm vụ
router.patch("/:taskId/complete", completeTask);

// 📌 1.5. Hủy nhiệm vụ
router.patch("/:taskId/cancel", cancelTask);

// 📌 3.1. Lấy danh sách nhiệm vụ theo trạng thái
router.get("/", getTasks);

// 📌 3.2. Lấy chi tiết một nhiệm vụ
router.get("/:taskId", getTaskById);

module.exports = router;
