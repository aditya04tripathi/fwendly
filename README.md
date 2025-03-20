# Monash Fwendly

## Finding Balance in University Life

In today's competitive academic environment at Monash University, students often find themselves trapped in a relentless cycle of lectures, assignments, exams, and grades. The intense focus on academic performance can lead to isolation and a lack of meaningful social connections.

**Monash Fwendly** was born from a simple observation: it is really hard to find friends at Monash, as everyone is too busy with academics, units, grades, and assignments. It's time to focus on life beyond the classroom.

Our platform bridges this gap by connecting students based on shared interests, courses, free time slots, and student types, creating a vibrant community where academic pursuits and social connections coexist harmoniously.

## Project Overview

Monash Fwendly is a comprehensive full-stack web application designed specifically for Monash University students. It addresses the unique challenges of forming connections in a large university environment where academic pressures often overshadow social opportunities.

The platform enables students to:

- Discover peers with similar courses, interests, and free time availability
- Create and join campus events tailored to specific interests
- Build a personalized academic and social profile
- Connect with students across different faculties, courses, and backgrounds
- Develop meaningful relationships that enhance the university experience

## Key Features

### User Management System

- **User Registration & Authentication**: Secure signup and login functionality
- **Comprehensive User Profiles**: Detailed profiles showcasing academic and personal information
- **Follow/Unfollow Mechanism**: Connect with peers with similar interests
- **Profile Customization**: Update personal and academic information as it changes

### Academic Information Management

- **Course Management**: Track and display current course enrollment
- **Unit Tracking**: Connect with students taking the same units
- **Timeline Management**: Start and end years for course planning
- **Student Type Classification**: Connect based on student status (Domestic, International, Transfer, Exchange)

### Advanced Events System

- **Event Creation & Hosting**: Organize gatherings, study sessions, or social events
- **Event Discovery**: Find events based on interests, timing, and locations
- **Interactive Event Participation**: Join, leave, and track event attendance
- **Rating & Review System**: Provide feedback on events attended
- **Comment System**: Engage in discussions about upcoming or past events
- **Multi-dimensional Categorization**: Filter events by types and tags
- **Visual Content**: Support for event images and media

### Social Networking Features

- **Interest-based Connections**: Find people with common hobbies and activities
- **Academic Networking**: Connect with peers in the same courses and units
- **Free Time Matching**: Find friends available during your free time slots
- **Following System**: Keep track of friends and their activities
- **Event-based Social Interactions**: Meet new people through shared event interests
- **Community Building**: Form groups around shared interests and activities

### Time Management Features

- **Free Slot Management**: Indicate when you're available to hang out
- **Event Duration Tracking**: Plan your time effectively around events
- **Academic/Social Balance**: Find time for social activities between academic commitments

## Technical Architecture

### Client Side (Next.js)

- **Framework**: Next.js 14 with App Router for optimized routing and rendering
- **Language**: TypeScript for enhanced type safety and developer experience
- **State Management**: Context API for global state management
- **UI/UX**: Responsive design with mobile-first approach
- **Styling**: Modular CSS with component-based styling
- **Optimization**: Server components for improved performance

### Server Side (Express.js/Node.js)

- **API Framework**: Express.js for robust API development
- **Database**: MongoDB with Mongoose ODM for flexible data modeling
- **Authentication**: JWT-based authentication system
- **Security**: Password hashing with bcryptjs
- **Architecture**: Modular design with feature-based organization
- **Error Handling**: Comprehensive error management system

## Comprehensive Data Models

### User Model

```javascript
{
  name: String,               // User's full name
  email: String,              // Unique email for authentication
  hashedPassword: String,     // Securely stored password
  course: ObjectId,           // Reference to course
  startYear: Number,          // Course start year
  endYear: Number,            // Expected graduation year
  studentType: [ObjectId],    // Student categories (Domestic/International/etc.)
  interests: [ObjectId],      // User's personal interests
  units: [ObjectId],          // Current enrolled units
  freeSlots: [ObjectId],      // Available time slots
  eventsHosted: [ObjectId],   // Events created by user
  eventsAttended: [ObjectId], // Events the user joined
  followers: [ObjectId],      // Users following this user
  following: [ObjectId]       // Users this user follows
}
```

### Event Model

```javascript
{
  name: String,               // Event title
  venue: String,              // Location of the event
  time: String,               // When the event starts
  type: [ObjectId],           // Categories of the event
  attendees: [ObjectId],      // Users attending
  durationMinutes: Number,    // How long the event lasts
  isEnded: Boolean,           // Whether the event is over
  host: ObjectId,             // User hosting the event
  rating: Number,             // Average rating of the event
  comments: [                 // User comments about the event
    {
      user: ObjectId,
      comment: String
    }
  ],
  images: [String],           // Photo URLs for the event
  tags: [ObjectId]            // Tags for easier discovery
}
```

