"""Find the best plays from a Scrabble rack, then validate the whole play.

    python best_play.py aeiqrtz_        (_ is a blank tile)
"""

import sys

import requests

API = "https://wordsohard.com/api/v1"


def best_plays(rack: str, n: int = 10) -> list[dict]:
    r = requests.get(f"{API}/unscramble/{rack}", params={"sort": "score", "limit": n}, timeout=10)
    r.raise_for_status()  # 400 if the rack is too long for its blank count
    return r.json()["words"]


def play_is_legal(words: list[str]) -> bool:
    """One request checks the main word plus every cross-word it forms."""
    r = requests.get(f"{API}/check/" + ",".join(words), timeout=10)
    return r.json()["allValid"]


if __name__ == "__main__":
    rack = sys.argv[1] if len(sys.argv) > 1 else "aeiqrtz_"
    for w in best_plays(rack):
        print(f"{w['word']:<10} {w['score']:>3}")
    print("quiz + qi + za legal?", play_is_legal(["quiz", "qi", "za"]))
