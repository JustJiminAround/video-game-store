# video-game-store
## Run the website

Open this repository in GitHub Codespaces. In the terminal:

    cd client
    npm install
    npm run dev

Open the forwarded preview on port 5173. Keep the development terminal running.

## Current progress

The catalog displays six real games with illustration placeholders and sample prices. Game data is in client/src/catalog.json. ProductCard is reused for each game. Catalog and cart routes now work with React Router. Add buttons increase quantities; Remove one buttons decrease them. The item count and total update immediately. The cart stays while navigating and resets on refresh. Personal review against SPEC.md is still pending.

## Check the code

Inside client, run npm run lint and npm run build.

## Trailers and sound

Each card has a Watch trailer button. Press Play inside the popup; close it with the X or Escape. A Watch on YouTube link is available if your network blocks embeds. The Sound on/off button controls short original UI click effects, not trailer audio. Sound starts only after a click. Reduced-motion settings disable the hover motion. Artwork and trailers require internet access; media sources are listed in AI_LOG.md.

### Free to play showcase
The Discover page includes a neon Free to Play section, also available through the navigation tab at /free-to-play. It features Roblox, Fortnite, Rocket League, and Apex Legends with links to official game pages. Roblox uses CSS artwork inspired by its square logo; Fortnite uses Epic's official artwork, and Rocket League and Apex use publisher artwork from Steam. Cards include hover effects, a floating Roblox square, and a pulsing section marker. Reduced-motion settings disable those animations. Base games are free; optional purchases and some experiences or modes may cost money.

### Cinematic redesign
Player One now includes three selectable spotlights (Hades, Minecraft, Hollow Knight), artwork zoom and entrance animations, floating embers, ambient color lighting, glowing hover cards, genre filters and game search, a dedicated trailer room, and refined cart/free-game styling. Motion and sound have separate header toggles, with operating-system reduced-motion support. Roblox now uses a real image from its official landing page, replacing the CSS placeholder. Hero artwork is sourced from publisher Steam assets and Minecraft.net; the other original catalog assets are publisher Steam artwork. These remote assets require internet access.

### Lesson 9 core build
The cart includes quantity controls. Shared functions in client/src/cartState.js handle addition, removal, and total calculation in cents. From the client directory, run npm test for four cart tests, npm run lint for code checks, and npm run build for a production build. LESSON_09_NOTES.md explains routing, props, useState, and JSON/map data flow using this project's actual files.
