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
