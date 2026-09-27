# curl one-liners

**Look up a word:**

```bash
curl -s https://wordsohard.com/api/v1/define/zax
```

**Just the parts you want, with [jq](https://jqlang.org):**

```bash
curl -s https://wordsohard.com/api/v1/define/zax \
  | jq '{word, valid: .scrabble.valid, score: .scrabble.score, meaning: .definitions[0].definition}'
```

**Is it a valid play?** (exit code 0 if yes, 1 if no, handy in scripts):

```bash
curl -s https://wordsohard.com/api/v1/define/qi | jq -e '.scrabble.valid' > /dev/null && echo yes || echo no
```

**A shell function for your `.zshrc` or `.bashrc`:**

```bash
define() {
  curl -s "https://wordsohard.com/api/v1/define/$1" | jq -r '
    "\(.word | ascii_upcase): \(if .scrabble.valid then "\(.scrabble.score) pts" else "not valid" end)",
    (.definitions[] | "  (\(.partOfSpeech)) \(.definition)")'
}
```

```
$ define serendipity
SERENDIPITY: 17 pts
  (noun) The faculty of making fortunate discoveries by accident or luck.
```
