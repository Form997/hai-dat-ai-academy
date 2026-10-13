# HAI ĐẤT AI ACADEMY — Backend API riêng

Node.js 20+ (có fetch tích hợp). Mẫu máy chủ riêng, **không chạy trực tiếp trên GitHub Pages**.

## Chức năng

- GET /health — báo máy chủ hoạt động và trạng thái cấu hình provider.
- POST /api/images — yêu cầu ảnh thông qua OpenAI Images API, trả base64 PNG khi nhà cung cấp trả kết quả.
- Bảo vệ bằng header `X-API-Token` và biến môi trường `ACADEMY_API_TOKEN`.
- Chặn prompt quá dài, chỉ chấp nhận size trong danh sách, giới hạn 5 lần/phút theo token (trong một tiến trình).
- Timeout 45 giây, không tiết lộ thông điệp lỗi upstream hoặc key.

## Chạy riêng trên máy

Thiết lập ba biến môi trường trong terminal/secret manager (KHÔNG commit giá trị):
`ACADEMY_API_TOKEN` = mật khẩu mạnh riêng dành cho API.
`OPENAI_API_KEY` = khóa hợp lệ của nhà cung cấp (có thể phát sinh chi phí).
`OPENAI_IMAGE_MODEL` = model hỗ trợ Images API, ví dụ `gpt-image-1`.

Sau đó chạy: `node examples/backend-starter/server.js` (mặc định 127.0.0.1:3000).

Ví dụ dùng curl trên máy cá nhân:

```bash
curl http://127.0.0.1:3000/health
curl -X POST http://127.0.0.1:3000/api/images \
  -H "Content-Type: application/json" \
  -H "X-API-Token: $ACADEMY_API_TOKEN" \
  -d '{"prompt":"A documentary photograph of a rice field at sunrise","size":"1024x1024"}'
```

## Giới hạn bắt buộc

Máy chủ cố ý chỉ bind localhost và không cấp CORS. **Không ghi API token vào website công khai, localStorage, JavaScript frontend hoặc git.** Đưa API ra Internet chỉ sau khi có tài khoản người dùng, xác thực phiên, HTTPS, quota bền vững, rate limit IP/user, kiểm soát chi phí, logging và moderation phù hợp. Rate limit hiện tại là bộ nhớ 1 tiến trình, không đủ cho production; phản hồi ảnh base64 có thể lớn. Không hứa tạo ảnh miễn phí và không hỗ trợ tạo nhạc/video trong bản này.

Tài liệu Images API chính thức: https://platform.openai.com/docs/api-reference/images

## Nhà cung cấp tùy chọn được thẩm tra (14/10/2026)

Chọn bằng IMAGE_PROVIDER, mặc định openai. **Tuyệt đối không đặt key trong GitHub Pages hoặc GitHub repo.**

- **pollinations**: đặt IMAGE_PROVIDER=pollinations, POLLINATIONS_API_KEY (key `sk_` chỉ trên server), POLLINATIONS_IMAGE_MODEL=flux. Sử dụng POST https://gen.pollinations.ai/v1/images/generations. Mặc định request base64 JSON. Giá/tín dụng/hạn mức có thể đổi; **không bảo đảm miễn phí**, kiểm tra ngân sách tại enter.pollinations.ai trước khi chạy.
- **openai**: dùng OPENAI_API_KEY, OPENAI_IMAGE_MODEL. Có thể bị tính phí. Không dùng `response_format` với GPT Image mặc định.
- **Hugging Face Inference Providers**: có tín dụng hàng tháng rất nhỏ trên tài khoản miễn phí (tài liệu nêu $0.10 tại thời điểm đối chiếu). Không được cấu hình mặc định vì định dạng inference và model image thay đổi theo provider; cần adapter riêng và đối chiếu endpoint/model.
- **Ollama**: API localhost tự lưu trữ, không phải API cloud miễn phí; CPU/GPU và tài nguyên máy do bạn tự chịu. Không cắm trực tiếp vào endpoint ảnh này, cần xây adapter/model tương ứng.

CẢNH BÁO: xác thực bằng header X-API-Token trên server chỉ dùng để thử trong môi trường riêng. Không đưa API token này ra trình duyệt, dù dùng HTTPS. Trước khi public cần gateway có xác thực theo người dùng, quota bền vững, anti-abuse, giám sát ngân sách, HTTPS và xử lý quyền dữ liệu.

Nguồn chính thức:
- https://github.com/pollinations/pollinations
- https://github.com/pollinations/pollinations/blob/main/gen.pollinations.ai/src/docs/image-generation.md
- https://huggingface.co/docs/inference-providers/pricing
- https://github.com/ollama/ollama
