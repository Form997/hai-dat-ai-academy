# Chương 4: Học máy và kiểm định mô hình | Giáo trình AI V3.0 — Hai Đất AI Academy

Trình độ: Trung cấp. Mục tiêu: hiểu đúng nguyên lý, tự thực hành và kiểm tra được bằng chứng thay vì chỉ học thuộc thuật ngữ.

## Kiến thức và diễn giải

### 4.1. Tách tập dữ liệu và kiểm định

Huấn luyện để học quy luật từ dữ liệu; đánh giá test nhằm ước lượng kết quả trên dữ liệu chưa thấy.

### 4.2. Đánh giá mô hình bằng chỉ số

Không fit scaler, imputer hoặc chọn biến trên toàn bộ dữ liệu trước khi tách test.

### 4.3. Rò rỉ dữ liệu và khả năng khái quát

Bài toán chuỗi thời gian hoặc cùng thửa đất cần chia tách theo nhóm/thời gian để tránh rò rỉ.

## Ví dụ và bài thực hành

Thiết kế bộ thí nghiệm dự báo năng suất: baseline dự báo trung bình, MAE trên mùa vụ chưa học, sơ đồ train/validation/test.

Hồ sơ nộp: mô tả đầu vào, các bước thực hiện, ảnh/đoạn mã hoặc kết quả, sai số và điều chưa xác định. Chỉ dùng dữ liệu không chứa bí mật hay thông tin cá nhân.

## Bài tập 1

MAE của dự đoán [3,5] so với thực tế [4,7] bằng bao nhiêu?

## Lời giải và lập luận

(|3−4| + |5−7|)/2 = 1,5 theo đơn vị của biến đích.

## Bài tập 2 — tư duy phản biện

Có thể chọn mô hình dựa trên điểm cao nhất của test rồi vẫn coi test độc lập không?

## Gợi ý lời giải

Không; dùng test để chọn mô hình gây thiên lệch. Chọn qua validation/cross-validation, dành test đánh giá cuối.

## Tự đánh giá

Tự đánh dấu khi có bằng chứng: (1) giải thích được thuật ngữ; (2) hoàn thành bài thực hành; (3) chỉ rõ ít nhất một giới hạn; (4) dẫn được nguồn gốc của định nghĩa hoặc phương pháp.

## Nguồn chính thức và nghiên cứu gốc

- https://scikit-learn.org/stable/modules/cross_validation.html
- https://scikit-learn.org/stable/common_pitfalls.html

Ghi chú: nội dung tiếng Việt và tình huống thực hành do dự án tự biên soạn; không có tuyên bố đã thực nghiệm thay người học. Các dịch vụ, phiên bản, quyền sử dụng phải đối chiếu tại thời điểm thực hiện.

## Học tiếp và đối chiếu kiến thức

- [Học máy](https://form997.github.io/hai-dat-ai-academy/knowledge/index.html?doc=04-ml-fundamentals.md) — kiến thức nền, cách kiểm tra và nguồn tham khảo.
- [Tra cứu giáo trình toàn học viện](https://form997.github.io/hai-dat-ai-academy/catalog/) — tìm theo chủ đề và tình huống thực hành.
- [Toán cho AI V3.1](https://form997.github.io/hai-dat-ai-academy/math/) — các nền tảng toán học dùng trong mô hình AI.

Các đường dẫn nguồn ở mục «Nguồn chính thức và nghiên cứu gốc» dùng để đối chiếu khái niệm, không hàm ý học viện được đơn vị nguồn chứng nhận. Ví dụ và bài tập trong chương do dự án tự biên soạn.
