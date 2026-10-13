# Chương 8: An toàn API, vận hành và quản trị rủi ro

Trình độ: Chuyên sâu. Mục tiêu: hiểu đúng nguyên lý, tự thực hành và kiểm tra được bằng chứng thay vì chỉ học thuộc thuật ngữ.

## Kiến thức và diễn giải

### 8.1. Nội dung trọng tâm

NIST AI RMF mô tả Govern, Map, Measure, Manage; đây là khung quản lý rủi ro, không tự cấp chứng chỉ chất lượng.

### 8.2. Nội dung trọng tâm

Đặt bí mật trong backend, xác thực và phân quyền, giới hạn request theo người dùng để kiểm soát chi phí.

### 8.3. Nội dung trọng tâm

Logs cần tránh ghi khóa bí mật hoặc dữ liệu riêng tư; có cơ chế phát hiện và ngắt khi bất thường.

## Ví dụ và bài thực hành

Lập sổ rủi ro cho hệ thống AI công khai: vấn đề, mức ảnh hưởng, cách phát hiện, cách giảm thiểu và người phụ trách.

Hồ sơ nộp: mô tả đầu vào, các bước thực hiện, ảnh/đoạn mã hoặc kết quả, sai số và điều chưa xác định. Chỉ dùng dữ liệu không chứa bí mật hay thông tin cá nhân.

## Bài tập 1

API có quota nhưng không có xác thực người dùng có thể bị lạm dụng không?

## Lời giải và lập luận

Có. Quota toàn hệ thống không thay thế xác thực, phân quyền và giới hạn theo tài khoản.

## Bài tập 2 — tư duy phản biện

Người dùng gửi yêu cầu tạo video cực dài; nên kiểm tra điều gì trước gọi nhà cung cấp?

## Gợi ý lời giải

Schema, giới hạn kích thước, ước lượng chi phí, hạn mức và quyền truy cập.

## Tự đánh giá

Tự đánh dấu khi có bằng chứng: (1) giải thích được thuật ngữ; (2) hoàn thành bài thực hành; (3) chỉ rõ ít nhất một giới hạn; (4) dẫn được nguồn gốc của định nghĩa hoặc phương pháp.

## Nguồn chính thức và nghiên cứu gốc

- https://www.nist.gov/itl/ai-risk-management-framework
- https://owasp.org/API-Security/

Ghi chú: nội dung tiếng Việt và tình huống thực hành do dự án tự biên soạn; không có tuyên bố đã thực nghiệm thay người học. Các dịch vụ, phiên bản, quyền sử dụng phải đối chiếu tại thời điểm thực hiện.
