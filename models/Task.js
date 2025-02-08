const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    description: { type: String, required: true }, // Mô tả nhiệm vụ
    houseId: { type: mongoose.Schema.Types.ObjectId, ref: "House", default: null }, // Nhà trọ liên quan (nếu có)
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", default: null }, // Phòng liên quan (nếu có)
    priority: { type: String, enum: ["LOW", "MEDIUM", "HIGH"], default: "MEDIUM" }, // Mức độ ưu tiên
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // Nhân viên thực hiện (nếu có)
    status: { 
      type: String, 
      enum: ["PENDING", "ASSIGNED", "IN_PROGRESS", "COMPLETED", "CANCELED"], 
      default: "PENDING" 
    }, // Trạng thái nhiệm vụ
    startTime: { type: Date, default: null }, // Thời gian bắt đầu nhiệm vụ
    completionTime: { type: Date, default: null }, // Thời gian hoàn thành
    costIncurred: { type: Boolean, default: false }, // Có phát sinh chi phí không
    expenses: [
      {
        description: { type: String, required: true }, // Nội dung chi tiêu
        amount: { type: Number, required: true }, // Số tiền đã chi
      }
    ], // Danh sách khoản chi phí phát sinh
    cancelReason: { type: String, default: null }, // Lý do hủy nhiệm vụ
  },
  { timestamps: true } // Tự động thêm createdAt & updatedAt
);

taskSchema.index({ status: 1 });
taskSchema.index({ assignedTo: 1 });
taskSchema.index({ houseId: 1 });
taskSchema.index({ roomId: 1 });

module.exports = mongoose.model("Task", taskSchema);
