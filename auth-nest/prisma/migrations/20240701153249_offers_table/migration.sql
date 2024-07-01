-- CreateEnum
CREATE TYPE "Position" AS ENUM ('INTERNSHIP', 'JOB');

-- CreateTable
CREATE TABLE "offers" (
    "id" SERIAL NOT NULL,
    "position" "Position" NOT NULL,
    "positioname" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "technologies" TEXT NOT NULL,
    "contract" TEXT,
    "salary" TEXT,
    "skills" TEXT,
    "duration" TEXT,
    "nbCondidats" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "offers_pkey" PRIMARY KEY ("id")
);
