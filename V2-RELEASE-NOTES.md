# HAI ĐẤT AI ACADEMY V2 — Release notes

## Tính năng
- Giao diện responsive, sáng/tối.
- Tìm kiếm và lọc 12 bài học; đọc nguyên bản Markdown từ GitHub Pages.
- Đánh dấu bài học và tiến độ qua localStorage.
- Prompt Lab ảnh, nhạc, video: ghép, sao chép, lưu cục bộ, xuất TXT.
- HTML Playground: iframe sandbox không cùng nguồn, có nút chạy và khôi phục.
- Trắc nghiệm 6 câu chấm tại trình duyệt.

## Phạm vi và giới hạn
- Không có đăng nhập, đồng bộ đám mây hoặc API sinh ảnh/nhạc/video thật.
- Không lưu mật khẩu hoặc khóa API; dữ liệu localStorage không phù hợp cho bí mật.
- Bản xem trước chạy mã HTML người dùng gõ trong iframe sandbox; chỉ dùng mã tin cậy.
- Nội dung bài học hiển thị dạng văn bản Markdown, chưa chuyển thành HTML định dạng đầy đủ.

## Kiểm thử đề xuất
1. Mở giao diện ở 360px, 768px và desktop.
2. Nhấn mỗi bài và xác nhận không gặp HTTP 404.
3. Thử tìm kiếm, lọc, đánh dấu tiến độ và tải lại trang.
4. Thử sáng/tối, prompt rỗng, sao chép và xuất TXT.
5. Thử HTML Playground, trắc nghiệm đúng/sai/làm lại.
6. Mở tab Console để phát hiện lỗi JavaScript.

Đây là phiên bản V2 chạy hoàn toàn trên GitHub Pages, không cần backend.
