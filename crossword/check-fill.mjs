// Check a crossword fill list: flag entries that are not dictionary words and
// print a starting definition for each clue. Node 18+, no dependencies.
//
//   node check-fill.mjs fill.txt       (one entry per line)
//   node check-fill.mjs                (uses the sample list below)

import { readFile } from "node:fs/promises";

const API = "https://wordsohard.com/api/v1/define/";
const sample = ["etui", "aloe", "oreo", "erne", "asea", "xyzzy"];

const file = process.argv[2];
const fill = file
  ? (await readFile(file, "utf8")).split(/\s+/).filter(Boolean)
  : sample;

let bad = 0;
for (const entry of fill) {
  const res = await fetch(API + encodeURIComponent(entry));
  const d = res.ok ? await res.json() : null;
  const ok = d?.scrabble.valid;
  if (!ok) bad++;
  const hint = d?.definitions[0]?.definition ?? "";
  console.log(`${ok ? "ok " : "BAD"}  ${entry.toUpperCase().padEnd(12)} ${hint}`);
}

console.log(`\n${fill.length - bad}/${fill.length} entries are dictionary words.`);
if (bad) console.log("BAD entries may still be fine as proper nouns or phrases; check them by hand.");
