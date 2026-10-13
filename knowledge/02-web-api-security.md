# 02. Web, HTTP, API và quản lý khóa

**Mức độ:** Cơ bản · **Ngày đối chiếu:** 2026-10-13 · **Trạng thái:** Nội dung giảng dạy dẫn nguồn, chưa thay thế thực nghiệm độc lập.

## Mục tiêu đầu ra

Sau khi học, người đọc phải diễn giải các khái niệm cốt lõi, hoàn thành bài thực hành và cung cấp bằng chứng kiểm tra sản phẩm của mình.

## Nội dung học

### 1. Website tĩnh so với backend

HTML khai báo cấu trúc, CSS trang trí và JavaScript phản hồi thao tác. GitHub Pages phục vụ các tài nguyên tĩnh; không chạy server Node.js để giấu token.

### 2. Giao tiếp HTTP

Client gửi method, URL, headers và body; server trả status, headers và dữ liệu. 200 nghĩa yêu cầu được xử lý, 400 dữ liệu gửi không hợp lệ, 401 chưa xác thực, 403 không có quyền, 429 bị giới hạn.

### 3. Bí mật ứng dụng

Key của nhà cung cấp đặt phía backend thông qua secrets hoặc biến môi trường; backend xác thực người dùng, giới hạn request và quota trước khi gọi provider. Không đặt key trong JavaScript gửi cho trình duyệt.

## Bài thực hành có đầu ra

Vẽ luồng browser → backend → provider; viết ví dụ JSON chứa prompt và kiểm tra schema. Trình bày xử lý cho các mã 400, 401, 429, 500 và tránh log token.

## Câu hỏi và tiêu chí tự đánh giá

1. Không có key nằm trong index.html.
2. Phân biệt xác thực với phân quyền.
3. Xác định được lỗi khi backend trả 429.

## Nguồn gốc để đối chiếu

1. https://developer.mozilla.org/en-US/docs/Learn_web_development
2. https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview
3. https://owasp.org/API-Security/

**Ghi chú học thuật:** Các đoạn diễn giải và bài tập do dự án tự biên soạn. Mọi kết quả đo hay cam kết dịch vụ phải được kiểm nghiệm lại trong điều kiện sử dụng thực tế.
