# 🎓 Learning Management System (LMS) - Backend

A robust backend API for a Learning Management System built using **Node.js**, **Express.js**, and **MongoDB**. This server handles user authentication, course and lecture management, payments, file uploads, and more — designed for scalability, security, and real-world integration.

---

## 🚀 Key Features

- 🔐 **Authentication & Authorization** – JWT-based login with role-level access (Admin/User)  
- 👤 **User Management** – Registration, login, profile update, password reset  
- 📚 **Course Management** – Create, edit, delete, and manage courses and lectures  
- 💳 **Payments** – Razorpay integration for subscriptions  
- ☁️ **Media Uploads** – Cloudinary for image and video storage  
- 📧 **Email Service** – Nodemailer for password reset and notifications  
- 🧩 **Error Handling** – Centralized, consistent error structure  
- 🛡️ **Security** – CORS, Helmet, bcrypt password hashing, and environment variable management  

---

## 🛠️ Tech Stack

| Area           | Tech                        |
|----------------|-----------------------------|
| Runtime        | Node.js                     |
| Framework      | Express.js                  |
| Database       | MongoDB + Mongoose          |
| Auth           | JSON Web Token (JWT)        |
| File Storage   | Cloudinary                  |
| Payments       | Razorpay                    |
| Email          | Nodemailer                  |
| Password Hash  | bcryptjs                    |
| Dev Tools      | Nodemon, dotenv             |

---

## 📁 Project Structure
<pre>
server/
├── config/ # Database connection and config files
│ └── db.js
├── controllers/ # Route logic for user, courses, payments, etc.
│ ├── user.controller.js
│ ├── course.controller.js
│ └── payment.controller.js
├── middlewares/ # Authentication, error handling, and utility middlewares
│ ├── auth.middleware.js
│ ├── error.middleware.js
│ └── multer.middleware.js
├── models/ # Mongoose schemas
│ ├── user.model.js
│ ├── course.model.js
│ ├── order.model.js
│ └── token.model.js
├── routes/ # API route handlers
│ ├── user.routes.js
│ ├── course.routes.js
│ └── payment.routes.js
├── utils/ # Utility functions (email, error classes, etc.)
│ ├── sendEmail.js
│ ├── AppError.js
│ └── generateToken.js
├── uploads/ # Temporary file storage (if applicable)
├── app.js # Main Express app configuration
├── server.js # Entry point to start the server
└── .env # Environment variables (not committed)
</pre>

---

## 🔌 REST API Overview

### 👤 User Routes (`/api/v1/user`)
| Method | Endpoint             | Description                      |
|--------|----------------------|----------------------------------|
| POST   | `/register`          | Register a new user              |
| POST   | `/login`             | Login existing user              |
| GET    | `/logout`            | Logout current user              |
| GET    | `/me`                | Get user profile                 |
| POST   | `/reset`             | Send password reset link         |
| POST   | `/reset/:token`      | Reset password with token        |
| PUT    | `/update/:id`        | Update user profile              |
| POST   | `/change-password`   | Change current password          |

---

### 📚 Course Routes (`/api/v1/courses`)
| Method | Endpoint                    | Description                        |
|--------|-----------------------------|------------------------------------|
| GET    | `/`                         | Get all courses                    |
| GET    | `/:id`                      | Get single course details          |
| POST   | `/` (Admin)                 | Create a new course                |
| PUT    | `/:id` (Admin)              | Update a course                    |
| DELETE | `/:id` (Admin)              | Delete a course                    |
| POST   | `/:id/lectures` (Admin)     | Add lectures to a course           |

---

### 💳 Payment Routes (`/api/v1/payments`)
| Method | Endpoint          | Description                        |
|--------|-------------------|------------------------------------|
| GET    | `/razorpay-key`   | Get Razorpay API key               |
| POST   | `/subscribe`      | Start a new subscription           |
| POST   | `/verify`         | Verify Razorpay payment            |
| POST   | `/unsubscribe`    | Cancel user subscription           |
| GET    | `/` (Admin)       | Get all payments (admin only)      |

---

### 📩 Miscellaneous (`/api/v1`)
| Method | Endpoint      | Description                    |
|--------|---------------|--------------------------------|
| POST   | `/contact`    | Contact form / support query   |

---

## 📦 Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/yograj-vijay-yadav/Learning-Management-System.git

# 2. Navigate to the server directory
cd Learning-Management-System/server

# 3. Install dependencies
npm install

# 4. Add your environment variables
cp .env.example .env
# Then update the .env file with your credentials

# 5. Start the development server
npm run dev
