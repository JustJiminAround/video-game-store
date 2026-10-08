# Video Game Store

## Problem
Help visitors browse a small video game catalog and build a sample shopping cart.

## Users
People browsing video games.

## Inputs
Game data from catalog.json and freeGames.json; selected games, quantities, search text, and genre selection.

## Outputs
A React website with Discover, Free to Play, and Cart pages. The cart displays game rows, quantities, an item count, and a total sample price.

## Acceptance Criteria
1. The app starts and the core navigation works without a full-page reload.
2. Every game in catalog.json appears through the reusable ProductCard component.
3. Adding the same game again increases its quantity instead of creating another row.
4. Cart + and − controls update quantities, the item count, and totals correctly.
5. Removing the last copy removes the row; an empty cart shows a helpful message.
6. Two Minecraft copies and one Hades produce 3 items and a $84.97 sample total.
7. Navigating between pages preserves the current cart; refreshing resets it.
8. Game searches and genre filters show matching games.
9. Trailer controls open the corresponding official video; free-game links go to official game pages.
10. The README explains how to install, run, and test the app, and AI_LOG.md records AI-assisted work.

## Current Scope
This is a front-end school demo. Sample prices, no real purchases. Real payments, accounts, a database, and deployment are outside this stage.
