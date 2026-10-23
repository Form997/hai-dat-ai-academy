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

## Phòng thực hành RAG có đánh giá V3.8

[Bài thực hành truy xuất có dẫn chứng, đánh giá và từ chối khi thiếu nguồn](../practical/README-rag-v38.md) có bộ nguồn 5 đoạn minh họa, ID tài liệu, 13 câu hỏi hồi quy, 16 câu thách thức, 8 tài liệu gây nhiễu tổng hợp và mã kiểm thử tự động.

Phân biệt bốn khái niệm:
- **Retrieval Recall@k:** với mỗi câu có nguồn, lấy số nguồn đúng trong top-k chia tổng nguồn đúng đã gán nhãn, rồi lấy trung bình. Tỷ lệ câu có ít nhất một nguồn đúng là Hit@k, không phải Recall@k khi có nhiều nguồn liên quan.
- **Citation correctness:** đường dẫn được dẫn có thực sự hỗ trợ mệnh đề hay không? Cần người kiểm định hoặc gold labels.
- **Faithfulness:** nội dung câu trả lời có bị suy diễn vượt chứng cứ hay không? Bản thực hành chưa có mô hình sinh nên chưa đo chỉ số này.
- **Abstention:** khi không có bằng chứng, hệ thống có từ chối thay vì bịa thông tin không?

Đối với tình huống nông nghiệp, phải phân biệt quy chuẩn, nghiên cứu thực nghiệm, diễn giải giáo trình và dữ liệu đo thực địa. Không sử dụng kết quả truy xuất từ khóa để ra quyết định tưới, bón phân hay kiểm định vùng trồng.

