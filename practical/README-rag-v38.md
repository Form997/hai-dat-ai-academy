# V3.8 — RAG có dẫn chứng, đánh giá và từ chối khi thiếu nguồn

**Phạm vi thực tế:** hệ thống truy xuất từ **5 đoạn tóm tắt tự biên soạn** có gắn liên kết nguồn gốc. Không gọi API, không có mô hình ngôn ngữ, không thu thập dữ liệu trực tuyến, không tuyên bố là công cụ tổng quan hệ thống hay xác minh toàn văn. Nguồn được chọn để minh họa; mỗi kết quả cần người học mở tài liệu gốc để đối chiếu.

## Phân tách các tầng

1. **Corpus:** `versions/rag-corpus.json` gồm ID ổn định, loại nguồn, URL, phạm vi diễn giải và đoạn nội dung.
2. **Retrieval:** `versions/rag-core.js` tách token tiếng Việt, chuẩn hóa dấu, tính độ phủ từ khóa và xếp hạng. Đây là **lexical matching**, không phải semantic embeddings.
3. **Evidence gate:** yêu cầu ít nhất 2 token trùng và độ phủ từ khóa tối thiểu 50%. Đây là heuristic để học, không phải ngưỡng tin cậy đã hiệu chuẩn.
4. **Presentation:** `versions/rag.js` dùng DOM an toàn và hiển thị ID, nguồn, đoạn chứng cứ. Không sinh kết luận vượt nguồn.
5. **Evaluation:** `versions/rag-eval.json` có 7 câu hỏi có nguồn kỳ vọng và 6 câu hỏi cần từ chối.

## Chạy kiểm thử

```bash
node tests/rag-evidence.cjs
```

Các chỉ số được tách riêng:
- `hit_at_5`: tỷ lệ câu có nhãn nguồn đúng được tìm thấy trong top-5 của `search()`. Với một nguồn đúng mỗi câu, đây là hit rate; chưa phải đánh giá recall đầy đủ với nhiều nguồn liên quan.
- `mrr_at_5`: trung bình nghịch đảo thứ hạng nguồn đúng trên câu có đáp án.
- `false_refusals`, `false_acceptances`: từ chối sai và chấp nhận sai theo nhãn.
- `abstention_precision`, `abstention_recall`: độ chính xác và độ bao phủ từ chối; mẫu số bằng 0 trả `null`.

Kết quả qua ngưỡng ở `results`; ứng viên từ khóa chưa đủ chứng cứ nằm riêng ở `candidates`. Không tính ứng viên thành bằng chứng đã chấp nhận.

Bộ đánh giá hiện có 13 câu (7 có nguồn, 6 cần từ chối), thêm test chữ Đ, stopword và tài liệu gây nhiễu. Đây vẫn là tập hồi quy do dự án tự viết, chưa có tập kiểm định độc lập hay hiệu chuẩn ngưỡng. Các mẫu hỏi số liệu, giá, thời điểm và địa phương được chặn bảo thủ vì corpus không chứa dữ liệu đó; quy tắc này chưa hiểu ngữ nghĩa và có thể từ chối quá mức hoặc bỏ sót cách diễn đạt khác. Chưa đo citation correctness hay faithfulness.

## Bài tập nâng cao

- Thay truy xuất từ khóa bằng BM25 hoặc embeddings; so sánh trên tập câu hỏi do người đánh giá độc lập gán nhãn.
- Tách `retrieval recall`, `answer faithfulness`, `citation correctness` và `abstention precision`.
- Thử câu hỏi chứa phủ định, đồng nghĩa, tên địa phương và câu hỏi cần nhiều nguồn; phân tích lỗi.
- Lập hồ sơ nguồn: tác giả, ngày, phiên bản, quyền truy cập, giấy phép, retraction và mệnh đề được hỗ trợ.
- Đối với nông nghiệp, yêu cầu phân biệt tài liệu chuẩn (FAO56) với dữ liệu quan trắc và khuyến cáo cụ thể tại địa phương.

## Lời giải mẫu

**Vì sao truy xuất được nguồn chưa chứng minh câu trả lời đúng?** Vì liên kết có thể sai chủ đề, lỗi thời hoặc đoạn trích không hỗ trợ mệnh đề. Cần xác minh từng mệnh đề.

**Vì sao RAG nên từ chối khi thiếu chứng cứ?** Vì tạo câu trả lời tự tin không có bằng chứng có thể gây sai lệch, đặc biệt trong quyết định sản xuất nông nghiệp.

## Tài liệu gốc

- Lewis et al., *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks*, 2020: https://arxiv.org/abs/2005.11401
- scikit-learn, *Common pitfalls*: https://scikit-learn.org/stable/common_pitfalls.html
- ALLEA, *European Code of Conduct for Research Integrity*, 2023: https://doi.org/10.26356/ECOC

Tất cả ví dụ tiếng Việt do dự án tự viết. Chưa có kiểm định độc lập đối với toàn bộ diễn giải.

