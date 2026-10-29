# Capstone AI-usage log

This is the capstone log filename requested in Lesson 13. Earlier project and L12 planning history remains in [AI_LOG.md](AI_LOG.md).

## October 27, 2026 — C1 wishlist foundation

- **Asked:** Follow the instructor-approved saved-wishlist scope and build the L13 data model/API foundation.
- **Produced:** One SQLite table, reproducible init/inspect commands, save/read routes, an API Lab demonstration, isolated persistence/validation/duplicate tests, and explicitly unfinished L14 route stubs. Feature tracking is issue #1.
- **Fixed or rejected:** Kept the existing sample cart separate from the persistent wishlist. Rejected pretending the summary or editing routes were complete: they return 501 until implemented. Used Node 24's built-in SQLite API and one connection per app instead of adding a compiled database dependency or opening a connection per request. The GitHub connector could not create the issue; the authorized Codespaces CLI created it.
- **Verified:** On Node 24.21.0 in Codespaces, 12 API tests and 4 cart tests passed, as did client lint and production build. The API tests directly read SQLite, reject duplicate/invalid saves, close the server and database, reopen the same file, and confirm the saved game. Browser POST saved Minecraft with HTTP 201; db:inspect directly selected the matching row. The database file is ignored by Git. After a browser refresh, GET returned HTTP 200 with the same saved Minecraft row and timestamp; details are in LESSON_13_FOUNDATIONS.md. The full React Wishlist page remains unfinished.
- **Next:** L14 React wiring, priority updates, deletion, custom summary, and full refresh/restart verification.


## October 29, 2026 — C2 wishlist core

- **Asked:** Continue the approved wishlist capstone and Lesson 14: wire the React UI to the API and close the save/persist/read loop.
- **Produced:** A Wishlist route and header count, catalog save buttons, a shared fetch/state hook, priority/removal controls, loading/error/empty messages, and the real priority/delete/custom-summary endpoints. Extended the API tests to check stored changes, summary arithmetic, invalid writes, and persistence after reopening.
- **Fixed or rejected:** The first hook draft threw a friendly network error while discarding the underlying error. ESLint's preserve-caught-error rule caught it; the revised throw keeps `{ cause: error }`, and lint/build then passed. Kept server-confirmed updates and re-fetching rather than optimistic success notices. Kept the existing cart separate from the saved wishlist and stayed within the approved scope.
- **Verified:** In Codespaces on Node 24.21.0, 13 API tests and 4 cart tests passed. Client lint and production build passed after the error-cause correction. After restoring browser access, saved both games from the catalog; confirmed 2/$54.98 and High priority after refresh; removed Minecraft and refreshed to confirm 1/$24.99; removed Hades to verify the empty state; restored both samples. Stopped the API, attempted a priority write and verified an error with no success message or changed priority; refreshed to verify a failed-read message, restarted the API, then retried successfully. Direct SQLite inspection showed Minecraft/normal and Hades/high. The original cart also worked separately. Details are in LESSON_14_CORE.md.
- **Next:** L15 feature freeze, numbered acceptance-criteria verification, documentation review, and merging the verified PR before Demo Day. The lesson submission is recorded separately in Hirewheel.
