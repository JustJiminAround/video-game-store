# AI usage log

| What I asked for | What the assistant produced | What I fixed or rejected | How it was verified |
| --- | --- | --- | --- |
| Help set up the React project in Codespaces. | Vite React scaffold with ESLint, installed packages, running preview. | No user corrections recorded yet. | Assistant opened the React starter page. |
| Continue with the video game storefront. | Six-game catalog.json, reusable ProductCard, catalog page, and CSS. | Assistant corrected a command-construction error before sending it to the terminal. User review is still pending. | Assistant ran lint and build successfully and confirmed six games in the browser. |

These checks were performed by the assistant. My own review and explanation of the code are still pending.

## Cart and routing

- Asked: Add cart buttons and a cart page.
- Produced: React Router routes, shared useState cart, quantity updates, totals computed in cents, and an empty-cart message.
- Fixed or rejected: No additional correction was needed during the assistant checks. Student review remains pending.
- Verified by assistant: Lint and production build passed. Two Minecraft copies plus Stardew Valley showed 3 items and $74.97; removing one Minecraft showed 2 items and $44.98. Navigation retained the cart; removing all items showed the empty message.

## Visual redesign

- Asked: Make the storefront look much better.
- Produced: Hades feature banner, Steam-hosted game artwork, original CSS Minecraft landscape, orange accents, hover effects, responsive cards, cart summary, and dismissible cart notifications.
- Fixed or rejected: The assistant corrected a Python newline-escaping error in the catalog update and reran it successfully.
- Verified by assistant: Desktop and 390px phone layouts inspected; no horizontal overflow on the phone view. All five external card images loaded. Minecraft plus Hades totaled $54.98; removal and empty cart worked. Student design review remains pending.

## Artwork, hover effects, sounds, and trailers

- Asked: Improve Minecraft artwork, add hover animations, click sounds, and trailer clips for every game.
- Produced: Official Minecraft screenshot with title overlay; animated card lift, image zoom, light sweep, button feedback; original synthesized click/add/remove sounds and an on/off toggle; six user-triggered YouTube trailer dialogs.
- Fixed: Corrected a script quoting error by writing App.jsx directly. Pinned artwork to its frame and refreshed to confirm alignment after responsive testing.
- Verified by assistant: Lint and build passed. All six official trailer players loaded and responded to Play; Minecraft playback visually confirmed. Close button and Escape dismiss the player. Sound toggle changed on/off; no audio initialization error appeared. Student listening check is still pending. Minecraft cart total remained $29.99. Phone dialog layout inspected.

### Media sources

- Minecraft artwork: https://www.minecraft.net/en-us/about-minecraft
- Minecraft trailer: https://www.youtube.com/watch?v=r6Ja2ZxWbRE
- Stardew Valley trailer: https://www.youtube.com/watch?v=ot7uXNQskhs
- Terraria trailer: https://www.youtube.com/watch?v=w7uOhFTrrq0
- Hollow Knight trailer: https://www.youtube.com/watch?v=UAO2urG23S4
- Hades trailer: https://www.youtube.com/watch?v=Bz8l935Bv0Y
- Among Us trailer: https://www.youtube.com/watch?v=0YKjFoGxbec

## Free to play showcase — October 6, 2026
Request: make the front end flashy and add famous free games including Roblox.
AI added freeGames.json and reusable FreeToPlay cards, the home-page section and /free-to-play route, neon green styling, hover effects, CSS Roblox artwork with floating motion, official-site links, purchase labels, and mobile/reduced-motion rules. Official Roblox, Fortnite, Rocket League, and Apex/Steam pages were checked for free-to-play information. An unavailable Rocket League cover URL was replaced with working publisher Steam artwork.
Verification: ESLint and production build passed. All three remote covers loaded, all four outbound links matched the intended official destinations, and the 390px phone viewport had no horizontal overflow. Student review and sound listening remain for the student.

## Cinematic whole-site redesign — October 6, 2026
Requested: more dramatic animations and real game artwork across the site.
AI added Showcase.jsx with selectable game spotlights, catalog search and genre filtering, route scroll restoration, reveal effects, and a trailer room. Updated App integration and site-wide CSS for ambient light, slow artwork zoom, finite ember animation, animated buttons/cards, mobile layouts, and styled cart/trailer panels. Added a Motion toggle and honored reduced-motion preferences. Replaced the Roblox CSS illustration with artwork observed directly on Roblox's official landing page: https://assetdelivery.roblox.com/v1/asset?id=105014709880567 . Hades and Hollow Knight spotlights use publisher Steam library artwork; Minecraft uses its existing official Minecraft.net screenshot. Existing official Fortnite and publisher Steam covers remain.
Verified: lint and production build passed; all three spotlights loaded and changed content, search for terra returned Terraria, Action returned Hollow Knight and Hades, trailer-room Hades opened the official embedded trailer, adding/removing Hollow Knight produced a $14.99 total and empty-cart state, Roblox artwork loaded, and 390px mobile rendering had no horizontal overflow. Motion off disabled hero animation. Student review is still pending.

