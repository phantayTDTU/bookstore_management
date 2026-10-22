# Hệ thống Quản lý Nhà sách (Bookstore Management)

Dự án đồ án môn **Công nghệ Phần mềm** tại Trường Đại học Tôn Đức Thắng (TDTU).

## 1. Giới thiệu dự án

Hệ thống Quản lý Nhà sách được xây dựng nhằm hỗ trợ quản lý hoạt động của nhà sách, bao gồm quản lý thông tin sách, nhập hàng, bán hàng, khách hàng, công nợ, thu tiền và báo cáo.

Dự án được phát triển theo hướng phân chia trách nhiệm giữa các thành phần để mã nguồn dễ hiểu, dễ bảo trì, kiểm thử và mở rộng.

**Repository:** `phantayTDTU/bookstore_management`

## 2. Mục tiêu dự án

- Quản lý thông tin sách và số lượng tồn kho.
- Quản lý phiếu nhập và chi tiết phiếu nhập.
- Quản lý hóa đơn bán sách và chi tiết hóa đơn.
- Quản lý thông tin khách hàng và công nợ.
- Quản lý phiếu thu tiền của khách hàng.
- Hỗ trợ lập báo cáo tồn kho và công nợ.
- Quản lý các quy định nghiệp vụ của nhà sách.
- Phân quyền người dùng theo vai trò.

## 3. Công nghệ sử dụng

| Công nghệ            | Vai trò                                       |
| -------------------- | --------------------------------------------- |
| Node.js              | Môi trường chạy JavaScript phía máy chủ       |
| Express.js           | Xây dựng máy chủ và API                       |
| Microsoft SQL Server | Hệ quản trị cơ sở dữ liệu                     |
| `mssql`              | Thư viện kết nối Node.js với SQL Server       |
| `dotenv`             | Đọc cấu hình từ file `.env`                   |
| Nodemon              | Tự khởi động lại server khi mã nguồn thay đổi |
| Git                  | Quản lý phiên bản mã nguồn                    |
| GitHub               | Lưu trữ và phối hợp phát triển dự án          |
| Visual Studio Code   | Môi trường viết mã nguồn                      |

*Lưu ý: Đây là phương án công nghệ đang được sử dụng trong bộ khung hướng dẫn. Nếu nhóm thống nhất công nghệ khác, cần cập nhật lại mục này.*

## 4. Kiến trúc hệ thống

Dự án áp dụng kiến trúc 3 lớp (3-Tier Architecture) theo định hướng thiết kế trong Lab6.

### 4.1. Presentation Layer – Tầng trình bày

Tiếp nhận yêu cầu từ người dùng, điều hướng yêu cầu và trả kết quả.

Thành phần dự kiến:

- Routes: khai báo các API.
- Controllers: tiếp nhận yêu cầu và trả phản hồi.
- Giao diện người dùng: sẽ được bổ sung theo kế hoạch phát triển.

### 4.2. Business Logic Layer – Tầng nghiệp vụ

Chịu trách nhiệm xử lý các quy tắc nghiệp vụ, kiểm tra dữ liệu và điều phối giao dịch.

Ví dụ:

- Kiểm tra số lượng tồn kho trước khi bán sách.
- Kiểm tra giới hạn công nợ khách hàng.
- Tính tổng tiền hóa đơn.
- Cập nhật tồn kho sau khi nhập hoặc bán sách.
- Cập nhật công nợ sau khi bán hàng hoặc thu tiền.

Thành phần dự kiến: `services/`.

### 4.3. Data Access Layer – Tầng truy xuất dữ liệu

Chịu trách nhiệm truy vấn, đọc và ghi dữ liệu vào SQL Server.

Thành phần dự kiến: `repositories/` và `config/db.js`.

### 4.4. Luồng xử lý tổng quát

Người dùng → Route → Controller → Service → Repository → SQL Server.

Kết quả được trả ngược về phía người dùng.

Ở giai đoạn Skeleton Code, luồng nghiệp vụ đầy đủ chưa được triển khai; cấu trúc trên là định hướng tổ chức mã nguồn.

