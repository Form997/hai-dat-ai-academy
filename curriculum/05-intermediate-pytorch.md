# Chương 5: PyTorch và huấn luyện có tái lập

Trình độ: Trung cấp. Mục tiêu: hiểu đúng nguyên lý, tự thực hành và kiểm tra được bằng chứng thay vì chỉ học thuộc thuật ngữ.

## Kiến thức và diễn giải

### 5.1. Nội dung trọng tâm

Tensor có shape và dtype. Sai shape thường làm phép nhân ma trận hoặc loss không hợp lệ.

### 5.2. Nội dung trọng tâm

Các bước phổ biến: forward, loss, zero_grad, backward, optimizer.step.

### 5.3. Nội dung trọng tâm

model.train() phục vụ huấn luyện; model.eval() thích hợp khi đánh giá (nhất là dropout/batch normalization).

## Ví dụ và bài thực hành

Chạy một ví dụ chính thức ở CPU, ghi train loss và metric validation theo epoch; thử chạy lại với seed cố định.

Hồ sơ nộp: mô tả đầu vào, các bước thực hiện, ảnh/đoạn mã hoặc kết quả, sai số và điều chưa xác định. Chỉ dùng dữ liệu không chứa bí mật hay thông tin cá nhân.

## Bài tập 1

Vì sao cần optimizer.zero_grad() trong vòng lặp huấn luyện?

## Lời giải và lập luận

Gradient có thể tích lũy theo mặc định; zero_grad xoá phần tích lũy không mong muốn trước bước backward tiếp theo.

## Bài tập 2 — tư duy phản biện

Loss train giảm thì chắc chắn test cũng tốt lên không?

## Gợi ý lời giải

Không. Overfitting có thể xảy ra; cần theo dõi validation/test độc lập.

## Tự đánh giá

Tự đánh dấu khi có bằng chứng: (1) giải thích được thuật ngữ; (2) hoàn thành bài thực hành; (3) chỉ rõ ít nhất một giới hạn; (4) dẫn được nguồn gốc của định nghĩa hoặc phương pháp.

## Nguồn chính thức và nghiên cứu gốc

- https://docs.pytorch.org/tutorials/beginner/basics/intro.html
- https://docs.pytorch.org/tutorials/beginner/basics/optimization_tutorial.html

Ghi chú: nội dung tiếng Việt và tình huống thực hành do dự án tự biên soạn; không có tuyên bố đã thực nghiệm thay người học. Các dịch vụ, phiên bản, quyền sử dụng phải đối chiếu tại thời điểm thực hiện.