### Course Model

```javascript
{
  name: String,               // Full course name
  code: String,               // Unique course code
  people: [ObjectId]          // Students enrolled in this course
}
```

### Unit Model

```javascript
{
  name: String,               // Unit name
  code: String,               // Unique unit code
  people: [ObjectId]          // Students taking this unit
}
```

### Free Slot Model

```javascript
{
  name: String,               // Time slot description
  code: String,               // Unique identifier
  people: [ObjectId]          // Users available during this time
}
```

### Interest Model

```javascript
{
  name: String,               // Interest name
  events: [ObjectId]          // Events related to this interest
}
```

### Student Type Model

```javascript
{
  name: String,               // Type (Domestic, International, etc.)
  people: [ObjectId]          // Users with this student type
}
```

### Tag Model

```javascript
{
  name: String,               // Tag name
  events: [ObjectId]          // Events with this tag
}
```

### Event Type Model

```javascript
{
  name: String,               // Type name
  events: [ObjectId]          // Events of this type
}
```

## Project Structure

```
monash_fwendly/
├── client/                  # Frontend Next.js application
│   ├── app/                 # App router pages and layouts
│   │   ├── (auth)/          # Authentication related pages
│   │   ├── dashboard/       # User dashboard
│   │   ├── events/          # Event browsing and management
│   │   ├── profile/         # User profile pages
│   │   ├── search/          # Search functionality
│   │   └── settings/        # User settings
│   ├── components/          # Reusable UI components
│   │   ├── auth/            # Authentication components
│   │   ├── events/          # Event-related components
│   │   ├── layout/          # Layout components (header, footer, etc.)
│   │   ├── profile/         # Profile components
│   │   └── ui/              # Basic UI elements
│   ├── lib/                 # Client-side utilities
│   │   ├── api/             # API client functions
│   │   ├── hooks/           # Custom React hooks
│   │   ├── context/         # Context providers
│   │   └── utils/           # Helper functions
│   ├── public/              # Static assets
│   └── styles/              # Global styles
│
├── server/                  # Backend Express application
│   ├── modules/             # Feature modules
│   │   ├── user/            # User management
│   │   │   ├── model.js     # User data model
│   │   │   ├── controller.js # User business logic
│   │   │   └── routes.js    # User API endpoints
│   │   ├── event/           # Event management
│   │   │   ├── model.js     # Event data model
│   │   │   ├── controller.js # Event business logic
│   │   │   └── routes.js    # Event API endpoints
│   │   ├── course/          # Course management
│   │   │   ├── model.js     # Course data model
│   │   │   ├── controller.js # Course business logic
│   │   │   └── routes.js    # Course API endpoints
│   │   ├── unit/            # Unit management
│   │   │   ├── model.js     # Unit data model
│   │   │   ├── controller.js # Unit business logic
│   │   │   └── routes.js    # Unit API endpoints
│   │   ├── free-slot/       # Free time slot management
│   │   │   ├── model.js     # Free slot data model
│   │   │   ├── controller.js # Free slot business logic
│   │   │   └── routes.js    # Free slot API endpoints
│   │   ├── interest/        # Interest management
│   │   │   ├── model.js     # Interest data model
│   │   │   ├── controller.js # Interest business logic
│   │   │   └── routes.js    # Interest API endpoints
│   │   ├── student-type/    # Student type management
│   │   │   ├── model.js     # Student type data model
│   │   │   ├── controller.js # Student type business logic
│   │   │   └── routes.js    # Student type API endpoints
│   │   ├── tag/             # Tag management
│   │   │   ├── model.js     # Tag data model
│   │   │   ├── controller.js # Tag business logic
│   │   │   └── routes.js    # Tag API endpoints
│   │   └── event-type/      # Event type management
│   │       ├── model.js     # Event type data model
│   │       ├── controller.js # Event type business logic
│   │       └── routes.js    # Event type API endpoints
│   ├── config/              # Configuration files
│   │   ├── db.js            # Database configuration
│   │   └── env.js           # Environment variables
│   ├── middleware/          # Express middleware
│   │   ├── auth.js          # Authentication middleware
│   │   ├── error.js         # Error handling middleware
│   │   └── validation.js    # Request validation middleware
│   ├── utils/               # Utility functions
│   └── server.js            # Main server entry point
```

## Complete API Endpoints Documentation

### User Management

