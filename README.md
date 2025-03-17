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

Test with curl:

```bash
curl -X POST http://localhost:6969/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Get User (GET /api/users/:id)

Returns user details including populated references

Test with curl:

```bash
curl -X GET http://localhost:6969/api/users/123456789012
```

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

Test with curl:

```bash
curl -X PUT http://localhost:6969/api/users/123456789012 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Name","startYear":2023,"endYear":2027}'
```

### Delete User (DELETE /api/users/:id)

Test with curl:

```bash
curl -X DELETE http://localhost:6969/api/users/123456789012
```

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

Test with curl:

```bash
curl -X POST http://localhost:6969/api/events \
  -H "Content-Type: application/json" \
  -d '{"name":"Coffee Meetup","venue":"Campus Center","time":"2023-09-15T15:00:00Z","host":"123456789012"}'
```

### Get Event (GET /api/events/:id)

Returns event details with populated references

Test with curl:

```bash
curl -X GET http://localhost:6969/api/events/123456789012
```

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

Test with curl:

```bash
curl -X PUT http://localhost:6969/api/events/123456789012 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Event","durationMinutes":120,"isEnded":true,"rating":4.5}'
```

### Delete Event (DELETE /api/events/:id)

Test with curl:

```bash
curl -X DELETE http://localhost:6969/api/events/123456789012
```

### Add Comment (POST /api/events/:id/comments)

```json
{
	"user": "ObjectId",
	"comment": "string"
}
```

Test with curl:

```bash
curl -X POST http://localhost:6969/api/events/123456789012/comments \
  -H "Content-Type: application/json" \
  -d '{"user":"123456789012","comment":"Great event, looking forward to the next one!"}'
```

## Courses

### Create Course (POST /api/courses)

```json
{
	"name": "string",
	"code": "string"
}
```

Test with curl:

```bash
curl -X POST http://localhost:6969/api/courses \
  -H "Content-Type: application/json" \
  -d '{"name":"Computer Science","code":"CS101"}'
```

### Get Course (GET /api/courses/:id)

Returns course with populated people array

Test with curl:

```bash
curl -X GET http://localhost:6969/api/courses/123456789012
```

### Update Course (PUT /api/courses/:id)

```json
{
	"name": "string",
	"code": "string"
}
```

Test with curl:

```bash
curl -X PUT http://localhost:6969/api/courses/123456789012 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Computer Science","code":"CS102"}'
```

### Delete Course (DELETE /api/courses/:id)

Test with curl:

```bash
curl -X DELETE http://localhost:6969/api/courses/123456789012
```

## Units

### Create Unit (POST /api/units)

```json
{
	"name": "string",
	"code": "string"
}
```

Test with curl:

```bash
curl -X POST http://localhost:6969/api/units \
  -H "Content-Type: application/json" \
  -d '{"name":"Introduction to Programming","code":"COMP10001"}'
```

### Get Unit (GET /api/units/:id)

Returns unit with populated people array

Test with curl:

```bash
curl -X GET http://localhost:6969/api/units/123456789012
```

### Update Unit (PUT /api/units/:id)

```json
{
	"name": "string",
	"code": "string"
}
```

Test with curl:

```bash
curl -X PUT http://localhost:6969/api/units/123456789012 \
  -H "Content-Type: application/json" \
  -d '{"name":"Advanced Programming","code":"COMP20003"}'
```

### Delete Unit (DELETE /api/units/:id)

Test with curl:

```bash
curl -X DELETE http://localhost:6969/api/units/123456789012
```

## Tags

### Create Tag (POST /api/tags)

```json
{
	"name": "string"
}
```

Test with curl:

```bash
curl -X POST http://localhost:6969/api/tags \
  -H "Content-Type: application/json" \
  -d '{"name":"Social"}'
```

### Get Tag (GET /api/tags/:id)

Returns tag with populated events array

Test with curl:

```bash
curl -X GET http://localhost:6969/api/tags/123456789012
```

### Update Tag (PUT /api/tags/:id)

```json
{
	"name": "string"
}
```

Test with curl:

```bash
curl -X PUT http://localhost:6969/api/tags/123456789012 \
  -H "Content-Type: application/json" \
  -d '{"name":"Academic"}'
```

### Delete Tag (DELETE /api/tags/:id)

Test with curl:

```bash
curl -X DELETE http://localhost:6969/api/tags/123456789012
```

## Student Types

### Create Student Type (POST /api/student-types)

```json
{
	"name": "string" // Must be one of: "Domestic", "International", "Transfer", "Exchange"
}
```

Test with curl:

```bash
curl -X POST http://localhost:6969/api/student-types \
  -H "Content-Type: application/json" \
  -d '{"name":"International"}'
```

### Get Student Type (GET /api/student-types/:id)

Returns student type with populated people array

Test with curl:

```bash
curl -X GET http://localhost:6969/api/student-types/123456789012
```

### Update Student Type (PUT /api/student-types/:id)

```json
{
	"name": "string" // Must be one of: "Domestic", "International", "Transfer", "Exchange"
}
```

Test with curl:

```bash
curl -X PUT http://localhost:6969/api/student-types/123456789012 \
  -H "Content-Type: application/json" \
  -d '{"name":"Domestic"}'
```

### Delete Student Type (DELETE /api/student-types/:id)

Test with curl:

```bash
curl -X DELETE http://localhost:6969/api/student-types/123456789012
```

## Interests

### Create Interest (POST /api/interests)

```json
{
	"name": "string"
}
```

Test with curl:

```bash
curl -X POST http://localhost:6969/api/interests \
  -H "Content-Type: application/json" \
  -d '{"name":"Photography"}'
```

### Get Interest (GET /api/interests/:id)

Returns interest with populated events array

Test with curl:

```bash
curl -X GET http://localhost:6969/api/interests/123456789012
```

### Update Interest (PUT /api/interests/:id)

```json
{
	"name": "string"
}
```

Test with curl:

```bash
curl -X PUT http://localhost:6969/api/interests/123456789012 \
  -H "Content-Type: application/json" \
  -d '{"name":"Hiking"}'
```

### Delete Interest (DELETE /api/interests/:id)

Test with curl:

```bash
curl -X DELETE http://localhost:6969/api/interests/123456789012
```

## Free Slots

### Create Free Slot (POST /api/free-slots)

```json
{
	"name": "string",
	"code": "string"
}
```

Test with curl:

```bash
curl -X POST http://localhost:6969/api/free-slots \
  -H "Content-Type: application/json" \
  -d '{"name":"Monday Morning","code":"MON-AM"}'
```

### Get Free Slot (GET /api/free-slots/:id)

Returns free slot with populated people array

Test with curl:

```bash
curl -X GET http://localhost:6969/api/free-slots/123456789012
```

### Update Free Slot (PUT /api/free-slots/:id)

```json
{
	"name": "string",
	"code": "string"
}
```

Test with curl:

```bash
curl -X PUT http://localhost:6969/api/free-slots/123456789012 \
  -H "Content-Type: application/json" \
  -d '{"name":"Tuesday Afternoon","code":"TUE-PM"}'
```

### Delete Free Slot (DELETE /api/free-slots/:id)

Test with curl:

```bash
curl -X DELETE http://localhost:6969/api/free-slots/123456789012
```
