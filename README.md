# Fwendly Server API Documentation

## Users

### Create User (POST /api/users)

Request body:

```json
{
	"name": "string",
	"email": "string",
	"password": "string"
}
```

### Get User (GET /api/users/:id)

Returns user details including populated references

### Update User (PUT /api/users/:id)

Request body (all fields optional):

```json
{
	"name": "string",
	"email": "string",
	"course": "ObjectId",
	"startYear": "number",
	"endYear": "number",
	"studentType": ["ObjectId"],
	"interests": ["ObjectId"],
	"units": ["ObjectId"]
}
```

### Delete User (DELETE /api/users/:id)

## Events

### Create Event (POST /api/events)

Request body:

```json
{
	"name": "string",
	"venue": "string",
	"time": "string",
	"host": "ObjectId"
}
```

### Get Event (GET /api/events/:id)

Returns event details with populated references

### Update Event (PUT /api/events/:id)

Request body (all fields optional):

```json
{
	"name": "string",
	"venue": "string",
	"time": "string",
	"type": ["ObjectId"],
	"durationMinutes": "number",
	"isEnded": "boolean",
	"rating": "number",
	"tags": ["ObjectId"]
}
```

### Delete Event (DELETE /api/events/:id)

### Add Comment (POST /api/events/:id/comments)

```json
{
	"user": "ObjectId",
	"comment": "string"
}
```

## Courses

### Create Course (POST /api/courses)

```json
{
	"name": "string",
	"code": "string"
}
```

### Get Course (GET /api/courses/:id)

Returns course with populated people array

### Update Course (PUT /api/courses/:id)

```json
{
	"name": "string",
	"code": "string"
}
```

### Delete Course (DELETE /api/courses/:id)

## Units

### Create Unit (POST /api/units)

```json
{
	"name": "string",
	"code": "string"
}
```

### Get Unit (GET /api/units/:id)

Returns unit with populated people array

### Update Unit (PUT /api/units/:id)

```json
{
	"name": "string",
	"code": "string"
}
```

### Delete Unit (DELETE /api/units/:id)

## Tags

### Create Tag (POST /api/tags)

```json
{
	"name": "string"
}
```

### Get Tag (GET /api/tags/:id)

Returns tag with populated events array

### Update Tag (PUT /api/tags/:id)

```json
{
	"name": "string"
}
```

### Delete Tag (DELETE /api/tags/:id)

## Student Types

### Create Student Type (POST /api/student-types)

```json
{
	"name": "string" // Must be one of: "Domestic", "International", "Transfer", "Exchange"
}
```

### Get Student Type (GET /api/student-types/:id)

Returns student type with populated people array

### Update Student Type (PUT /api/student-types/:id)

```json
{
	"name": "string" // Must be one of: "Domestic", "International", "Transfer", "Exchange"
}
```

### Delete Student Type (DELETE /api/student-types/:id)

## Interests

### Create Interest (POST /api/interests)

```json
{
	"name": "string"
}
```

### Get Interest (GET /api/interests/:id)

Returns interest with populated events array

### Update Interest (PUT /api/interests/:id)

```json
{
	"name": "string"
}
```

### Delete Interest (DELETE /api/interests/:id)

## Free Slots

### Create Free Slot (POST /api/free-slots)

```json
{
	"name": "string",
	"code": "string"
}
```

### Get Free Slot (GET /api/free-slots/:id)

Returns free slot with populated people array

### Update Free Slot (PUT /api/free-slots/:id)

```json
{
	"name": "string",
	"code": "string"
}
```

### Delete Free Slot (DELETE /api/free-slots/:id)
