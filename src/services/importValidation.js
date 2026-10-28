// src/services/importValidation.js

/**
 * Kiểm tra điều kiện nhập sách theo quy định Lab 4 (UC02)
 * - QĐ1: Số lượng nhập tối thiểu phải từ 150 trở lên.
 * - Tồn kho: Chỉ được nhập khi số lượng tồn hiện tại dưới 300.
 */
const validateImportBook = (importQuantity, currentStock) => {
    const MIN_IMPORT_QUANTITY = 150;
    const MAX_STOCK_FOR_IMPORT = 300;

    if (importQuantity < MIN_IMPORT_QUANTITY) {
        return {
            success: false,
            message: `Số lượng nhập phải đạt tối thiểu ${MIN_IMPORT_QUANTITY}.`
        };
    }

    if (currentStock >= MAX_STOCK_FOR_IMPORT) {
        return {
            success: false,
            message: `Không được nhập đầu sách khi số lượng tồn kho (${currentStock}) chưa dưới ${MAX_STOCK_FOR_IMPORT}.`
        };
    }

    return {
        success: true,
        message: "Thỏa mãn điều kiện nhập sách."
    };
};

module.exports = { validateImportBook };
