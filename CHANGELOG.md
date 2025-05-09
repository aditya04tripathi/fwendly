# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2025-05-09

### Added

- Initial commit with basic NestJS setup.
- **Database Schema (Prisma)**:
  - Defined core entities: `User`, `Campus`, `Faculty`, `Course`, `Unit`, `Community`, `Post`, `Comment`, `Vote`, `CommunityMembership`, `Moderator`, `UserUnitEnrollment`, `SavedContent`, `Notification`.
  - Implemented various enums (`CommunityType`, `PostContentType`, `VoteType`, `MembershipRole`, `EnrollmentStatus`, `NotificationType`) to govern specific field values.
  - Established relationships between entities using foreign keys.
  - Mapped Prisma models to PostgreSQL table names (e.g., `User` to `users`).
  - Added database indexes on foreign keys, frequently filtered fields, and timestamps to optimize query performance.
- **Authentication**: Implemented JWT (JSON Web Token) authentication.
- **Authentication**: Added forgot password functionality.
- **JWT**: Created a dedicated JWT module and service for token generation and validation.
- **API**: Integrated Swagger for API documentation.

### Changed

- **Primary Key Strategy**:
  - Standardized primary keys for most entities to use `String @id @default(cuid())` (e.g., `Campus.campus_id`, `Post.post_id`).
  - **Exception for User**: Modified the `User.user_id` primary key to be `Int @id @default(0)`. Consequently, all foreign keys referencing `User.user_id` in other models (e.g., `Post.user_id`, `Community.creator_id`) were updated to `Int`. This change was made after an initial CUID string setup for `User.user_id`.
- **User Model**: Clarified/updated that `first_name`, `last_name`, and `year_of_study` fields are non-nullable.
- **Authentication**: Improved error handling and response messages in the authentication module.

### Docs

- Updated `README.md` to include detailed nullability (nullable/not nullable) and default value information for all key fields in the database schema entities.
