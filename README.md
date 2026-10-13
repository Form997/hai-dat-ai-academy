# 🌱 HAI ĐẤT AI ACADEMY

**Học, làm, kiểm chứng và chia sẻ AI — từ người mới tới chuyên sâu.**

> Phiên bản 2.5 — nền tảng học tập web tĩnh với công cụ thực hành, không tuyên bố đã có API tạo ảnh/nhạc/video miễn phí vô hạn.

[📖 Kho kiến thức có nguồn](./knowledge/README.md) · [🌐 Mở phòng thực hành](./index.html) · [🗺 Lộ trình học](./ROADMAP.md) · [🤝 Đóng góp](./CONTRIBUTING.md) · [🔒 Bảo mật](./SECURITY.md)

## Bắt đầu trong 10 phút (Android hoặc máy tính)

1. Tải các tập tin của kho lên GitHub, **giữ nguyên cấu trúc thư mục**.
2. Vào **Settings → Pages → Deploy from a branch**, chọn `main` và `/ (root)`; Save.
3. Mở URL Pages có dạng `https://TEN-TAI-KHOAN.github.io/TEN-KHO/`.
4. Vào bài đầu tiên ở `lessons/01-beginner/01-github.md`, làm thực hành rồi ghi kết quả.

Nếu chỉ muốn dùng thử offline: mở `index.html` trong trình duyệt. Phòng thực hành hiện là **bản demo không gọi AI thật**.

## Lộ trình theo 6 cấp

| Cấp | Tập trung | Thành phẩm |
| --- | --- | --- |
| 1 Nhập môn | GitHub, tập tin, Git cơ bản, an toàn | Kho công khai có README |
| 2 Web | HTML, CSS, JavaScript, GitHub Pages | Website chạy trên điện thoại |
| 3 AI đa phương tiện | Prompt, ảnh, nhạc, video, bản quyền | Kịch bản tác vụ và đánh giá đầu ra |
| 4 Kỹ sư ứng dụng | API, backend, secrets, kiểm thử | Mẫu API có giới hạn đầu vào |
| 5 Nâng cao | ML, Transformer, diffusion, RAG, vận hành | Đề cương hệ thống có giám sát |
| 6 Nghiên cứu mở | Benchmark, dữ liệu, tái lập, đóng góp | Báo cáo thực nghiệm có giới hạn |

## Nội dung đang có

- 📘 12 bài học thực hành gọn với nhiệm vụ và tiêu chí hoàn thành.
- 🧪 Phòng prompt trên web tại `index.html`: lựa chọn ảnh / nhạc / video, sao chép prompt và lưu trong trình duyệt cục bộ.
- 🔐 Mẫu backend Node.js **không gắn API thật**, gồm endpoint health và kiểm tra request; làm cơ sở kết nối nhà cung cấp sau.
- 📋 Ma trận khảo sát nhà cung cấp API: `resources/api-selection.md`.
- 🛠 Hướng dẫn cộng tác, giấy phép MIT cho mã do kho phát hành, bảo mật, mẫu Issue/PR và CI.

## Điều kho *không* làm

- Không chứa API key/token, tài khoản chia sẻ, công cụ vượt hạn mức hoặc API bất hợp pháp.
- Không đảm bảo dịch vụ AI miễn phí mãi mãi hay hợp lệ cho mọi mục đích thương mại.
- Không dùng hình ảnh/nhạc/video không rõ quyền để phát hành lại.
- Không nhầm **demo giao diện** với **AI inference thật**.

## Nguồn kỹ thuật chính thức

- [GitHub Hello World](https://docs.github.com/en/get-started/start-your-journey/hello-world)
- [GitHub Pages](https://docs.github.com/en/pages)
- [GitHub Actions secrets](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions)
- [MDN Learn Web Development](https://developer.mozilla.org/en-US/docs/Learn_web_development)
- [OWASP API Security Top 10](https://owasp.org/API-Security/)
- [Hugging Face course](https://huggingface.co/learn)

## Hợp tác

Mở Issue để báo lỗi hoặc đề xuất giáo trình; mở Pull Request kèm nguồn tham khảo, kiểm thử, phạm vi sử dụng và giấy phép. Xem `CONTRIBUTING.md`.

**Bản quyền:** Mã nguồn tự tạo trong kho theo MIT (`LICENSE`). Bài học viết mới trong kho được chia sẻ theo [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) trừ khi ghi riêng. Tên, dữ liệu và tài sản bên thứ ba tuân theo giấy phép của chính chúng.

## Bản nâng cấp V2.5

- Đọc bài Markdown trên trang với trình hiển thị DOM an toàn (phạm vi cú pháp có giới hạn).
- Bộ kiểm thử tĩnh: chạy `node tests/smoke.cjs` (Node 18+).
- GitHub Actions tự kiểm tra Pull Request và commit lên main.
- Xem [Release notes V2.5](./V2.5-RELEASE-NOTES.md).

## Kho kiến thức có đối chiếu nguồn

Tám chuyên đề từ [Git và lập trình web tới ML, Transformer, mô hình tạo ảnh/nhạc/video và quản trị rủi ro AI](./knowledge/README.md). Nguồn chính thức và công trình học thuật có liên kết gốc trong từng bài, [danh mục nguồn](./knowledge/SOURCES.md). Bài có ví dụ tự soạn và bài tập; chưa phải bộ giáo trình toàn diện hay khóa học được kiểm định độc lập.
