# HaiDat Academic Reviewer — agent thử nghiệm

Định nghĩa ở `.github/agents/hai-dat-academic-reviewer.agent.md`. Đây là **GitHub Copilot custom agent** cấp kho, không phải bot chạy nền và không tự tạo một phiên ở Agents.

## Thử trong GitHub
1. Gộp PR chứa file cấu hình vào nhánh mặc định (nếu muốn dùng từ main).
2. Mở mục Agents của kho GitHub, tạo phiên Copilot nếu tài khoản hỗ trợ, chọn custom agent **HaiDat Academic Reviewer** nếu trình chọn cho phép.
3. Giao yêu cầu: "Rà soát math/03-probability.md: độ đúng của Bayes/CLT, tính toán ví dụ, nguồn MIT OCW. Báo lỗi có bằng chứng, đề xuất PR, không tự gộp."
4. Kiểm tra kết quả và các Pull Request; không xem lời agent là thẩm định khoa học cuối cùng.

Nếu không thấy tùy chọn agent, cần kiểm tra quyền Copilot và khả năng hỗ trợ tính năng trong gói/tổ chức. Cấu hình file không tự kích hoạt phiên hay mua quyền sử dụng.

Tài liệu GitHub: https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents
