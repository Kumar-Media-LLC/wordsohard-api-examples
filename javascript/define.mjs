// Look up a word with the WordSoHard API. Works in Node 18+ and in the browser.
//
//   node define.mjs quixotic

const API = "https://wordsohard.com/api/v1/define/";

export async function define(word) {
  const res = await fetch(API + encodeURIComponent(word));
  if (!res.ok) throw new Error(`HTTP ${res.status}`); // only 400 for bad input
  return res.json();
}

const word = process.argv[2] ?? "quixotic";
const d = await define(word);

console.log(`${d.word.toUpperCase()}: ${d.scrabble.valid ? "valid" : "not valid"}, ${d.scrabble.score} points${d.scrabble.bingo ? " (bingo)" : ""}`);
if (d.found) {
  for (const sense of d.definitions) {
    console.log(`  (${sense.partOfSpeech ?? "?"}) ${sense.definition}`);
  }
} else {
  console.log("  No definition yet.");
}
console.log(d.attribution);
