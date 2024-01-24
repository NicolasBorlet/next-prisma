-- CreateTable
CREATE TABLE "Pilote" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "Pilote_pkey" PRIMARY KEY ("id")
);
