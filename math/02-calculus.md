# Chương Toán 2. Giải tích và đạo hàm

Mức độ: Căn bản có mở rộng ứng dụng AI. Điều kiện đầu vào: phép tính đại số phổ thông và khả năng đọc công thức.

## Mục tiêu

Hiểu định nghĩa, tính được bài mẫu bằng tay, mô tả được trường hợp ứng dụng trong mô hình AI và phát hiện sai lầm phổ biến.

## Nội dung học

### Bài 2.1. Đạo hàm theo biến

Đạo hàm mô tả tốc độ thay đổi tức thời. Với f(x)=x², f'(x)=2x; tại x=3, độ dốc là 6.

### Bài 2.2. Đạo hàm riêng

Với f(x,y)=x²+3y², đạo hàm riêng theo x là 2x, theo y là 6y. Gradient là vector [2x,6y].

### Bài 2.3. Quy tắc dây chuyền

Nếu z=g(x), L=f(z) thì dL/dx=(dL/dz)(dz/dx). Autograd thực hiện quy trình này trên đồ thị phép toán.

### Bài 2.4. Mục đích trong AI

Khi tối ưu mô hình, gradient chỉ hướng tăng nhanh của loss tại địa phương; cập nhật gradient descent dùng hướng ngược lại. Đạo hàm không tự bảo đảm hội tụ đến cực tiểu toàn cục.

## Bài tập thực hành

Tính gradient của L(w)=(w−4)² tại w=1.

## Lời giải kiểm chứng

dL/dw=2(w−4); tại w=1 nhận −6.

## Câu hỏi mở rộng

Dùng learning rate 0,1 cập nhật một bước từ w=1.

## Gợi ý trả lời

w_mới=1−0,1×(−6)=1,6.

## Nguồn gốc

- https://openstax.org/details/books/calculus-volume-1
- https://docs.pytorch.org/tutorials/beginner/basics/autograd_tutorial.html

Ghi chú: Ví dụ tính toán là tình huống sư phạm tự biên soạn, không phải kết quả nghiên cứu thực địa. Đối chiếu công thức và giả thiết với tài liệu gốc trước khi ứng dụng.
