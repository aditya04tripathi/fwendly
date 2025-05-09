<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Database Schema

The database schema is defined using Prisma and includes the following entities:

- **User**: Represents users of the application. Stores profile information, authentication details, and associations with other entities like posts, comments, communities, etc.
- **Campus**: Represents physical university campuses.
- **Faculty**: Represents academic faculties within the university.
- **Course**: Represents academic courses offered by faculties.
- **Unit**: Represents individual units of study within courses or faculties.
- **Community**: Represents user-created communities. These can be general or linked to specific campuses, faculties, courses, or units.
- **Post**: Represents posts made by users within communities. Posts can be text, images, links, or videos.
- **Comment**: Represents comments made by users on posts. Comments can be nested.
- **Vote**: Represents upvotes or downvotes on posts or comments by users.
- **CommunityMembership**: Manages users' membership status and roles (member, moderator, admin) within communities.
- **Moderator**: Defines users who have moderation privileges within specific communities.
- **UserUnitEnrollment**: Tracks user enrollment in specific units, including year, semester, and status.
- **SavedContent**: Allows users to save posts or comments for later viewing.
- **Notification**: Stores notifications for users related to various events like new comments, post replies, mentions, upvotes, community invites, etc.

The schema utilizes CUIDs for primary keys and includes various enums to define types for entities like `CommunityType`, `PostContentType`, `VoteType`, etc. Indexes are defined on frequently queried fields and foreign keys to optimize database performance.

### Detailed Entity Descriptions

Below is a more detailed breakdown of each entity in the Prisma schema:

- **`User`**

  - **Purpose**: Represents users of the application.
  - **Key Fields**: `user_id` (Primary Key, CUID, Not Nullable), `monash_email` (Unique, Not Nullable), `username` (Unique, Not Nullable), `password_hash` (Not Nullable), `first_name` (Nullable), `last_name` (Nullable), `profile_picture_url` (Nullable), `bio` (Nullable), `karma_points` (Not Nullable, Default: 0), `year_of_study` (Nullable), `is_verified_student` (Not Nullable, Default: false).
  - **Relationships**:
    - Can be associated with a `Campus`, `Faculty`, and `Course`.
    - Creator of multiple `Community` entities.
    - Author of multiple `Post` and `Comment` entities.
    - Can have multiple `Vote` entries.
    - Associated with multiple `CommunityMembership` records.
    - Can be a `Moderator` in multiple communities.
    - Can have multiple `UserUnitEnrollment` records.
    - Can save multiple `SavedContent` items.
    - Recipient and sender of `Notification` entities.

- **`Campus`**

  - **Purpose**: Represents physical university campuses.
  - **Key Fields**: `campus_id` (Primary Key, CUID, Not Nullable), `campus_name` (Unique, Not Nullable), `location_details` (Nullable).
  - **Relationships**:
    - Multiple `User` entities can belong to a campus.
    - Multiple `Community` entities can be related to a campus.

- **`Faculty`**

  - **Purpose**: Represents academic faculties within the university.
  - **Key Fields**: `faculty_id` (Primary Key, CUID, Not Nullable), `faculty_name` (Unique, Not Nullable), `faculty_abbreviation` (Nullable).
  - **Relationships**:
    - Multiple `User` entities can belong to a faculty.
    - A faculty can have multiple `Course` and `Unit` entities.
    - Multiple `Community` entities can be related to a faculty.

- **`Course`**

  - **Purpose**: Represents academic courses offered by faculties.
  - **Key Fields**: `course_id` (Primary Key, CUID, Not Nullable), `course_code` (Unique, Not Nullable), `course_name` (Not Nullable), `course_description` (Nullable).
  - **Relationships**:
    - Belongs to one `Faculty`.
    - Multiple `User` entities can be enrolled in a course.
    - Multiple `Community` entities can be related to a course.

- **`Unit`**

  - **Purpose**: Represents individual units of study within courses or faculties.
  - **Key Fields**: `unit_id` (Primary Key, CUID, Not Nullable), `unit_code` (Unique, Not Nullable), `unit_name` (Not Nullable), `unit_description` (Nullable), `semester_offered` (Nullable), `year_level` (Nullable).
  - **Relationships**:
    - Optionally belongs to one `Faculty`.
    - Multiple `Community` entities can be related to a unit.
    - Associated with multiple `UserUnitEnrollment` records.

