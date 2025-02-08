# 🏠 Motel Management - Backend

🚀 **Hệ thống quản lý nhà trọ** - Backend API sử dụng **Node.js, Express.js, MongoDB**.  
📌 **Các tính năng chính:** Quản lý nhà trọ, phòng, giường, hợp đồng thuê, nhiệm vụ bảo trì, chi phí và nhân sự.

---

## 📈 1. Cài đặt & Khởi chạy

### **🔹 Yêu cầu**
- Node.js `>= 14.x`
- MongoDB `>= 4.x`
- **NPM hoặc Yarn** để quản lý package

### **🔹 Cài đặt**
```bash
# Clone dự án
git clone https://github.com/your-repo/motel-management-backend.git
cd motel-management-backend

# Cài đặt dependencies
npm install
```

### **🔹 Cấu hình `.env`**
Tạo file `.env` trong thư mục gốc và thêm:
```env
PORT=5000
MONGO_URI=mongodb+srv://pdmquan:Heimerdinger123@cluster0.r7aja.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

### **🔹 Chạy dự án**
```bash
# Chạy server
npm start

# Chạy với nodemon (tự động reload khi code thay đổi)
npm run dev
```
🚀 **Server sẽ chạy tại**: `http://localhost:5000`

---

## 📈 2. API Chính

### **🔹 Quản Lý Nhiệm Vụ (`/api/tasks`)**
| Method | Endpoint | Mô tả |
|--------|---------|--------|
| `POST` | `/api/tasks` | Tạo nhiệm vụ mới |
| `PATCH` | `/api/tasks/{taskId}/assign` | Nhân viên nhận nhiệm vụ |
| `PATCH` | `/api/tasks/{taskId}/start` | Bắt đầu nhiệm vụ |
| `PATCH` | `/api/tasks/{taskId}/complete` | Hoàn tất nhiệm vụ (có chi phí phát sinh) |
| `PATCH` | `/api/tasks/{taskId}/cancel` | Hủy nhiệm vụ |
| `GET` | `/api/tasks?status=CANCELED` | Lấy danh sách nhiệm vụ bị hủy |

---

## 📈 3. Cáu Trúc Database (MongoDB)

### **🔹 `tasks` - Quản lý nhiệm vụ**
```json
{
  "_id": "ObjectId",
  "description": "Sửa bóng đèn phòng 101",
  "houseId": "ObjectId",
  "roomId": "ObjectId",
  "priority": "HIGH",
  "assignedTo": "ObjectId",
  "status": "CANCELED",
  "cancelReason": "Khách đã tự sửa",
  "startTime": "2025-02-05T08:33:49.044Z",
  "completionTime": null
}
```

---

📌 **Motel Management Backend đã sẵn sàng hoạt động! 🚀**

