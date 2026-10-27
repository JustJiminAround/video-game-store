-- The catalog remains in JSON; this table stores the demo's saved choices.
CREATE TABLE IF NOT EXISTS wishlist (
  game_id TEXT NOT NULL PRIMARY KEY,
  priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('normal', 'high')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
) STRICT;
