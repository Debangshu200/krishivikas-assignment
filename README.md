# Krishivikas Assignment - Task Management API

A Node.js REST API for user and task management with role-based access control (RBAC).

## Features

- User authentication (register/login)
- Role-based access control (Super-admin, Admin, Manager)
- Hierarchical user creation system
- Task management with user associations
- PostgreSQL database with Sequelize ORM

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```
JWT_SECRET=your_jwt_secret
DB_HOST=localhost
DB_USER=postgres
DB_PASS=your_password
DB_NAME=your_database
```

3. Run database migrations:
```bash
npx sequelize-cli db:migrate
```

4. Start the server:
```bash
npm start
```

## API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | User login | No |

### Users
| Method | Endpoint | Description | Auth Required | Permissions |
|--------|----------|-------------|---------------|-------------|
| POST | `/api/users` | Create new user | Yes | Admin only |
| GET | `/api/users` | List all users | Yes | All roles |

### Tasks
| Method | Endpoint | Description | Auth Required | Permissions |
|--------|----------|-------------|---------------|-------------|
| POST | `/api/tasks` | Create new task | Yes | Admin, Manager |
| GET | `/api/tasks` | List all tasks | Yes | All roles |

## User Roles & Permissions

- **Super-admin**: Can view users and tasks only
- **Admin**: Can create users and tasks, view all data
- **Manager**: Can create tasks, view all data

## Request/Response Examples

### Register User
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "gender": "Male",
  "role": "Admin"
}
```

### Login
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Task
```json
POST /api/tasks
Authorization: Bearer <token>
{
  "name": "Complete project",
  "description": "Finish the assignment",
  "type": ["a-task", "b-task"],
  "startDate": "2025-01-01",
  "endDate": "2025-01-15"
}
```

## Database Schema

### Users
- `id` (Primary Key)
- `name` (String, required)
- `email` (String, unique, required)
- `password` (String, hashed, required)
- `gender` (Enum: Male, Female, Others)
- `role` (Enum: Super-admin, Admin, Manager)
- `createdById` (Foreign Key to Users)

### Tasks
- `id` (Primary Key)
- `name` (String, required)
- `description` (String)
- `type` (Array of Enums: a-task, b-task, c-task, d-task, e-task)
- `startDate` (Date, required)
- `endDate` (Date, required)
- `createdById` (Foreign Key to Users)

## Authentication

All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT
- **Password Hashing**: bcryptjs