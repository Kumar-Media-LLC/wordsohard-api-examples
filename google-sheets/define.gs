/**
 * WordSoHard formulas for Google Sheets.
 *
 *   =DEFINE(A2)       the first definition of the word in A2
 *   =WORDSCORE(A2)    its Scrabble tile score, or "not valid"
 *
 * Install: Extensions > Apps Script, paste this file, save.
 */

const WSH_API = "https://wordsohard.com/api/v1/define/";

function wshLookup_(word) {
  const w = String(word || "").trim();
  if (!w) return null;
  const cache = CacheService.getScriptCache();
  const hit = cache.get(w.toLowerCase());
  if (hit) return JSON.parse(hit);

  const res = UrlFetchApp.fetch(WSH_API + encodeURIComponent(w), { muteHttpExceptions: true });
  if (res.getResponseCode() !== 200) return null;
  const text = res.getContentText();
  cache.put(w.toLowerCase(), text, 21600); // 6 hours, so re-opening the sheet is instant
  return JSON.parse(text);
}

/**
 * Returns the first WordSoHard definition of a word.
 * @param {string} word The word to define.
 * @return The definition, or "(not found)".
 * @customfunction
 */
function DEFINE(word) {
  if (Array.isArray(word)) return word.map((row) => row.map(DEFINE));
  const d = wshLookup_(word);
  if (!d) return "";
  return d.found ? d.definitions[0].definition : "(not found)";
}

/**
 * Returns the base Scrabble score of a word, or "not valid".
 * @param {string} word The word to score.
 * @return The tile score.
 * @customfunction
 */
function WORDSCORE(word) {
  if (Array.isArray(word)) return word.map((row) => row.map(WORDSCORE));
  const d = wshLookup_(word);
  if (!d) return "";
  return d.scrabble.valid ? d.scrabble.score : "not valid";
}
