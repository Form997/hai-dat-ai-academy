# Hệ thống tài khoản (chưa kích hoạt production)

Đã tạo giao diện email + mật khẩu, đăng ký, đăng xuất, khôi phục mật khẩu, hồ sơ vai trò và đồng bộ tiến độ với Supabase. Tài liệu vẫn công khai không cần đăng nhập. Chưa có dự án Supabase được kết nối; mẫu config để trống.

## Kích hoạt có kiểm soát

1. Tạo dự án Supabase thuộc quyền sở hữu của học viện. Nên nâng cấp Pro và backup trước khi ra mắt công khai; không cam kết Free đủ tải.
2. Đọc và review file `supabase/migrations/20261014_academy.sql`; chạy trên dự án **mới**, kiểm tra schema và test RLS bằng 2 tài khoản thật.
3. Bật email confirmation, CAPTCHA, Auth rate limits, SMTP tùy chỉnh, URL site là GitHub Pages và redirect allowlist `https://form997.github.io/hai-dat-ai-academy/account/index.html`. Đặt chính sách mật khẩu ít nhất 12 ký tự trong Auth Settings.
4. Chỉ đưa **Project URL** và **publishable/anon key** vào `account/config.js`; đây là khóa công khai dự kiến cho browser, KHÔNG đưa `service_role`, secret, SMTP password hay database password vào repo. Review RLS **trước** khi điền.
5. Mở 20 tài khoản kiểm thử, thử đăng ký, reset email, đăng xuất, 2 thiết bị, quyền RLS, lỗi mạng và chống spam. Rồi mới triển khai rộng.
6. Tùy số MAU/đồng thời, đo quota, số lượng email, dung lượng, index và chi phí. 10.000 tài khoản chưa đồng nghĩa 10.000 truy cập đồng thời.

## Giới hạn phiên bản đầu

- Chỉ đồng bộ **bài đánh dấu hoàn thành của V1–V2** (khóa `haiDatV2Progress`) khi học viên vào trang Tài khoản và đăng nhập/chọn Đồng bộ.
- Đồng bộ theo mô hình hợp tập các bài đã hoàn thành; không hỗ trợ bỏ hoàn thành trên nhiều thiết bị, chưa có migration điểm thi cũ. Không gửi điểm thi client-side lên server để xác nhận chứng chỉ.
- Nút Đăng xuất chỉ kết thúc phiên cục bộ; phiên khác của cùng học viên có thể còn hoạt động.
- Không có bảng admin điều chỉnh vai trò trên web; vai trò nâng cấp phải được gán thông qua thao tác privileged đã kiểm tra. RLS ngăn học viên tự thăng quyền.
- Cần test trình duyệt và Auth provider thực tế. Kiểm thử cấu trúc không chứng minh RLS an toàn tuyệt đối.
