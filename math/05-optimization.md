# Chương Toán 5. Tối ưu hóa và học gradient

Mức độ: Căn bản có mở rộng ứng dụng AI. Điều kiện đầu vào: phép tính đại số phổ thông và khả năng đọc công thức.

## Mục tiêu

Hiểu định nghĩa, tính được bài mẫu bằng tay, mô tả được trường hợp ứng dụng trong mô hình AI và phát hiện sai lầm phổ biến.

## Nội dung học

### Bài 5.1. Hàm mục tiêu và ràng buộc

Tối ưu là tìm biến đầu vào sao cho giảm hay tăng mục tiêu trong phạm vi điều kiện. Không được tối ưu một chỉ số mà bỏ qua giới hạn tài nguyên hoặc rủi ro.

### Bài 5.2. Gradient descent

Quy tắc đơn giản: θ_mới=θ_cũ−η∇L(θ_cũ); η là learning rate. η quá lớn có thể dao động hoặc phân kỳ; quá nhỏ có thể hội tụ chậm.

### Bài 5.3. Lồi và không lồi

Với hàm lồi khả vi, cực tiểu địa phương cũng là cực tiểu toàn cục; mạng nơ-ron thường là bài toán không lồi nên không có bảo đảm chung như vậy.

### Bài 5.4. Overfitting và regularization

Tối ưu loss train không đồng nghĩa tối ưu tổng quát hóa. Regularization, tập validation và early stopping là kỹ thuật thường dùng; cần đo trên dữ liệu chưa thấy.

## Bài tập thực hành

Với L(w)=(w−2)², η=0,25 và w=0, hãy tính hai bước gradient descent.

## Lời giải kiểm chứng

Gradient 2(w−2). Bước 1: 0−0,25×(−4)=1. Bước 2: 1−0,25×(−2)=1,5.

## Câu hỏi mở rộng

Nếu tốc độ học quá lớn thì điều gì xảy ra?

## Gợi ý trả lời

Có thể nhảy qua điểm tối ưu, dao động hoặc mất ổn định; cần kiểm thử nhiều learning rate trên validation.

## Nguồn gốc

- https://web.stanford.edu/~boyd/cvxbook/
- https://docs.pytorch.org/docs/stable/optim.html

Ghi chú: Ví dụ tính toán là tình huống sư phạm tự biên soạn, không phải kết quả nghiên cứu thực địa. Đối chiếu công thức và giả thiết với tài liệu gốc trước khi ứng dụng.
