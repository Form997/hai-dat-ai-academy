# Chương Toán 4. Thống kê và kiểm định mô hình

Mức độ: Căn bản có mở rộng ứng dụng AI. Điều kiện đầu vào: phép tính đại số phổ thông và khả năng đọc công thức.

## Mục tiêu

Hiểu định nghĩa, tính được bài mẫu bằng tay, mô tả được trường hợp ứng dụng trong mô hình AI và phát hiện sai lầm phổ biến.

## Nội dung học

### Bài 4.1. Thống kê mô tả

Trung bình mẫu bằng tổng các giá trị chia số mẫu. Trung vị ít nhạy với ngoại lệ hơn trung bình. Độ lệch chuẩn đo phân tán.

### Bài 4.2. Lấy mẫu và sai lệch

Nếu chỉ khảo sát lô đất thuận tiện, kết luận có thể không đại diện cho khu vực. Cần kế hoạch chọn mẫu, số lần lặp và ghi rõ sai lệch có thể có.

### Bài 4.3. Chỉ số dự báo

MAE là trung bình độ lớn lỗi tuyệt đối, cùng đơn vị với biến dự báo; RMSE nhạy hơn với lỗi lớn. So sánh trên cùng tập test.

### Bài 4.4. Khoảng tin cậy

Khoảng tin cậy có cách diễn giải tần suất theo quy trình lấy mẫu; không nên nói xác suất tham số cố định nằm trong khoảng cụ thể là 95% theo nghĩa tần suất.

## Bài tập thực hành

Thực tế [4,6,9], dự báo [3,7,7]. Tính MAE.

## Lời giải kiểm chứng

MAE=(|4−3|+|6−7|+|9−7|)/3=(1+1+2)/3=4/3≈1,33.

## Câu hỏi mở rộng

Nếu chia train/test ngẫu nhiên đối với số liệu đo theo tuần trên cùng thửa đất, có nguy cơ gì?

## Gợi ý trả lời

Rò rỉ theo thời gian/đơn vị quan sát. Cần đánh giá chia theo thời gian hoặc theo thửa tùy câu hỏi nghiên cứu.

## Nguồn gốc

- https://openstax.org/details/books/introductory-statistics-2e
- https://scikit-learn.org/stable/modules/model_evaluation.html

Ghi chú: Ví dụ tính toán là tình huống sư phạm tự biên soạn, không phải kết quả nghiên cứu thực địa. Đối chiếu công thức và giả thiết với tài liệu gốc trước khi ứng dụng.