- **`Community`**

  - **Purpose**: Represents user-created communities, which can be general or linked to specific academic entities.
  - **Key Fields**: `community_id` (Primary Key, CUID, Not Nullable), `name` (Unique, Not Nullable), `display_name` (Not Nullable), `description` (Nullable), `community_type` (Enum, Not Nullable, Default: `General`), `is_private` (Not Nullable, Default: false), `rules` (Nullable).
  - **Relationships**:
    - Created by one `User`.
    - Optionally related to one `Campus`, `Faculty`, `Course`, or `Unit`.
    - Contains multiple `Post` entities.
    - Has multiple `CommunityMembership` records.
    - Can have multiple `Moderator` users.
    - Source of `Notification` entities.

- **`Post`**

  - **Purpose**: Represents posts made by users within communities.
  - **Key Fields**: `post_id` (Primary Key, CUID, Not Nullable), `title` (Not Nullable), `content_type` (Enum, Not Nullable), `text_content` (Nullable), `media_url` (Nullable), `upvotes` (Not Nullable, Default: 0), `downvotes` (Not Nullable, Default: 0), `score` (Not Nullable, Default: 0), `is_deleted` (Not Nullable, Default: false).
  - **Relationships**:
    - Authored by one `User`.
    - Belongs to one `Community`.
    - Can have multiple `Comment` entities.
    - Can receive multiple `Vote` entries.
    - Can be saved by multiple users via `SavedContent`.
    - Can trigger `Notification` entities.

- **`Comment`**

  - **Purpose**: Represents comments made by users on posts; supports nested replies.
  - **Key Fields**: `comment_id` (Primary Key, CUID, Not Nullable), `content` (Not Nullable), `upvotes` (Not Nullable, Default: 0), `downvotes` (Not Nullable, Default: 0), `score` (Not Nullable, Default: 0), `is_deleted` (Not Nullable, Default: false).
  - **Relationships**:
    - Belongs to one `Post`.
    - Authored by one `User`.
    - Can have a `parent_comment` for threaded replies.
    - Can receive multiple `Vote` entries.
    - Can be saved by multiple users via `SavedContent`.
    - Can trigger `Notification` entities.

- **`Vote`**

  - **Purpose**: Represents upvotes or downvotes on posts or comments.
  - **Key Fields**: `vote_id` (Primary Key, CUID, Not Nullable), `vote_type` (Enum, Not Nullable).
  - **Relationships**:
    - Made by one `User`.
    - Associated with either one `Post` or one `Comment`.
  - **Constraints**: A user can vote only once per post (`UserPostVote`) and once per comment (`UserCommentVote`).

- **`CommunityMembership`**

  - **Purpose**: Manages users' membership status and roles within communities.
  - **Key Fields**: `membership_id` (Primary Key, CUID, Not Nullable), `role` (Enum, Not Nullable, Default: `Member`).
  - **Relationships**:
    - Links one `User` to one `Community`.
  - **Constraints**: A user can have only one membership record per community.

- **`Moderator`**

  - **Purpose**: Defines users who have moderation privileges within specific communities.
  - **Key Fields**: `moderator_id` (Primary Key, CUID, Not Nullable), `permissions` (JSON, Nullable).
  - **Relationships**:
    - Links one `User` (the moderator) to one `Community`.
  - **Constraints**: A user can have only one moderator record per community.

- **`UserUnitEnrollment`**

  - **Purpose**: Tracks user enrollment in specific units, including academic session details.
  - **Key Fields**: `enrollment_id` (Primary Key, CUID, Not Nullable), `enrollment_year` (Not Nullable), `enrollment_semester` (Not Nullable), `status` (Enum, Not Nullable, Default: `Enrolled`).
  - **Relationships**:
    - Links one `User` to one `Unit`.
  - **Constraints**: A user can have only one enrollment record per unit, year, and semester.

- **`SavedContent`**

  - **Purpose**: Allows users to save posts or comments for later viewing.
  - **Key Fields**: `saved_id` (Primary Key, CUID, Not Nullable), `saved_at` (Not Nullable, Default: now()).
  - **Relationships**:
    - Belongs to one `User`.
    - Associated with either one `Post` or one `Comment`.
  - **Constraints**: A user can save a specific post (`UserSavedPost`) or comment (`UserSavedComment`) only once.

- **`Notification`**
  - **Purpose**: Stores notifications for users related to various application events.
  - **Key Fields**: `notification_id` (Primary Key, CUID, Not Nullable), `type` (Enum, Not Nullable), `content_preview` (Nullable), `is_read` (Not Nullable, Default: false).
  - **Relationships**:
    - Sent to one `User` (recipient).
    - Optionally sent by another `User` (sender).
    - Optionally related to a `Post`, `Comment`, or `Community`.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
