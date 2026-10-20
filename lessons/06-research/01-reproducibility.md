# Nghiên cứu AI tái lập: dữ liệu, seed và sai số

> HAI ĐẤT AI ACADEMY · V3.6 · Bài chuyên sâu thực hành · 2026-10-20

## Mục tiêu và tiên quyết

Biết đọc Python cơ bản và phân biệt tập huấn luyện với tập kiểm tra. Sau bài học, người học phải tự dựng được đường chuẩn, mô hình dự đoán, chia dữ liệu theo thời gian, tính MAE và nhận diện rò rỉ dữ liệu.

## Bài toán thực địa: dự báo độ ẩm đất

Một trạm nông nghiệp có bản ghi theo ngày: lượng mưa (mm), nhiệt độ không khí (°C), độ ẩm đất trước tưới (%) và độ ẩm đất ngày kế tiếp (%). Mục tiêu là dự báo độ ẩm ngày kế tiếp để hỗ trợ quyết định đo đạc/tưới; **không tự động suy ra lịch tưới** từ mô hình chưa hiệu chuẩn. Dữ liệu dưới đây là **giả lập để học**, không phải số đo tại Thanh Hóa hay Huế.

## Quy trình khoa học

1. Viết câu hỏi trước khi xem kết quả: mô hình có cải thiện MAE so với dự báo giữ nguyên độ ẩm hôm trước không?
2. Chia dữ liệu **theo thời gian**: 70% ngày đầu để học, 30% ngày sau để kiểm tra; không tráo ngẫu nhiên khi dự báo tương lai.
3. Dùng cùng một tập kiểm tra cho đường chuẩn và mô hình; không dùng nhãn tương lai làm đặc trưng.
4. Tính MAE = trung bình trị tuyệt đối của (dự báo − thực đo), đơn vị là **điểm phần trăm độ ẩm**, không phải phần trăm sai số tương đối.
5. Chỉ công bố kết quả sau khi chạy thực tế; báo cáo phiên bản Python, thư viện, nguồn dữ liệu và thời gian đo.

## Ví dụ Python chạy được (chỉ thư viện chuẩn)

```python
from statistics import mean

# Dữ liệu GIẢ LẬP: (mưa_mm, nhiệt_độ_C, độ_ẩm_hôm_nay_%, độ_ẩm_ngày_sau_%)
rows = [
    (0, 30, 22, 20), (8, 29, 20, 25), (0, 32, 25, 22),
    (12, 28, 22, 29), (0, 31, 29, 26), (5, 30, 26, 28),
    (0, 33, 28, 24), (15, 27, 24, 33), (0, 31, 33, 30),
    (2, 30, 30, 29), (0, 32, 29, 26), (10, 28, 26, 32),
    (0, 31, 32, 29), (4, 29, 29, 30), (0, 33, 30, 26),
    (9, 28, 26, 31), (0, 32, 31, 27), (6, 29, 27, 30),
    (0, 31, 30, 27), (11, 28, 27, 33)
]
cut = int(len(rows) * 0.7)
train, test = rows[:cut], rows[cut:]

# Đường chuẩn: độ ẩm ngày sau bằng độ ẩm hôm nay.
def baseline(row):
    return row[2]

# Mô hình hiệu chỉnh mưa: chỉ ước lượng hệ số từ train.
# Đây là mô hình tuyến tính một biến trên phần thay đổi so với đường chuẩn.
x = [r[0] for r in train]
y = [r[3] - r[2] for r in train]
xbar, ybar = mean(x), mean(y)
den = sum((v - xbar) ** 2 for v in x)
slope = sum((a - xbar) * (b - ybar) for a, b in zip(x, y)) / den if den else 0.0
intercept = ybar - slope * xbar

def model(row):
    return row[2] + intercept + slope * row[0]

def mae(predict):
    return mean(abs(predict(r) - r[3]) for r in test)

print('train=', len(train), 'test=', len(test))
print('baseline MAE=', round(mae(baseline), 3), 'điểm %')
print('model MAE=', round(mae(model), 3), 'điểm %')
print('slope=', round(slope, 4), 'intercept=', round(intercept, 4))
```

**Chú ý:** Dữ liệu rất nhỏ, không có độ ẩm theo tầng đất, bốc thoát hơi, lượng tưới, loại đất hay độ tin cậy cảm biến. Ví dụ chỉ minh họa cách tránh rò rỉ, không chứng minh mô hình đủ dùng trong sản xuất.

## Bài tập và đáp án định hướng

1. **Vì sao không tráo dữ liệu?** Vì các ngày tương lai có thể lọt vào tập huấn luyện, tạo đánh giá lạc quan so với dự báo triển khai theo thời gian.
2. **Nếu MAE mô hình lớn hơn MAE đường chuẩn?** Chưa có bằng chứng mô hình cải thiện trên tập kiểm tra này; không chỉ công bố kết quả huấn luyện.
3. **Đổi độ ẩm thành thể tích nước tưới được không?** Không trực tiếp. Cần độ sâu rễ, khối lượng thể tích, đường đặc tính giữ nước, hiệu suất hệ thống và hiệu chuẩn hiện trường.
4. **Làm sao tái lập?** Lưu mã, phiên bản, dữ liệu có giấy phép, định nghĩa biến, cách chia và kết quả đo thực tế.

## Tài liệu đầu nguồn

- scikit-learn, *Common pitfalls and recommended practices*: https://scikit-learn.org/stable/common_pitfalls.html — rò rỉ dữ liệu và pipeline.
- scikit-learn, *TimeSeriesSplit*: https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.TimeSeriesSplit.html — đánh giá chuỗi thời gian.
- Wilkinson và cộng sự (2016), *FAIR Guiding Principles*: https://doi.org/10.1038/sdata.2016.18 — quản lý dữ liệu và metadata.
- ALLEA (2023), *European Code of Conduct for Research Integrity*: https://doi.org/10.26356/ECOC — nguyên tắc liêm chính khoa học.

## Trạng thái kiểm định

Mã và dữ liệu ví dụ được biên soạn cho bài học; chưa có bằng chứng đã chạy trong môi trường CI ở lần xuất bản này. Các liên kết trên là nguồn đối chiếu khái niệm, **không phải bằng chứng** mô hình giả lập phù hợp thực địa. Khi dùng dữ liệu thật, phải kiểm tra giấy phép, quyền riêng tư, sai số cảm biến và điều kiện sử dụng.
