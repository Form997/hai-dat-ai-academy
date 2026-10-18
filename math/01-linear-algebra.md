# Chương 1. Đại số tuyến tính cho trí tuệ nhân tạo — nâng cao

Mức học: đại học năm 2–4; phần cuối tiếp cận sau đại học. Tiên quyết: hệ phương trình, lượng giác, giải tích một biến. Thời lượng gợi ý: 12–15 giờ lý thuyết và 8 giờ thực hành.

## Mục tiêu

Biểu diễn phép biến đổi tuyến tính, chứng minh các mệnh đề về hạng và không gian con, phân tích trị riêng/SVD, giải least squares, diễn giải PCA và tính ổn định số.

## Nội dung học

### 1.1. Không gian vector, cơ sở và hạng

Với A thuộc R^(m×n), kernel(A)={x:Ax=0}; image(A)={Ax:x thuộc R^n}. Định lý rank–nullity: rank(A)+nullity(A)=n. Các cột độc lập tuyến tính khi Ax=0 chỉ có nghiệm x=0. Tư duy hình học: A ánh xạ từ không gian d chiều sang k chiều, có thể làm mất thông tin khi rank(A)<d.

### 1.2. Trực giao, phép chiếu và bình phương tối thiểu

Với ma trận thiết kế X thuộc R^(n×d), nghiệm tối thiểu hóa ||Xβ−y||₂² thỏa phương trình chuẩn XᵀXβ=Xᵀy. Nếu X có hạng cột đầy đủ: β=(XᵀX)⁻¹Xᵀy. Trong triển khai số không nên lập nghịch đảo trực tiếp: dùng QR hoặc SVD; nếu X suy biến thì dùng nghiệm giả nghịch đảo X⁺y.

Chứng minh: đạo hàm theo β của ||Xβ−y||₂² là 2Xᵀ(Xβ−y). Cho bằng 0 thu phương trình chuẩn. Nếu X suy biến, hệ có thể có nhiều nghiệm.

### 1.3. Ma trận đối xứng, phổ và dạng toàn phương

Nếu A=Aᵀ thực thì tồn tại Q trực giao và Λ đường chéo thực sao cho A=QΛQᵀ. A xác định dương khi xᵀAx>0 với mọi x khác 0, tương đương các trị riêng dương. Hessian xác định dương tại điểm dừng là điều kiện đủ của cực tiểu địa phương nghiêm ngặt (với Hessian liên tục quanh điểm).

### 1.4. SVD và chiều hiệu dụng

Mọi ma trận A thuộc R^(m×n) có phân rã A=UΣVᵀ với các giá trị kỳ dị σ₁≥σ₂≥…≥0. Hạng bằng số σ khác 0. Ma trận xấp xỉ hạng k từ k bộ thành phần kỳ dị lớn nhất cho sai số Frobenius tối thiểu trong lớp ma trận hạng không vượt k (định lý Eckart–Young–Mirsky).

### 1.5. PCA từ SVD

Cho X là ma trận quan sát đã trừ trung bình từng cột. Ma trận hiệp phương sai mẫu S=XᵀX/(n−1); vector riêng ứng với trị riêng lớn nhất chỉ hướng phương sai lớn nhất. PCA không phải bằng chứng quan hệ nhân quả; dữ liệu với đơn vị đo khác nhau có thể cần chuẩn hóa trước PCA.

### 1.6. Độ điều kiện và tính toán số

Condition number κ₂(A)=σ_max/σ_min cho ma trận khả nghịch. κ lớn nghĩa là nhiễu dữ liệu có thể bị khuếch đại. Vì κ₂(XᵀX)=κ₂(X)² khi X có hạng cột đầy đủ, dùng phương trình chuẩn có thể kém ổn định hơn QR/SVD.

### 1.7. Ứng dụng AI

Embedding, projection, attention score QKᵀ/√d, hồi quy tuyến tính, PCA trước phân cụm; luôn ghi rõ chiều tensor và batch.

