CREATE TABLE IF NOT EXISTS abonnes (
  email TEXT PRIMARY KEY,
  profil TEXT NOT NULL,
  langue TEXT NOT NULL,
  accord_le TEXT NOT NULL,
  jeton TEXT NOT NULL UNIQUE
);

-- Attempts per visitor, to slow down abuse. A hash, never the address itself, kept for ten minutes.
CREATE TABLE IF NOT EXISTS essais (
  cle TEXT NOT NULL,
  quand INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS essais_cle ON essais (cle);