## 5. Các đối tượng nghiệp vụ chính

| Đối tượng          | Mô tả                                              |
| ------------------ | -------------------------------------------------- |
| `Sach`             | Thông tin sách và số lượng tồn kho                 |
| `KhachHang`        | Thông tin khách hàng và công nợ                    |
| `NhanVien`         | Thông tin nhân viên                                |
| `NhanVienNhapHang` | Nhân viên thực hiện nghiệp vụ nhập hàng            |
| `NhanVienBanHang`  | Nhân viên thực hiện nghiệp vụ bán hàng             |
| `NhanVienThuNgan`  | Nhân viên thực hiện nghiệp vụ thu tiền             |
| `QuanLyNhaSach`    | Người quản lý hoạt động nhà sách                   |
| `PhieuNhap`        | Chứng từ ghi nhận nghiệp vụ nhập sách              |
| `ChiTietPhieuNhap` | Các đầu sách và số lượng trong phiếu nhập          |
| `HoaDon`           | Chứng từ ghi nhận giao dịch bán sách               |
| `ChiTietHoaDon`    | Các đầu sách và số lượng trong hóa đơn             |
| `PhieuThu`         | Chứng từ ghi nhận khoản tiền khách hàng thanh toán |
| `BaoCao`           | Thông tin phục vụ báo cáo tồn kho và công nợ       |
| `QuyDinh`          | Các tham số và quy tắc nghiệp vụ                   |

Danh sách này được xây dựng từ mô hình nghiệp vụ trong Lab5 và định hướng thiết kế trong Lab6. Các lớp sẽ được triển khai dần trong quá trình phát triển.

## 6. Cấu trúc thư mục

```text
bookstore_management/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── health.controller.js
│   ├── routes/
│   │   └── health.routes.js
│   ├── services/
│   ├── repositories/
│   └── models/
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

### Giải thích các thành phần

- `server.js`: điểm khởi chạy ứng dụng Express.
- `src/config/db.js`: cấu hình và quản lý kết nối SQL Server.
- `src/routes/`: khai báo các đường dẫn API.
- `src/controllers/`: tiếp nhận yêu cầu và trả kết quả.
- `src/services/`: xử lý nghiệp vụ.
- `src/repositories/`: truy vấn và thao tác với cơ sở dữ liệu.
- `src/models/`: tổ chức các mô hình nghiệp vụ.
- `.env`: chứa cấu hình môi trường riêng, không đưa lên GitHub.
- `.env.example`: mẫu cấu hình không chứa mật khẩu thật.
- `.gitignore`: quy định những tệp và thư mục Git không theo dõi.
- `package.json`: thông tin dự án, thư viện và lệnh chạy.
- `package-lock.json`: ghi nhận phiên bản thư viện đã cài đặt.
- `README.md`: tài liệu giới thiệu và hướng dẫn sử dụng dự án.

## 7. Cài đặt môi trường

### Yêu cầu

- Node.js và npm.
- Visual Studio Code.
- Git.
- Microsoft SQL Server.
- Công cụ quản lý SQL Server, chẳng hạn SQL Server Management Studio (SSMS).

### Bước 1: Clone repository

```bash
git clone https://github.com/phantayTDTU/bookstore_management.git
cd bookstore_management
```

### Bước 2: Cài đặt thư viện

```bash
npm install
```

### Bước 3: Tạo file cấu hình

Sao chép `.env.example` thành `.env` rồi cập nhật thông tin máy chủ và tài khoản SQL Server.

Ví dụ:

```dotenv
PORT=3000

DB_SERVER=localhost
DB_PORT=1433
DB_NAME=BookstoreManagement
DB_USER=your_sql_username
DB_PASSWORD=your_sql_password

DB_ENCRYPT=false
DB_TRUST_CERT=true
```

Các giá trị trên chỉ là ví dụ. Hãy sử dụng thông tin kết nối thực tế của môi trường đang chạy.

Nếu dùng Windows Authentication, cần cấu hình thư viện và phương thức xác thực tương ứng thay vì sử dụng cấu hình SQL Server Authentication ở trên.

### Bước 4: Khởi chạy ứng dụng

```bash
npm run dev
```

Nếu cấu hình đúng và các tệp mã nguồn đã đầy đủ, server sẽ chạy tại:

`http://localhost:3000`

## 8. Kiểm tra ứng dụng

### Kiểm tra trạng thái API

Gửi yêu cầu GET tới:

`http://localhost:3000/api/health`

Kết quả mong đợi:

```json
{
  "success": true,
  "message": "Bookstore Management API is running"
}
```

### Kiểm tra kết nối cơ sở dữ liệu

Gửi yêu cầu GET tới:

`http://localhost:3000/api/health/db`

Kết quả mong đợi khi kết nối thành công:

```json
{
  "success": true,
  "message": "Kết nối SQL Server thành công",
  "result": {
    "connectionTest": 1
  }
}
```

Các API trên chỉ hoạt động khi mã nguồn tương ứng đã được tạo, server khởi chạy thành công và cấu hình môi trường phù hợp.

## 9. Nguyên tắc phát triển

- Tách biệt giao diện, nghiệp vụ và truy xuất dữ liệu.
- Không đặt toàn bộ nghiệp vụ trong Controller.
- Không truy vấn cơ sở dữ liệu trực tiếp từ giao diện.
- Kiểm tra dữ liệu đầu vào trước khi xử lý giao dịch.
- Đảm bảo tính nhất quán giữa hóa đơn, chi tiết hóa đơn, tồn kho và công nợ.
- Sử dụng biến môi trường cho thông tin cấu hình nhạy cảm.
- Không commit mật khẩu, token hoặc file `.env` lên GitHub.
- Viết và kiểm thử từng chức năng trước khi tích hợp vào nhánh chính.
- Thống nhất tên file, tên lớp, cách đặt tên biến và quy tắc Git giữa các thành viên.

## 10. Quy trình làm việc với Git

Trước khi bắt đầu công việc:

```bash
git pull origin main
```

Sau khi chỉnh sửa mã nguồn:

```bash
git status
git add .
git commit -m "Describe your changes"
git push origin main
```

Nên tạo branch riêng cho từng chức năng khi nhóm bắt đầu phát triển song song. Trước khi tích hợp mã nguồn, cần kiểm tra thay đổi và xử lý xung đột nếu có.

Không đưa `node_modules/` và `.env` vào commit.

## 11. Trạng thái phát triển

### Giai đoạn hiện tại: Skeleton Code

- [ ] Hoàn thiện cấu trúc thư mục.
- [ ] Hoàn thiện cấu hình môi trường.
- [ ] Khởi chạy thành công Express server.
- [ ] Kiểm tra API trạng thái hệ thống.
- [ ] Kiểm tra kết nối SQL Server.
- [ ] Đưa bộ khung lên GitHub.

### Các giai đoạn tiếp theo

1. Hoàn thiện thiết kế cơ sở dữ liệu theo mô hình nghiệp vụ.
2. Xây dựng các mô hình và lớp truy xuất dữ liệu.
3. Triển khai quản lý sách và khách hàng.
4. Triển khai nghiệp vụ nhập hàng.
5. Triển khai nghiệp vụ bán hàng và hóa đơn.
6. Triển khai nghiệp vụ thu tiền và công nợ.
7. Xây dựng báo cáo và quản lý quy định.
8. Kiểm thử, tích hợp và hoàn thiện giao diện.

*Các mục trong danh sách là kế hoạch dự kiến, không khẳng định những chức năng này đã hoàn thành.*

## 12. Tài liệu tham khảo

- Lab5 – Mô hình hóa và thiết kế các lớp nghiệp vụ của Hệ thống Quản lý Nhà sách.
- Lab6 – Thiết kế kiến trúc, trách nhiệm các tầng và tính nhất quán giữa lớp, dữ liệu và giao diện.

---

**Bookstore Management – Software Engineering Project**

Trường Đại học Tôn Đức Thắng (TDTU)
