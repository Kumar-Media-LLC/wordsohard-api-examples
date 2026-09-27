# Google Sheets

Two custom formulas for vocabulary lists, spelling tests, and word-game score sheets. No server and no add-on to install.

| A (word) | B `=DEFINE(A2)` | C `=WORDSCORE(A2)` |
|---|---|---|
| gregarious | Naturally inclined to seek and enjoy the company of others. | 12 |
| zax | A tool for cutting and piercing roofing slates. | 19 |

## Install

1. Open your sheet and choose **Extensions > Apps Script**.
2. Replace the editor contents with [`define.gs`](define.gs) and click **Save**.
3. Back in the sheet, type `=DEFINE(A2)` in any cell. The first run asks you to authorize the script to reach wordsohard.com.

Both formulas also accept a range, such as `=DEFINE(A2:A30)`. Results are cached for six hours, so reopening the sheet does not repeat the lookups.

Please keep the credit visible somewhere on the sheet, for example a footer cell that reads "Definitions by WordSoHard (https://wordsohard.com)".
