# Python

```bash
pip install requests
python define.py quixotic zax qi
python best_play.py quiz zax jinx qi fjord xyzzy
```

`define.py` prints validity, score, and meaning. `check_play()` is the function to drop into a game server. `best_play.py` ranks candidate plays and filters out non-words.

Use `requests` (or `httpx`) rather than the standard library's `urllib`, whose default user agent can be refused by Cloudflare.
