# 04. Học máy: dữ liệu, mô hình và kiểm định

**Mức độ:** Trung cấp · **Ngày đối chiếu:** 2026-10-13 · **Trạng thái:** Nội dung giảng dạy dẫn nguồn, chưa thay thế thực nghiệm độc lập.

## Mục tiêu đầu ra

Sau khi học, người đọc phải diễn giải các khái niệm cốt lõi, hoàn thành bài thực hành và cung cấp bằng chứng kiểm tra sản phẩm của mình.

## Nội dung học

### 1. Học có giám sát

Dữ liệu gồm các đặc trưng X và nhãn y. Regression dự báo giá trị liên tục; classification dự báo lớp. Phân biệt độ phù hợp dữ liệu và khả năng khái quát.

### 2. Tập huấn luyện và kiểm thử

Nếu huấn luyện và đánh giá trên cùng dữ liệu, kết quả dễ lạc quan giả tạo. Nên tách train/test; mọi phép chuẩn hóa, chọn biến và tối ưu tham số phải tránh nhìn vào tập test.

### 3. Cross-validation

Chia train thành các fold để ước lượng hiệu năng và chọn siêu tham số. Với dữ liệu thời gian cần tách theo thứ tự thời gian; dữ liệu cùng lô hoặc cùng người cần kiểm soát rò rỉ giữa các fold.

## Bài thực hành có đầu ra

Thiết kế thí nghiệm dự báo năng suất từ pH, EC và độ ẩm. Đề xuất baseline, thước đo MAE, tập test theo mùa vụ, và cách tránh lấy số liệu từ cùng ô thí nghiệm ở cả train và test.

## Câu hỏi và tiêu chí tự đánh giá

1. Có baseline dễ giải thích.
2. Tách train/validation/test có lý do.
3. Nêu tối thiểu hai nguồn rò rỉ dữ liệu.

## Nguồn gốc để đối chiếu

1. https://scikit-learn.org/stable/modules/cross_validation.html
2. https://scikit-learn.org/stable/supervised_learning.html

**Ghi chú học thuật:** Các đoạn diễn giải và bài tập do dự án tự biên soạn. Mọi kết quả đo hay cam kết dịch vụ phải được kiểm nghiệm lại trong điều kiện sử dụng thực tế.
