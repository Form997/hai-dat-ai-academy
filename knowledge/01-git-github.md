# 01. Git và GitHub: lịch sử mã nguồn

**Mức độ:** Cơ bản · **Ngày đối chiếu:** 2026-10-13 · **Trạng thái:** Nội dung giảng dạy dẫn nguồn, chưa thay thế thực nghiệm độc lập.

## Mục tiêu đầu ra

Sau khi học, người đọc phải diễn giải các khái niệm cốt lõi, hoàn thành bài thực hành và cung cấp bằng chứng kiểm tra sản phẩm của mình.

## Nội dung học

### 1. Phân biệt Git và GitHub

Git là hệ thống quản lý phiên bản phân tán; GitHub cung cấp kho lưu trữ và quy trình cộng tác trên nền Git. Commit ghi lại trạng thái thay đổi; branch là nhánh phát triển và pull request đề xuất hợp nhất.

### 2. Quy trình an toàn

Tách nhánh cho tính năng mới; kiểm tra diff; chạy test; mở pull request; người quản lý xét duyệt rồi mới merge vào main. Không dùng nhánh main làm nơi thử nghiệm.

### 3. Lịch sử có thể truy vết

Một thông điệp commit tốt nói rõ mục đích và phạm vi thay đổi. .gitignore chỉ ngăn tập tin chưa được theo dõi, không xóa bí mật đã vào lịch sử.

## Bài thực hành có đầu ra

Tạo kho công khai mới, tạo nhánh docs/first-lesson, chỉnh README bằng một đoạn giới thiệu, commit, mở PR, xem Files changed rồi đóng PR mà không merge để thực hành.

## Câu hỏi và tiêu chí tự đánh giá

1. Giải thích khác nhau giữa commit, branch và pull request.
2. Chụp được diff trước và sau chỉnh sửa.
3. Không xuất hiện khóa hay dữ liệu cá nhân trong kho.

## Nguồn gốc để đối chiếu

1. https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control
2. https://docs.github.com/en/get-started/start-your-journey/hello-world

**Ghi chú học thuật:** Các đoạn diễn giải và bài tập do dự án tự biên soạn. Mọi kết quả đo hay cam kết dịch vụ phải được kiểm nghiệm lại trong điều kiện sử dụng thực tế.
