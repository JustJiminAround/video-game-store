# Player One — Video Game Store

A Code2College P1 storefront: React + Vite, real game artwork, game search and genre filters, trailer dialogs, free-game links, and a sample cart. Prices are examples; no payments are collected.

The October 15 M5 extension adds a separate Express API and an interactive API Lab. The storefront still reads its local JSON catalog; the lab practices browser requests to the API. The L13 capstone foundation adds a SQLite wishlist and save/read API routes. The React Wishlist page, priority/delete operations, and custom summary remain L14 work.

## Run in Codespaces

Use Node 24 and two terminals, starting from the repository root.

Terminal 1 — API:

```sh
cd server
npm ci
npm run db:init
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

The server tests cover the original API plus SQLite wishlist saves, duplicate handling, validation, persistence after reopening the server, and honest unfinished-route responses. The client has four cart tests. See LESSON_10_CHECKS.md for the acceptance-criteria walkthrough and CONTRACT.md for the API request/response shapes.

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

The cart lives in React state and resets on refresh. Echoed messages are not stored. There are no accounts, payments, or production deployment. A shared demo wishlist is now stored in SQLite through the C1 API; its full React interface is not built yet. Artwork and trailers need internet access; the trailer dialog provides a YouTube fallback when an embed cannot play. Motion and sound have header toggles, with reduced-motion support.

Game names, artwork, and trailers belong to their respective owners. Artwork comes from Minecraft.net, publisher Steam assets, Roblox, and Epic; free-game links go to official game pages.

## Capstone foundation (L13)

[Approved scope and planned architecture](CAPSTONE_SPEC.md) · [Feature issue #1](https://github.com/JustJiminAround/video-game-store/issues/1) · [Capstone AI-usage log](AI-USAGE-LOG.md).

Use **Node 24** for the server. The small SQLite layer uses Node's built-in [DatabaseSync API](https://nodejs.org/download/release/latest-v24.x/docs/api/sqlite.html), so no additional database server or native npm package is needed. The production entry point opens a file database; app-factory tests use isolated memory or temporary files.

`npm --prefix server run db:init` creates the designed table without erasing rows. `npm --prefix server run db:inspect` runs a direct SELECT and prints the actual schema and rows. The default file is `server/data/player-one.sqlite`; it is ignored by Git. The API also initializes the table on startup. To configure a different file, copy `server/.env.example` to `server/.env` and set API_DB_PATH. Server npm scripts load this file. If changing API_PORT, set the matching value for Vite too.

Open `/api/demo` through the private Vite preview. Choose **Save Minecraft (demo)**, then **Read saved wishlist**. Reload and read it again; restart the API and read it once more. A duplicate save returns 409 and keeps one row. Use `db:inspect` to verify storage directly. This is a shared list of sample games, with no personal data.

Implemented: `GET /api/wishlist` and `POST /api/wishlist`. The summary, PATCH, and DELETE routes are explicit **501 stubs** for L14; they do not claim to update anything. The existing storefront/cart behavior is unchanged.
