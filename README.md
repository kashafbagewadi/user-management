# 🚀 User Management System (MERN stack application)

A modern **MERN stack** application for authentication, user profiles, and role-based access control.  
Built with the latest technologies, following security best practices, and designed for extensibility.

---

## 📌 Features
- 🔐 Authentication (JWT-based: Access + Refresh tokens)
- 👤 User registration, login, logout
- ✉️ Email verification & password reset
- 🛡️ Role-based access control (Admin/User/Moderator)
- 🖼️ Profile management with avatar upload
- 📊 Admin panel to manage users
- 🔒 Security best practices:
  - Password hashing (bcrypt/argon2)
  - Input validation
  - Rate limiting
  - HTTP-only cookies for refresh tokens

---

## 🛠️ Tech Stack

### Frontend
- React 18 (with TypeScript)
- TailwindCSS + shadcn/ui (modern UI components)
- React Query / TanStack Query (data fetching & caching)
- React Hook Form + Yup (form validation)

### Backend
- Node.js 20+ with Express.js
- MongoDB Atlas + Mongoose (ODM)
- JWT for authentication
- Express-validator for input validation
- Nodemailer (for email services)

### Infrastructure
- Docker (containerization)
- Vercel/Netlify (frontend deployment)
- Render/Heroku/AWS/GCP (backend deployment)
- MongoDB Atlas (cloud database)
- Cloudinary / AWS S3 (media storage)

---

## 📂 Project Structure
│
├── backend/ # Express.js backend
│ ├── src/
│ │ ├── models/ # Mongoose schemas
│ │ ├── routes/ # Express routes
│ │ ├── controllers/ # Business logic
│ │ ├── middlewares/ # Auth & validation
│ │ ├── utils/ # Helpers (email, tokens)
│ │ └── server.ts # App entry
│ └── package.json
│
├── frontend/ # React frontend
│ ├── src/
│ │ ├── components/ # Reusable UI
│ │ ├── pages/ # Auth & dashboard pages
│ │ ├── hooks/ # Custom hooks
│ │ ├── context/ # Auth context
│ │ └── App.tsx
│ └── package.json
│
├── docker-compose.yml
└── README.md

## ⚙️ Setup & installation
1. Clone the repo
```bash
git clone https://github.com/kashafbagewadi/user-management.git
```
2. Setup backend
```bash
cd backend
cp .env.example .env
npm install
npm start
```
3. Setup frontend
```bash
cd frontend
cp .env.example .env
npm install
npm start
```
4. Run with Docker (optional)
```bash
docker-compose up --build
```
## 🗺️ Roadmap
- Multi-factor authentication (MFA)
- Social logins (Google, GitHub, LinkedIn)
- User activity logs
- Admin analytics dashboard
- API key management for developers

## 📜 License
MIT License © 2025 KashafunnisaBagewadi
