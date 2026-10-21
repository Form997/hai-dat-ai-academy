# V3.6 — Thực hành có thể tái lập: dự báo độ ẩm đất (dữ liệu giả lập)

**Mục tiêu:** phân biệt dữ liệu thực với dữ liệu mô phỏng, tránh rò rỉ dữ liệu tương lai, xây baseline và kiểm định sai số. Bài này dùng Python chuẩn, không cần GPU, không cần API hoặc tài khoản.

## Chạy thực hành

Từ thư mục gốc kho GitHub:

```bash
python3 practical/v36_soil_demo.py
python3 -m unittest discover -s practical -p 'test_*.py' -v
```

Mã tạo 40 dòng dữ liệu **giả lập có công thức biết trước**, lấy 30 ngày đầu huấn luyện và 10 ngày cuối kiểm thử. Baseline dùng trung bình độ ẩm của 30 ngày huấn luyện. Mô hình hồi quy tuyến tính dựa vào lượng mưa và bốc thoát hơi giả định. MAE = tổng |giá trị thực − dự báo| chia cho số quan sát.

## Câu hỏi có lời giải

1. **Vì sao không trộn ngẫu nhiên 40 ngày?** Vì khi dự báo tương lai, dùng thông tin từ ngày sau để chọn mô hình có thể khiến đánh giá sai lạc.
2. **Nếu đổi toàn bộ nhãn 10 ngày kiểm thử, tham số mô hình có đổi không?** Không, vì `fit` chỉ nhận 30 ngày huấn luyện; bài kiểm thử xác minh điều này.
3. **MAE thấp trên dữ liệu giả lập có chứng minh mô hình tưới tốt?** Không. Chưa có dữ liệu cảm biến thực, hiệu chuẩn thiết bị, đánh giá ngoại mẫu theo mùa, loại đất, sai số quan trắc hay xác nhận chuyên gia.
4. **Đầu vào còn thiếu gì?** Ít nhất cần đơn vị, độ sâu đo, kết cấu đất, thời gian, mưa, tưới, ET, loại cây, giai đoạn sinh trưởng và độ tin cậy cảm biến.

## Quy trình kiểm định trước/sau

**Trước:** ghi nguồn dữ liệu, thời điểm, giấy phép, đơn vị, giá trị thiếu, tiêu chí chia tập và baseline. **Sau:** báo cáo MAE trên tập chưa dùng huấn luyện, kiểm tra drift, ghi phiên bản mã, lỗi, giới hạn và quyết định có/không triển khai.

**Nguồn phương pháp:** [scikit-learn — common pitfalls](https://scikit-learn.org/stable/common_pitfalls.html), [FAO Irrigation and Drainage Paper 56](https://www.fao.org/4/x0490e/x0490e00.htm), [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework). FAO56 là tài liệu về tính nhu cầu nước cây trồng; ví dụ này **không** tự nhận đã triển khai mô hình FAO56.

**Liêm chính:** toàn bộ số liệu trong mã là mô phỏng; không được trình bày thành kết quả nghiên cứu tại đồng ruộng.
