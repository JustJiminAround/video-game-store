# Player One — Video Game Store

A Code2College P1 storefront: React + Vite, real game artwork, game search and genre filters, trailer dialogs, free-game links, and a sample cart. Prices are examples; no payments are collected.

The October 15 M5 extension adds a separate Express API and an interactive API Lab. The storefront still reads its local JSON catalog; the lab practices browser requests to the API. SQLite and saved submissions are later milestones.

## Run in Codespaces

Use Node 24 and two terminals, starting from the repository root.

Terminal 1 — API:

```sh
cd server
npm ci
npm run dev
```

Terminal 2 — website:

```sh
cd client
npm ci
npm run dev -- --host 0.0.0.0
```

Open the forwarded preview on port 5173. The store is at `/`; the API practice page is at `/api/demo`. Keep both terminals running. The API listens on 127.0.0.1:3001 and Vite proxies `/api` to it, so API ports can stay Private. The API_PORT environment variable can change this port; use the same value in both terminals.

## Check it

From the repository root:

```sh
cd server
npm test
cd ../client
npm test
npm run lint
npm run build
```

There are seven API tests and four cart tests. See LESSON_10_CHECKS.md for the acceptance-criteria walkthrough and CONTRACT.md for the API request/response shapes.

## Demo path

1. Browse the store, try a genre filter, and search for a game.
2. Add Minecraft twice and Hades once: the cart shows 3 games and $84.97.
3. Decrease Minecraft once: 2 games and $54.98. Switch pages and return; the cart remains. Remove the final copies to see the empty state.
4. Open `/api/demo`. Choose Get games to see catalog JSON, then Send message to see a POST response.

## Project structure

- client/src/catalog.json: six paid-game sample products, shared with the API.
- client/src/components: reusable game cards, cart, trailers, and showcases.
- client/src/cartState.js: immutable quantity updates and cent-based totals.
- server/src/app.js: Express routes and JSON error responses.
- server/public/api-demo.html: the API learning lab.
- SPEC.md, CONTRACT.md, LESSON_10_CHECKS.md, AI_LOG.md: scope, contract, verification, and assistance record.

## Current limits

The cart lives in React state and resets on refresh. Echoed messages are not stored. There are no accounts, payments, database, or production deployment. Artwork and trailers need internet access; the trailer dialog provides a YouTube fallback when an embed cannot play. Motion and sound have header toggles, with reduced-motion support.

Game names, artwork, and trailers belong to their respective owners. Artwork comes from Minecraft.net, publisher Steam assets, Roblox, and Epic; free-game links go to official game pages.
