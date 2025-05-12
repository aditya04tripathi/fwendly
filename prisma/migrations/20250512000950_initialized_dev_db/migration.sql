-- CreateEnum
CREATE TYPE "CommunityType" AS ENUM ('General', 'Campus', 'Faculty', 'Course', 'Unit', 'Interest_Group', 'Club_Society');

-- CreateEnum
CREATE TYPE "PostContentType" AS ENUM ('Text', 'Image', 'Link', 'Video');

-- CreateEnum
CREATE TYPE "VoteType" AS ENUM ('Upvote', 'Downvote');

-- CreateEnum
CREATE TYPE "MembershipRole" AS ENUM ('Member', 'Moderator', 'Admin');

-- CreateEnum
CREATE TYPE "EnrollmentStatus" AS ENUM ('Enrolled', 'Completed', 'Withdrawn');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('New_Comment_Reply', 'Post_Reply', 'Mention_In_Post', 'Mention_In_Comment', 'New_Post_In_Community', 'Upvote_Post', 'Upvote_Comment', 'Community_Invite', 'Moderator_Action');

-- CreateTable
CREATE TABLE "users" (
    "user_id" INTEGER NOT NULL DEFAULT 0,
    "monash_email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password_hash" TEXT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "profile_picture_url" TEXT,
    "bio" TEXT,
    "karma_points" INTEGER NOT NULL DEFAULT 0,
    "year_of_study" INTEGER NOT NULL,
    "is_verified_student" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "campus_id" TEXT,
    "faculty_id" TEXT,
    "course_id" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "campuses" (
    "campus_id" TEXT NOT NULL,
    "campus_name" TEXT NOT NULL,
    "location_details" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "campuses_pkey" PRIMARY KEY ("campus_id")
);

-- CreateTable
CREATE TABLE "faculties" (
    "faculty_id" TEXT NOT NULL,
    "faculty_name" TEXT NOT NULL,
    "faculty_abbreviation" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "faculties_pkey" PRIMARY KEY ("faculty_id")
);

-- CreateTable
CREATE TABLE "courses" (
    "course_code" TEXT NOT NULL,
    "course_name" TEXT NOT NULL,
    "course_description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "faculty_id" TEXT NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("course_code")
);

-- CreateTable
CREATE TABLE "units" (
    "unit_code" TEXT NOT NULL,
    "unit_name" TEXT NOT NULL,
    "unit_description" TEXT,
    "semester_offered" JSONB,
    "year_level" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "faculty_id" TEXT,

    CONSTRAINT "units_pkey" PRIMARY KEY ("unit_code")
);

-- CreateTable
CREATE TABLE "communities" (
    "community_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "description" TEXT,
    "community_type" "CommunityType" NOT NULL DEFAULT 'General',
    "profile_image_url" TEXT,
    "banner_image_url" TEXT,
    "is_private" BOOLEAN NOT NULL DEFAULT false,
    "rules" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "creator_id" INTEGER NOT NULL,
    "related_campus_id" TEXT,
    "related_faculty_id" TEXT,
    "related_course_id" TEXT,
    "related_unit_id" TEXT,

    CONSTRAINT "communities_pkey" PRIMARY KEY ("community_id")
);

-- CreateTable
CREATE TABLE "posts" (
    "post_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content_type" "PostContentType" NOT NULL,
    "text_content" TEXT,
    "media_url" TEXT,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "downvotes" INTEGER NOT NULL DEFAULT 0,
    "score" INTEGER NOT NULL DEFAULT 0,
    "flair_text" TEXT,
    "is_stickied" BOOLEAN NOT NULL DEFAULT false,
    "is_locked" BOOLEAN NOT NULL DEFAULT false,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "community_id" TEXT NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "comments" (
    "comment_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "downvotes" INTEGER NOT NULL DEFAULT 0,
    "score" INTEGER NOT NULL DEFAULT 0,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "post_id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "parent_comment_id" TEXT,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("comment_id")
);

-- CreateTable
CREATE TABLE "votes" (
    "vote_id" TEXT NOT NULL,
    "vote_type" "VoteType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "post_id" TEXT,
    "comment_id" TEXT,

    CONSTRAINT "votes_pkey" PRIMARY KEY ("vote_id")
);

-- CreateTable
CREATE TABLE "community_memberships" (
    "membership_id" TEXT NOT NULL,
    "role" "MembershipRole" NOT NULL DEFAULT 'Member',
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "community_id" TEXT NOT NULL,

    CONSTRAINT "community_memberships_pkey" PRIMARY KEY ("membership_id")
);

-- CreateTable
CREATE TABLE "moderators" (
    "moderator_id" TEXT NOT NULL,
    "permissions" JSONB,
    "appointed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "community_id" TEXT NOT NULL,

    CONSTRAINT "moderators_pkey" PRIMARY KEY ("moderator_id")
);

-- CreateTable
CREATE TABLE "user_unit_enrollments" (
    "enrollment_id" TEXT NOT NULL,
    "enrollment_year" INTEGER NOT NULL,
    "enrollment_semester" TEXT NOT NULL,
    "status" "EnrollmentStatus" NOT NULL DEFAULT 'Enrolled',
    "user_id" INTEGER NOT NULL,
    "unit_id" TEXT NOT NULL,

    CONSTRAINT "user_unit_enrollments_pkey" PRIMARY KEY ("enrollment_id")
);

-- CreateTable
CREATE TABLE "saved_content" (
    "saved_id" TEXT NOT NULL,
    "saved_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "post_id" TEXT,
    "comment_id" TEXT,

    CONSTRAINT "saved_content_pkey" PRIMARY KEY ("saved_id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "notification_id" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "content_preview" TEXT,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recipient_user_id" INTEGER NOT NULL,
    "sender_user_id" INTEGER,
    "related_post_id" TEXT,
    "related_comment_id" TEXT,
    "related_community_id" TEXT,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("notification_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_monash_email_key" ON "users"("monash_email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE INDEX "users_campus_id_idx" ON "users"("campus_id");

-- CreateIndex
CREATE INDEX "users_faculty_id_idx" ON "users"("faculty_id");

-- CreateIndex
CREATE INDEX "users_course_id_idx" ON "users"("course_id");

-- CreateIndex
CREATE INDEX "users_created_at_idx" ON "users"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "campuses_campus_name_key" ON "campuses"("campus_name");

-- CreateIndex
CREATE INDEX "campuses_created_at_idx" ON "campuses"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "faculties_faculty_name_key" ON "faculties"("faculty_name");

-- CreateIndex
CREATE INDEX "faculties_created_at_idx" ON "faculties"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "courses_course_code_key" ON "courses"("course_code");

-- CreateIndex
CREATE INDEX "courses_faculty_id_idx" ON "courses"("faculty_id");

-- CreateIndex
CREATE INDEX "courses_created_at_idx" ON "courses"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "units_unit_code_key" ON "units"("unit_code");

-- CreateIndex
CREATE INDEX "units_faculty_id_idx" ON "units"("faculty_id");

-- CreateIndex
CREATE INDEX "units_created_at_idx" ON "units"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "communities_name_key" ON "communities"("name");

-- CreateIndex
CREATE INDEX "communities_creator_id_idx" ON "communities"("creator_id");

-- CreateIndex
CREATE INDEX "communities_related_campus_id_idx" ON "communities"("related_campus_id");

-- CreateIndex
CREATE INDEX "communities_related_faculty_id_idx" ON "communities"("related_faculty_id");

-- CreateIndex
CREATE INDEX "communities_related_course_id_idx" ON "communities"("related_course_id");

-- CreateIndex
CREATE INDEX "communities_related_unit_id_idx" ON "communities"("related_unit_id");

-- CreateIndex
CREATE INDEX "communities_community_type_idx" ON "communities"("community_type");

-- CreateIndex
CREATE INDEX "communities_created_at_idx" ON "communities"("created_at");

-- CreateIndex
CREATE INDEX "posts_user_id_idx" ON "posts"("user_id");

-- CreateIndex
CREATE INDEX "posts_community_id_idx" ON "posts"("community_id");

-- CreateIndex
CREATE INDEX "posts_created_at_idx" ON "posts"("created_at");

-- CreateIndex
CREATE INDEX "posts_score_idx" ON "posts"("score");

-- CreateIndex
CREATE INDEX "posts_is_deleted_idx" ON "posts"("is_deleted");

-- CreateIndex
CREATE INDEX "comments_post_id_idx" ON "comments"("post_id");

-- CreateIndex
CREATE INDEX "comments_user_id_idx" ON "comments"("user_id");

-- CreateIndex
CREATE INDEX "comments_parent_comment_id_idx" ON "comments"("parent_comment_id");

-- CreateIndex
CREATE INDEX "comments_created_at_idx" ON "comments"("created_at");

-- CreateIndex
CREATE INDEX "comments_score_idx" ON "comments"("score");

-- CreateIndex
CREATE INDEX "comments_is_deleted_idx" ON "comments"("is_deleted");

-- CreateIndex
CREATE INDEX "votes_post_id_idx" ON "votes"("post_id");

-- CreateIndex
CREATE INDEX "votes_comment_id_idx" ON "votes"("comment_id");

-- CreateIndex
CREATE UNIQUE INDEX "votes_user_id_post_id_key" ON "votes"("user_id", "post_id");

-- CreateIndex
CREATE UNIQUE INDEX "votes_user_id_comment_id_key" ON "votes"("user_id", "comment_id");

-- CreateIndex
CREATE INDEX "community_memberships_user_id_idx" ON "community_memberships"("user_id");

-- CreateIndex
CREATE INDEX "community_memberships_community_id_idx" ON "community_memberships"("community_id");

-- CreateIndex
CREATE UNIQUE INDEX "community_memberships_user_id_community_id_key" ON "community_memberships"("user_id", "community_id");

-- CreateIndex
CREATE INDEX "moderators_user_id_idx" ON "moderators"("user_id");

-- CreateIndex
CREATE INDEX "moderators_community_id_idx" ON "moderators"("community_id");

-- CreateIndex
CREATE UNIQUE INDEX "moderators_user_id_community_id_key" ON "moderators"("user_id", "community_id");

-- CreateIndex
CREATE INDEX "user_unit_enrollments_user_id_idx" ON "user_unit_enrollments"("user_id");

-- CreateIndex
CREATE INDEX "user_unit_enrollments_unit_id_idx" ON "user_unit_enrollments"("unit_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_unit_enrollments_user_id_unit_id_enrollment_year_enrol_key" ON "user_unit_enrollments"("user_id", "unit_id", "enrollment_year", "enrollment_semester");

-- CreateIndex
CREATE INDEX "saved_content_user_id_idx" ON "saved_content"("user_id");

-- CreateIndex
CREATE INDEX "saved_content_post_id_idx" ON "saved_content"("post_id");

-- CreateIndex
CREATE INDEX "saved_content_comment_id_idx" ON "saved_content"("comment_id");

-- CreateIndex
CREATE UNIQUE INDEX "saved_content_user_id_post_id_key" ON "saved_content"("user_id", "post_id");

-- CreateIndex
CREATE UNIQUE INDEX "saved_content_user_id_comment_id_key" ON "saved_content"("user_id", "comment_id");

-- CreateIndex
CREATE INDEX "notifications_recipient_user_id_idx" ON "notifications"("recipient_user_id");

-- CreateIndex
CREATE INDEX "notifications_sender_user_id_idx" ON "notifications"("sender_user_id");

-- CreateIndex
CREATE INDEX "notifications_related_post_id_idx" ON "notifications"("related_post_id");

-- CreateIndex
CREATE INDEX "notifications_related_comment_id_idx" ON "notifications"("related_comment_id");

-- CreateIndex
CREATE INDEX "notifications_related_community_id_idx" ON "notifications"("related_community_id");

-- CreateIndex
CREATE INDEX "notifications_type_idx" ON "notifications"("type");

-- CreateIndex
CREATE INDEX "notifications_is_read_idx" ON "notifications"("is_read");

-- CreateIndex
CREATE INDEX "notifications_created_at_idx" ON "notifications"("created_at");

-- CreateIndex
CREATE INDEX "notifications_recipient_user_id_is_read_created_at_idx" ON "notifications"("recipient_user_id", "is_read", "created_at" DESC);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_campus_id_fkey" FOREIGN KEY ("campus_id") REFERENCES "campuses"("campus_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_faculty_id_fkey" FOREIGN KEY ("faculty_id") REFERENCES "faculties"("faculty_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("course_code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_faculty_id_fkey" FOREIGN KEY ("faculty_id") REFERENCES "faculties"("faculty_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "units" ADD CONSTRAINT "units_faculty_id_fkey" FOREIGN KEY ("faculty_id") REFERENCES "faculties"("faculty_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "communities" ADD CONSTRAINT "communities_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "communities" ADD CONSTRAINT "communities_related_campus_id_fkey" FOREIGN KEY ("related_campus_id") REFERENCES "campuses"("campus_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "communities" ADD CONSTRAINT "communities_related_faculty_id_fkey" FOREIGN KEY ("related_faculty_id") REFERENCES "faculties"("faculty_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "communities" ADD CONSTRAINT "communities_related_course_id_fkey" FOREIGN KEY ("related_course_id") REFERENCES "courses"("course_code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "communities" ADD CONSTRAINT "communities_related_unit_id_fkey" FOREIGN KEY ("related_unit_id") REFERENCES "units"("unit_code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "communities"("community_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("post_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parent_comment_id_fkey" FOREIGN KEY ("parent_comment_id") REFERENCES "comments"("comment_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("post_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "comments"("comment_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "community_memberships" ADD CONSTRAINT "community_memberships_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "community_memberships" ADD CONSTRAINT "community_memberships_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "communities"("community_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moderators" ADD CONSTRAINT "moderators_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moderators" ADD CONSTRAINT "moderators_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "communities"("community_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_unit_enrollments" ADD CONSTRAINT "user_unit_enrollments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_unit_enrollments" ADD CONSTRAINT "user_unit_enrollments_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "units"("unit_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_content" ADD CONSTRAINT "saved_content_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_content" ADD CONSTRAINT "saved_content_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("post_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_content" ADD CONSTRAINT "saved_content_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "comments"("comment_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_recipient_user_id_fkey" FOREIGN KEY ("recipient_user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_sender_user_id_fkey" FOREIGN KEY ("sender_user_id") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_related_post_id_fkey" FOREIGN KEY ("related_post_id") REFERENCES "posts"("post_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_related_comment_id_fkey" FOREIGN KEY ("related_comment_id") REFERENCES "comments"("comment_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_related_community_id_fkey" FOREIGN KEY ("related_community_id") REFERENCES "communities"("community_id") ON DELETE SET NULL ON UPDATE CASCADE;
