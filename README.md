## 📦 Quick Start

```bash
# 1. Clone and enter the project
git clone https://github.com/ginev91/sw.git
cd sw/backend

# 2. Install dependencies
pnpm install

# 3. Setup environment
cp .env.example .env
# Edit .env with your config

# 4. Start services (Postgres + Redis) and dev server (migrations run automatically)
pnpm run compose:up
pnpm run start:dev

http://localhost:3000

cd ../frontend
pnpm install
pnpm dev

http://localhost:5173/
```

# 🌟 Star Wars API (SWAPI) Backend

A NestJS backend application that provides a cached, filterable, and paginated interface to the Star Wars API with JWT authentication.

## 🚀 Features

- **JWT Authentication** - Secure login/register with access and refresh tokens
- **SWAPI Integration** - Access to People, Planets, Starships, and Vehicles
- **Advanced Filtering** - Filter by any field with intelligent search
- **Sorting** - Sort by any field (numeric and string support)
- **Pagination** - Configurable page size and navigation
- **Redis Caching** - Intelligent caching with TTL
- **Role-based Access** - User roles and permissions
- **TypeORM** - Database integration with PostgreSQL
- **Input Validation** - Comprehensive DTO validation
- **Logging** - Structured logging with Pino

## 🛠️ Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL with TypeORM
- **Cache**: Redis
- **Authentication**: JWT with Passport
- **Validation**: class-validator
- **Logging**: nestjs-pino
- **Package Manager**: pnpm

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/ginev91/sw.git
cd sw/backend

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start PostgreSQL and Redis (using Docker)
pnpm run compose:up

# Run database migrations
pnpm run migration:generate ./migrations/runs/initial
pnpm run migration:run

# Start the application
pnpm run start:dev
```

## 🔐 Authentication Endpoints

### Register a new user
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

**Response:**
```json
{
  "id": 1,
  "email": "test@example.com"
}
```

### Login
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "test@example.com",
    "role": "USER"
  }
}
```

### Refresh token
```bash
curl -X POST http://localhost:3000/api/v1/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }'
```

## 🌟 SWAPI Endpoints

All SWAPI endpoints require authentication. Include the Bearer token in the Authorization header:

```bash
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### 👥 People

**Get all people:**
```bash
curl -X GET http://localhost:3000/api/v1/swapi/people \
  -H "Authorization: Bearer $TOKEN"
```

**Search by name:**
```bash
curl -X GET "http://localhost:3000/api/v1/swapi/people?name=luke" \
  -H "Authorization: Bearer $TOKEN"
```

**Filter by gender:**
```bash
curl -X GET "http://localhost:3000/api/v1/swapi/people?gender=male" \
  -H "Authorization: Bearer $TOKEN"
```

**Sort by height (descending):**
```bash
curl -X GET "http://localhost:3000/api/v1/swapi/people?sort=height&order=desc" \
  -H "Authorization: Bearer $TOKEN"
```

**Pagination:**
```bash
curl -X GET "http://localhost:3000/api/v1/swapi/people?page=2&limit=5" \
  -H "Authorization: Bearer $TOKEN"
```

**Complex query:**
```bash
curl -X GET "http://localhost:3000/api/v1/swapi/people?gender=male&sort=height&order=desc&page=1&limit=3" \
  -H "Authorization: Bearer $TOKEN"
```

### 🪐 Planets

**Get all planets:**
```bash
curl -X GET http://localhost:3000/api/v1/swapi/planets \
  -H "Authorization: Bearer $TOKEN"
```

**Search planets:**
```bash
curl -X GET "http://localhost:3000/api/v1/swapi/planets?name=tatooine" \
  -H "Authorization: Bearer $TOKEN"
```

**Filter by climate:**
```bash
curl -X GET "http://localhost:3000/api/v1/swapi/planets?climate=arid" \
  -H "Authorization: Bearer $TOKEN"
```

### 🚀 Starships

**Get all starships:**
```bash
curl -X GET http://localhost:3000/api/v1/swapi/starships \
  -H "Authorization: Bearer $TOKEN"
```

**Search starships:**
```bash
curl -X GET "http://localhost:3000/api/v1/swapi/starships?name=falcon" \
  -H "Authorization: Bearer $TOKEN"
```

**Sort by crew size:**
```bash
curl -X GET "http://localhost:3000/api/v1/swapi/starships?sort=crew&order=desc" \
  -H "Authorization: Bearer $TOKEN"
```

### 🚗 Vehicles

**Get all vehicles:**
```bash
curl -X GET http://localhost:3000/api/v1/swapi/vehicles \
  -H "Authorization: Bearer $TOKEN"
```

**Filter vehicles:**
```bash
curl -X GET "http://localhost:3000/api/v1/swapi/vehicles?manufacturer=Corellia" \
  -H "Authorization: Bearer $TOKEN"
```

## 📊 Response Format

All SWAPI endpoints return paginated responses:

```json
{
  "results": [
    {
      "name": "Luke Skywalker",
      "height": "172",
      "mass": "77",
      "gender": "male",
      "birth_year": "19BBY",
      "eye_color": "blue",
      "hair_color": "blond",
      "skin_color": "fair"
    }
  ],
  "page": 1,
  "limit": 10,
  "total": 82,
  "totalPages": 9
}
```

## 🔍 Query Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `page` | number | Page number (default: 1) | `?page=2` |
| `limit` | number | Items per page (default: 10) | `?limit=5` |
| `sort` | string | Field to sort by | `?sort=name` |
| `order` | string | Sort order: `asc` or `desc` | `?order=desc` |
| `name` | string | Search by name (partial match) | `?name=luke` |
| `{field}` | string | Filter by any field (exact match) | `?gender=male` |

## 🧪 Test Sequence

```bash
# 1. Register a user
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"demo123","confirmPassword":"demo123"}'

