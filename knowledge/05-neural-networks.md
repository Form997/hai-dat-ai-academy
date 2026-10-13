# 05. PyTorch: tensor và mạng nơ-ron

**Mức độ:** Trung cấp · **Ngày đối chiếu:** 2026-10-13 · **Trạng thái:** Nội dung giảng dạy dẫn nguồn, chưa thay thế thực nghiệm độc lập.

## Mục tiêu đầu ra

Sau khi học, người đọc phải diễn giải các khái niệm cốt lõi, hoàn thành bài thực hành và cung cấp bằng chứng kiểm tra sản phẩm của mình.

## Nội dung học

### 1. Tensor và shape

Tensor là cấu trúc mảng đa chiều. Shape của dữ liệu và trọng số phải tương thích khi thực hiện phép toán. Chọn CPU trước với bài nhỏ để dễ kiểm chứng.

### 2. Forward và loss

Mạng biến đầu vào thành dự đoán; loss đo sai lệch theo mục tiêu. Backprop dùng đạo hàm để cập nhật trọng số nhờ optimizer.

### 3. Vòng lặp huấn luyện

Một vòng điển hình gồm forward, tính loss, zero_grad, backward và optimizer.step. Đánh giá trên tập validation bằng chế độ eval để hạn chế ảnh hưởng của dropout hoặc batchnorm.

## Bài thực hành có đầu ra

Theo hướng dẫn PyTorch chính thức chạy ví dụ FashionMNIST trên môi trường phù hợp; ghi shape batch, loss sau mỗi epoch và độ chính xác test; so sánh với baseline.

## Câu hỏi và tiêu chí tự đánh giá

1. Phân biệt model.train() và model.eval().
2. Giải thích vì sao gọi zero_grad().
3. Ghi phiên bản PyTorch, seed và cấu hình thiết bị.

## Nguồn gốc để đối chiếu

1. https://docs.pytorch.org/tutorials/beginner/basics/intro
2. https://docs.pytorch.org/tutorials/beginner/basics/autograd_tutorial.html

**Ghi chú học thuật:** Các đoạn diễn giải và bài tập do dự án tự biên soạn. Mọi kết quả đo hay cam kết dịch vụ phải được kiểm nghiệm lại trong điều kiện sử dụng thực tế.
