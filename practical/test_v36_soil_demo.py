import unittest
from v36_soil_demo import data, fit, predict, mae, evaluate

class SoilDemoTests(unittest.TestCase):
    def test_chronological_split(self):
        rows = data()
        self.assertEqual(len(rows), 40)
        self.assertLess(rows[29][0], rows[30][0])

    def test_training_only(self):
        rows = data()
        a = fit(rows[:30])
        changed = list(rows)
        changed[30:] = [(d,r,e,9999.0) for d,r,e,_ in rows[30:]]
        b = fit(changed[:30])
        self.assertEqual(a,b)

    def test_metrics(self):
        self.assertEqual(mae([1,3],[2,4]), 1)
        a,b = evaluate()
        self.assertTrue(a >= 0 and b >= 0)
        self.assertLess(b,a)

    def test_model(self):
        coeff = fit(data()[:30])
        self.assertEqual(len(coeff),3)
        self.assertIsInstance(predict(coeff,data()[31]),float)

if __name__ == "__main__":
    unittest.main()
