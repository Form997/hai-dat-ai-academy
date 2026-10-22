# V3.7 — Kiểm định dữ liệu đồng ruộng trước khi đưa vào AI

Đây là **công cụ kiểm tra cấu trúc CSV ngoại tuyến**, không phải bộ cảm biến, phần mềm chẩn đoán cây trồng hoặc hệ thống ra quyết định tưới. Không cần GPU, tài khoản hay gói Python ngoài.

## Cách chạy

```bash
python3 practical/v37_field_audit.py practical/example_field_data.csv
python3 practical/v37_field_audit.py practical/example_field_data.csv --output report.json
python3 -m unittest discover -s practical -p 'test_*.py' -v
```

Mã trả exit code 0 nếu không tìm thấy lỗi theo các quy tắc đã cài, và 1 nếu phát hiện lỗi. Kết quả **PASS không chứng minh cảm biến chính xác**, chỉ chứng minh không phát hiện lỗi cấu trúc theo những quy tắc này.

## Quy định dữ liệu

- `date`: ngày ISO YYYY-MM-DD, một bản ghi/ngày, tăng dần liên tục.
- `soil_moisture_pct`: độ ẩm thể tích giả định (% VWC), miền kiểm tra 0–100. Cần khai báo cảm biến và hiệu chuẩn riêng; **không** coi ngưỡng 0–100 là ngưỡng nông học tối ưu.
- `rain_mm`: lượng mưa ngày (mm), không âm.
- `et0_mm`: bốc thoát hơi tham chiếu ngày (mm), không âm, **không đồng nghĩa ETc**.
- CSV mẫu là **dữ liệu minh họa tự tạo**, không phải quan trắc thực.

## Những gì chưa kiểm định

Chưa phát hiện được cảm biến lệch chuẩn, lỗi vị trí, đơn vị bị gán sai nhưng vẫn hợp miền, giá trị bất thường có thể đúng, dữ liệu đa cảm biến, chuỗi giờ, khoảng tin cậy hay quan hệ nhân quả. Không sử dụng trực tiếp để quyết định tưới.

**Bổ sung khi áp dụng thật:** mã trạm, tọa độ (được phép chia sẻ), độ sâu đo, kết cấu đất, phương pháp đo, hãng/model cảm biến, ngày hiệu chuẩn, người đo, timezone, nguồn dữ liệu, giấy phép, cách xử lý thiếu dữ liệu, phiên bản mã, nhật ký thay đổi.

## Nguồn nền tảng

- [FAO Irrigation and Drainage Paper 56](https://www.fao.org/4/x0490e/x0490e00.htm) — khái niệm ET0 và ETc; công cụ này không triển khai FAO56.
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) — quản trị rủi ro hệ thống AI.
- [FAIR Guiding Principles](https://doi.org/10.1038/sdata.2016.18) — quản lý dữ liệu và metadata có thể tái sử dụng.

## Tình huống thực hành và lời giải

**Bài 1:** Hai bản ghi trùng ngày có thể dùng để huấn luyện không? **Đáp án:** cần xác minh nguyên nhân và chính sách tổng hợp trước, không tự động bỏ một bản ghi.

**Bài 2:** ET0=3 mm/ngày có nghĩa cây dùng đúng 3 mm nước? **Đáp án:** không; ET0 là bốc thoát hơi tham chiếu, còn ETc thường được xác định với hệ số cây trồng Kc và điều kiện áp dụng.

**Bài 3:** CSV báo PASS có đủ để triển khai tưới tự động? **Đáp án:** không; cần hiệu chuẩn, đánh giá thực địa, quy tắc an toàn và phê duyệt chuyên gia.