## Bài tập thực hành

Bài A (cơ bản): A=[[1,2],[3,4]], x=[2,1]. Tính Ax, det(A), rank(A).

Bài B (trung cấp): X=[[1,0],[0,1],[1,1]], y=[1,2,2]. Tìm nghiệm least squares và residual.

Bài C (nâng cao): với ma trận đường chéo diag(4,1), hãy tìm SVD, κ₂ và xấp xỉ hạng 1 tốt nhất theo chuẩn Frobenius; giải thích vì sao mất một chiều.

Bài D (chứng minh): chứng minh rank–nullity cho ánh xạ từ R^n tới R^m bằng cách mở rộng cơ sở kernel thành cơ sở toàn không gian.

## Lời giải kiểm chứng

A: Ax=[4,10], det(A)=−2 nên rank(A)=2.

B: XᵀX=[[2,1],[1,2]], Xᵀy=[3,4]. Giải được β=[2/3,5/3]. Dự báo [2/3,5/3,7/3]; residual Xβ−y=[−1/3,−1/3,1/3]; tổng bình phương sai số=1/3.

C: U=V=I, Σ=diag(4,1), κ₂=4. Xấp xỉ hạng 1 diag(4,0) có sai số Frobenius 1.

D: nếu dim(kernel)=r, lấy r vector cơ sở của kernel và bổ sung n−r vector. Ảnh của n−r vector này độc lập tuyến tính và sinh image; do đó rank=n−r.

## Câu hỏi mở rộng

So sánh QR và SVD khi dữ liệu gần đa cộng tuyến. Vì sao PCA cần center dữ liệu? Khi nào regularization ridge cải thiện tính điều kiện?

## Gợi ý trả lời

SVD làm rõ trị kỳ dị nhỏ và gần suy biến, nhưng thường tốn chi phí hơn QR. Center giúp PCA xét phương sai quanh trung bình. Ridge thay XᵀX bằng XᵀX+λI (λ>0), làm trị riêng tăng thêm λ và thường giúp bài toán ổn định hơn.

## Nguồn gốc

- https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/
- https://numpy.org/doc/stable/reference/generated/numpy.linalg.svd.html
- https://scikit-learn.org/stable/modules/decomposition.html

Nội dung biên soạn độc lập dựa trên các khái niệm đã được giảng dạy trong tài liệu gốc; bài tập và lời giải do học viện tự xây dựng. Không khẳng định là giáo trình chính thức của MIT.

### 1.8. Tình huống lặp lại: hai cảm biến đo cùng một đại lượng

Dữ liệu giả lập: cảm biến A=[1,2,3], B=[2,4,6] (cùng đơn vị). Ma trận X có hai cột phụ thuộc tuyến tính, rank(X)=1; XᵀX suy biến. Vì vậy không thể ước lượng riêng hai hệ số bằng nghịch đảo thông thường. Nếu mục tiêu y=[3,6,9], có vô số nghiệm β₁+2β₂=3. Nghiệm chuẩn Euclid nhỏ nhất là β=[0.6,1.2] do β₁=3/5 và β₂=6/5.

Khi gặp lại: (1) kiểm tra đơn vị và giá trị thiếu; (2) phát hiện cột trùng/tương quan gần 1; (3) kiểm tra rank và singular values; (4) dùng QR/SVD hoặc regularization; (5) kiểm tra sai số dự báo trên dữ liệu chưa thấy. Không kết luận hai cảm biến độc lập chỉ vì có hai cột.

Bài tập: thay B bằng [2,4,6.01]; dự đoán điều gì xảy ra với condition number khi sai số đo nhỏ. Giải thích vì sao nên báo cáo độ ổn định của hệ số bên cạnh sai số dự báo. Dữ liệu ở đây là mô phỏng, không phải quan trắc thực địa.

Nguồn phương pháp: https://numpy.org/doc/stable/reference/generated/numpy.linalg.lstsq.html
