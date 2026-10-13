# 08. Quản trị rủi ro AI và vận hành

**Mức độ:** Chuyên sâu · **Ngày đối chiếu:** 2026-10-13 · **Trạng thái:** Nội dung giảng dạy dẫn nguồn, chưa thay thế thực nghiệm độc lập.

## Mục tiêu đầu ra

Sau khi học, người đọc phải diễn giải các khái niệm cốt lõi, hoàn thành bài thực hành và cung cấp bằng chứng kiểm tra sản phẩm của mình.

## Nội dung học

### 1. Quản trị vòng đời

NIST AI RMF 1.0 nêu bốn chức năng govern, map, measure, manage. Đây là khuôn khổ tự nguyện, không phải chứng nhận hệ thống đã an toàn.

### 2. Bảo mật API

Theo dõi phân quyền, giới hạn request, tính hợp lệ dữ liệu và truy cập tài nguyên. Tránh đưa token, prompt nhạy cảm hoặc thông tin định danh vào logs công khai.

### 3. Vận hành và phản hồi

Theo dõi độ trễ, tỷ lệ lỗi, chi phí trên tác vụ, kết quả ngoài mong đợi và quy trình báo cáo sự cố. Với hệ thống trả lời chuyên ngành, hỗ trợ từ chối khi thiếu nguồn.

## Bài thực hành có đầu ra

Lập bảng rủi ro gồm nguy cơ, xác suất/ảnh hưởng, tín hiệu phát hiện, chủ trách nhiệm và hành động giảm thiểu cho một AI Studio công khai.

## Câu hỏi và tiêu chí tự đánh giá

1. Mỗi rủi ro có biện pháp và người phụ trách.
2. Có ngưỡng quota và cách khóa API khi lộ.
3. Nêu hạn chế của khung NIST trong từng bối cảnh.

## Nguồn gốc để đối chiếu

1. https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10
2. https://airc.nist.gov/airmf-resources/airmf/5-sec-core/
3. https://owasp.org/API-Security/

**Ghi chú học thuật:** Các đoạn diễn giải và bài tập do dự án tự biên soạn. Mọi kết quả đo hay cam kết dịch vụ phải được kiểm nghiệm lại trong điều kiện sử dụng thực tế.
