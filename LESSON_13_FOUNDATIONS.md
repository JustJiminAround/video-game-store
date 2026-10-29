# Lesson 13 — C1 foundation evidence

October 27, 2026. Built and checked with AI assistance against the approved CAPSTONE_SPEC.md. Feature tracking: [issue #1](https://github.com/JustJiminAround/video-game-store/issues/1).

## Built today

- Designed and created one SQLite wishlist table: game_id (unique, required), priority (normal/high, default normal), and created_at.
- Added idempotent database initialization, a direct schema/SELECT inspection command, a configurable file path, and Git exclusions for database files.
- Implemented real GET and POST wishlist routes. A duplicate returns 409; invalid input cannot create rows. Catalog details are still supplied from JSON.
- Stubbed summary, priority update, and delete routes with explicit 501 responses for L14.
- Added API Lab buttons to save/read a sample game; the full React Wishlist page is next-session work.
- Started the capstone AI-USAGE-LOG.md and linked the earlier assistance history.

## Verified today

Node 24.21.0, Codespaces:

- Server: **12 API tests passed**, including direct row inspection, simultaneous duplicate handling, invalid/malformed request rejection, and persistence after closing and reopening the server/database.
- Client: **4 cart tests passed**, lint passed, production build passed.
- Ran db:init and db:inspect: the actual designed schema exists.
- Browser API Lab POST /api/wishlist returned 201 for Minecraft. A separate db:inspect SELECT found game_id=minecraft, priority=normal.
- After refreshing the API Lab, GET /api/wishlist returned 200 with the same Minecraft row and creation timestamp.
- git check-ignore confirmed server/data/player-one.sqlite is excluded. No database file or node_modules is part of the feature patch.

## Scope status

The C1 database and API foundation is complete. The complete wishlist feature is **not** shipped yet. L14 will wire the React Wishlist page and implement priority changes, deletion, and the custom summary. L15 will verify the full numbered acceptance criteria and merge the feature PR.

## Explain it in class

“The SQLite file keeps the games I save. Each game ID can appear only once because it is the primary key. Express checks the game ID and uses a parameterized INSERT; GET reads the saved rows and adds the game's catalog details. I checked the actual table and tested reopening the server, rather than trusting only a success response.”

Review the code and diagram and explain these choices in your own words before Demo Day.
