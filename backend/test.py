import requests

resp = requests.post("http://127.0.0.1:5000/api/ladder", json={"start": "bat", "end": "tea"})
print(resp.json())




