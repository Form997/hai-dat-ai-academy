# Chương 4. Thống kê suy luận, hồi quy và đánh giá mô hình — nâng cao

Mức học: đại học nâng cao. Tiên quyết: xác suất và đại số tuyến tính. Thời lượng gợi ý: 14 giờ lý thuyết, 8 giờ thực hành.

## Mục tiêu

Phân biệt mô tả và suy luận; tính interval/test; nhận diện sai lệch, chọn thước đo, thiết kế kiểm định và đánh giá mô hình AI không rò rỉ dữ liệu.

## Nội dung học

### 4.1. Mẫu, tổng thể và cơ chế lấy mẫu

Một mẫu ngẫu nhiên không nhất thiết đại diện nếu khung lấy mẫu sai. Thống kê mẫu là hàm của dữ liệu; tham số tổng thể là đại lượng cần ước lượng. Bias, variance và mean squared error thỏa MSE=Var(θ̂)+Bias(θ̂)².

### 4.2. Khoảng tin cậy

Khi dữ liệu độc lập chuẩn (hoặc điều kiện xấp xỉ thích hợp) và σ chưa biết, CI hai phía 95% cho trung bình là X̄±t_(0.975,n−1) s/√n. Diễn giải tần suất: qua nhiều mẫu lặp lại, phương pháp tạo khoảng bao phủ μ khoảng 95%; không phải xác suất hậu nghiệm μ thuộc một khoảng đã tính.

### 4.3. Kiểm định giả thuyết, p-value và power

p-value là xác suất, dưới giả thuyết H0 và giả thiết mô hình, có thống kê kiểm định ít nhất cực đoan như đã quan sát; không phải P(H0 đúng). Sai lầm loại I: bác bỏ H0 khi H0 đúng. Power=1−β là xác suất phát hiện hiệu ứng theo giả thuyết thay thế cụ thể.

### 4.4. Hồi quy tuyến tính và giả thiết

Trong OLS y=Xβ+ε, để có tính không chệch cần các điều kiện bao gồm E[ε|X]=0 và khả định. Giả thiết đồng phương sai dùng cho sai số chuẩn OLS cổ điển; khi heteroskedastic có thể dùng robust SE. Tương quan không suy ra nhân quả.

### 4.5. Regularization và mô hình dự báo

Ridge: minβ ||Xβ−y||₂²+λ||β||₂²; với λ>0 và không phạt intercept theo quy ước, hệ chuẩn XᵀX+λI cho nghiệm duy nhất trên hệ số phạt. Lasso dùng λ||β||₁ tạo nghiệm thưa trong một số điều kiện.

### 4.6. Cross-validation và data leakage

Chia train/validation/test theo đối tượng và thời gian phù hợp. Mọi chuẩn hóa, chọn đặc trưng và tuning phải học trên train fold, rồi áp dụng cho validation fold. Test set chỉ dùng cho báo cáo cuối cùng; lặp đi lặp lại tối ưu trên test gây overfitting vào test.

### 4.7. Đo lường chất lượng mô hình

Phân loại: confusion matrix TP, FP, TN, FN; precision=TP/(TP+FP), recall=TP/(TP+FN), F1=2PR/(P+R) khi mẫu số hợp lệ. Với mất cân bằng lớp, accuracy có thể đánh lừa; xem PR-AUC, calibration, threshold. Hồi quy: MAE, RMSE, phân tích residual; RMSE nhạy với outlier hơn MAE.

### 4.8. So sánh mô hình công bằng và tái lập

Ghi phiên bản dữ liệu, seed, phân chia, cách tune, chi phí tính toán, confidence intervals và baseline. Với dữ liệu có nhóm (nông trại, bệnh nhân, hộ), group split giúp tránh học thuộc mẫu của cùng nhóm.

## Bài tập thực hành

A: n=16, trung bình=10, độ lệch chuẩn mẫu s=4. Tính sai số chuẩn và CI 95% hai phía theo t với t_(0.975,15)≈2.131.

