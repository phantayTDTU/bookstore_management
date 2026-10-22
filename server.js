<CodeBlock language="javascript" editable>
require("dotenv").config();


const express = require("express");
const healthRoutes = require("./src/routes/health.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Cho phép API đọc dữ liệu JSON gửi lên
app.use(express.json());

// API kiểm tra trạng thái hệ thống và database
app.use("/api/health", healthRoutes);

// Khởi động server
app.listen(PORT, () => {
console.log(Server đang chạy tại http://localhost:$DIL1);
});
</CodeBlock>