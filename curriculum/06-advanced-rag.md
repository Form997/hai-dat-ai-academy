# Chương 6: Transformer, truy xuất tài liệu và RAG | Giáo trình AI V3.0 — Hai Đất AI Academy

Trình độ: Chuyên sâu. Mục tiêu: hiểu đúng nguyên lý, tự thực hành và kiểm tra được bằng chứng thay vì chỉ học thuộc thuật ngữ.

## Kiến thức và diễn giải

### 6.1. Transformer và biểu diễn ngữ cảnh

Transformer dựa trên cơ chế attention; token hóa thay văn bản thành các đơn vị phù hợp mô hình.

### 6.2. Truy xuất tài liệu và tạo câu trả lời

RAG kết hợp truy xuất nguồn ngoài với sinh câu trả lời; tính đúng phụ thuộc cả bước tìm và tổng hợp.

### 6.3. Kiểm chứng dẫn chứng và đánh giá RAG

Đánh giá retrieval (tìm đúng bằng chứng) tách khỏi faithfulness (câu trả lời bám đúng bằng chứng).

## Ví dụ và bài thực hành

Dùng 5 nguồn công khai làm tập dữ liệu; viết 10 câu hỏi và rubric: tài liệu đúng, câu trả lời đúng, liên kết nguồn đúng.

Hồ sơ nộp: mô tả đầu vào, các bước thực hiện, ảnh/đoạn mã hoặc kết quả, sai số và điều chưa xác định. Chỉ dùng dữ liệu không chứa bí mật hay thông tin cá nhân.

## Bài tập 1

Nếu mô hình trả lời đúng nhưng gắn đường dẫn không nói về nội dung đó, được coi là dẫn nguồn tốt chưa?

## Lời giải và lập luận

Chưa. Phải chứng minh được mệnh đề từ nguồn cụ thể.

## Bài tập 2 — tư duy phản biện

Khi không có nguồn đủ chắc chắn, chatbot chuyên ngành nên làm gì?

## Gợi ý lời giải

Nêu thiếu bằng chứng, không sáng tác nguồn; đề nghị kiểm tra ở nguồn gốc hoặc dữ liệu bổ sung.

## Tự đánh giá

Tự đánh dấu khi có bằng chứng: (1) giải thích được thuật ngữ; (2) hoàn thành bài thực hành; (3) chỉ rõ ít nhất một giới hạn; (4) dẫn được nguồn gốc của định nghĩa hoặc phương pháp.

## Nguồn chính thức và nghiên cứu gốc

- https://arxiv.org/abs/1706.03762
- https://arxiv.org/abs/2005.11401

Ghi chú: nội dung tiếng Việt và tình huống thực hành do dự án tự biên soạn; không có tuyên bố đã thực nghiệm thay người học. Các dịch vụ, phiên bản, quyền sử dụng phải đối chiếu tại thời điểm thực hiện.

## Học tiếp và đối chiếu kiến thức

- [Transformer và RAG](https://form997.github.io/hai-dat-ai-academy/knowledge/index.html?doc=06-transformers-llm.md) — kiến thức nền, cách kiểm tra và nguồn tham khảo.
- [Tra cứu giáo trình toàn học viện](https://form997.github.io/hai-dat-ai-academy/catalog/) — tìm theo chủ đề và tình huống thực hành.
- [Toán cho AI V3.1](https://form997.github.io/hai-dat-ai-academy/math/) — các nền tảng toán học dùng trong mô hình AI.

Các đường dẫn nguồn ở mục «Nguồn chính thức và nghiên cứu gốc» dùng để đối chiếu khái niệm, không hàm ý học viện được đơn vị nguồn chứng nhận. Ví dụ và bài tập trong chương do dự án tự biên soạn.
