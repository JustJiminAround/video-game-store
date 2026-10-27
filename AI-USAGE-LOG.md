# Capstone AI-usage log

This is the capstone log filename requested in Lesson 13. Earlier project and L12 planning history remains in [AI_LOG.md](AI_LOG.md).

## October 27, 2026 — C1 wishlist foundation

- **Asked:** Follow the instructor-approved saved-wishlist scope and build the L13 data model/API foundation.
- **Produced:** One SQLite table, reproducible init/inspect commands, save/read routes, an API Lab demonstration, isolated persistence/validation/duplicate tests, and explicitly unfinished L14 route stubs. Feature tracking is issue #1.
- **Fixed or rejected:** Kept the existing sample cart separate from the persistent wishlist. Rejected pretending the summary or editing routes were complete: they return 501 until implemented. Used Node 24's built-in SQLite API and one connection per app instead of adding a compiled database dependency or opening a connection per request. The GitHub connector could not create the issue; the authorized Codespaces CLI created it.
- **Verified:** On Node 24.21.0 in Codespaces, 12 API tests and 4 cart tests passed, as did client lint and production build. The API tests directly read SQLite, reject duplicate/invalid saves, close the server and database, reopen the same file, and confirm the saved game. Browser POST saved Minecraft with HTTP 201; db:inspect directly selected the matching row. The database file is ignored by Git. After a browser refresh, GET returned HTTP 200 with the same saved Minecraft row and timestamp; details are in LESSON_13_FOUNDATIONS.md. The full React Wishlist page remains unfinished.
- **Next:** L14 React wiring, priority updates, deletion, custom summary, and full refresh/restart verification.
