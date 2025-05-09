# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2025-05-09

### Added

- Initial commit with basic NestJS setup.
- Prisma schema definition for core entities: User, Campus, Faculty, Course, Unit, Community, Post, Comment, Vote, CommunityMembership, Moderator, UserUnitEnrollment, SavedContent, Notification.
- Enums for various types: CommunityType, PostContentType, VoteType, MembershipRole, EnrollmentStatus, NotificationType.

### Changed

- Updated all ID fields in Prisma schema to use `String @id @default(cuid())` instead of `Int @id @default(autoincrement())`.
- Mapped Prisma models to database tables using `@@map`.
- Added database indexes to foreign keys, frequently filtered fields, and timestamps in Prisma schema for improved query performance.
