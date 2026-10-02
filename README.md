# 🎓 Online Course Platform

A full-stack online learning platform built with the **MERN Stack**.
The platform allows students to discover and enroll in courses, track their learning progress, interact through lesson comments, and submit course reviews.

Instructors can create and manage courses and lessons, while administrators can manage users, courses, and platform statistics through a dedicated dashboard.

---

## 🚀 Features

### 👨‍🎓 Student

- Register and login securely
- Browse available courses
- Search courses
- Filter courses by category and level
- Sort courses
- Pagination
- View course details
- Enroll in courses
- View enrolled courses
- Track course progress
- Mark lessons as completed
- Continue learning from enrolled courses.
- Comment on lessons
- Add course reviews
- Responsive user interface
- Dark mode support

### 👨‍🏫 Instructor

- Secure instructor authentication
- Create courses
- Edit courses
- Delete courses
- View instructor courses
- Add lessons to courses
- Edit lessons
- Delete lessons
- Organize lessons using lesson order
- Add video URLs to lessons
- View course students

### 🛡️ Admin

- Admin-only dashboard
- View platform statistics
- View all users
- View all courses
- Delete users
- Delete courses
- Monitor total enrollments
- Monitor students, instructors, courses, and reviews

---

## 🧑‍💻 Tech Stack

### Frontend

- React
- React Router
- Material UI (MUI)
- Axios
- JavaScript
- Responsive Design

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Express Validator

### Development Tools

- Git
- GitHub
- Postman
- VS Code
- MongoDB Atlas

---

## 🏗️ Architecture

The project follows a clean separation between the frontend and backend.

```text
Online-Course-Platform/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   └── theme/
│   │
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   │
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🔐 Authentication & Authorization

The platform uses **JWT-based authentication**.

After successful login, the authenticated user receives a JWT token which is used to access protected API endpoints.

### User Roles

```text
Student
Instructor
Admin
```

Role-based authorization is handled through backend middleware.

For example:

```text
Student
   ↓
Enroll in courses
   ↓
Learn lessons
   ↓
Track progress
   ↓
Comment & Review
```

```text
Instructor
   ↓
Create Course
   ↓
Manage Lessons
   ↓
Manage Course Content
```

```text
Admin
   ↓
Dashboard
   ↓
Manage Users
   ↓
Manage Courses
   ↓
View Statistics
```

---

## 📚 Course Management

Each course can contain multiple lessons.

A typical course structure is:

```text
Course
│
├── Lesson 1
├── Lesson 2
├── Lesson 3
├── Lesson 4
└── Lesson 5
```

Instructors can create, edit, delete, and organize lessons.

Students can access lessons after enrolling in the course.

---

## 📈 Learning Progress

The platform tracks the student's completed lessons.

Progress is calculated using:

```text
Completed Lessons
----------------- × 100
Total Lessons
```

For example:

```text
4 completed lessons
------------------- × 100 = 40%
10 total lessons
```

The progress is displayed in the **My Learning** page with a progress bar.

When all lessons are completed:

```text
100% → Review Course
```

Otherwise:

```text
< 100% → Continue Learning
```

---

## 💬 Comments & Reviews

### Lesson Comments

Students can participate in discussions by adding comments to individual lessons.

### Course Reviews

Enrolled students can submit reviews for courses.

Reviews are also included in the administrator dashboard statistics.

---

## 🔎 Course Discovery

Students can discover courses using:

- Search
- Category filtering
- Level filtering
- Sorting
- Pagination

Example API request:

```text
GET /api/courses?search=node&page=1&limit=9
```

---

## 📊 Admin Dashboard

The administrator dashboard provides an overview of the platform.

### Statistics

- Total Users
- Total Students
- Total Instructors
- Total Courses
- Total Enrollments
- Total Reviews

Administrators can also view and manage users and courses.

All admin endpoints are protected on the backend using authentication and role-based authorization.

---

## 🎨 User Interface

The frontend is built using **React and Material UI**.

The application includes:

- Responsive layouts
- Modern dashboard interfaces
- Reusable components
- Loading states
- Error handling
- Empty states
- Dark mode
- Consistent theme and typography

---

## ⚙️ Environment Variables

Create a `.env` file inside the backend directory.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Never commit your real `.env` file to GitHub.

Use `.env.example` instead:

```env
PORT=5000
MONGO_URI=
JWT_SECRET=
```

---

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/yousefarab1/online-courses-platform.git
```

