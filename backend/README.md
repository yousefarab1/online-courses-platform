# Online Course Platform

A RESTful backend for an online course platform built with **Node.js, Express.js, MongoDB, and Mongoose**.

The platform supports students, instructors, and administrators with authentication, course management, enrollment, lessons, comments, reviews, progress tracking, and administration features.

---

## 📌 Project Overview

The Online Course Platform allows:

- Students to browse and enroll in courses.
- Students to track their lesson progress.
- Students to add reviews and comments.
- Instructors to create and manage their courses.
- Instructors to create, update, and delete lessons.
- Administrators to manage users and courses.
- Authentication and authorization using JWT.

---

## 🛠️ Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS
- REST API

---

## 📂 Project Structure

```text
Online-Courses-Platform/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   └── ...
│
├── .gitignore
└── README.md
```

---

# 🔐 Authentication & Authorization

The API uses **JWT-based authentication**.

Users can have one of the following roles:

- `student`
- `instructor`
- `admin`

### Authentication Flow

1. Register a new account.
2. Login using email and password.
3. Receive a JWT token.
4. Send the token with protected requests.

Example:

```http
Authorization: Bearer <your_token>
```

---

# 👨‍🎓 Student Features

Students can:

- Register and login.
- View available courses.
- Search and filter courses.
- Enroll in courses.
- View enrolled courses.
- View course lessons.
- Complete lessons.
- Track course progress.
- Add course reviews.
- Add comments to lessons.

---

# 👨‍🏫 Instructor Features

Instructors can:

- Login as an instructor.
- Create courses.
- Update their courses.
- Delete their courses.
- View courses they created.
- Create lessons.
- Update lessons.
- Delete lessons.
- Manage course content.

---

# 👨‍💼 Admin Features

Administrators can:

- View all users.
- View all courses.
- Delete users.
- Delete courses.
- View dashboard statistics.

Dashboard statistics include:

- Total users
- Total students
- Total instructors
- Total courses
- Total reviews
- Total enrollments

---

# 📚 Main API Endpoints

## Authentication

```text
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
GET    /api/auth/instructor-only
```

## Courses

```text
GET    /api/courses
GET    /api/courses/:id
POST   /api/courses
PUT    /api/courses/:id
DELETE /api/courses/:id
GET    /api/courses/my-created
GET    /api/courses/my-courses
POST   /api/courses/:id/enroll
```

## Lessons

```text
GET    /api/lessons/course/:courseId
POST   /api/lessons/course/:courseId
PUT    /api/lessons/:id
DELETE /api/lessons/:id
```

## Comments

```text
POST   /api/comments/lesson/:lessonId
GET    /api/comments/lesson/:lessonId
```

## Reviews

```text
POST   /api/reviews/:id
GET    /api/reviews/:id
```

## Progress

```text
POST   /api/progress/course/:courseId/lesson/:lessonId/complete
GET    /api/progress/course/:courseId
```

## Admin

```text
GET    /api/admin/users
DELETE /api/admin/users/:id

GET    /api/admin/courses
DELETE /api/admin/courses/:id

GET    /api/admin/stats
```

---

# 🔎 Search, Filtering & Pagination

Courses support:

### Search

```http
GET /api/courses?search=node
```

### Category

```http
GET /api/courses?category=Programming
```

### Level

```http
GET /api/courses?level=beginner
```

### Price Range

```http
GET /api/courses?minPrice=0&maxPrice=500
```

### Pagination

```http
GET /api/courses?page=1&limit=10
```

### Sorting

Available sorting options:

```text
price-asc
price-desc
newest
oldest
```

Example:

```http
GET /api/courses?sort=price-asc
```

Filters can also be combined.

---

# 🗄️ Database Models

The backend uses the following main models:

```text
User
Course
Lesson
Review
Progress
Comment
```

Relationships include:

```text
User
 ├── creates Courses
 ├── enrolls in Courses
 ├── writes Reviews
 ├── writes Comments
 └── tracks Progress

Course
 ├── belongs to Instructor
 ├── contains Lessons
 ├── has Students
 └── has Reviews

Lesson
 ├── belongs to Course
 └── has Comments
```

---

# ⚠️ Error Handling

The API uses centralized error handling middleware.

It handles common errors including:

- Invalid MongoDB IDs
- Mongoose validation errors
- Duplicate data
- Unauthorized requests
- Forbidden requests
- Internal server errors

Example response:

```json
{
  "success": false,
  "message": "Invalid ID"
}
```

---

# 🔒 Security

The backend includes:

- Password hashing using bcryptjs.
- JWT authentication.
- Role-based authorization.
- Protected routes.
- Environment variables for sensitive configuration.
- Password exclusion from user queries where appropriate.
- Input validation through Mongoose schemas.

Sensitive configuration is stored in `.env`.

The `.env` file is excluded from Git.

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone https://github.com/yousefarab1/online-courses-platform.git
```

```bash
cd Online-Courses-Platform
```

---

## 2. Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file inside the `backend` folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

You can use `.env.example` as a template.

---

## 4. Start the Backend

```bash
npm run dev
```

The API will run on:

```text
http://localhost:5000
```

You can check the API status by opening:

```text
GET /
```

Expected response:

```json
{
  "success": true,
  "message": "Online Course Platform API is running"
}
```

---

# 🧪 API Testing

The API was tested using **Postman**.

The Postman collection covers:

- Authentication
- Courses
- Enrollment
- Lessons
- Comments
- Reviews
- Progress
- Admin

The collection also uses variables such as:

```text
baseUrl
studentToken
instructorToken
adminToken
courseId
lessonId
```

# 👨‍💻 Author

**Yousef Gamal Mohamed**

Computer Science Student
Frontend / MERN Developer
