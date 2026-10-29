const bcrypt = require("bcryptjs");

const users = [];
let nextId = 1;

async function register(username, password) {
    // 1. Kiểm tra kiểu dữ liệu đầu vào
    if (typeof username !== "string" || typeof password !== "string") {
        throw new Error("Tên đăng nhập và mật khẩu phải là chuỗi");
    }

    // 2. Chuẩn hóa tên đăng nhập (xóa khoảng trắng, chuyển chữ thường)
    const normalizedUsername = username.trim().toLowerCase();

    if (!normalizedUsername || !password) {
        throw new Error("Tên đăng nhập và mật khẩu là bắt buộc");
    }

    if (password.length < 8) {
        throw new Error("Mật khẩu phải có ít nhất 8 ký tự");
    }

    // 3. Kiểm tra trùng lặp
    const existed = users.some(user => user.username === normalizedUsername);
    if (existed) {
        throw new Error("Tên đăng nhập đã tồn tại");
    }

    // 4. Băm mật khẩu bằng bcrypt (cost factor 10)
    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
        id: nextId++,
        username: normalizedUsername,
        passwordHash
    };

    users.push(user);

    // 5. Trả về thông tin không chứa passwordHash
    return {
        id: user.id,
        username: user.username
    };
}

async function login(username, password) {
    if (
        typeof username !== "string" ||
        typeof password !== "string" ||
        !username.trim() ||
        !password
    ) {
        throw new Error("Tên đăng nhập và mật khẩu là bắt buộc");
    }

    const normalizedUsername = username.trim().toLowerCase();

    const user = users.find(item => item.username === normalizedUsername);

    // 6. Kiểm tra tài khoản và mật khẩu (dùng thông báo chung để tránh lộ thông tin)
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        throw new Error("Tên đăng nhập hoặc mật khẩu không đúng");
    }

    return {
        id: user.id,
        username: user.username
    };
}

module.exports = { register, login };
