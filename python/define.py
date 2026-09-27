"""Look up words with the WordSoHard API.

    pip install requests
    python define.py quixotic zax qi
"""

import sys

import requests

API = "https://wordsohard.com/api/v1/define/"


def define(word: str) -> dict:
    r = requests.get(API + word, timeout=10)
    r.raise_for_status()  # only 400, for input outside 2-30 letters
    return r.json()


def check_play(word: str) -> tuple[bool, int]:
    """Server-side move validation for a word game."""
    s = define(word)["scrabble"]
    return s["valid"], s["score"]


if __name__ == "__main__":
    for word in sys.argv[1:] or ["quixotic"]:
        d = define(word)
        s = d["scrabble"]
        status = f"valid, {s['score']} pts" if s["valid"] else "not valid"
        meaning = d["definitions"][0]["definition"] if d["found"] else "(no definition yet)"
        print(f"{d['word']:<12} {status:<16} {meaning}")
    print(d["attribution"])
