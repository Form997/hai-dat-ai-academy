# Chính sách bảo mật

**Không đưa khóa API, token, mật khẩu, dữ liệu định danh vào repository hoặc mã trình duyệt.**

Nếu tìm thấy lỗ hổng: KHÔNG đăng chi tiết khai thác hoặc bí mật lên Issue. Dùng **Report a vulnerability** trong tab Security (nếu chủ kho bật private vulnerability reporting), hoặc liên hệ chủ kho qua kênh riêng. Nếu vô tình đăng khóa, thu hồi và tạo lại ngay; xóa commit đơn thuần không đủ.

GitHub Pages là website tĩnh; mọi request từ trình duyệt đều có thể bị kiểm tra. Backend phải kiểm tra xác thực, giới hạn tốc độ, payload, quota và nguồn gọi. Secret của GitHub Actions **không phải** kho an toàn cho khóa cần gửi xuống trình duyệt.
