/*
  Warnings:

  - Added the required column `Author` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Score` to the `BookReview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "Author" VARCHAR(512) NOT NULL;

-- AlterTable
ALTER TABLE "BookReview" ADD COLUMN     "Score" INTEGER NOT NULL;
