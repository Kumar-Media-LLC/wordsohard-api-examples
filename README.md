# WordSoHard API Examples

Copy-and-run examples for the [WordSoHard Word Game API](https://wordsohard.com/api): a free, keyless, CORS-enabled API for word games. Three endpoints:

| Endpoint | What it does |
|---|---|
| `GET /api/v1/define/{word}` | Definition, Scrabble validity, and tile score in one call |
| `GET /api/v1/check/{words}` | Scrabble word checker for up to 20 comma-separated words |
| `GET /api/v1/unscramble/{letters}` | Every playable word from a rack, blanks included, plus anagrams |

Base URL: `https://wordsohard.com`

```bash
curl https://wordsohard.com/api/v1/define/quixotic
```

```json
{
  "word": "quixotic",
  "found": true,
  "phonetic": "/kwɪksˈɑtɪk/",
  "partOfSpeech": "adjective",
  "definitions": [
    {
      "partOfSpeech": "adjective",
      "definition": "Romantically idealistic in a way that ignores practical realities or likely consequences."
    }
  ],
  "scrabble": { "valid": true, "score": 26, "bingo": true },
  "source": "wordsohard",
  "attribution": "Definitions by WordSoHard (https://wordsohard.com)",
  "license": "Free to use with attribution to wordsohard.com"
}
```

No API key, no signup, no SDK. Any HTTP client works.

## Examples

| Folder | What it shows | Language |
|---|---|---|
| [`javascript/`](javascript) | Look up a word with plain `fetch` (browser or Node 18+) | JavaScript |
| [`discord-bot/`](discord-bot) | A `!define` / `!score` bot for your server | Node.js (discord.js) |
| [`python/`](python) | Look up words, validate a play, and find the best plays from a rack | Python |
| [`google-sheets/`](google-sheets) | A `=DEFINE(A2)` formula for vocabulary sheets | Google Apps Script |
| [`embed/`](embed) | A styled definition card with zero code | HTML |
| [`crossword/`](crossword) | Check a crossword fill list for non-words, 20 at a time | Node.js |
| [`curl/`](curl) | One-liners for all three endpoints | curl + jq |

## The API in 30 seconds

- **define:** `GET /api/v1/define/{word}` (2-30 letters). A word we do not have returns HTTP 200 with `"found": false`; the `scrabble` object is always present.
- **check:** `GET /api/v1/check/qi,za,xyzzy` validates up to 20 words at once. `allValid` tells you whether a whole play (main word plus cross-words) is legal.
- **unscramble:** `GET /api/v1/unscramble/aeinst_?sort=score&limit=20`. Use `_` or `*` for a blank tile. Racks can be up to 12 tiles with no blanks, 10 with one, 8 with two. Blanks score zero, the way the game does. `anagrams` lists the words that use every tile.
- **Scores** are base tile sums. Premium squares depend on the board, so apply them in your own game logic.
- **Dictionary:** validity comes from the WordSoHard Word List, about 257,000 words from public-domain sources. It is not the official Collins or NASPA tournament list.
- **Errors:** bad input returns HTTP 400 with an `error` message.
- **Spec:** an OpenAPI 3.1 description lives at [wordsohard.com/openapi.json](https://wordsohard.com/openapi.json), mirrored in this repo as [`openapi.json`](openapi.json).
- **Fair use:** please stay under roughly 60 requests per minute per IP, and cache results you reuse.

## Attribution

The API is free for personal and commercial use. The one condition: show the `attribution` string, or a link to [wordsohard.com](https://wordsohard.com), wherever the definitions appear. The embed widget does this for you.

The example code in this repository is MIT licensed. Use it however you like.

## Contributing

Built something with the API? Open a pull request that adds your example in its own folder, or an issue with a link to your project.
