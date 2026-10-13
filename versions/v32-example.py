"""V3.2: ví dụ có thể tái lập, dữ liệu tổng hợp; không phải dữ liệu thực nghiệm."""
import numpy as np
from sklearn.dummy import DummyRegressor
from sklearn.linear_model import Ridge
from sklearn.metrics import mean_absolute_error
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

rng = np.random.default_rng(42)
X = rng.normal(size=(120, 3))
y = 2 * X[:, 0] - 0.5 * X[:, 1] + rng.normal(scale=0.2, size=120)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42
)
baseline = DummyRegressor(strategy="mean").fit(X_train, y_train)
model = make_pipeline(StandardScaler(), Ridge(alpha=1.0))
model.fit(X_train, y_train)
print("Baseline MAE:", round(mean_absolute_error(y_test, baseline.predict(X_test)), 4))
print("Model MAE:", round(mean_absolute_error(y_test, model.predict(X_test)), 4))
print("Dataset: synthetic, fixed random seed")
