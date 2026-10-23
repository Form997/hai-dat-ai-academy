# V3.8 — Kiểm định truy hồi và tính toàn vẹn dẫn chứng

Phòng thực hành chạy offline trên 5 **đoạn diễn giải tự biên soạn** có URL nguồn. Không gọi LLM, không mở trang nguồn tại thời điểm truy vấn. Đây là mô-đun riêng với HAI ĐẤT AI/Ollama. Kết quả `evidence_found` chỉ thể hiện qua ngưỡng trùng từ khóa và phạm vi mẫu, chưa chứng minh câu trả lời đúng.

## Kiến trúc

- `versions/rag-core.js`: dùng được trong Node và trình duyệt; chuẩn hóa tiếng Việt, giữ phủ định, kiểm tra schema/ID/HTTPS, truy hồi lexical hoặc BM25, quyết định phạm vi và đánh giá.
- `versions/rag-corpus.json`: 5 nguồn mẫu, `capabilities` khai báo phạm vi. `provenance.review_status` ghi rõ chưa kiểm định độc lập; vị trí trích dẫn và ngày kiểm tra chưa có thì để `null`, không tự điền.
- `versions/rag-eval.json`: 13 ca hồi quy phát triển (7 có nguồn, 6 cần từ chối).
- `versions/rag-benchmark.json`: 16 ca thách thức (8 có nguồn, 8 cần từ chối), thêm 8 tài liệu nhiễu tổng hợp. Các mục `SYNTH-*` chỉ dành cho đánh giá, không tải lên giao diện như nguồn học thuật.
- `versions/rag.js`: xác thực corpus trước khi cho tìm kiếm; ứng viên chưa đủ chứng cứ không hiển thị thành bằng chứng; tỷ lệ trùng từ khóa không được gọi là độ tin cậy.

## Chạy và tái lập

Dùng Node.js 20 trở lên, không cần cài npm dependency:

```bash
node tests/rag-evidence.cjs
node tests/rag-ui.cjs
node tests/rag-mutations.cjs
node tests/rag-benchmark.cjs > rag-benchmark-report.json
```

Báo cáo JSON lưu phiên bản Node, SHA-256 của mã/corpus/tập câu hỏi, từng kết quả, kết quả theo nhóm, so sánh lexical/BM25 ở k=1,3,5. Sweep ngưỡng 0.3/0.5/0.7/0.9 chỉ chạy trên tập phát triển; không tự chọn ngưỡng từ tập thách thức. CI lưu báo cáo thành artifact. DOM harness kiểm tra hành vi bằng mô phỏng; chưa kiểm tra bố cục hoặc khác biệt giữa trình duyệt thật.

## Tách truy hồi khỏi chấp nhận bằng chứng

`search(docs, query, k, method)` trả ứng viên được xếp hạng. `answer()` trả:

- `results`: đoạn đạt ngưỡng hiện hành.
- `candidates`: ứng viên truy hồi, kể cả khi từ chối.
- `reason`: `empty_query`, `no_match`, `low_overlap`, `unsupported_scope`, hoặc `lexical_match_only`.
- `requirements`: loại nhu cầu nhận biết được (định lượng, cập nhật, địa phương).

Ngưỡng mặc định: ít nhất 2 token trùng, độ phủ 50%. Bộ nhận dạng yêu cầu dựa trên biểu thức từ ngữ, **không phải hiểu ngữ nghĩa**; có thể bỏ sót cách hỏi khác hoặc từ chối quá mức. Nguồn chỉ có năng lực `concept` không được dùng cho yêu cầu định lượng/cập nhật/địa phương nhận biết được. Thêm nhãn năng lực không tự chứng minh tài liệu thật sự hỗ trợ yêu cầu; cần người duyệt. Phủ định được giữ lại nhưng chưa có suy luận mâu thuẫn hay kiểm tra entailment.

## Định nghĩa chỉ số

Nhãn `relevant_ids` cho phép nhiều nguồn đúng; `expected_id` cũ vẫn đọc được. Nhãn thiếu, ID trùng hoặc nguồn không tồn tại làm đánh giá báo lỗi.

