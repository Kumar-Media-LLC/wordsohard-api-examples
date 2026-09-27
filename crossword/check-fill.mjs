// Check a crossword fill list: flag entries that are not dictionary words and
// print a starting definition for each clue. Node 18+, no dependencies.
//
//   node check-fill.mjs fill.txt       (one entry per line)
//   node check-fill.mjs                (uses the sample list below)

import { readFile } from "node:fs/promises";

const API = "https://wordsohard.com/api/v1";
const sample = ["etui", "aloe", "oreo", "erne", "asea", "xyzzy"];

const file = process.argv[2];
const fill = file
  ? (await readFile(file, "utf8")).split(/\s+/).filter(Boolean)
  : sample;

// /check validates 20 entries per request.
const results = [];
for (let i = 0; i < fill.length; i += 20) {
  const res = await fetch(`${API}/check/` + fill.slice(i, i + 20).map(encodeURIComponent).join(","));
  results.push(...(await res.json()).results);
}

// Pull a clue starting point for the entries that passed.
for (const r of results) {
  let hint = "";
  if (r.valid) {
    const d = await (await fetch(`${API}/define/${r.word}`)).json();
    hint = d.definitions[0]?.definition ?? "";
  }
  console.log(`${r.valid ? "ok " : "BAD"}  ${r.word.toUpperCase().padEnd(12)} ${hint}`);
}

const bad = results.filter((r) => !r.valid).length;
console.log(`\n${results.length - bad}/${results.length} entries are dictionary words.`);
if (bad) console.log("BAD entries may still be fine as proper nouns or phrases; check them by hand.");
