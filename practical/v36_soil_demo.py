"""V3.6: mô hình dự báo độ ẩm đất từ dữ liệu GIẢ LẬP, chỉ dùng Python chuẩn.
Không sử dụng để điều khiển tưới thực tế. Đầu vào: 40 ngày liên tiếp.
Đánh giá theo thời gian, baseline trung bình huấn luyện và hồi quy tuyến tính.
"""
import math

def data():
    rows = []
    for day in range(40):
        rain = (day * 7) % 13
        evap = 2 + (day % 5)
        soil = 24 + 0.45 * rain - 0.7 * evap + 0.04 * day
        rows.append((day, rain, evap, soil))
    return rows

def solve3(a, b):
    a = [list(map(float, row)) + [float(y)] for row, y in zip(a, b)]
    for k in range(3):
        pivot = max(range(k, 3), key=lambda i: abs(a[i][k]))
        a[k], a[pivot] = a[pivot], a[k]
        if abs(a[k][k]) < 1e-12:
            raise ValueError("Ma trận suy biến")
        v = a[k][k]
        a[k] = [x / v for x in a[k]]
        for i in range(3):
            if i != k:
                factor = a[i][k]
                a[i] = [x - factor * y for x, y in zip(a[i], a[k])]
    return [row[3] for row in a]

def fit(train):
    xs = [(1., float(r), float(e)) for _, r, e, _ in train]
    ys = [float(s) for _, _, _, s in train]
    gram = [[sum(x[i] * x[j] for x in xs) for j in range(3)] for i in range(3)]
    target = [sum(x[i] * y for x, y in zip(xs, ys)) for i in range(3)]
    return solve3(gram, target)

def predict(coeff, row):
    _, rain, evap, _ = row
    return coeff[0] + coeff[1] * rain + coeff[2] * evap

def mae(actual, predicted):
    if len(actual) != len(predicted) or not actual:
        raise ValueError("Dữ liệu không hợp lệ")
    return sum(abs(a-b) for a,b in zip(actual,predicted)) / len(actual)

def evaluate():
    rows = data()
    train, test = rows[:30], rows[30:]
    assert max(r[0] for r in train) < min(r[0] for r in test)
    baseline = sum(r[3] for r in train) / len(train)
    coeff = fit(train)
    truth = [r[3] for r in test]
    baseline_mae = mae(truth, [baseline] * len(test))
    model_mae = mae(truth, [predict(coeff, r) for r in test])
    return baseline_mae, model_mae

if __name__ == "__main__":
    a, b = evaluate()
    print("Dữ liệu giả lập, không phải kết quả đồng ruộng")
    print(f"Baseline MAE: {a:.3f} | Model MAE: {b:.3f}")
