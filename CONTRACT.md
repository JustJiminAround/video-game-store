# Player One API contract — M5 extension

Written before server implementation on October 15, 2026.
The storefront remains the P1 front-end project. This extension practices GET, POST, JSON, and Express; it does not save data or take payments.

| Method | Path | Request | Successful response |
| --- | --- | --- | --- |
| GET | /api/health | No body | 200 JSON: { "status": "ok", "service": "player-one-api" } |
| GET | /api/products | No body | 200 JSON array matching client/src/catalog.json, including id, name, price, description, and artwork fields. |
| POST | /api/echo | Content-Type: application/json; a JSON object such as { "message": "Hello Player One" } | 200 JSON: { "received": { "message": "Hello Player One" } }. Nothing is stored. |

Errors use { "error": "Readable message" }: 400 for malformed JSON or a non-object echo body; 413 above the 10 KB JSON limit; 415 for a non-JSON echo request; 404 for unknown paths; 500 for unexpected failures.

GET /api/demo serves an HTML practice page for trying the three JSON endpoints.

## Development connection
Run the API on port 3001 and Vite on port 5173 in separate terminals. Vite proxies /api to http://127.0.0.1:3001, so the browser uses the existing private website origin. API_PORT can change the server port and Vite proxy target together.

## Acceptance criteria
1. Health and products return JSON through the Vite proxy.
2. Products match the catalog; changing the JSON changes the next API response.
3. POST echoes the supplied JSON object without persisting it.
4. Invalid requests return the documented JSON errors.
5. API tests and client checks pass; both startup commands are documented.


## Capstone wishlist — L14 implementation

The approved contract was written in CAPSTONE_SPEC.md before implementation. The C1 stubs are now implemented. All errors use `{ "error": "helpful message" }`. POST/PATCH require Content-Type: application/json; malformed JSON returns 400 and oversized bodies return 413.

| Method / path | Body | Success | Other responses |
| --- | --- | --- | --- |
| GET /api/wishlist | none | 200 `{ items: [{ gameId, priority, createdAt, name, priceCents, image }] }` | 500 safe JSON error |
| POST /api/wishlist | `{ gameId: "minecraft" }` only | 201 `{ item }`, priority normal | 400 invalid fields; 404 unknown catalog ID; 409 already saved; 415 wrong content type |
| PATCH /api/wishlist/:gameId | `{ priority: "normal" }` or `{ priority: "high" }` only | 200 `{ item }` | 400 invalid fields/priority; 404 no saved row; 415 wrong content type |
| DELETE /api/wishlist/:gameId | none | 204 with **no response body** | 404 no saved row |
| GET /api/wishlist/summary | none | 200 `{ count, highPriorityCount, totalSamplePriceCents }` | 500 safe JSON error |

Summary is a custom server calculation over the current saved rows, combined with catalog prices. Minecraft + Hades = `{ count: 2, highPriorityCount: 0, totalSamplePriceCents: 5498 }`. Marking Hades high changes highPriorityCount to 1; deleting Minecraft changes count to 1 and the total to 2499. These values are calculated, not hard-coded.

IDs and priorities in SQL writes are bound parameters. The unique primary key rejects duplicate rows. The UI re-fetches list and summary after each write; it does not report an unsuccessful request as saved. The wishlist is a shared private classroom demo with no accounts or personal information.