| Endpoint                  | Method | Description              | Request Body                                                                          | Response        |
| ------------------------- | ------ | ------------------------ | ------------------------------------------------------------------------------------- | --------------- |
| `/api/users/signup`       | POST   | Register new user        | `{name, email, password, course, startYear, endYear}`                                 | User object     |
| `/api/users/login`        | POST   | Authenticate user        | `{email, password}`                                                                   | User object     |
| `/api/users/me`           | GET    | Get current user profile | Query param: `userId`                                                                 | User object     |
| `/api/users/:id`          | GET    | Get user by ID           | -                                                                                     | User object     |
| `/api/users`              | GET    | Get all users            | -                                                                                     | Array of users  |
| `/api/users`              | POST   | Create new user          | `{name, email, password}`                                                             | User object     |
| `/api/users/:id`          | PUT    | Update user profile      | `{name, email, course, startYear, endYear, studentType, interests, units, freeSlots}` | Updated user    |
| `/api/users/:id`          | DELETE | Delete user account      | -                                                                                     | Success message |
| `/api/users/:id/follow`   | POST   | Follow a user            | `{followerId}`                                                                        | Success message |
| `/api/users/:id/unfollow` | POST   | Unfollow a user          | `{followerId}`                                                                        | Success message |

### Event Management

| Endpoint                   | Method | Description          | Request Body                                                        | Response        |
| -------------------------- | ------ | -------------------- | ------------------------------------------------------------------- | --------------- |
| `/api/events`              | GET    | Get all events       | -                                                                   | Array of events |
| `/api/events/:id`          | GET    | Get event by ID      | -                                                                   | Event object    |
| `/api/events`              | POST   | Create new event     | `{name, venue, time, host}`                                         | Event object    |
| `/api/events/:id`          | PUT    | Update event         | `{name, venue, time, type, durationMinutes, isEnded, rating, tags}` | Updated event   |
| `/api/events/:id`          | DELETE | Delete event         | -                                                                   | Success message |
| `/api/events/:id/comments` | POST   | Add comment to event | `{user, comment}`                                                   | Updated event   |
| `/api/events/:id/join`     | POST   | Join an event        | `{userId}`                                                          | Success message |
| `/api/events/:id/leave`    | POST   | Leave an event       | `{userId}`                                                          | Success message |

### Course Management

| Endpoint           | Method | Description       | Request Body   | Response         |
| ------------------ | ------ | ----------------- | -------------- | ---------------- |
| `/api/courses`     | GET    | Get all courses   | -              | Array of courses |
| `/api/courses/:id` | GET    | Get course by ID  | -              | Course object    |
| `/api/courses`     | POST   | Create new course | `{name, code}` | Course object    |
| `/api/courses/:id` | PUT    | Update course     | `{name, code}` | Updated course   |
| `/api/courses/:id` | DELETE | Delete course     | -              | Success message  |

### Unit Management

| Endpoint         | Method | Description     | Request Body   | Response        |
| ---------------- | ------ | --------------- | -------------- | --------------- |
| `/api/units`     | GET    | Get all units   | -              | Array of units  |
| `/api/units/:id` | GET    | Get unit by ID  | -              | Unit object     |
| `/api/units`     | POST   | Create new unit | `{name, code}` | Unit object     |
| `/api/units/:id` | PUT    | Update unit     | `{name, code}` | Updated unit    |
| `/api/units/:id` | DELETE | Delete unit     | -              | Success message |

### Free Slot Management

| Endpoint              | Method | Description          | Request Body   | Response            |
| --------------------- | ------ | -------------------- | -------------- | ------------------- |
| `/api/free-slots`     | GET    | Get all free slots   | -              | Array of free slots |
| `/api/free-slots/:id` | GET    | Get free slot by ID  | -              | Free slot object    |
| `/api/free-slots`     | POST   | Create new free slot | `{name, code}` | Free slot object    |
| `/api/free-slots/:id` | PUT    | Update free slot     | `{name, code}` | Updated free slot   |
| `/api/free-slots/:id` | DELETE | Delete free slot     | -              | Success message     |

### Interest Management

| Endpoint             | Method | Description         | Request Body | Response           |
| -------------------- | ------ | ------------------- | ------------ | ------------------ |
| `/api/interests`     | GET    | Get all interests   | -            | Array of interests |
| `/api/interests/:id` | GET    | Get interest by ID  | -            | Interest object    |
| `/api/interests`     | POST   | Create new interest | `{name}`     | Interest object    |
| `/api/interests/:id` | PUT    | Update interest     | `{name}`     | Updated interest   |
| `/api/interests/:id` | DELETE | Delete interest     | -            | Success message    |

### Student Type Management

