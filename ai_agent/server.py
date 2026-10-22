"""Localhost-only web server for HAI ĐẤT AI. No cloud or telemetry by default."""
import json
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit
try:
    from .core import respond
except ImportError:
    from core import respond

BASE = Path(__file__).resolve().parent
MAX_BODY = 8192
class Handler(BaseHTTPRequestHandler):
    def _send(self, code, obj):
        data = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.end_headers()
        self.wfile.write(data)
    def do_GET(self):
        route = urlsplit(self.path).path
        if route == "/":
            data = (BASE / "index.html").read_bytes()
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(data)))
            self.send_header("X-Content-Type-Options", "nosniff")
            self.end_headers()
            self.wfile.write(data)
        elif route == "/health":
            self._send(200, {"status": "ok", "local_only": True})
        else:
            self._send(404, {"error": "Không tìm thấy"})
    def do_POST(self):
        if urlsplit(self.path).path != "/api/chat":
            return self._send(404, {"error": "Không tìm thấy"})
        # Block cross-origin browser calls. Requests without Origin (CLI) are allowed.
        origin = self.headers.get("Origin")
        if origin not in (None, "http://127.0.0.1:8765", "http://localhost:8765"):
            return self._send(403, {"error": "Origin không được phép"})
        try:
            n = int(self.headers.get("Content-Length", "0"))
            if n <= 0 or n > MAX_BODY:
                return self._send(413, {"error": "Nội dung quá dài hoặc rỗng"})
            body = json.loads(self.rfile.read(n))
            if not isinstance(body, dict):
                raise ValueError("Dữ liệu không hợp lệ")
            result = respond(body.get("question"), body.get("mode", "auto"))
            return self._send(200, result)
        except (ValueError, TypeError, json.JSONDecodeError):
            return self._send(400, {"error": "Yêu cầu không hợp lệ hoặc chưa cấu hình online"})
        except Exception:
            return self._send(502, {"error": "Dịch vụ online gặp lỗi. Hãy chọn offline hoặc auto."})
if __name__ == "__main__":
    print("HAI ĐẤT AI: http://127.0.0.1:8765 (chỉ truy cập từ máy này)")
    ThreadingHTTPServer(("127.0.0.1", 8765), Handler).serve_forever()