B: TP=40, FP=10, FN=20, TN=130. Tính accuracy, precision, recall, F1.

C: Chứng minh bias–variance decomposition cho estimator θ̂.

D: Thiết kế split cho dữ liệu theo mùa vụ và ruộng khác nhau, giải thích leakage có thể xảy ra.

## Lời giải kiểm chứng

A: SE=4/√16=1. CI=10±2.131×1=[7.869,12.131].

B: accuracy=(40+130)/200=0.85, precision=40/50=0.8, recall=40/60=0.666667, F1=2×0.8×(2/3)/(0.8+2/3)=8/11≈0.727273.

C: viết θ̂−θ=(θ̂−Eθ̂)+(Eθ̂−θ), bình phương, lấy kỳ vọng; hạng chéo triệt tiêu.

D: ưu tiên chia theo thời gian nếu mục tiêu dự báo vụ tương lai, và theo nhóm ruộng nếu cần kiểm tra tổng quát hóa sang ruộng chưa thấy. Không fit scaler trước split.

## Câu hỏi mở rộng

Khi nào cần nested cross-validation? p-value nhỏ có đồng nghĩa hiệu ứng lớn? Phân biệt calibration và discrimination.

## Gợi ý trả lời

Nested CV giúp đánh giá ít lạc quan hơn khi hyperparameter tuning; p-value liên quan bằng chứng đối với H0 chứ không phải cỡ hiệu ứng; calibration đánh giá độ khớp xác suất, discrimination đánh giá khả năng xếp hạng/phân biệt.

## Nguồn gốc

- https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/
- https://online.stat.psu.edu/stat501/
- https://scikit-learn.org/stable/modules/cross_validation.html
- https://scikit-learn.org/stable/modules/model_evaluation.html

Ví dụ tự biên soạn, không phải kết quả đo đạc hiện trường.

### 4.8. Tình huống lặp lại: đánh giá dự báo theo thời gian

Giả sử có 100 ngày dữ liệu giả lập về độ ẩm đất và thời tiết. Nếu dự báo ngày t+1, không được dùng thông tin chỉ có ở ngày t+1 khi xây dựng đặc trưng. Chia theo thời gian: 60 ngày đầu train, 20 ngày tiếp validation, 20 ngày cuối test. Chỉ fit trung bình, độ lệch chuẩn, phép điền khuyết và chọn siêu tham số trên train/validation; test để đánh giá cuối.

Baseline dự báo độ ẩm ngày mai bằng giá trị hôm nay. Nếu trên 3 ngày kiểm tra, giá trị thật [20,22,19] và dự báo [21,20,20] (% thể tích), sai số tuyệt đối [1,2,1], MAE=4/3≈1.333 điểm phần trăm; RMSE=sqrt((1+4+1)/3)=sqrt(2)≈1.414 điểm phần trăm. Không gọi đây là độ chính xác trên dữ liệu thực.

Phân biệt suy luận: công thức Student-t cho trung bình mẫu với phương sai chưa biết là chính xác dưới giả thiết mẫu độc lập từ tổng thể chuẩn; với phân phối không chuẩn, tính hợp lệ xấp xỉ cần điều kiện và kiểm tra, nhất là khi chuỗi thời gian có tự tương quan. Không dùng t-interval độc lập nguyên xi cho quan trắc phụ thuộc theo ngày.

Khi gặp lại: định nghĩa mục tiêu → kiểm tra timestamp → lập baseline → chia theo thời gian → chống leakage → báo cáo MAE/RMSE theo từng giai đoạn → kiểm tra drift. Bài tập: so sánh mô hình có MAE=1.2 với baseline trên cùng test; giải thích vì sao MAE thấp chưa đủ chứng minh hữu ích vận hành.

Nguồn: https://scikit-learn.org/stable/modules/cross_validation.html
