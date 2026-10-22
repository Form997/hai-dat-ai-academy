"""Kiểm tra chất lượng CSV đo độ ẩm đất, không huấn luyện mô hình.
Chỉ dùng Python chuẩn; không gửi dữ liệu lên mạng.
CSV: date,soil_moisture_pct,rain_mm,et0_mm
Ngày ISO YYYY-MM-DD; phần trăm độ ẩm là VWC 0-100%, KHÔNG phải ngưỡng tưới.
"""
import argparse
import csv
import datetime as dt
import json
import math
from pathlib import Path

FIELDS = ("date", "soil_moisture_pct", "rain_mm", "et0_mm")

def audit(path):
    problems = []
    records = []
    seen = set()
    previous = None
    with open(path, newline="", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        if reader.fieldnames is None or any(k not in reader.fieldnames for k in FIELDS):
            return {"status": "fail", "rows": 0, "problems": ["Thiếu cột bắt buộc: " + ", ".join(FIELDS)]}
        for line, row in enumerate(reader, start=2):
            if None in row:
                problems.append(f"Dòng {line}: thừa cột")
                continue
            try:
                day = dt.date.fromisoformat((row["date"] or "").strip())
                vals = [float((row[k] or "").strip()) for k in FIELDS[1:]]
                if not all(math.isfinite(x) for x in vals):
                    raise ValueError("giá trị không hữu hạn")
            except (ValueError, TypeError, AttributeError) as exc:
                problems.append(f"Dòng {line}: ngày hoặc số không hợp lệ ({exc})")
                continue
            moisture, rain, et0 = vals
            if not 0 <= moisture <= 100:
                problems.append(f"Dòng {line}: độ ẩm ngoài 0-100%")
            if rain < 0 or et0 < 0:
                problems.append(f"Dòng {line}: mưa hoặc ET0 âm")
            if day in seen:
                problems.append(f"Dòng {line}: trùng ngày {day}")
            if previous is not None and day <= previous:
                problems.append(f"Dòng {line}: ngày không tăng dần")
            if previous is not None and (day - previous).days > 1:
                problems.append(f"Dòng {line}: thiếu {(day-previous).days-1} ngày trước {day}")
            seen.add(day)
            previous = day
            records.append({"date": day.isoformat(), "soil_moisture_pct": moisture,
                            "rain_mm": rain, "et0_mm": et0})
    if not records:
        problems.append("Không có dòng dữ liệu hợp lệ")
    return {"status": "pass" if not problems else "fail",
            "rows": len(records), "problems": problems,
            "date_start": records[0]["date"] if records else None,
            "date_end": records[-1]["date"] if records else None}

def main():
    parser = argparse.ArgumentParser(description="Kiểm định cấu trúc dữ liệu độ ẩm đất")
    parser.add_argument("csv_path", type=Path)
    parser.add_argument("--output", type=Path, help="Ghi báo cáo JSON")
    args = parser.parse_args()
    result = audit(args.csv_path)
    payload = json.dumps(result, ensure_ascii=False, indent=2)
    if args.output:
        args.output.write_text(payload + "\n", encoding="utf-8")
    print(payload)
    return 0 if result["status"] == "pass" else 1

if __name__ == "__main__":
    raise SystemExit(main())
