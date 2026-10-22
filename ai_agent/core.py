"""HAI ĐẤT AI: local evidence retrieval + optional OpenAI-compatible remote API.
Python 3.10+, stdlib only. Offline mode NEVER calls external network.
This is not a trained local LLM: offline answers are evidence excerpts.
"""
import json
import os
import re
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MAX_QUERY = 1500
MAX_CONTEXT = 6000
STOP = {"và", "của", "trong", "là", "có", "cho", "các", "những", "nào", "thế", "nào", "một", "được", "không", "theo"}

def words(s):
    import unicodedata
    s = unicodedata.normalize("NFD", str(s).lower())
    s = "".join(c for c in s if unicodedata.category(c) != "Mn").replace("đ", "d")
    return set(x for x in re.findall(r"[a-z0-9]+", s) if len(x) >= 2 and x not in STOP)

def load_docs():
    path = ROOT / "versions" / "rag-corpus.json"
    docs = json.loads(path.read_text(encoding="utf-8"))
    return [d for d in docs if all(k in d for k in ("id", "title", "url", "text"))]

def retrieve(query, docs, limit=3):
    tokens = words(query)
    if not tokens:
        return []
    results = []
    for d in docs:
        overlap = tokens & words(d["title"] + " " + d["text"])
        if len(overlap) >= 2 and len(overlap)/len(tokens) >= 0.35:
            results.append((len(overlap)/len(tokens), len(overlap), d))
    results.sort(key=lambda x: (-x[0], -x[1], x[2]["id"]))
    return [d for _, _, d in results[:limit]]

def offline_answer(query, docs):
    found = retrieve(query, docs)
    if not found:
        return {"mode": "offline", "answer": "Chưa đủ bằng chứng trong kho tài liệu cục bộ. Vui lòng bổ sung nguồn hoặc chuyển sang online.", "sources": []}
    excerpts = "\n".join("- " + d["text"] for d in found)
    return {"mode": "offline", "answer": "Các đoạn kiến thức liên quan (chưa phải kết luận đã kiểm định):\n" + excerpts,
            "sources": [{"id": d["id"], "title": d["title"], "url": d["url"]} for d in found]}

def online_answer(query, docs, opener=None):
    key = os.environ.get("HAIDAT_API_KEY", "")
    model = os.environ.get("HAIDAT_MODEL", "")
    endpoint = os.environ.get("HAIDAT_API_URL", "https://api.openai.com/v1/chat/completions")
    if not key or not model:
        raise ValueError("Chưa cấu hình HAIDAT_API_KEY hoặc HAIDAT_MODEL")
    # Security: only allow HTTPS and exact trusted host, no arbitrary SSRF endpoints.
    if endpoint != "https://api.openai.com/v1/chat/completions":
        raise ValueError("HAIDAT_API_URL không được hỗ trợ trong bản an toàn V1")
    evidence = retrieve(query, docs)
    context = "\n".join(f"[{d['id']}] {d['title']}: {d['text']} URL: {d['url']}" for d in evidence)[:MAX_CONTEXT]
    system = ("Bạn là HAI ĐẤT AI, trợ lý học tập tiếng Việt. Không bịa nguồn hoặc dữ liệu thực nghiệm. "
              "Phân biệt thông tin chung với bằng chứng trong kho. Khi thiếu bằng chứng, nói rõ giới hạn. "
              "Không tự động ra quyết định tưới, bón phân hay kiểm định vùng trồng.")
    payload = {"model": model, "messages": [{"role": "system", "content": system},
             {"role": "user", "content": "Bằng chứng nội bộ (có thể thiếu):\n" + context + "\n\nCâu hỏi: " + query}],
             "temperature": 0.2}
    req = urllib.request.Request(endpoint, data=json.dumps(payload).encode("utf-8"),
          headers={"Content-Type": "application/json", "Authorization": "Bearer " + key}, method="POST")
    response = (opener or urllib.request.urlopen)(req, timeout=25)
    with response as r:
        body = r.read(300000)
    parsed = json.loads(body)
    answer = parsed["choices"][0]["message"]["content"]
    if not isinstance(answer, str):
        raise ValueError("Định dạng phản hồi không hợp lệ")
    return {"mode": "online", "answer": answer,
            "sources": [{"id": d["id"], "title": d["title"], "url": d["url"]} for d in evidence],
            "notice": "Phản hồi do mô hình trực tuyến sinh; các URL chỉ là tài liệu nội bộ được truy xuất, không chứng minh mọi mệnh đề."}

def respond(query, mode="auto", docs=None, opener=None):
    if not isinstance(query, str) or not query.strip() or len(query) > MAX_QUERY:
        raise ValueError("Câu hỏi phải có 1–1500 ký tự")
    if mode not in ("offline", "online", "auto"):
        raise ValueError("Chế độ không hợp lệ")
    docs = load_docs() if docs is None else docs
    if mode == "offline":
        return offline_answer(query, docs)
    if mode == "online":
        return online_answer(query, docs, opener=opener)
    # Auto may fall back, but never leak secrets or exception details to the client.
    if os.environ.get("HAIDAT_API_KEY") and os.environ.get("HAIDAT_MODEL"):
        try:
            return online_answer(query, docs, opener=opener)
        except (OSError, ValueError, KeyError, IndexError, json.JSONDecodeError):
            result = offline_answer(query, docs)
            result["notice"] = "Không dùng được dịch vụ online; đã chuyển sang truy xuất offline."
            return result
    return offline_answer(query, docs)
