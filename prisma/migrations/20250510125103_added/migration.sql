/*
  Warnings:

  - The `semester_offered` column on the `units` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "units" DROP COLUMN "semester_offered",
ADD COLUMN     "semester_offered" JSONB;
