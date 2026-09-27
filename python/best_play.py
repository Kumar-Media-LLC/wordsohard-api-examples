"""Rank candidate plays by score, dropping anything that is not a valid word.

    python best_play.py quiz zax jinx qi fjord xyzzy
"""

import sys
from concurrent.futures import ThreadPoolExecutor

import requests

API = "https://wordsohard.com/api/v1/define/"


def scrabble(word: str) -> dict:
    return requests.get(API + word, timeout=10).json()["scrabble"] | {"word": word}


if __name__ == "__main__":
    words = sys.argv[1:] or ["quiz", "zax", "jinx", "qi", "fjord", "xyzzy"]
    # A few parallel requests are fine; stay well under ~60/minute.
    with ThreadPoolExecutor(max_workers=4) as pool:
        results = list(pool.map(scrabble, words))

    valid = sorted((r for r in results if r["valid"]), key=lambda r: -r["score"])
    for r in valid:
        print(f"{r['word']:<10} {r['score']:>3}")
    rejected = [r["word"] for r in results if not r["valid"]]
    if rejected:
        print("not valid:", ", ".join(rejected))
