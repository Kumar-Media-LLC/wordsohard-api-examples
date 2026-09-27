# Python

```bash
pip install requests
python define.py quixotic zax qi
python best_play.py aeiqrtz_
```

`define.py` prints validity, score, and meaning. `check_play()` is the function to drop into a game server. `best_play.py` finds the highest-scoring words from a rack (blanks as `_`, scored as zero) and shows how `/check` validates a whole play in one request.

Use `requests` (or `httpx`). If you use the standard library's `urllib`, set a `User-Agent` header: its default one is refused by Cloudflare.
