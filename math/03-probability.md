# Chương 3. Xác suất, Bayes và quá trình ngẫu nhiên — nâng cao

Mức học: đại học nâng cao. Tiên quyết: giải tích, hàm số và đại số. Thời lượng gợi ý: 14 giờ lý thuyết và 8 giờ bài tập.

## Mục tiêu

Mô hình hóa biến ngẫu nhiên, tính kỳ vọng/hiệp phương sai, dùng xác suất có điều kiện và Bayes, hiểu hội tụ và Monte Carlo.

## Nội dung học

### 3.1. Không gian xác suất và biến ngẫu nhiên

Không gian (Ω,F,P) gồm tập kết quả, σ-đại số các sự kiện và phép đo xác suất. Với biến ngẫu nhiên rời rạc X, P(X=x)≥0 và tổng_x P(X=x)=1; biến liên tục có mật độ f với tích phân f=1. Mật độ tại một điểm không phải xác suất của điểm đó.

### 3.2. Xác suất có điều kiện và Bayes

P(A|B)=P(A∩B)/P(B) với P(B)>0. Nếu các giả thuyết H_i tạo phân hoạch, P(H_i|E)=P(E|H_i)P(H_i)/Σ_j P(E|H_j)P(H_j). Khi base rate thấp, kết quả test dương tính chưa chắc là xác suất hậu nghiệm cao.

### 3.3. Kỳ vọng, phương sai và hiệp phương sai

E[aX+b]=aE[X]+b; Var(X)=E[(X−E[X])²]. Cov(X,Y)=E[(X−EX)(Y−EY)]. Độc lập kéo theo Cov=0 nếu moment tồn tại; chiều ngược lại không đúng nói chung.

Với vector X: covariance Σ=E[(X−μ)(X−μ)ᵀ], là ma trận bán xác định dương.

### 3.4. Các phân phối thông dụng

Bernoulli(p): E[X]=p, Var(X)=p(1−p). Binomial(n,p): E=np, Var=np(1−p). Normal(μ,σ²): chuẩn hóa Z=(X−μ)/σ. Categorical và Dirichlet thường dùng cho mô hình xác suất; Gaussian đa chiều dùng mean vector và covariance.

### 3.5. Luật số lớn và định lý giới hạn trung tâm

Với X_i độc lập cùng phân phối, E[X_i]=μ và Var(X_i)=σ² hữu hạn, trung bình mẫu hội tụ theo xác suất về μ (luật số lớn yếu). Nếu σ²>0, √n(X̄−μ)/σ hội tụ theo phân phối về N(0,1) (CLT). Không được xem kết quả xấp xỉ chuẩn chính xác ở mọi kích thước n.

### 3.6. Maximum likelihood và MAP

Ước lượng MLE chọn θ tối đa hóa ∏_i p(x_i|θ), tương đương tối đa tổng log-likelihood nếu các quan sát độc lập. MAP tối đa p(θ|D) tỷ lệ với p(D|θ)p(θ); prior đóng vai trò regularization trong nhiều trường hợp.

### 3.7. Monte Carlo và tính bất định

Với mẫu độc lập từ p, E_p[g(X)]≈(1/N)Σg(X_i). Sai số Monte Carlo thường giảm theo 1/√N khi có phương sai hữu hạn; phụ thuộc và phân phối đuôi nặng cần xét riêng.

### 3.8. AI ứng dụng

Naive Bayes, calibration, uncertainty estimation, stochastic gradient và mô hình sinh; phân biệt xác suất dự báo với độ tin cậy thống kê và tránh rò rỉ dữ liệu.

## Bài tập thực hành

A: Tỷ lệ mắc một tình trạng là 1%, độ nhạy test 90%, độ đặc hiệu 95%. Tìm P(có tình trạng|test dương).

B: Với X là Bernoulli(0.3), tìm E[X], Var(X) và xác suất 2 lần thành công trong 3 phép thử độc lập.

C: Cho X,Y độc lập chuẩn tắc; tính E[X+2Y] và Var(X+2Y).

D: Giải thích tại sao tăng N từ 100 lên 400 thường làm sai số chuẩn Monte Carlo giảm một nửa.

## Lời giải kiểm chứng

A: 0.9×0.01/(0.9×0.01+0.05×0.99)=0.009/0.0585≈0.153846, tức 15.38%.

B: E=0.3; Var=0.21; P(S=2)=C(3,2)×0.3²×0.7=0.189.

C: E=0; Var=1+4=5 do độc lập.

D: Standard error tỷ lệ với 1/√N, nên √(100/400)=1/2 (khi các giả định tương ứng thỏa mãn).

## Câu hỏi mở rộng

Phân biệt posterior predictive và MAP point estimate. Vì sao P(A|B) khác P(B|A)? Khi nào mô phỏng bootstrap phù hợp hơn giả định phân phối chuẩn?

## Gợi ý trả lời

Posterior predictive tích phân qua bất định tham số, MAP chỉ dùng một điểm; Bayes yêu cầu base rate. Bootstrap có ích khi phân phối lấy mẫu phức tạp, nhưng không tự khắc phục dữ liệu lấy mẫu thiên lệch.

## Nguồn gốc

- https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/
- https://www.statlect.com/
- https://probml.github.io/pml-book/

Ví dụ xác suất sư phạm tự tạo; không phải nghiên cứu y tế hay lời khuyên chẩn đoán.
