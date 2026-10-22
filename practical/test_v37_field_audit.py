import csv
import tempfile
import unittest
from pathlib import Path
from v37_field_audit import audit

class FieldAuditTests(unittest.TestCase):
    def check(self, rows, headers=None):
        with tempfile.TemporaryDirectory() as d:
            p = Path(d) / "test.csv"
            with p.open("w", newline="", encoding="utf-8") as f:
                w = csv.writer(f)
                w.writerow(headers or ["date", "soil_moisture_pct", "rain_mm", "et0_mm"])
                w.writerows(rows)
            return audit(p)

    def test_valid(self):
        r = self.check([["2026-10-01", "25", "0", "3.1"], ["2026-10-02", "26", "2", "3"]])
        self.assertEqual(r["status"], "pass")
        self.assertEqual(r["rows"], 2)

    def test_duplicate_and_gap(self):
        r = self.check([["2026-10-01", "25", "0", "3"], ["2026-10-01", "25", "0", "3"],
                        ["2026-10-04", "25", "0", "3"]])
        self.assertEqual(r["status"], "fail")
        self.assertTrue(any("trùng ngày" in x for x in r["problems"]))
        self.assertTrue(any("thiếu" in x for x in r["problems"]))

    def test_bad_values(self):
        r = self.check([["2026-10-01", "101", "-1", "NaN"], ["bad", "x", "1", "2"]])
        self.assertEqual(r["status"], "fail")
        self.assertEqual(r["rows"], 0)
    
    def test_range(self):
        r = self.check([["2026-10-01", "-0.1", "-2", "2"]])
        self.assertEqual(r["status"], "fail")
        self.assertGreaterEqual(len(r["problems"]), 2)

    def test_missing_header(self):
        r = self.check([], ["date", "soil_moisture_pct"])
        self.assertEqual(r["status"], "fail")

    def test_empty(self):
        self.assertEqual(self.check([])["status"], "fail")

if __name__ == "__main__":
    unittest.main()
