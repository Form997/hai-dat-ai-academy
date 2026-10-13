# 06. Transformer, LLM và RAG

**Mức độ:** Chuyên sâu · **Ngày đối chiếu:** 2026-10-13 · **Trạng thái:** Nội dung giảng dạy dẫn nguồn, chưa thay thế thực nghiệm độc lập.

## Mục tiêu đầu ra

Sau khi học, người đọc phải diễn giải các khái niệm cốt lõi, hoàn thành bài thực hành và cung cấp bằng chứng kiểm tra sản phẩm của mình.

## Nội dung học

### 1. Token và attention

Text được mã hóa thành token; attention cho phép mô hình sử dụng ngữ cảnh giữa các vị trí. Transformer là kiến trúc trong công trình Attention Is All You Need; không đồng nghĩa mọi Transformer là chatbot.

### 2. RAG

Retrieval-augmented generation truy xuất bằng chứng từ kho ngoài trước khi sinh câu trả lời. RAG không tự bảo đảm đúng: phải đo recall truy xuất, độ liên quan tài liệu và mức câu trả lời bám nguồn.

### 3. Lỗi và giới hạn

Mô hình có thể sinh phát biểu sai, thiếu nguồn hoặc lỗi thời. Với kiến thức chuyên ngành cần truy xuất tài liệu gốc, kiểm tra từng khẳng định và đánh giá trên bộ câu hỏi độc lập.

## Bài thực hành có đầu ra

Thiết kế 20 câu hỏi từ 5 tài liệu chính thức; đo 3 tiêu chí: tìm được đoạn hỗ trợ, trả lời đúng và dẫn nguồn đúng. Ghi các tình huống không có câu trả lời.

## Câu hỏi và tiêu chí tự đánh giá

1. Phân biệt retrieval và generation.
2. Có tập câu hỏi kiểm thử độc lập.
3. Không giả nguồn khi thiếu dữ liệu.

## Nguồn gốc để đối chiếu

1. https://huggingface.co/learn/llm-course/chapter1/1
2. https://arxiv.org/abs/1706.03762
3. https://arxiv.org/abs/2005.11401

**Ghi chú học thuật:** Các đoạn diễn giải và bài tập do dự án tự biên soạn. Mọi kết quả đo hay cam kết dịch vụ phải được kiểm nghiệm lại trong điều kiện sử dụng thực tế.
