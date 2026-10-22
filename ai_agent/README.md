# HAI ĐẤT AI — Hybrid V1 (offline + online)

Một trợ lý **mã nguồn mở** triển khai ngay trong `hai-dat-ai-academy`. Chạy trên Windows/Linux/macOS bằng **Python 3.10+**, thư viện chuẩn, không GPU. Phù hợp thử nghiệm trên máy RAM 4 GB. Không yêu cầu Ollama hay tải trọng số AI để chạy offline.

**Giới hạn quan trọng:** chế độ offline hiện tại là *truy xuất bằng chứng từ 5 tài liệu mẫu*, **không phải mô hình ngôn ngữ (LLM) tự suy luận chạy cục bộ**. Chế độ online dùng API OpenAI khi người dùng có khóa hợp lệ và có thể phát sinh phí. Chưa tích hợp đọc PDF, trí nhớ dài hạn, tài khoản hoặc quyền truy cập internet tự do.

## 1. Cài đặt

Cài Python 3.10 trở lên từ [python.org](https://www.python.org/downloads/). Tải repository về bằng Git hoặc nút Code → Download ZIP rồi giải nén.

**Windows PowerShell**, tại thư mục gốc dự án:

```powershell
py -3 ai_agent/server.py
```

**Linux/macOS:**

```bash
python3 ai_agent/server.py
```

Mở `http://127.0.0.1:8765`. Máy không cần Internet khi chọn **Offline**. Máy chủ chỉ lắng nghe `127.0.0.1`, không tự công khai ra mạng LAN/Internet.

## 2. Chế độ online (tùy chọn)

Chỉ dùng khi có khóa API của riêng bạn. **Không ghi khóa vào GitHub, HTML, file cấu hình commit hoặc ảnh chụp màn hình**.

PowerShell (chỉ có hiệu lực trong cửa sổ hiện tại):

```powershell
$env:HAIDAT_API_KEY="YOUR_KEY_HERE"
$env:HAIDAT_MODEL="YOUR_MODEL_ID"
py -3 ai_agent/server.py
```

Linux/macOS:

```bash
export HAIDAT_API_KEY="YOUR_KEY_HERE"
export HAIDAT_MODEL="YOUR_MODEL_ID"
python3 ai_agent/server.py
```

Đặt `YOUR_MODEL_ID` theo model API được tài khoản bạn cấp quyền. Mã V1 chỉ cho phép endpoint HTTPS `https://api.openai.com/v1/chat/completions` để tránh SSRF và gửi khóa đến máy chủ tùy ý. Trước khi dùng cần xem bảng giá và chính sách dữ liệu API. Chọn **Online** sẽ báo lỗi nếu không cấu hình; chọn **Tự động** có thể chuyển về offline khi API không dùng được. Không có việc dùng API ChatGPT miễn phí theo gói ChatGPT.

## 3. Thử và kiểm tra

```bash
python3 -m unittest discover -s ai_agent -p 'test_*.py' -v
```

Thử offline với câu hỏi `ET0 và ETc khác nhau như thế nào?`; kết quả hiển thị đoạn diễn giải và URL FAO56. Hỏi giá rau hôm nay khi không có dữ liệu giá trong kho thì phải thông báo **thiếu bằng chứng**, không bịa giá.

## 4. Kiến trúc và bảo mật

`index.html` → HTTP localhost `server.py` → `core.py` → `versions/rag-corpus.json`. Online: `core.py` → HTTPS API OpenAI (chỉ khi có khóa). Không có khóa, không gọi mạng ngoài. Không lưu lịch sử chat, không gửi telemetry, không tự động điều khiển nông nghiệp. Chặn Origin lạ từ trình duyệt, giới hạn request, khóa API chỉ đọc từ biến môi trường. V1 chưa có xác thực người dùng; **không mở cổng ra Internet**.

## 5. Lộ trình phát triển

- V2: nhập tài liệu Markdown/TXT/PDF với kiểm tra nguồn, chống prompt injection và trích dẫn theo đoạn.
- V3: tùy chọn LLM nhỏ qua Ollama/llama.cpp với đo RAM thực tế; RAM 4 GB chỉ phù hợp một số mô hình lượng tử hóa rất nhỏ.
- V4: kết nối PCI kiểm định vùng trồng, quản lý dữ liệu cảm biến, quyền người dùng và nhật ký kiểm toán.

Tài liệu tham khảo: [Python HTTP server](https://docs.python.org/3/library/http.server.html), [Python urllib](https://docs.python.org/3/library/urllib.request.html), [OpenAI API](https://platform.openai.com/docs/api-reference/chat), [OWASP API Security](https://owasp.org/API-Security/). Python `http.server` chỉ phù hợp thử nghiệm cục bộ, không phải máy chủ sản xuất.

## 6. AI cục bộ thật với Ollama (V2, tùy chọn)

Bản V2 bổ sung chế độ **AI cục bộ Ollama**, khác với chế độ **Tra cứu offline** vốn chỉ lấy đoạn chứng cứ. Mã chỉ gọi `http://127.0.0.1:11434/api/generate`, không kết nối mô hình trên Internet khi đang trả lời. Ollama là phần mềm bên ngoài; việc **cài đặt và tải mô hình lần đầu cần Internet**. Không mặc định cài hay tải mô hình.

1. Cài Ollama từ https://ollama.com/download và khởi động Ollama trên máy.
2. Chọn một mô hình nhỏ được Ollama hỗ trợ và xem yêu cầu bộ nhớ tại trang model. Ví dụ thử nghiệm: `ollama pull qwen2.5:0.5b`. Tên model, khả năng hỗ trợ và dung lượng cần xác minh trước khi tải.
3. Trong **PowerShell**, đặt `$env:HAIDAT_LOCAL_MODEL="qwen2.5:0.5b"` rồi chạy `py -3 ai_agent/server.py`.
4. Mở http://127.0.0.1:8765 và chọn **AI cục bộ Ollama**. Nếu muốn máy tự chuyển từ online sang offline khi không có khóa, chọn **Tự động**; khi không cấu hình online, hệ thống sẽ thử Ollama trước rồi mới tra cứu offline.
5. Kiểm thử: `py -3 -m unittest discover -s ai_agent -p "test_*.py" -v`.

**Máy RAM 4 GB:** chỉ nên thử model lượng tử hóa rất nhỏ và đóng ứng dụng khác; không bảo đảm tốc độ hoặc đủ RAM. Không thể suy ra tốc độ thực tế nếu chưa đo trên máy. Câu trả lời của mô hình nhỏ có thể sai, không dùng để quyết định sản xuất.

**Riêng tư:** API cloud chỉ nhận dữ liệu khi chọn Online hoặc Tự động có cấu hình cloud; chế độ local_llm gọi loopback. Tránh cài proxy/tunnel đưa Ollama hoặc máy chủ này lên mạng công cộng. Máy chủ thử nghiệm không có xác thực.
