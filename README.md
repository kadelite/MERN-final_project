# Attendance Management System

A modern, full-stack attendance management platform for schools and colleges, built with **MongoDB, Express.js, React.js, Node.js, JWT, bcryptjs, Mongoose, Tailwind CSS, React Router DOM, Axios, and Day.js**.

---

## Features

- **Role-based Access:** Admin/Teacher and Student roles with secure JWT authentication.
- **Multi-tenancy:** Each admin manages their own students and classes.
- **Student Self-Registration:** Students can register using an admin code.
- **Authentication:** Secure login/register with JWT and bcryptjs (no third-party auth).
- **Student Management:** Add, edit, delete, and search students.
- **Attendance Marking:** Mark daily attendance for each class.
- **Reporting:** Generate detailed attendance reports and analytics.
- **Modern UI:** Responsive, sleek interface with Tailwind CSS.
- **Protected Routes:** Role-based dashboards and navigation.
- **API-first:** RESTful backend with clear endpoints.

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, React Router DOM, Axios, Day.js, Formik, Yup, Recharts
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, Day.js
- **Dev Tools:** Vite, pnpm, dotenv, nodemon

---

## Project Structure

```
final_cursor/
├── backend/
│   ├── controllers/      # Express controllers (auth, user, attendance)
│   ├── middleware/       # Auth, role, and error middleware
│   ├── models/           # Mongoose models (User, Attendance)
│   ├── routes/           # API routes (auth, users, attendance)
│   ├── config/           # DB connection config
│   ├── server.js         # Express app entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/          # Axios API utilities
│   │   ├── components/   # Navbar, AuthContext, ProtectedRoute, etc.
│   │   ├── pages/        # All main pages (Landing, Dashboards, Auth, etc.)
│   │   ├── lib/          # Utility functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [pnpm](https://pnpm.io/) (or npm/yarn)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

---

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd final_cursor
```

---

### 2. Backend Setup

```bash
cd backend
pnpm install
```

Create a `.env` file in `backend/` with the following:

```
MONGO_URI=mongodb://localhost:27017/attendance
JWT_SECRET=your_jwt_secret
PORT=5000
```

Start the backend server:

```bash
pnpm dev
# or
pnpm start
```

---

### 3. Frontend Setup

```bash
cd frontend
pnpm install
```

Start the frontend dev server:

```bash
pnpm dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

---

## Usage

- **Admin Registration:** Register as an admin with a unique staff ID and admin code.
- **Admin Dashboard:** Manage students, mark attendance, and view reports.
- **Student Registration:** Students self-register using the admin code.
- **Student Dashboard:** View personal attendance stats and history.
- **Role-based Navigation:** Navbar and routes adapt to user role.

---

## API Endpoints

### Auth
- `POST /api/auth/admin-register` — Register a new admin
- `POST /api/auth/login` — Login (admin or student)
- `POST /api/auth/student-register` — Register a new student

### Users (Admin only)
- `GET /api/users/` — Get all students for the admin
- `GET /api/users/:id` — Get a single student
- `PUT /api/users/:id` — Update a student
- `DELETE /api/users/:id` — Delete a student

### Attendance (Admin only)
- `POST /api/attendance/mark` — Mark attendance for a class and date
- `PUT /api/attendance/update/:date` — Update attendance for a date
- `GET /api/attendance/report` — Get attendance reports (filter by class, date, student)
- `GET /api/attendance/student/:id` — Get a student's attendance history

---

## Environment Variables

Backend `.env` example:

```
MONGO_URI=mongodb://localhost:27017/attendance
JWT_SECRET=your_jwt_secret
PORT=5000
```

---

## Scripts

### Backend
- `pnpm dev` — Start backend with nodemon (dev)
- `pnpm start` — Start backend (prod)

### Frontend
- `pnpm dev` — Start frontend dev server
- `pnpm build` — Build frontend for production
- `pnpm preview` — Preview production build

---

## Deployment

### Deploying to Production

1. **Build the frontend:**
   ```bash
   cd frontend
   pnpm build
   # The production build will be in frontend/dist
   ```
2. **Serve the frontend build:**
   - You can use [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), or any static hosting for `frontend/dist`.
   - Or serve with a Node.js static server (e.g., [serve](https://www.npmjs.com/package/serve)):
     ```bash
     npx serve -s dist
     ```
3. **Deploy the backend:**
   - Deploy to [Render](https://render.com/), [Heroku](https://heroku.com/), [Railway](https://railway.app/), or your own server.
   - Set environment variables for MongoDB and JWT secret.
   - Make sure the backend is accessible to the frontend (update API URLs if needed).

---

## Screenshots

> Replace these with your own screenshots!

### Landing Page
![Landing Page](screenshots/landing.png)

### Admin Dashboard
![Admin Dashboard](screenshots/admin-dashboard.png)

### Student Dashboard
![Student Dashboard](screenshots/student-dashboard.png)

### Attendance Management
![Attendance Management](screenshots/attendance.png)

### Reports
![Reports](screenshots/reports.png)

---

## License

MIT

---

## Contributing

Pull requests welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## Acknowledgements

- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [Vite](https://vitejs.dev/)

---

**Enjoy your modern attendance management system!**
