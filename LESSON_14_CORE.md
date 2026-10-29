# Lesson 14 — Wishlist core verification

October 29, 2026 · Prepared with AI assistance · Feature issue #1 and draft PR #2.

## Implemented

- React catalog save buttons and /wishlist route, with a shared API-backed list/count.
- Normal/High priority updates and removal through parameterized SQLite writes.
- Custom GET /api/wishlist/summary: current saved count, high-priority count, total sample price in integer cents.
- Loading, friendly error/retry, duplicate-save feedback, and empty states. Server writes are confirmed and data is re-fetched before a success message appears.
- API tests for actual database changes, summary arithmetic, validation, deletion, and reopening the same database file.

## Automated checks — passed

Node 24.21.0, Codespaces:

- 13 API tests passed; 0 failed.
- 4 cart tests passed; 0 failed.
- Client lint passed after preserving the original network error as its cause.
- Production build passed.

## Live browser checks — passed

The initial browser connection issue was resolved. These checks ran against the private Codespaces preview on October 29, 2026.

1. Saved Minecraft and Hades from the catalog. Wishlist showed 2 games and $54.98.
2. Set Hades to High. The summary showed 1 high-priority game.
3. Fully refreshed the browser. Both games, Hades's High priority, and the $54.98 total remained.
4. Removed Minecraft, then refreshed. Only Hades remained: 1 game and $24.99.
5. Removed Hades and saw the useful empty-wishlist message. Restored the two sample games through the catalog and set Hades to High.
6. Stopped the API and attempted to change Hades to Normal. The page showed a retryable error, kept High selected, and displayed no success notice. After a full refresh while the API was stopped, the page showed an error instead of a misleading empty state. Restarted the API and used Try wishlist again; the two saved games and High priority returned.
7. Ran db:inspect directly while restarting the API. SELECT returned Minecraft/normal and Hades/high, matching the recovered UI; the failed write did not change the row.
8. Added Minecraft to the existing sample cart and opened Cart: 1 game/$29.99 while Wishlist stayed at 2 games. The cart and persistent wishlist remained separate.

Local evidence: wishlist-c2-persisted.png, wishlist-c2-empty.png, wishlist-c2-failed-write.png, and wishlist-c2-database.png in the task outputs folder.

## Next session

Freeze features. Recheck each numbered capstone criterion, finish the README/architecture/log and demo evidence, then review and merge the feature PR. A 4–6 minute presentation remains scheduled for Demo Day.
