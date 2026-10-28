// src/controllers/importController.js
const { validateImportBook } = require('../services/importValidation');

const createImportSlip = (req, res) => {
    try {
        const { quantity, currentStock } = req.body;
        
        // Kiểm tra điều kiện nhập sách theo Lab 4
        const validation = validateImportBook(quantity, currentStock);
        if (!validation.success) {
            return res.status(400).json({ error: validation.message });
        }

        // Logic lập phiếu nhập thành công
        return res.status(201).json({
            message: "Lập phiếu nhập sách thành công",
            data: { quantity, currentStock }
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { createImportSlip };