## Lesson 9 Core Build — October 8, 2026
Asked: inspect today's Hirewheel class and continue the existing project.
Reviewed: Today's Focus and the Full Stack M3–M4 checklist. Open Work remains locked pending the student's required standup.
Produced: cart +/− quantity controls, shared pure cartState functions, four automated cart tests, updated acceptance criteria, README instructions, and a lesson explanation in LESSON_09_NOTES.md.
Fixed: an assistant command-quoting error prevented the initial integration script from running. Replaced the cart markup and corrected the integration script before verification.
Verified: 4 automated tests passed; lint and production build passed; browser totals were $54.98 for Minecraft + Hades and $84.97 for two Minecraft + Hades, then $54.98 after decreasing quantity. Navigation to Free to Play and back preserved the cart.
Student work still needed: review the code, explain props/state/map data flow, and complete honest standup/reflection/self-assessment answers. No lesson answers or submissions were completed by the assistant.

## Additional visual polish — October 8, 2026
Asked: improve the website appearance again.
Produced: a new Premium.css visual layer, gradient introduction, refined navigation, more visible hero artwork, themed mood cards for Sandbox/Farming/Action, sharper game covers and hover styles, framed trailer room, refined Free to Play panels, and coordinated cart typography. Mood cards select the matching genre and clear search text, then scroll to results. Motion controls and reduced-motion settings remain supported.
Verified: lint and production build passed. The Farming mood card displayed Stardew Valley and the All filter restored the full list. Existing user cart contents were preserved.

## October 15, 2026 — Lesson 10 M5 extension and verification
- Asked: Continue the project for the Feature Complete class.
- Got: A contract-first Express server in server/, health/products/echo JSON routes, a private Vite proxy, an interactive API Lab, seven API tests, and updated run/verification notes.
- Fixed or rejected: Corrected the earlier claim that SQLite was required today; the guide specifies M4–M5 and P1 excludes a database. The assistant's first test draft had an incorrectly escaped content-type regex; the test run caught the syntax error, and it was replaced with a straightforward string check. A raw JSON browser navigation was blocked, so a small learning page now exercises normal fetch requests and shows their responses. No browser protections were changed.
- Verified by assistant: Seven API tests and four cart tests pass, plus client lint/build. Live GET and POST requests through Vite pass in a terminal and Chrome API Lab. A temporary catalog row appeared in both the store and API without component edits, then the exact original catalog was restored. Browser checks confirmed duplicate quantities, $84.97/$54.98 totals, plus/minus, empty cart, navigation, refresh reset, genre/search states, and trailer open/Escape-close controls. The student still needs to review and explain the code; full external video playback was not asserted.


## October 20, 2026 — Lesson 11 demo preparation
- Asked: Recheck the project for the next class and finish the lesson.
- Produced: DEMO.md with a short rehearsal, expected cart totals, an actual AI test mistake, acceptance criteria, scope, and preview recovery instructions. No application features were changed today.
- Verified by assistant: Seven API tests, four cart tests, client lint, and production build passed. Local Vite returned HTTP 200 and the API health JSON was correct. Chrome verified Farming filtering, duplicate quantities, 3 items / $84.97, decrement to 2 items / $54.98, cart preservation across navigation, last-copy removal and empty cart. Hades trailer playback was observed at 0:11.
- Infrastructure issue: Codespaces showed no forwarded ports and private visibility setup returned a missing-port 404. Editor reload, manual forwarding, and a full Codespace restart did not create it. A bounded gh codespace ports forward 5173:15173 registered private port 5173; the CLI then listed its private BROWSE URL, and Chrome authenticated and loaded the app. No browser protections or port privacy were changed.
- Honest remaining work: The student has not given the live group demo and plans to present next lesson. Test results and assistant checks do not replace that presentation or the student reviewing and explaining the code.


## October 22, 2026 — Lesson 12 capstone planning draft
- Asked: Continue today’s lesson and prepare the capstone plan; also reopen the existing website.
- Produced: CAPSTONE_SPEC.md, a proposed saved-game wishlist extension with one SQLite table, API contract, summary endpoint, numbered acceptance checks, a planned architecture diagram, L13–L15 milestones, and a limited scope. This is a planning draft, not implemented functionality. The existing Vite and Express servers were restarted and the storefront opened in Chrome.
- Fixed or rejected: Kept real payments, accounts, recommendations, deployment, and another visual redesign out of scope. Distinguished the existing sample cart from a future persistent wishlist. Planned a summary calculation beyond basic list/read, and a feature issue-to-PR workflow for capstone direction C.
- Verified: Compared the draft with the Full Stack pathway’s seven required elements and Lesson 12’s spec/required-elements/milestone/approval requirements. Checked expected sample totals against the existing catalog. This session changes documentation only; no new capstone behavior or test results are claimed.
- Remaining: Student confirmation of the proposed direction, personal lesson responses, and actual instructor sign-off. Approval must not be claimed until it is received.


## October 27, 2026 — Capstone C1
The ongoing capstone record now uses the filename required in Lesson 13: [AI-USAGE-LOG.md](AI-USAGE-LOG.md). Today's SQLite/schema/API work, choices, corrections, checks, and remaining L14 work are recorded there. Earlier history above remains unchanged.
