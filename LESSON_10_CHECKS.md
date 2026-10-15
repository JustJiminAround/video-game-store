# Lesson 10 — Feature Complete verification

October 15, 2026. Checks below were performed by the coding assistant in Codespaces and Chrome. Student review and explanation are still needed; these are not claims that the student independently performed every test.

## Existing SPEC.md criteria

| # | Result | Evidence |
| --- | --- | --- |
| 1 | Pass | App runs; Discover, Free to Play, and Cart navigate. Cart state survives navigation, demonstrating no full page reload. No app console errors captured during the checked workflow. |
| 2 | Pass | Added Catalog Verification Sample to JSON only. It appeared as a game card without component changes, and in the API. Restored the original file byte for byte. |
| 3 | Pass | Adding Minecraft twice creates one row with quantity 2. |
| 4 | Pass | Cart plus and minus change quantities, count, and totals immediately. |
| 5 | Pass | Removing the final copies removes rows; zero items shows Your cart is empty. |
| 6 | Pass | Two Minecraft copies plus Hades: 3 games, $84.97. One Minecraft removed: 2 games, $54.98. |
| 7 | Pass | Cart remains after Free to Play navigation; a deliberate reload resets Cart 1 to Cart 0. |
| 8 | Pass | Farming shows Stardew Valley. An unmatched search shows No games found. Clearing it restores the catalog. |
| 9 | Controls pass | Minecraft trailer opens with its corresponding YouTube fallback link and closes with Escape. Free-game official URLs checked in page navigation. Full video playback remains dependent on YouTube and network access. |
| 10 | Pass | README has install/run/test commands; AI_LOG.md includes this session. |

## M5 extension

- CONTRACT.md was written before server code.
- GET /api/health, GET /api/products, and POST /api/echo pass through the Vite proxy.
- Browser API Lab: Get games returns the six-game array with status 200; Send message returns the supplied object with status 200.
- Seven API tests cover health, catalog consistency, nested POST data, wrong media type, malformed JSON/array input, size limit, and unknown routes. Four existing cart tests pass. Client lint and production build pass.
- The first raw JSON navigation was blocked by Chrome. The interactive lab successfully fetches JSON in the browser; no browser protections or port visibility were changed.

## Explain it yourself

In the API Lab, GET asks Express for data. POST sends the textarea as req.body after express.json() parses it. res.json() sends a JSON response. Trace browser /api/products → Vite proxy → Express → catalog.json → JSON response. The store still imports catalog.json directly; the lab uses fetch. Neither the echo route nor the cart stores data in a database.

## Next milestone

Review and reproduce the demo path. SQLite persistence and wiring the main storefront to stored data belong to later M6–M7 work; they are not required by today's P1 storefront acceptance criteria.
