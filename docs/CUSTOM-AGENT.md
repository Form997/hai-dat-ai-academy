# Sử dụng Academy Quality Reviewer thực tế

Tệp cấu hình: `.github/agents/academy-quality-reviewer.agent.md`. Đây là custom agent **dành cho GitHub Copilot**, không phải bot tự chạy hoặc dịch vụ nền. Merge tệp cấu hình không tự tạo phiên trong tab Agents.

## Bài kiểm thử đầu tiên
Mở GitHub repository → Issues → issue #13. Nếu tài khoản có GitHub Copilot coding agent, sử dụng thao tác giao issue cho Copilot và chọn custom agent `academy-quality-reviewer` nếu giao diện hỗ trợ. Tùy chọn này có thể không xuất hiện nếu tài khoản thiếu quyền hoặc tính năng chưa được bật.

Nội dung giao việc:
> Sửa lỗi đã kiểm chứng ở chương Xác suất V3.1. Bổ sung Markov chain và ví dụ trạng thái hệ thống tưới với dữ liệu giả lập được ghi nhãn rõ. Có tính tay, mã chạy độc lập, kiểm thử số học và nguồn chính thống. Đảm bảo trình đọc web hiển thị được. Tạo PR, không tự gộp.

## Cách xác định có hoạt động thật không
- Đã cấu hình: tệp `.github/agents/academy-quality-reviewer.agent.md` tồn tại trong nhánh main.
- Đã giao nhiệm vụ: issue được GitHub xác nhận đã giao cho Copilot; chỉ có issue không chứng minh đã giao.
- Đang chạy: có session hiện trong Agents/Active hoặc thông tin phiên Copilot tương ứng.
- Hoàn thành: có kết quả, thay đổi và PR để kiểm tra; không suy luận chỉ từ chữ Completed.
- Đã áp dụng lên website: PR được duyệt/gộp và GitHub Pages triển khai thành công.

Nếu không thấy custom agent, xem tài liệu GitHub: https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-custom-agents và kiểm tra quyền Copilot. Không nhập token hay mật khẩu vào issue công khai.
