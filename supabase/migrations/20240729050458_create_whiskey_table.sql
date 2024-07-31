CREATE TABLE IF NOT EXISTS "whiskey" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "type" TEXT,
  "distillery" TEXT,
  "location" TEXT,
  "description" TEXT,
  "whiskeyImg" TEXT,
  "whiskeyLink" TEXT,
  "age" TEXT,
  "abv" TEXT,
  "style" TEXT,
  "caskType" TEXT,
  "flavorProfile" JSONB,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NULL
);

