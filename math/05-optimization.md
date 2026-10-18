# Chương 5. Tối ưu hóa lồi và thuật toán học máy — nâng cao

Mức học: đại học năm cuối và nhập môn cao học. Tiên quyết: đại số tuyến tính, gradient, xác suất. Thời lượng gợi ý: 16 giờ lý thuyết và 10 giờ thực hành.

## Mục tiêu

Phân biệt lồi/không lồi, chứng minh điều kiện tối ưu, tính gradient descent, giải bài toán ràng buộc và KKT, hiểu regularization và tối ưu ngẫu nhiên.

## Nội dung học

### 5.1. Tập lồi và hàm lồi

Tập C lồi nếu với x,y∈C và t∈[0,1], tx+(1−t)y∈C. Hàm f lồi trên C nếu f(tx+(1−t)y)≤tf(x)+(1−t)f(y). Nếu khả vi trên tập lồi mở: f(y)≥f(x)+∇f(x)ᵀ(y−x). Nếu hai lần khả vi, Hessian bán xác định dương ở mọi nơi là điều kiện tương đương lồi trên miền lồi mở.

### 5.2. Điều kiện tối ưu bậc nhất và bậc hai

Với f lồi khả vi trên R^d, ∇f(x*)=0 là điều kiện cần và đủ để x* tối ưu toàn cục. Khi f không lồi, ∇f=0 có thể là yên ngựa hoặc cực đại. Hessian dương xác định tại điểm dừng cho cực tiểu địa phương nghiêm ngặt nếu f trơn đủ.

### 5.3. Gradient descent và bước học

x_(k+1)=x_k−η∇f(x_k). Với f có gradient L-Lipschitz, descent lemma: f(y)≤f(x)+∇f(x)ᵀ(y−x)+(L/2)||y−x||². Vì vậy η∈(0,2/L) bảo đảm giảm giá trị f tại bước không dừng với gradient descent chuẩn trên toàn R^d; tuy nhiên điều đó một mình chưa bảo đảm hội tụ đến nghiệm tối ưu trong mọi bài toán.

### 5.4. SGD, mini-batch và Adam

SGD dùng ước lượng gradient từ minibatch; độ nhiễu có thể giúp thoát vùng phẳng nhưng không đảm bảo tối ưu toàn cục. Momentum dùng trung bình có trọng số của gradient quá khứ. Adam dùng moment bậc một/hai có hiệu chỉnh bias; hiệu quả thực nghiệm phụ thuộc bài toán, cần so sánh baseline và kiểm tra hội tụ.

### 5.5. Lagrange và KKT

Bài toán min f(x) với g_i(x)≤0, h_j(x)=0. Lagrangian L(x,λ,ν)=f(x)+Σλ_i g_i(x)+Σν_j h_j(x), λ_i≥0. KKT: primal feasibility, dual feasibility, complementary slackness λ_i g_i(x*)=0 và stationarity ∇_x L=0. Với bài toán lồi cùng điều kiện thích hợp (ví dụ Slater và tồn tại nghiệm), KKT mô tả tối ưu toàn cục; không áp dụng vô điều kiện cho bài toán phi lồi.

### 5.6. Đối ngẫu và ý nghĩa của multiplier

Dual function q(λ,ν)=inf_x L(x,λ,ν), cho cận dưới của primal tối thiểu hóa. Strong duality cần điều kiện; λ* có thể diễn giải độ nhạy giá trị tối ưu với nới ràng buộc trong một số điều kiện.

### 5.7. Regularization và bài toán ML

Ridge tạo mục tiêu lồi mạnh khi λ>0 cho hệ số bị phạt: min (1/2)||Xβ−y||²+(λ/2)||β||². Logistic regression với log-loss và regularization lồi cũng giải được bằng tối ưu lồi; mạng neural nhiều lớp thường không lồi.

### 5.8. Lập trình số và kiểm thử

Không tự tuyên bố thuật toán hội tụ khi chưa kiểm tra điều kiện. Theo dõi loss train/validation, chuẩn gradient, learning rate, NaN/Inf, tốc độ và chi phí. Kiểm tra sai phân đối chứng trước khi tối ưu hóa mã.

