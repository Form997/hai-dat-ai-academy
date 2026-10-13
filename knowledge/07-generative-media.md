# 07. AI tạo ảnh, nhạc và video: nguyên lý và đánh giá

**Mức độ:** Chuyên sâu · **Ngày đối chiếu:** 2026-10-13 · **Trạng thái:** Nội dung giảng dạy dẫn nguồn, chưa thay thế thực nghiệm độc lập.

## Mục tiêu đầu ra

Sau khi học, người đọc phải diễn giải các khái niệm cốt lõi, hoàn thành bài thực hành và cung cấp bằng chứng kiểm tra sản phẩm của mình.

## Nội dung học

### 1. Diffusion và ảnh

Denoising diffusion học quá trình khử nhiễu để sinh mẫu; chất lượng phụ thuộc dữ liệu, thuật toán lấy mẫu, hướng dẫn điều kiện và độ phân giải. Không phải mọi mô hình tạo ảnh đều có kiến trúc giống nhau.

### 2. Âm nhạc và văn bản

MusicLM nghiên cứu tạo nhạc từ mô tả văn bản, nhưng công trình nghiên cứu không đồng nghĩa có dịch vụ API công khai miễn phí. Bản quyền dữ liệu và điều kiện phát hành trọng số cần kiểm tra riêng.

### 3. Video và tính nhất quán

Video cần đánh giá chuyển động, nhịp thời gian, lỗi hình học, tính nhất quán nhân vật và nguồn tư liệu. VideoLDM là một ví dụ công trình tạo video dựa trên mô hình khuếch tán tiềm ẩn.

## Bài thực hành có đầu ra

Tạo bộ rubric 5 chỉ tiêu cho từng loại ảnh/nhạc/video: độ bám prompt, lỗi kỹ thuật, tính nhất quán, quyền sử dụng, chi phí. Đánh giá độc lập 3 lần tạo; ghi mô hình, phiên bản và seed nếu khả dụng.

## Câu hỏi và tiêu chí tự đánh giá

1. Phân biệt bài báo học thuật với API thương mại.
2. Không khẳng định miễn phí vô hạn nếu chưa có chính sách.
3. Ghi được ít nhất 3 lỗi video có thể kiểm chứng.

## Nguồn gốc để đối chiếu

1. https://arxiv.org/abs/2006.11239
2. https://arxiv.org/abs/2301.11325
3. https://arxiv.org/abs/2301.12503

**Ghi chú học thuật:** Các đoạn diễn giải và bài tập do dự án tự biên soạn. Mọi kết quả đo hay cam kết dịch vụ phải được kiểm nghiệm lại trong điều kiện sử dụng thực tế.
