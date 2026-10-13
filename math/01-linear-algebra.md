# Chương Toán 1. Đại số tuyến tính

Mức độ: Căn bản có mở rộng ứng dụng AI. Điều kiện đầu vào: phép tính đại số phổ thông và khả năng đọc công thức.

## Mục tiêu

Hiểu định nghĩa, tính được bài mẫu bằng tay, mô tả được trường hợp ứng dụng trong mô hình AI và phát hiện sai lầm phổ biến.

## Nội dung học

### Bài 1.1. Vector, ma trận và kích thước

Vector là dãy thành phần; ma trận có số hàng m và số cột n. Phép cộng hai ma trận cần cùng kích thước. Trong AI, dữ liệu có thể là ma trận X gồm n mẫu và d đặc trưng.

### Bài 1.2. Tích vô hướng

Với a=(a1,a2) và b=(b1,b2), tích vô hướng a·b=a1b1+a2b2. Ví dụ (2,3)·(4,−1)=8−3=5. Đây là nền của lớp tuyến tính.

### Bài 1.3. Nhân ma trận

Nếu A có kích thước m×n, B có kích thước n×p thì AB có kích thước m×p. Thứ tự nhân thường quan trọng: AB không nhất thiết bằng BA.

### Bài 1.4. Ứng dụng

Một lớp tuyến tính tính y=Wx+b theo quy ước vector cột. Với x có d phần tử, W thuộc R^(k×d), b có k phần tử thì y có k phần tử.

## Bài tập thực hành

A=[[1,2],[3,4]], x=[2,1]. Hãy tính Ax và kiểm tra kích thước.

## Lời giải kiểm chứng

Ax=[1×2+2×1, 3×2+4×1]=[4,10]. Ma trận 2×2 nhân vector 2 phần tử cho vector 2 phần tử.

## Câu hỏi mở rộng

Nếu A là 3×2 còn B là 4×3, nhân AB có hợp lệ không?

## Gợi ý trả lời

Không, vì kích thước trong 2 và 4 không khớp. BA có kích thước 4×2 thì hợp lệ.

## Nguồn gốc

- https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/
- https://numpy.org/doc/stable/reference/generated/numpy.matmul.html

Ghi chú: Ví dụ tính toán là tình huống sư phạm tự biên soạn, không phải kết quả nghiên cứu thực địa. Đối chiếu công thức và giả thiết với tài liệu gốc trước khi ứng dụng.
