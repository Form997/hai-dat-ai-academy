# Chương 1: Quản lý dự án với Git và GitHub | Giáo trình AI V3.0 — Hai Đất AI Academy

Trình độ: Cơ bản. Mục tiêu: hiểu đúng nguyên lý, tự thực hành và kiểm tra được bằng chứng thay vì chỉ học thuộc thuật ngữ.

## Kiến thức và diễn giải

### 1.1. Kho lưu trữ và lịch sử phiên bản

Repository lưu file và lịch sử, không phải công cụ tự động đưa mọi thay đổi lên mạng.

### 1.2. Commit, branch và pull request

Commit lưu bản chụp có thông điệp; branch tách công việc độc lập; pull request là đề nghị xem và hợp nhất.

### 1.3. Kiểm tra thay đổi trước khi commit

Trước khi commit kiểm tra git status, git diff và danh sách file chưa theo dõi.

## Ví dụ và bài thực hành

Tạo nhánh docs/hello, bổ sung README, commit, xem diff và mở pull request.

Hồ sơ nộp: mô tả đầu vào, các bước thực hiện, ảnh/đoạn mã hoặc kết quả, sai số và điều chưa xác định. Chỉ dùng dữ liệu không chứa bí mật hay thông tin cá nhân.

## Bài tập 1

Trong kho có 2 nhánh, main và docs/hello. Thay README trên docs/hello đã làm main thay đổi chưa?

## Lời giải và lập luận

Chưa. Main chỉ đổi khi merge hoặc commit trực tiếp vào main.

## Bài tập 2 — tư duy phản biện

Một người vô tình đưa key vào git rồi thêm nó vào .gitignore. Đã đủ an toàn chưa?

## Gợi ý lời giải

Chưa; .gitignore không xoá dữ liệu đã commit. Cần thu hồi/thay key, rà lịch sử và đánh giá ảnh hưởng.

## Tự đánh giá

Tự đánh dấu khi có bằng chứng: (1) giải thích được thuật ngữ; (2) hoàn thành bài thực hành; (3) chỉ rõ ít nhất một giới hạn; (4) dẫn được nguồn gốc của định nghĩa hoặc phương pháp.

## Nguồn chính thức và nghiên cứu gốc

- https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository
- https://docs.github.com/en/pull-requests/collaborating-with-pull-requests

Ghi chú: nội dung tiếng Việt và tình huống thực hành do dự án tự biên soạn; không có tuyên bố đã thực nghiệm thay người học. Các dịch vụ, phiên bản, quyền sử dụng phải đối chiếu tại thời điểm thực hiện.

## Học tiếp và đối chiếu kiến thức

- [Git và GitHub](https://form997.github.io/hai-dat-ai-academy/knowledge/index.html?doc=01-git-github.md) — kiến thức nền, cách kiểm tra và nguồn tham khảo.
- [Tra cứu giáo trình toàn học viện](https://form997.github.io/hai-dat-ai-academy/catalog/) — tìm theo chủ đề và tình huống thực hành.
- [Toán cho AI V3.1](https://form997.github.io/hai-dat-ai-academy/math/) — các nền tảng toán học dùng trong mô hình AI.

Các đường dẫn nguồn ở mục «Nguồn chính thức và nghiên cứu gốc» dùng để đối chiếu khái niệm, không hàm ý học viện được đơn vị nguồn chứng nhận. Ví dụ và bài tập trong chương do dự án tự biên soạn.
