import io
import json
import os
import unittest
from unittest.mock import patch
from core import words, retrieve, offline_answer, respond, online_answer, load_docs, local_llm_answer

class AgentTests(unittest.TestCase):
    def setUp(self):
        self.docs=load_docs()

    def test_offline_source(self):
        result=respond("ET0 và ETc khác nhau như thế nào?", "offline", self.docs)
        self.assertEqual(result["mode"],"offline")
        self.assertTrue(any(x["id"]=="FAO56-ET0-01" for x in result["sources"]))

    def test_offline_abstain(self):
        result=respond("Giá rau hôm nay ở chợ là bao nhiêu?", "offline", self.docs)
        self.assertEqual(result["sources"],[])
        self.assertIn("Chưa đủ bằng chứng",result["answer"])

    def test_no_network_in_offline(self):
        with patch("urllib.request.urlopen",side_effect=AssertionError("network")):
            respond("ET0 ETc Kc", "offline", self.docs)

    def test_validation(self):
        for q in ("", "x"*1501, None):
            with self.assertRaises(ValueError): respond(q,"offline",self.docs)
        with self.assertRaises(ValueError): respond("hello","invalid",self.docs)

    def test_auto_without_key(self):
        with patch.dict(os.environ,{"HAIDAT_API_KEY":"","HAIDAT_MODEL":""}):
            self.assertEqual(respond("ET0 ETc Kc","auto",self.docs)["mode"],"offline")

    def test_online_requires_key(self):
        with patch.dict(os.environ,{"HAIDAT_API_KEY":"","HAIDAT_MODEL":""}):
            with self.assertRaises(ValueError): respond("ET0 ETc Kc","online",self.docs)

    def test_online_mocked_api(self):
        class Response:
            def __enter__(self): return self
            def __exit__(self,*args): pass
            def read(self,n): return b'{"choices":[{"message":{"content":"Tra loi thu nghiem"}}]}'
        def fake_open(req,timeout):
            self.assertEqual(req.full_url,"https://api.openai.com/v1/chat/completions")
            self.assertEqual(timeout,25)
            self.assertTrue(req.get_header("Authorization").startswith("Bearer "))
            return Response()
        with patch.dict(os.environ,{"HAIDAT_API_KEY":"TEST_ONLY","HAIDAT_MODEL":"test-model"}):
            r=online_answer("ET0 ETc Kc",self.docs,opener=fake_open)
            self.assertEqual(r["mode"],"online")
            self.assertIn("Tra loi thu nghiem",r["answer"])

    def test_local_llm_mocked(self):
        class Response:
            def __enter__(self): return self
            def __exit__(self,*args): pass
            def read(self,n): return b'{"response":"Tra loi tu Ollama"}'
        def fake(req,timeout):
            self.assertEqual(req.full_url,"http://127.0.0.1:11434/api/generate")
            self.assertEqual(timeout,90)
            self.assertEqual(json.loads(req.data)["stream"],False)
            return Response()
        with patch.dict(os.environ,{"HAIDAT_LOCAL_MODEL":"test:0.5b"}):
            r=respond("ET0 ETc Kc","local_llm",self.docs,opener=fake)
            self.assertEqual(r["mode"],"local_llm")
            self.assertIn("Ollama",r["answer"])

    def test_local_missing_model(self):
        with patch.dict(os.environ,{"HAIDAT_LOCAL_MODEL":""}):
            with self.assertRaises(ValueError):
                respond("ET0 ETc Kc","local_llm",self.docs)

    def test_auto_local_fallback(self):
        def fail(req,timeout): raise OSError("Ollama unavailable")
        with patch.dict(os.environ,{"HAIDAT_API_KEY":"","HAIDAT_MODEL":"","HAIDAT_LOCAL_MODEL":"test:0.5b"}):
            r=respond("ET0 ETc Kc","auto",self.docs,opener=fail)
            self.assertEqual(r["mode"],"offline")
            self.assertIn("cục bộ",r["notice"])

    def test_auto_fallback(self):
        def fail(req,timeout): raise OSError("offline")
        with patch.dict(os.environ,{"HAIDAT_API_KEY":"TEST_ONLY","HAIDAT_MODEL":"test-model"}):
            r=respond("ET0 ETc Kc","auto",self.docs,opener=fail)
            self.assertEqual(r["mode"],"offline")
            self.assertIn("chuyển",r["notice"])

if __name__=="__main__":
    unittest.main()
