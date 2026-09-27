# Crossword fill checker

Run your fill list through the API before you commit to a grid. It flags entries that are not dictionary words and prints a definition to start each clue from.

```bash
node check-fill.mjs fill.txt
```

```
ok   ETUI         A small ornamental bag or pouch for carrying personal items.
ok   ALOE         A fleshy-leaved succulent plant valued for its medicinal gel.
BAD  OREO
...
```

Brand names, proper nouns, and multi-word phrases show as BAD because the word list does not include them. That is often fine in a crossword; the flag is a prompt to double-check, not a verdict. Requests run one at a time to stay within fair use.
