const Expense = require("../models/Expense");

// 📌 2.1. Lấy danh sách khoản chi chưa xác nhận
exports.getPendingExpenses = async (req, res) => {
    try {
        const pendingExpenses = await Expense.find({ status: "PENDING" }).lean();
        res.status(200).json(pendingExpenses);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách khoản chi", error });
    }
};

// 📌 2.2. Quản lý xác nhận khoản chi
exports.approveExpense = async (req, res) => {
    try {
        console.log('ok');
        const { expenseId } = req.params;

        const expense = await Expense.findById(expenseId);
        if (!expense) return res.status(404).json({ message: "Không tìm thấy khoản chi" });

        expense.status = "APPROVED";
        await expense.save();

        res.status(200).json({ message: "Khoản chi đã được xác nhận", expense });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xác nhận khoản chi", error });
    }
};

// 📌 2.3. Quản lý yêu cầu chỉnh sửa khoản chi
exports.rejectExpense = async (req, res) => {
    try {
        const { expenseId } = req.params;
        const { reason } = req.body;

        const expense = await Expense.findById(expenseId);
        if (!expense) return res.status(404).json({ message: "Không tìm thấy khoản chi" });

        expense.status = "REJECTED";
        expense.rejectionReason = reason;
        await expense.save();

        res.status(200).json({ message: "Khoản chi đã bị từ chối", expense });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi từ chối khoản chi", error });
    }
};

// 📌 2.4. Thanh toán các khoản chi đã được phê duyệt
exports.payExpenses = async (req, res) => {
    try {
        const { expenseIds } = req.body;

        const updatedExpenses = await Expense.updateMany(
            { _id: { $in: expenseIds }, status: "APPROVED" },
            { status: "PAID" }
        );

        res.status(200).json({ message: "Khoản chi đã được thanh toán", updatedExpenses });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi thanh toán khoản chi", error });
    }
};

// 📌 3.3. Lấy danh sách chi phí theo nhiệm vụ
exports.getExpensesByTask = async (req, res) => {
    try {
        const { taskId } = req.query;

        const expenses = await Expense.find({ taskId })
            .select("description amount status")
            .lean(); // ✅ Giảm tải bộ nhớ

        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách chi phí", error });
    }
};
