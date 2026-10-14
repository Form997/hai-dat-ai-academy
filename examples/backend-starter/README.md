# Backend starter (minh họa, chưa kết nối AI)

Node.js 20+; chạy `node server.js`, kiểm tra `http://localhost:3000/health`.

Endpoint `POST /api/generate` là demo: luôn trả HTTP 501 và không gọi nhà cung cấp. Muốn đưa ra Internet cần thêm xác thực, rate limit, quota, logging an toàn và quản lý key bằng môi trường backend. Không triển khai như API công cộng khi chưa bổ sung bảo vệ.
