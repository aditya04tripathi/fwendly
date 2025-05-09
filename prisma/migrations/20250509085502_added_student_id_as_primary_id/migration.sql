/*
  Warnings:

  - The `sender_user_id` column on the `notifications` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `user_id` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `user_id` on the `comments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `creator_id` on the `communities` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `community_memberships` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `moderators` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `recipient_user_id` on the `notifications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `posts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `saved_content` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `user_unit_enrollments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `votes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "communities" DROP CONSTRAINT "communities_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "community_memberships" DROP CONSTRAINT "community_memberships_user_id_fkey";

-- DropForeignKey
ALTER TABLE "moderators" DROP CONSTRAINT "moderators_user_id_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_recipient_user_id_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_sender_user_id_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "saved_content" DROP CONSTRAINT "saved_content_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_unit_enrollments" DROP CONSTRAINT "user_unit_enrollments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "votes" DROP CONSTRAINT "votes_user_id_fkey";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "user_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "communities" DROP COLUMN "creator_id",
ADD COLUMN     "creator_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "community_memberships" DROP COLUMN "user_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "moderators" DROP COLUMN "user_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "recipient_user_id",
ADD COLUMN     "recipient_user_id" INTEGER NOT NULL,
DROP COLUMN "sender_user_id",
ADD COLUMN     "sender_user_id" INTEGER;

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "user_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "saved_content" DROP COLUMN "user_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user_unit_enrollments" DROP COLUMN "user_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "user_id" INTEGER NOT NULL DEFAULT 0,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("user_id");

-- AlterTable
ALTER TABLE "votes" DROP COLUMN "user_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "comments_user_id_idx" ON "comments"("user_id");

-- CreateIndex
CREATE INDEX "communities_creator_id_idx" ON "communities"("creator_id");

-- CreateIndex
CREATE INDEX "community_memberships_user_id_idx" ON "community_memberships"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "community_memberships_user_id_community_id_key" ON "community_memberships"("user_id", "community_id");

-- CreateIndex
CREATE INDEX "moderators_user_id_idx" ON "moderators"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "moderators_user_id_community_id_key" ON "moderators"("user_id", "community_id");

-- CreateIndex
CREATE INDEX "notifications_recipient_user_id_idx" ON "notifications"("recipient_user_id");

-- CreateIndex
CREATE INDEX "notifications_sender_user_id_idx" ON "notifications"("sender_user_id");

-- CreateIndex
CREATE INDEX "notifications_recipient_user_id_is_read_created_at_idx" ON "notifications"("recipient_user_id", "is_read", "created_at" DESC);

-- CreateIndex
CREATE INDEX "posts_user_id_idx" ON "posts"("user_id");

-- CreateIndex
CREATE INDEX "saved_content_user_id_idx" ON "saved_content"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "saved_content_user_id_post_id_key" ON "saved_content"("user_id", "post_id");

-- CreateIndex
CREATE UNIQUE INDEX "saved_content_user_id_comment_id_key" ON "saved_content"("user_id", "comment_id");

-- CreateIndex
CREATE INDEX "user_unit_enrollments_user_id_idx" ON "user_unit_enrollments"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_unit_enrollments_user_id_unit_id_enrollment_year_enrol_key" ON "user_unit_enrollments"("user_id", "unit_id", "enrollment_year", "enrollment_semester");

-- CreateIndex
CREATE UNIQUE INDEX "votes_user_id_post_id_key" ON "votes"("user_id", "post_id");

-- CreateIndex
CREATE UNIQUE INDEX "votes_user_id_comment_id_key" ON "votes"("user_id", "comment_id");

-- AddForeignKey
ALTER TABLE "communities" ADD CONSTRAINT "communities_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "community_memberships" ADD CONSTRAINT "community_memberships_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moderators" ADD CONSTRAINT "moderators_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_unit_enrollments" ADD CONSTRAINT "user_unit_enrollments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_content" ADD CONSTRAINT "saved_content_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_recipient_user_id_fkey" FOREIGN KEY ("recipient_user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_sender_user_id_fkey" FOREIGN KEY ("sender_user_id") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
