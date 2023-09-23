-- CreateTable
CREATE TABLE "Deneme" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Deneme_pkey" PRIMARY KEY ("id")
);
