/*
  Warnings:

  - The primary key for the `courses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `course_id` on the `courses` table. All the data in the column will be lost.
  - The primary key for the `units` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `unit_id` on the `units` table. All the data in the column will be lost.
  - Made the column `first_name` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `last_name` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `year_of_study` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "communities" DROP CONSTRAINT "communities_related_course_id_fkey";

-- DropForeignKey
ALTER TABLE "communities" DROP CONSTRAINT "communities_related_unit_id_fkey";

-- DropForeignKey
ALTER TABLE "user_unit_enrollments" DROP CONSTRAINT "user_unit_enrollments_unit_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_course_id_fkey";

-- AlterTable
ALTER TABLE "courses" DROP CONSTRAINT "courses_pkey",
DROP COLUMN "course_id",
ADD CONSTRAINT "courses_pkey" PRIMARY KEY ("course_code");

-- AlterTable
ALTER TABLE "units" DROP CONSTRAINT "units_pkey",
DROP COLUMN "unit_id",
ADD CONSTRAINT "units_pkey" PRIMARY KEY ("unit_code");

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "first_name" SET NOT NULL,
ALTER COLUMN "last_name" SET NOT NULL,
ALTER COLUMN "year_of_study" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("course_code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "communities" ADD CONSTRAINT "communities_related_course_id_fkey" FOREIGN KEY ("related_course_id") REFERENCES "courses"("course_code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "communities" ADD CONSTRAINT "communities_related_unit_id_fkey" FOREIGN KEY ("related_unit_id") REFERENCES "units"("unit_code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_unit_enrollments" ADD CONSTRAINT "user_unit_enrollments_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "units"("unit_code") ON DELETE RESTRICT ON UPDATE CASCADE;
