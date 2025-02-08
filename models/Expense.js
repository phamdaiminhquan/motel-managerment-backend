const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true }, // Nhiệm vụ liên quan
    description: { type: String, required: true }, // Nội dung chi tiêu
    amount: { type: Number, required: true }, // Số tiền đã chi
    status: { 
      type: String, 
      enum: ["PENDING", "APPROVED", "REJECTED", "PAID"], 
      default: "PENDING" 
    }, // Trạng thái khoản chi
    rejectionReason: { type: String, default: null }, // Lý do từ chối (nếu có)
  },
  { timestamps: true } // Tự động thêm createdAt & updatedAt
);

expenseSchema.index({ taskId: 1 });
expenseSchema.index({ status: 1 });

module.exports = mongoose.model("Expense", expenseSchema);