| Chỉ số | Định nghĩa |
|---|---|
| Hit@k | Tỷ lệ câu có ít nhất một nguồn đúng trong top-k |
| Recall@k | Trung bình số nguồn đúng tìm được / tổng nguồn đúng của mỗi câu |
| Precision@k | Trung bình số nguồn đúng tìm được / k; vị trí trống tính là không liên quan |
| MRR@k | Nghịch đảo thứ hạng nguồn đúng đầu tiên, không tìm thấy tính 0 |
| nDCG@k | DCG chuẩn hóa với relevance nhị phân; chưa có nhãn mức độ liên quan |
| Complete evidence rate | Tỷ lệ câu có toàn bộ nguồn đúng trong `results` đã chấp nhận |
| False acceptance/refusal | Số câu cần từ chối nhưng được nhận / có nguồn nhưng bị từ chối |
| Abstention precision | Từ chối đúng / tổng số từ chối |
| Abstention recall | Từ chối đúng / tổng câu cần từ chối |

Chỉ số truy hồi chỉ tính trên câu có nhãn nguồn. Chỉ số không có mẫu số trả `null`, không biến thành 0 hay 100%. Khoảng Wilson 95% cho Hit và abstention recall phản ánh kích thước mẫu nhỏ; các câu tự biên soạn tương quan nên không được diễn giải như bảo đảm thống kê ngoài thực tế.

## Kiểm tra trích dẫn: phạm vi chính xác

`checkCitations(docs, [{doc_id, url, quote}])` kiểm tra ID tồn tại, URL khớp và đoạn quote xuất hiện nguyên văn trong **bản diễn giải nội bộ**. Phát hiện ID/URL/đoạn trích bịa hoặc rỗng. Chưa kiểm tra mệnh đề có được suy ra từ đoạn trích, tính xác thực tài liệu từ xa, hiệu lực phiên bản hay việc trích dẫn đã bao phủ mọi mệnh đề.

Không trình bày kết quả này như citation correctness hoặc faithfulness của LLM. Muốn nâng lên mức đó cần đoạn gốc có vị trí, tác giả/phiên bản, đánh giá hỗ trợ từng mệnh đề và người gán nhãn độc lập.

## Kết quả và lỗi còn lại

Tập hồi quy 13 ca đạt với ngưỡng mặc định. Bốn mutation có chủ ý đều bị test phát hiện: hỏng chữ Đ, luôn từ chối, luôn chấp nhận và nhận quote bịa.

Trên tập thách thức 16 ca với 13 tài liệu, ở k=5 cả lexical và BM25 hiện có Recall=1; nhưng **vẫn 1 từ chối sai và 1 chấp nhận sai**, complete evidence rate=7/8. Câu diễn đạt lại về giữ kín thông tin đăng nhập bị từ chối; câu hỏi hệ số Kc cho giống AL2 được nhận dù thiếu thông tin giống. Báo cáo giữ nguyên các lỗi này, không sửa nhãn để làm đẹp điểm. BM25 chưa chứng minh cải thiện trên tập nhỏ này.

Tập thách thức do cùng dự án soạn và đã được xem trong quá trình phát triển; **không gọi là holdout độc lập**. Chưa có dữ liệu người dùng, nguồn xung đột/thu hồi, kiểm định theo chuyên ngành hoặc đánh giá LLM. Bước tiếp theo là thu thập nhãn độc lập, đánh giá entailment/độ đầy đủ bằng chứng, và dùng nguồn thực nghiệm phù hợp trước mọi khuyến cáo tưới/bón tại địa phương.

## Nguồn để người học đối chiếu

- Lewis et al. (2020), RAG: https://arxiv.org/abs/2005.11401
- scikit-learn, tránh rò rỉ khi đánh giá: https://scikit-learn.org/stable/common_pitfalls.html
- ALLEA (2023), liêm chính nghiên cứu: https://doi.org/10.26356/ECOC
