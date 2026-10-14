# Chương 2. Giải tích nhiều biến và đạo hàm tự động — nâng cao

Mức học: đại học nâng cao. Tiên quyết: đạo hàm/tích phân một biến, ma trận. Thời lượng gợi ý: 12 giờ lý thuyết và 8 giờ thực hành.

## Mục tiêu

Tính gradient, Jacobian, Hessian; chứng minh quy tắc dây chuyền nhiều biến; giải thích backpropagation, đạo hàm hướng, Taylor và sai phân số.

## Nội dung học

### 2.1. Giới hạn và khả vi nhiều biến

Hàm f:R^d→R khả vi tại x khi có ánh xạ tuyến tính L sao cho f(x+h)=f(x)+L(h)+o(||h||). Khi đó L(h)=∇f(x)ᵀh. Có đạo hàm riêng tại điểm chưa đủ bảo đảm khả vi tại đó.

### 2.2. Gradient, đạo hàm hướng và Jacobian

Gradient ∇f=[∂f/∂x₁,…,∂f/∂x_d]ᵀ. Đạo hàm theo vector đơn vị u bằng ∇fᵀu; nếu gradient khác 0 thì hướng tăng nhanh nhất là gradient chuẩn hóa.

Với F:R^n→R^m, Jacobian J_F thuộc R^(m×n), hàng i chứa đạo hàm của đầu ra F_i theo đầu vào.

### 2.3. Quy tắc dây chuyền và backpropagation

Nếu h=g(x) và y=f(h), thì J_(f∘g)(x)=J_f(g(x))J_g(x). Với hàm mất mát vô hướng L, reverse-mode autodiff lan truyền vector–Jacobian product từ đầu ra về tham số. Nhờ dùng lại các giá trị trung gian, không cần tính riêng đạo hàm cho từng tham số.

Ví dụ: z=wx+b; ŷ=σ(z), σ(z)=1/(1+exp(−z)); L=−[t ln ŷ+(1−t)ln(1−ŷ)]. Khi 0<ŷ<1: dL/dz=ŷ−t, nên dL/dw=(ŷ−t)x và dL/db=ŷ−t.

### 2.4. Hessian và hình học bậc hai

Hessian H_ij=∂²f/(∂x_i∂x_j). Nếu đạo hàm riêng bậc hai liên tục gần điểm thì H đối xứng. Taylor bậc hai: f(x+h)=f(x)+∇f(x)ᵀh+(1/2)hᵀH(x)h+o(||h||²). Hessian dương xác định ở điểm dừng bảo đảm cực tiểu địa phương nghiêm ngặt.

### 2.5. Tích phân và kỳ vọng

Kỳ vọng của hàm mất mát theo phân phối p: E[L(X)]=∫L(x)p(x)dx khi tích phân tồn tại. Gradient của kỳ vọng không phải luôn tự động đổi chỗ được; cần giả thiết chính quy như điều kiện trội để hoán đổi ∇ và ∫.

### 2.6. Kiểm tra gradient bằng sai phân

Sai phân trung tâm [f(x+εe_i)−f(x−εe_i)]/(2ε) có sai số cắt O(ε²) nếu f đủ trơn, nhưng ε quá nhỏ gây sai số làm tròn. So sánh với đạo hàm tự động là cách kiểm thử mã huấn luyện.

### 2.7. Những điểm dễ nhầm

Đạo hàm của ReLU tại 0 không xác định theo nghĩa thông thường; framework dùng quy ước subgradient. Với softmax phải tính Jacobian hoặc ghép với cross-entropy để tránh tính toán kém ổn định.

## Bài tập thực hành

A: f(x,y)=x²+3xy+y². Tính gradient, Hessian tại (1,2).

B: z=2x−1, ŷ=σ(z), x=1, t=1. Tính ŷ, dL/dz và dL/dx với binary cross-entropy.

C: chứng minh Jacobian của F(x)=[x₁²+x₂, x₁x₂] và nêu kích thước.

D: phân tích vì sao đạo hàm riêng tồn tại không đủ để khẳng định hàm khả vi.

## Lời giải kiểm chứng

A: ∇f=(2x+3y,3x+2y), tại (1,2) là (8,7). H=[[2,3],[3,2]] có trị riêng 5 và −1 nên không xác định dương.

B: z=1, ŷ=1/(1+e⁻¹)≈0.731059; dL/dz=ŷ−1≈−0.268941; dL/dx=−0.537883.

C: J=[[2x₁,1],[x₂,x₁]], có kích thước 2×2.

D: ví dụ f(x,y)=xy/(x²+y²) khi (x,y)≠(0,0), f(0,0)=0. Hai đạo hàm riêng tại gốc bằng 0 nhưng theo đường x=y, f=1/2 nên không liên tục tại gốc.

## Câu hỏi mở rộng

Vì sao reverse-mode hiệu quả khi L có một đầu ra và hàng triệu tham số? Khi nào gradient clipping cần thiết? Phân biệt gradient và Jacobian.

## Gợi ý trả lời

Reverse-mode truyền một covector từ đầu ra về toàn bộ tham số trong một lượt qua đồ thị; clipping hạn chế norm gradient lớn nhưng không sửa nguyên nhân nổ gradient. Gradient dành cho scalar output, Jacobian cho vector output.

## Nguồn gốc

- https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/
- https://docs.pytorch.org/docs/stable/autograd.html
- https://www.deeplearningbook.org/

Các bài tập do học viện biên soạn; không phải trích nguyên văn bài giảng.