# 2. Login (copy the accessToken from response)
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"demo123"}'

# 3. Set token variable
TOKEN="YOUR_ACCESS_TOKEN_HERE"

# 4. Test basic endpoint
curl -X GET http://localhost:3000/api/v1/swapi/people \
  -H "Authorization: Bearer $TOKEN"

# 5. Test filtering and sorting
curl -X GET "http://localhost:3000/api/v1/swapi/people?name=luke&sort=height&order=desc" \
  -H "Authorization: Bearer $TOKEN"

# 6. Test pagination
curl -X GET "http://localhost:3000/api/v1/swapi/people?page=1&limit=3" \
  -H "Authorization: Bearer $TOKEN"
```

## 👤 User Management Endpoints

All user endpoints require authentication. Admin endpoints require ADMIN role.

### Get Current User Profile
```bash
# Any authenticated user can access their own profile
curl -X GET http://localhost:3000/api/v1/users/me \
  -H "Authorization: Bearer $TOKEN"
```

**Response:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "role": "USER",
  "deactivated": false
}
```

### Get All Users (Admin Only)
```bash
# Only admins can list all users
curl -X GET http://localhost:3000/api/v1/users \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

**Response:**
```json
[
  {
    "id": 1,
    "email": "admin@example.com",
    "role": "ADMIN",
    "deactivated": false
  },
  {
    "id": 2,
    "email": "user@example.com",
    "role": "USER",
    "deactivated": false
  }
]
```

### Deactivate User (Admin Only)
```bash
# Deactivate user with ID 2
curl -X PATCH http://localhost:3000/api/v1/users/2/deactivate \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

**Response:**
```json
{
  "id": 2,
  "email": "user@example.com",
  "role": "USER",
  "deactivated": true
}
```

### Activate User (Admin Only)
```bash
# Activate user with ID 2
curl -X PATCH http://localhost:3000/api/v1/users/2/activate \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

**Response:**
```json
{
  "id": 2,
  "email": "user@example.com",
  "role": "USER",
  "deactivated": false
}
```

## 🧪 Admin Test Sequence

```bash
# 1. Login as admin (admin user is auto-created on startup)
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'

# 2. Save admin token
ADMIN_TOKEN="ADMIN_ACCESS_TOKEN_HERE"

# 3. Register a regular user to test with
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'

# 4. Login as regular user
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "password123"
  }'

# 5. Save user token
USER_TOKEN="USER_ACCESS_TOKEN_HERE"

# 6. Test user profile endpoint (as regular user)
curl -X GET http://localhost:3000/api/v1/users/me \
  -H "Authorization: Bearer $USER_TOKEN"

# 7. Test admin endpoints
curl -X GET http://localhost:3000/api/v1/users \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# 8. Deactivate the test user (replace '2' with actual user ID)
curl -X PATCH http://localhost:3000/api/v1/users/2/deactivate \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# 9. Try to use deactivated user token (should fail)
curl -X GET http://localhost:3000/api/v1/swapi/people \
  -H "Authorization: Bearer $USER_TOKEN"

# 10. Reactivate the user
curl -X PATCH http://localhost:3000/api/v1/users/2/activate \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

## 🚨 Error Responses

**Unauthorized (non-admin trying admin endpoint):**
```bash
curl -X GET http://localhost:3000/api/v1/users \
  -H "Authorization: Bearer $USER_TOKEN"
```
```json
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}
```

**User not found:**
```bash
curl -X PATCH http://localhost:3000/api/v1/users/999/deactivate \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```
```json
{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}
```

**Deactivated user trying to access API:**
```json
{
  "statusCode": 401,
  "message": "User account is deactivated",
  "error": "Unauthorized"
}
```


## 📝 Scripts

```bash
# Development
pnpm run start:dev          # Start in development mode
pnpm run start:debug        # Start with debugging

# Database
pnpm run migration:generate # Generate new migration
pnpm run migration:run      # Run migrations
pnpm run migration:revert   # Revert last migration

# Docker
pnpm run compose:up         # Start PostgreSQL and Redis
pnpm run compose:down       # Stop containers

# Testing
pnpm run test              # Unit tests
pnpm run test:e2e          # End-to-end tests
```

## 🔄 Caching Strategy

- **Cache Key Format**: `{resource}:{query_params}`
- **TTL**: 420 seconds (configurable)
- **Cache Invalidation**: Time-based (no manual invalidation needed for read-only SWAPI data)
- **Cache Hit/Miss**: Logged for monitoring

## 🛡️ Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt with salt rounds
- **Input Validation**: DTO validation with class-validator
- **Role-based Access**: User roles and permissions
- **CORS**: Configurable cross-origin requests

## 🚨 Error Handling

The API returns standardized error responses:

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

Common HTTP status codes:
- `200` - Success
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `404` - Not Found
- `500` - Internal Server Error

## 🎯 Frontend Integration

A React frontend is available at `/frontend` with:
- Login/Register forms
- JWT token management
- SWAPI resource browsing
- Responsive design

Start the frontend:
```bash
cd ../frontend
pnpm install
pnpm dev
```

## 📈 Performance

- **Redis Caching**: Sub-millisecond response times for cached data
- **Efficient Filtering**: In-memory filtering after caching
- **Smart Sorting**: Numeric vs string sorting detection

```

This README provides comprehensive documentation covering:
- Installation and setup
- Environment configuration
- Complete API documentation with cURL examples
- Architecture overview
- Performance considerations
- Security features
- Testing instructions