# AI Agent riêng của học viện

Định nghĩa agent ở `.github/agents/academy-quality-reviewer.agent.md`. Đây là **cấu hình hướng dẫn** cho GitHub Copilot custom agent, không phải một tiến trình tự chạy và không tạo phiên Agents ngay khi merge.

Sau khi PR được gộp, vào GitHub Copilot Agents (nếu tài khoản có quyền truy cập), chọn custom agent `academy-quality-reviewer` trong danh sách agent có sẵn và giao nhiệm vụ:

> Kiểm tra các sai sót học thuật trong math/ của V3.1. Ưu tiên chương xác suất và điều kiện định lý KKT. Chỉ sửa lỗi có bằng chứng, chạy test, tạo PR; không tự gộp.

Việc xuất hiện trong giao diện Agents phụ thuộc hỗ trợ custom agents và quyền Copilot của tài khoản/tổ chức. Nếu chưa thấy, kiểm tra quyền Copilot và cài đặt repository.
