# Đưa bộ kho lên GitHub từ Android

## Cách thuận tiện nhất (ít lỗi thư mục)

1. Tải ZIP toàn bộ kho về điện thoại rồi giải nén bằng **Files / My Files**.
2. Nếu mới làm quen, dùng GitHub trên trình duyệt ở chế độ trang web cho máy tính. Tạo repository Public **trống** (không thêm README, license hoặc .gitignore vì gói đã chứa).
3. Tại repo chọn **Add file → Upload files**, chọn toàn bộ **nội dung bên trong thư mục đã giải nén**, không chỉ tải nguyên file ZIP.
4. Kiểm tra thư mục con `.github`, `lessons`, `resources`, `examples`, `tests` còn đúng đường dẫn, rồi Commit changes.
5. Nếu điện thoại không hỗ trợ tải cả thư mục hoặc file ẩn `.github`, dùng **github.dev** (nhấn dấu `.` trong repo nếu bàn phím hỗ trợ) hoặc một Git client Android phù hợp để commit nguyên cấu trúc. Có thể tải lần lượt từng nhóm file nhưng phải giữ đường dẫn.
6. Vào Settings → Pages → Deploy from a branch, chọn `main`, `/ (root)` → Save.

**Lưu ý:** Chỉ đưa ZIP nguyên khối lên repository sẽ không khiến GitHub Pages tự chạy `index.html` bên trong ZIP. Có thể dùng máy tính để upload nhiều thư mục thuận tiện hơn.
