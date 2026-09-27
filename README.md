# WordSoHard API Examples

Copy-and-run examples for the [WordSoHard Word Game Dictionary API](https://wordsohard.com/api): a free, keyless, CORS-enabled API that returns a word's **definition, Scrabble validity, and tile score in one call**.

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
| [`python/`](python) | Validate plays and score a list of words | Python |
| [`google-sheets/`](google-sheets) | A `=DEFINE(A2)` formula for vocabulary sheets | Google Apps Script |
| [`embed/`](embed) | A styled definition card with zero code | HTML |
| [`crossword/`](crossword) | Check a crossword fill list for non-words | Node.js |
| [`curl/`](curl) | One-liners for the terminal and shell scripts | curl + jq |

## The API in 30 seconds

- **Endpoint:** `GET https://wordsohard.com/api/v1/define/{word}` (2-30 letters, a-z)
- **Misses are not errors:** a word we do not have returns HTTP 200 with `"found": false`. The `scrabble` object is always present, so validity and score work for any input.
- **Score:** `scrabble.score` is the base tile sum. Premium squares depend on the board, so apply them in your own game logic.
- **Dictionary:** validity comes from the WordSoHard Word List, about 257,000 words from public-domain sources. It is not the official Collins or NASPA tournament list.
- **Spec:** an OpenAPI 3.1 description lives at [wordsohard.com/openapi.json](https://wordsohard.com/openapi.json), mirrored in this repo as [`openapi.json`](openapi.json). Import it into Postman or Insomnia, or generate a typed client.
- **Fair use:** please stay under roughly 60 requests per minute per IP, and cache results you reuse.

## Attribution

The API is free for personal and commercial use. The one condition: show the `attribution` string, or a link to [wordsohard.com](https://wordsohard.com), wherever the definitions appear. The embed widget does this for you.

The example code in this repository is MIT licensed. Use it however you like.

## Contributing

Built something with the API? Open a pull request that adds your example in its own folder, or an issue with a link to your project.
