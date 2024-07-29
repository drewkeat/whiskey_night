CREATE TABLE IF NOT EXISTS "whiskey" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "type" VARCHAR(255),
  "distillery" VARCHAR(255),
  "location" VARCHAR(255),
  "description" TEXT,
  "whiskeyImg" VARCHAR(255),
  "whiskeyLink" VARCHAR(255) NOT NULL,
  "age" VARCHAR(255),
  "abv" VARCHAR(255),
  "style" VARCHAR(255),
  "caskType" VARCHAR(255),
  "flavorProfile" JSONB,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NULL
);

