-- CreateTable
CREATE TABLE "Whiskey" (
    "id" SERIAL NOT NULL,
    "whiskyId" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "whiskyImg" TEXT,
    "whiskyLink" TEXT NOT NULL,
    "distillery" TEXT,
    "countryRegion" TEXT,
    "type" TEXT,
    "age" TEXT,
    "abv" TEXT,
    "bottler" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Whiskey_pkey" PRIMARY KEY ("id")
);
