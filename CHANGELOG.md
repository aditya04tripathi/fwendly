# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Implemented JWT strategy and guard for secure user authentication.
- Added user service for handling user-related operations, including password reset and account deletion.
- Introduced decorators for retrieving user information from requests.
- Created user module and controller for managing user-related endpoints.
- Established database migrations for initializing the development database schema.

### Changed

- Refactored authentication module:
  - Removed unused JWT service and module, integrating JWT functionality directly into the auth module.
  - Simplified auth controller by removing forgot password and delete account endpoints, delegating functionality to the user service.
- Updated user DTOs to reflect changes in password handling.
- Modified Prisma service to utilize environment variables for database connection.
- Enhanced user model with additional fields and constraints.

## [0.2.0] - 2025-05-10

### Changed

- **Database Schema (Prisma Migrations)**:
  - Modified the primary key for the `courses` table from a CUID (`course_id`) to the existing `course_code` field, making `course_code` the unique identifier.
  - Modified the primary key for the `units` table from a CUID (`unit_id`) to the existing `unit_code` field, making `unit_code` the unique identifier.
  - Updated `User` model: The `first_name`, `last_name`, and `year_of_study` fields were made non-nullable, enforcing data presence.
  - Altered `Unit` model: The `semester_offered` field type was changed from `String?` to `Json?` (mapped to `JSONB` in PostgreSQL) to allow for more structured and flexible semester availability data.

## [0.1.0] - 2025-05-09

### Added

- Initial commit with basic NestJS setup.
- **Database Schema (Prisma)**:
  - Defined core entities: `User`, `Campus`, `Faculty`, `Course`, `Unit`, `Community`, `Post`, `Comment`, `Vote`, `CommunityMembership`, `Moderator`, `UserUnitEnrollment`, `SavedContent`, `Notification`.
  - Implemented various enums (`CommunityType`, `PostContentType`, `VoteType`, `MembershipRole`, `EnrollmentStatus`, `NotificationType`) to govern specific field values.
  - Established relationships between entities using foreign keys.
  - Mapped Prisma models to PostgreSQL table names (e.g., `User` to `users`).
  - Added database indexes on foreign keys, frequently filtered fields, and timestamps to optimize query performance.
  - Implemented compound unique constraints on models such as `Vote` (user/post, user/comment), `CommunityMembership` (user/community), `Moderator` (user/community), `UserUnitEnrollment` (user/unit/year/semester), and `SavedContent` (user/post, user/comment) to enforce specific data integrity rules.
  - Specified referential actions (e.g., `onDelete: NoAction, onUpdate: NoAction` for the `Comment.parent_comment` self-relation) for certain relationships to precisely control behavior on related data modifications or deletions.
- **Authentication**: Implemented JWT (JSON Web Token) authentication.
- **Authentication**: Added forgot password functionality.
- **Authentication**: Implemented account deletion functionality (via `DELETE /auth/delete-account` endpoint).
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
