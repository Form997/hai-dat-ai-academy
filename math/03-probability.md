# Chương Toán 3. Xác suất và biến ngẫu nhiên

Mức độ: Căn bản có mở rộng ứng dụng AI. Điều kiện đầu vào: phép tính đại số phổ thông và khả năng đọc công thức.

## Mục tiêu

Hiểu định nghĩa, tính được bài mẫu bằng tay, mô tả được trường hợp ứng dụng trong mô hình AI và phát hiện sai lầm phổ biến.

## Nội dung học

### Bài 3.1. Biến cố và xác suất

Xác suất P(A) nằm từ 0 tới 1. Với các biến cố loại trừ nhau, P(A hoặc B)=P(A)+P(B).

### Bài 3.2. Xác suất có điều kiện

P(A|B)=P(A∩B)/P(B), khi P(B)>0. Không được nhầm P(A|B) với P(B|A).

### Bài 3.3. Bayes

P(A|B)=P(B|A)P(A)/P(B), miễn là P(B)>0. Tỷ lệ nền ảnh hưởng mạnh tới giá trị dự báo.

### Bài 3.4. Kỳ vọng và phương sai

Kỳ vọng diễn tả trung bình có trọng số xác suất; phương sai đo độ phân tán quanh kỳ vọng. Trong mô hình, trung bình cao không cho biết mức độ bất định.

## Bài tập thực hành

Một phép thử có 20% mẫu dương tính. Kiểm tra có độ nhạy 90% và tỷ lệ dương tính giả 10%. Tính P(dương tính thật | kết quả dương).

## Lời giải kiểm chứng

P(D|+)=0,9×0,2/(0,9×0,2+0,1×0,8)=0,18/0,26≈0,6923 (69,23%).

## Câu hỏi mở rộng

Vì sao không thể nói kết quả dương nghĩa là 90% chắc chắn dương tính thật?

## Gợi ý trả lời

90% là độ nhạy P(+|D), không phải giá trị tiên đoán dương P(D|+). Cần xét cả tỷ lệ nền và dương tính giả.

## Nguồn gốc

- https://openstax.org/details/books/introductory-statistics-2e
- https://www.statlearning.com/

Ghi chú: Ví dụ tính toán là tình huống sư phạm tự biên soạn, không phải kết quả nghiên cứu thực địa. Đối chiếu công thức và giả thiết với tài liệu gốc trước khi ứng dụng.
