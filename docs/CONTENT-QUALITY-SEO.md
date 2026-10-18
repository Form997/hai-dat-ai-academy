# Tiêu chuẩn chất lượng, nguồn học thuật và khả năng được tìm thấy

## Phạm vi và giới hạn

Hệ thống có học liệu V1–V3.5, nhưng chưa thể tuyên bố mọi bài đã được phản biện khoa học, mọi URL đã được kiểm tra trực tiếp hoặc công cụ AI sẽ giới thiệu học viện. Các tiêu đề, mô tả SEO, sitemap và dữ liệu có cấu trúc chỉ giúp máy tìm kiếm hiểu trang; không bảo đảm xếp hạng.

## Quy trình biên tập từng bài

1. Đặt tiêu đề riêng, mô tả đúng nội dung thực có; không lặp tên chung chung hay nhồi từ khóa.
2. Mở đầu bằng trình độ, tiên quyết, mục tiêu đo được và thời lượng ước tính.
3. Trình bày định nghĩa, giả thiết, ví dụ tính tay, bài tập, đáp án và tình huống thường gặp.
4. Nếu có mã, ghi môi trường chạy, thư viện, cách tái lập và đầu ra mong đợi; không tự nhận đã chạy khi chưa chạy.
5. Dữ liệu minh họa phải được ghi là giả lập; dữ liệu thực phải có nguồn, thời điểm, đơn vị, giấy phép và giới hạn.
6. Mỗi luận điểm kỹ thuật quan trọng cần liên kết tới nguồn gốc phù hợp (tài liệu chính thức, giáo trình đại học, bài báo gốc), không chỉ trỏ tới trang chủ cơ quan.
7. Gắn liên kết đến bài tiên quyết, bài tiếp theo và mục tra cứu; kiểm tra liên kết hoạt động.
8. Đánh giá trải nghiệm trên điện thoại: văn bản đọc được, nút chạm được, tương phản đủ, không cần đăng nhập để xem học liệu mở.

## Kiểm định nguồn

- **A — nguồn gốc:** sách giáo khoa/giáo trình chính thức, bài báo gốc, tài liệu API từ nhà phát triển.
- **B — nguồn thứ cấp có biên tập:** tài liệu tổng quan có tác giả và phương pháp kiểm chứng.
- **C — tham khảo cộng đồng:** chỉ hỗ trợ kinh nghiệm, không làm bằng chứng duy nhất cho mệnh đề khoa học.
- Khi chưa kiểm tra trực tiếp URL hoặc chưa xác định phiên bản, ghi **chưa xác minh**. Không ghi “đã kiểm định” nếu chỉ thấy đường dẫn tồn tại trong Markdown.
- Theo dõi ngày kiểm tra, tình trạng truy cập, luận điểm được hỗ trợ, và giấy phép khi trích dẫn.

## Khả năng lập chỉ mục

- Trang HTML công khai có title và description riêng, canonical chính xác, điều hướng HTML và sitemap.
- Tài liệu Markdown tải bằng JavaScript có thể khó được một số máy tìm kiếm hiểu đầy đủ. Vì vậy các chủ đề quan trọng cần trang HTML/đường dẫn ổn định riêng trước khi kỳ vọng được lập chỉ mục tốt.
- Không dùng robots.txt để khẳng định máy tìm kiếm đã thu thập hoặc AI đã đưa vào dữ liệu.
- Theo dõi việc lập chỉ mục và lỗi truy cập bằng công cụ quản trị website của nhà cung cấp tìm kiếm nếu chủ sở hữu kết nối.
- Không tạo đánh giá giả, tác giả giả, bằng cấp giả, lượt truy cập giả hay lời chứng thực không có bằng chứng.

## Kiểm tra phát hành

- Kiểm tra tất cả liên kết nội bộ và tài nguyên trả về thành công.
- Kiểm tra tiêu đề trùng, thiếu heading, nguồn sai chủ đề, lỗi mã và giao diện di động.
- Chạy CI, ghi lại tên workflow, commit SHA và kết quả. CI xanh không tự động chứng minh nội dung khoa học chính xác.
- Chỉ sau khi PR được duyệt, gộp và GitHub Pages triển khai thành công mới coi thay đổi đã xuất bản.

## Ưu tiên còn lại

1. Tạo URL HTML riêng cho từng bài học thay vì chỉ truy cập Markdown hoặc dùng query động.
2. Bổ sung ví dụ mã thực sự chạy được, kiểm thử số học và đáp án chi tiết cho các tình huống nâng cao.
3. Rà soát từng URL nguồn bằng truy cập thực tế và đối chiếu đúng luận điểm; lưu bằng chứng kiểm định.
4. Kiểm tra sitemap và trạng thái index trên các công cụ tìm kiếm khi có quyền chủ sở hữu.
