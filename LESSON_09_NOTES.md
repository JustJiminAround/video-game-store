# Lesson 9 — Core Build (October 8, 2026)
Today's Hirewheel Full Stack checklist is M3–M4: routing, props, useState, rendering JSON data with map, and real AI-log entries. Technical features can be verified by the assistant; explaining the code and reporting personal blockers are the student's work.

## Where the concepts are in this project
- Routing: App.jsx uses BrowserRouter, NavLink, and Routes for Discover, Free to Play, and Cart. These change the view without reloading the whole page.
- Props: Collection passes game, onAdd, and onTrailer into the reusable ProductCard component. Cart receives items, onAdd, and onRemove from App.
- State: App holds cart in useState. Pressing + calls onAdd, which calls addGame in App, creates an updated cart array, and tells React to show the new quantity and total.
- JSON and map: catalog.json contains the six games. Collection maps the filtered data into ProductCard components. Cart maps its items into cart rows.
- AI log: AI_LOG.md records requests, generated changes, corrections, verification, and review still needed.

## Today's new core feature
The cart now has + and − controls. Repeated additions increase the existing game's quantity. Removing its last copy removes the row. The cart count and price total update immediately. Totals use whole cents to avoid decimal rounding errors.

## Verified examples
- Minecraft + Hades: 2 games, $54.98.
- Increase Minecraft to 2 copies: 3 games, $84.97.
- Decrease Minecraft to 1 copy: 2 games, $54.98.
- Navigate to Free to Play and back: the same cart remains.
- Four automated tests pass for repeated additions, precise totals, removing the last copy, and removing an unknown ID.
- npm run lint and npm run build pass.

## Explain it yourself
Find the useState line in App.jsx. Follow onAdd from Cart to addGame, then to addToCart in cartState.js. Explain what map does and why the cart total changes when the quantity changes. Check the lesson's 'can trace the data flow' item only after you can explain this.

## Standup wording to adapt
Last class I built my video game storefront with game cards and a sample cart. Today I am working on cart quantities and checking that the totals are correct. Add your own honest blocker status.

The Open Work and exit-ticket sections are locked until the required standup is completed. Personal reflections and milestone self-assessments were left for the student.
