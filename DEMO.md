# Player One — Project Demo Notes

October 20, 2026. Prepared with AI assistance. This is a rehearsal guide; it does not claim that a live class demo has happened.

## Short introduction

“My project is Player One, a video game storefront. People can browse games, filter the catalog, and build a sample cart. The cart updates its quantities and total as games are added or removed. I also added a small Express API practice page.”

## Two-to-three-minute demo

1. Open the website on port 5173. Show the catalog and the Farming filter, which leaves Stardew Valley. Restore All.
2. Add Minecraft twice and Hades once. Open Cart: expect 3 games and $84.97, with one Minecraft row showing quantity 2.
3. Remove one Minecraft: expect 2 games and $54.98. Visit Free to Play and return to Cart; the same cart should remain.
4. Remove the remaining copies and show “Your cart is empty.”
5. If time allows, open /api/demo. Get games performs a GET request; Send message performs a POST request and echoes the object.

## One actual AI mistake

“One AI-generated test contained a syntax error in its content-type check. Running the tests caught it. With AI assistance, we replaced that check with a simple startsWith string check and reran the tests. The seven API tests and four cart tests then passed.”

## Acceptance criteria to explain

- The catalog is rendered from JSON using a reusable ProductCard. Last class, a temporary JSON entry appeared without component edits and was then removed.
- Page navigation preserves the cart; a full browser refresh resets it because the cart is held in React state.
- Adding or removing games updates quantities, count, and the sample total correctly.
- Removing the final item shows an empty-cart message.
- The API returns game data and accepts a JSON POST request. The API Lab uses fetch; the main storefront still imports the catalog directly.
- Install/run/test instructions and the AI-usage log are in the repository.

## Current limits

This is a P1 school storefront with an M5 API extension. Prices are samples. The cart is not stored in a database, and the echo route does not save messages. SQLite, login, payments, and deployment are outside this project's current scope. External trailer playback depends on YouTube and the network; the dialog has a fallback link.

## Today's verified checks

The source checkout matched origin/main and had no local changes. Seven API tests, four cart tests, client lint, and the production build passed on October 20. The running API answered its health route. The private Codespaces preview was restored with the GitHub CLI forwarding command below. In Chrome, Farming showed only Stardew Valley; Minecraft twice plus Hades showed 3 games and $84.97; removing one Minecraft showed 2 games and $54.98; navigation preserved the cart; removing all copies showed the empty state. The Hades embedded trailer actually played (observed at 0:11).

## After your live demo

Record whether you presented, what worked or failed, one real comment from your group, your acceptance-criteria status, and any support you need. Those answers must come from the actual demo.

## If Codespaces has no forwarded preview port

Start the API and Vite using the README first. If both respond inside Codespaces but forwarding is missing, run this in a third Codespaces terminal:

```sh
timeout 15s gh codespace ports forward 5173:15173 -c "$CODESPACE_NAME"
gh codespace ports -c "$CODESPACE_NAME"
```

This created the missing private port registration on October 20. The temporary loopback forward ends after 15 seconds. Use the private BROWSE URL printed by the second command and let GitHub authenticate it. No port was made public. This is a recovery step for this observed issue, not a guaranteed fix for every preview failure.

## Student-reported lesson status

On October 20 the student said the live group presentation has not happened and is planned for next lesson. Do not mark the live presentation complete until it happens.
