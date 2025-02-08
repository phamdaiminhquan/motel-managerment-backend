const express = require("express");
const {
  getPendingExpenses,
  approveExpense,
  rejectExpense,
  payExpenses,
  getExpensesByTask
} = require("../controllers/expenseController");

const router = express.Router();

// 📌 2.1. Lấy danh sách khoản chi chưa xác nhận
router.get("/pending", getPendingExpenses);

// 📌 2.2. Quản lý xác nhận khoản chi
router.patch("/:expenseId/approve", approveExpense);

// 📌 2.3. Quản lý yêu cầu chỉnh sửa khoản chi
router.patch("/:expenseId/reject", rejectExpense);

// 📌 2.4. Thanh toán khoản chi đã xác nhận
router.patch("/pay", payExpenses);

// 📌 3.3. Lấy danh sách chi phí theo nhiệm vụ
router.get("/", getExpensesByTask);

module.exports = router;
