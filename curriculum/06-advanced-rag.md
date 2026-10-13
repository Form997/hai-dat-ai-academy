# Chương 6: Transformer, truy xuất tài liệu và RAG

Trình độ: Chuyên sâu. Mục tiêu: hiểu đúng nguyên lý, tự thực hành và kiểm tra được bằng chứng thay vì chỉ học thuộc thuật ngữ.

## Kiến thức và diễn giải

### 6.1. Nội dung trọng tâm

Transformer dựa trên cơ chế attention; token hóa thay văn bản thành các đơn vị phù hợp mô hình.

### 6.2. Nội dung trọng tâm

RAG kết hợp truy xuất nguồn ngoài với sinh câu trả lời; tính đúng phụ thuộc cả bước tìm và tổng hợp.

### 6.3. Nội dung trọng tâm

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
