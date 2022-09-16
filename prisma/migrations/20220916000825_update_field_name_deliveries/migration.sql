/*
  Warnings:

  - You are about to drop the column `and_at` on the `deliveries` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "deliveries" DROP COLUMN "and_at",
ADD COLUMN     "end_at" TIMESTAMP(3);
