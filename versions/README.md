# V3.2–V3.5 — Phạm vi triển khai

- V3.2: ví dụ Python chạy riêng ngoài GitHub Pages với dữ liệu tổng hợp; kiểm tra baseline và Ridge qua pipeline.
- V3.3: từ khóa tìm ba đoạn có URL nguồn; KHÔNG dùng embedding, không có LLM hoặc RAG production.
- V3.4: mẫu JSON yêu cầu tạo ảnh; KHÔNG gọi API, không sinh ảnh. Cần backend xử lý key, quota, xác thực, kiểm tra an toàn, giới hạn chi phí và việc làm bất đồng bộ.
- V3.5: mẫu storyboard/nhạc, localStorage; KHÔNG sinh media. Cần API nhà cung cấp và kiểm tra giấy phép.

Tất cả mô-đun là nền tảng thực hành và tài liệu. Không sử dụng dữ liệu cá nhân, khóa hoặc token trong prompt công khai.
