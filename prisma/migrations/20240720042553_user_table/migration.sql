/*
  Warnings:

  - The primary key for the `Person` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `nPerSalary` on the `Person` table. The data in that column could be lost. The data in that column will be cast from `Decimal(6,2)` to `Real`.
  - The primary key for the `Service` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `idService` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Service` table. All the data in the column will be lost.
  - Changed the type of `nPerCode` on the `Person` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `cPerSexo` on table `Person` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `name` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Person" DROP CONSTRAINT "Person_pkey",
DROP COLUMN "nPerCode",
ADD COLUMN     "nPerCode" UUID NOT NULL,
ALTER COLUMN "nPerSalary" SET DATA TYPE REAL,
ALTER COLUMN "cPerSexo" SET NOT NULL,
ADD CONSTRAINT "Person_pkey" PRIMARY KEY ("nPerCode");

-- AlterTable
ALTER TABLE "Service" DROP CONSTRAINT "Service_pkey",
DROP COLUMN "created_at",
DROP COLUMN "idService",
DROP COLUMN "title",
DROP COLUMN "updated_at",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" VARCHAR(20) NOT NULL,
ADD CONSTRAINT "Service_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "mailSubject" VARCHAR(50) NOT NULL,
    "mailMessage" VARCHAR(255) NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
