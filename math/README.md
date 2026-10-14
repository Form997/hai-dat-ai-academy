# V3.1 — Toán học cho AI, bậc đại học nâng cao

Chương trình biên soạn độc lập bằng tiếng Việt, tham chiếu chủ đề và tài liệu chính thức từ MIT OCW, Stanford EE364A/Boyd, Penn State STAT 501 và thư viện mã nguồn khoa học. Đây không phải học phần có chứng chỉ hoặc tài liệu được các trường này phê duyệt.

## Chuẩn đầu ra

1. Đại số tuyến tính: chứng minh rank–nullity; QR/SVD, least squares, PCA và condition number.
2. Giải tích: gradient, Jacobian, Hessian, quy tắc dây chuyền, backpropagation và gradient checking.
3. Xác suất: Bayes, moment, likelihood/MAP, LLN/CLT và Monte Carlo.
4. Thống kê: confidence intervals, kiểm định giả thuyết, đánh giá mô hình, regularization, leakage.
5. Tối ưu: convexity, gradient methods, duality, KKT, stochastic optimization.

## Lộ trình 15 tuần gợi ý

- Tuần 1–3: Đại số tuyến tính; ít nhất 1 bài chứng minh và 3 bài tính.
- Tuần 4–6: Giải tích nhiều biến; tự triển khai và kiểm tra gradient.
- Tuần 7–9: Xác suất; Bayes và thí nghiệm Monte Carlo.
- Tuần 10–12: Suy luận thống kê; đánh giá hồi quy và phân loại.
- Tuần 13–15: Tối ưu hóa; đối ngẫu/KKT và dự án cuối kỳ.

Phân bổ kiểm tra gợi ý: bài tập 30%, giữa kỳ 20%, dự án tính toán 20%, cuối kỳ 30%. Không tuyên bố chuẩn kiểm định quốc tế hoặc tín chỉ ECTS chính thức.

## Dự án cuối kỳ

Cho dữ liệu huấn luyện được phép sử dụng: (i) tách train/validation/test theo nhóm hoặc thời gian nếu cần, (ii) fit ridge regression không leakage, (iii) tìm nghiệm bằng least squares/gradient descent, (iv) so sánh MAE/RMSE, (v) ước lượng khoảng bất định nếu giả thiết cho phép, (vi) nộp notebook, phiên bản thư viện, seed và diễn giải giới hạn.

## Tài liệu tham khảo được xác minh

- MIT 18.06SC Linear Algebra: https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/
- MIT 18.02SC Multivariable Calculus: https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/
- MIT 18.05 Probability and Statistics: https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/
- Stanford EE364A Convex Optimization: https://web.stanford.edu/class/ee364a/index.html
- Boyd & Vandenberghe Convex Optimization: https://stanford.edu/~boyd/cvxbook/
- Penn State STAT 501: https://online.stat.psu.edu/stat501/
- NumPy: https://numpy.org/doc/stable/
- scikit-learn User Guide: https://scikit-learn.org/stable/user_guide.html
- PyTorch autograd: https://docs.pytorch.org/docs/stable/autograd.html

Các câu ví dụ, bài tập, lời giải trong tài liệu là nội dung tự biên soạn; không sao chép học liệu có bản quyền. Phải kiểm chứng các giả thiết định lý trước khi áp dụng thực tế.