| Endpoint                 | Method | Description             | Request Body | Response               |
| ------------------------ | ------ | ----------------------- | ------------ | ---------------------- |
| `/api/student-types`     | GET    | Get all student types   | -            | Array of student types |
| `/api/student-types/:id` | GET    | Get student type by ID  | -            | Student type object    |
| `/api/student-types`     | POST   | Create new student type | `{name}`     | Student type object    |
| `/api/student-types/:id` | PUT    | Update student type     | `{name}`     | Updated student type   |
| `/api/student-types/:id` | DELETE | Delete student type     | -            | Success message        |

### Tag Management

| Endpoint        | Method | Description    | Request Body | Response        |
| --------------- | ------ | -------------- | ------------ | --------------- |
| `/api/tags`     | GET    | Get all tags   | -            | Array of tags   |
| `/api/tags/:id` | GET    | Get tag by ID  | -            | Tag object      |
| `/api/tags`     | POST   | Create new tag | `{name}`     | Tag object      |
| `/api/tags/:id` | PUT    | Update tag     | `{name}`     | Updated tag     |
| `/api/tags/:id` | DELETE | Delete tag     | -            | Success message |

### Event Type Management

| Endpoint               | Method | Description           | Request Body | Response             |
| ---------------------- | ------ | --------------------- | ------------ | -------------------- |
| `/api/event-types`     | GET    | Get all event types   | -            | Array of event types |
| `/api/event-types/:id` | GET    | Get event type by ID  | -            | Event type object    |
| `/api/event-types`     | POST   | Create new event type | `{name}`     | Event type object    |
| `/api/event-types/:id` | PUT    | Update event type     | `{name}`     | Updated event type   |
| `/api/event-types/:id` | DELETE | Delete event type     | -            | Success message      |

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB database (local or Atlas)
- Git

### Installation

#### Clone the Repository

```bash
# Clone the repository
git clone https://github.com/your-username/monash_fwendly.git

# Navigate to project directory
cd monash_fwendly
```

#### Client Setup

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Create .env.local file with required environment variables
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local

# Start development server
npm run dev
```

#### Server Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file with required environment variables
echo "MONGODB_URI=your_mongodb_connection_string
PORT=5000" > .env

# Start development server
npm run dev
```

## Application Workflows

### Student Registration and Onboarding

1. Student creates an account with basic information
2. Student completes profile with academic details:
   - Course and year level
   - Units currently enrolled in
   - Student type (Domestic/International)
3. Student adds personal interests and free time slots
4. Platform suggests potential connections and events

### Event Creation and Participation

1. User creates an event with details:
   - Name, venue, time
   - Type and relevant tags
   - Duration and other specifics
2. Event becomes visible to other users
3. Users can join the event, adding it to their attended events
4. After the event, participants can rate and comment
5. Host can update event details or mark it as ended

### Social Connection Process

1. User discovers others through:
   - Shared courses/units
   - Common interests
   - Matching free time slots
   - Event participation
2. User follows other users
3. Followed users may follow back
4. Connected users see each other's hosted events prominently

## Development Guidelines

### Coding Standards

- Follow JavaScript Standard Style for consistency
- Use meaningful variable and function names
- Write comments for complex logic
- Create reusable components and utility functions

### Git Workflow

- Main branch contains production-ready code
- Develop branch for ongoing development
- Feature branches for new functionality
- Pull requests require code review before merging

### Testing

- Write unit tests for critical functionality
- Perform integration tests for API endpoints
- Conduct user testing for UI/UX improvements

## Contributing

Contributions to Monash Fwendly are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Areas

- New feature development
- Bug fixes and improvements
- Documentation enhancements
- UI/UX refinements
- Performance optimizations

## Deployment

### Client Deployment

The Next.js client can be deployed using Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy with default settings

### Server Deployment

The Express.js server can be deployed using platforms like Heroku:

1. Create a new Heroku application
2. Connect your GitHub repository
3. Configure environment variables
4. Deploy the application

## Future Enhancements

- **Real-time Notifications**: Implement WebSockets for live updates
- **Mobile Application**: Develop native mobile apps for iOS and Android
- **AI-powered Matching**: Implement smart algorithms for better friend suggestions
- **Calendar Integration**: Sync with university timetables
- **LMS Integration**: Connect with Moodle for automatic unit enrollment
- **Advanced Analytics**: Provide insights on social connections and event participation

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Monash University for inspiring this platform
- All contributors and supporters of the project
- Open source libraries and frameworks that made this project possible
- Students whose feedback shaped the development of this application

## Support

For support, please contact [yourname@email.com](mailto:yourname@email.com) or open an issue on GitHub.
