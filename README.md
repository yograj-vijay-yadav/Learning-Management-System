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
📁 Project Structure
server/
├── config/               # Database connection and config files
│   └── db.js
├── controllers/          # Route logic for user, courses, payments, etc.
│   ├── user.controller.js
│   ├── course.controller.js
│   └── payment.controller.js
├── middlewares/          # Authentication, error handling, and utility middlewares
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   └── multer.middleware.js
├── models/               # Mongoose schemas
│   ├── user.model.js
│   ├── course.model.js
│   ├── order.model.js
│   └── token.model.js
├── routes/               # API route handlers
│   ├── user.routes.js
│   ├── course.routes.js
│   └── payment.routes.js
├── utils/                # Utility functions (email, error classes, etc.)
│   ├── sendEmail.js
│   ├── AppError.js
│   └── generateToken.js
├── uploads/              # Temporary file storage (if applicable)
├── app.js                # Main Express app configuration
├── server.js             # Entry point to start the server
└── .env                  # Environment variables (not committed)

---

🔌 REST API Overview
👤 User Routes (/api/v1/user)
POST /register

POST /login

GET /logout

GET /me

POST /reset

POST /reset/:token

PUT /update/:id

POST /change-password

📚 Course Routes (/api/v1/courses)
GET /

GET /:id

POST / (Admin)

PUT /:id (Admin)

DELETE /:id (Admin)

POST /:id/lectures (Admin)


💳 Payment Routes (/api/v1/payments)
GET /razorpay-key

POST /subscribe

POST /verify

POST /unsubscribe

GET / (Admin)

📩 Miscellaneous (/api/v1)
POST /contact