### 2. Navigate to the project

```bash
cd Online-Course-Platform
```

---

## 🔧 Backend Setup

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create your environment file:

```text
.env
```

Add your MongoDB connection string and JWT secret.

Start the development server:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

---

## 💻 Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## 🔌 API Overview

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
GET  /api/auth/instructor-only
```

### Courses

```text
GET    /api/courses
GET    /api/courses/:id
GET    /api/courses/my-courses
POST   /api/courses
PUT    /api/courses/:id
DELETE /api/courses/:id
```

### Progress

```text
GET  /api/progress/course/:courseId
POST /api/progress/course/:courseId/lesson/:lessonId/complete
```

### Admin

```text
GET    /api/admin/stats
GET    /api/admin/users
DELETE /api/admin/users/:id
GET    /api/admin/courses
DELETE /api/admin/courses/:id
```

### Public Statistics

```text
GET /api/stats/public
```

> Additional endpoints are available for lessons, comments, and course reviews.

---

## 🧪 Testing

API endpoints can be tested using **Postman**.

Recommended testing flow:

```text
Register
   ↓
Login
   ↓
Copy JWT Token
   ↓
Authorize Protected Requests
   ↓
Test Courses
   ↓
Enroll
   ↓
Test Lessons
   ↓
Track Progress
   ↓
Comments
   ↓
Reviews
```

---

## 🗄️ Database Models

The application uses MongoDB with Mongoose.

Main models include:

```text
User
Course
Lesson
Enrollment
Comment
Progress
Review
```

### User

```text
name
email
password
role
```

### Course

```text
title
description
instructor
category
level
price
students
```

### Lesson

```text
title
description
videoUrl
course
order
duration
```

### Progress

```text
student
course
completedLessons
```

### Review

```text
student
course
rating
comment
```

---

## 🔒 Security

The backend includes several security practices:

- JWT authentication
- Password hashing using bcryptjs
- Protected routes
- Role-based authorization
- Request validation
- Centralized error handling
- Sensitive password fields excluded from user responses
- Environment variables for secrets

---

## 📁 Project Structure

### Frontend

```text
src/
├── components/
│   ├── courses/
│   └── layout/
│
├── context/
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
│
├── layouts/
│   └── MainLayout.jsx
│
├── pages/
│   ├── admin/
│   ├── auth/
│   ├── instructor/
│   └── student/
│
├── routes/
│   ├── AppRoutes.jsx
│   └── ProtectedRoute.jsx
│
├── services/
│   ├── adminService.js
│   ├── authService.js
│   ├── courseService.js
│   ├── lessonService.js
│   ├── commentService.js
│   ├── progressService.js
│   └── reviewService.js
│
└── theme/
    └── theme.js
```

### Backend

```text
src/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
└── server.js
```

---

## 🚧 Future Improvements

Possible future improvements include:

- Course thumbnails and image uploads
- Advanced course recommendations
- Instructor analytics
- More advanced admin analytics
- Course categories management
- Notifications
- Email verification
- Password reset
- Payment integration
- Deployment with production configuration

---

## 👨‍💻 Author

**Yousef Gamal Mohamed**

Computer Science Student
Frontend / MERN Stack Developer

---

## ⭐ Project Goal

This project was developed as a full-stack learning platform to practice and demonstrate:

- MERN Stack Development
- RESTful API Design
- Authentication & Authorization
- MongoDB & Mongoose
- React Application Architecture
- Material UI
- Role-Based Access Control
- Backend Security
- API Integration
- State Management
- Full-Stack Project Structure

---