## Bài tập thực hành

A: Với f(w)=(w−2)², w₀=0, η=0.25, tính w₁, w₂ và giới hạn nếu lặp vô hạn.

B: Minimize (x−3)² subject to x≤1. Viết Lagrangian, tìm nghiệm và multiplier KKT.

C: Với f(x,y)=x²+2y², xác nhận tính lồi mạnh qua Hessian và gradient tại (1,1).

D: Giải thích tại sao nghiệm tối ưu local của mạng neural không mặc nhiên là global.

## Lời giải kiểm chứng

A: gradient 2(w−2); w₁=1; w₂=1.5; công thức w_(k+1)=0.5w_k+1 nên w_k→2.

B: g(x)=x−1≤0. L=(x−3)²+λ(x−1). Nghiệm x*=1, stationarity 2(1−3)+λ=0 cho λ*=4. λ*g=0 và λ≥0 đều thỏa.

C: Hessian diag(2,4) xác định dương, f lồi mạnh với hằng số 2 theo chuẩn Euclid; ∇f(1,1)=(2,4).

D: Hessian mạng nhiều lớp có thể có trị riêng âm, cảnh quan loss không lồi; điều kiện bậc nhất không đủ suy ra tối ưu toàn cục.

## Câu hỏi mở rộng

Giải thích sự khác nhau giữa SGD, batch gradient và Adam. Khi nào strong duality thất bại? Tại sao nghiệm least squares dùng QR/SVD có thể ổn định hơn lập nghịch đảo?

## Gợi ý trả lời

SGD dùng minibatch nên cập nhật có nhiễu; Adam thích nghi theo moment gradient. Đối ngẫu mạnh không tự có nếu thiếu giả thiết phù hợp. Lập XᵀX bình phương condition number, còn QR/SVD tránh điều này.

## Nguồn gốc

- https://web.stanford.edu/class/ee364a/index.html
- https://stanford.edu/~boyd/cvxbook/
- https://see.stanford.edu/Course/EE364A
- https://docs.pytorch.org/docs/stable/optim.html

Định lý được diễn giải có điều kiện; bài tập tự biên soạn. Không phải bản sao giáo trình Stanford.

### 5.8. Tình huống lặp lại: tối ưu có giới hạn tài nguyên

Ví dụ giả lập: chọn x (đơn vị tưới quy ước) để gần mục tiêu 3 nhất, nhưng nguồn cấp chỉ cho phép x≤1 và x≥0. Bài toán min (x−3)² trên 0≤x≤1. Vì hàm lồi nghiêm ngặt, nghiệm tối ưu là x*=1, f*=4.

Đặt g₁(x)=x−1≤0 và g₂(x)=−x≤0. Lagrangian ℒ=(x−3)²+λ₁(x−1)+λ₂(−x), λ₁,λ₂≥0. Tại x*=1: điều kiện dừng 2(1−3)+λ₁−λ₂=0, bổ sung λ₂=0 (vì g₂(1)<0), suy ra λ₁=4. Tất cả điều kiện KKT được thỏa. Slater đúng vì x=0.5 làm cả hai bất đẳng thức nghiêm ngặt; trong bài toán lồi này có đối ngẫu mạnh và KKT đặc trưng nghiệm tối ưu.

Khi gặp lại: định nghĩa biến/đơn vị → lập mục tiêu → viết ràng buộc vật lý → kiểm tra tính lồi và khả thi → kiểm tra điều kiện áp dụng KKT → giải và kiểm chứng ràng buộc → phân tích độ nhạy → thử kịch bản biên. Đây là ví dụ toán, KHÔNG phải công thức quyết định lượng tưới cây trồng.

Bài tập: thay giới hạn trên thành 2, giải lại. Đáp án: x*=2, λ₁=2, λ₂=0, f*=1. Nếu ràng buộc không lồi, không được suy ra KKT là điều kiện đủ nói chung.

Nguồn: https://stanford.edu/~boyd/cvxbook/
