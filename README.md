# DroneTV AI Support & Lead Assistant — Full Stack Web Application

[![React](https://img.shields.io/badge/Frontend-React%2018%20%7C%20TypeScript-06B6D4?style=for-the-badge&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-339933?style=for-the-badge&logo=node.js)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20%7C%20Mongoose-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/Assessment-IPAGE%20Group%20Internship-8B5CF6?style=for-the-badge)](#)

---

## 📌 Project Overview
**DroneTV AI Support & Lead Assistant** is a modern, full-stack web application designed for IPAGE Group's Internship Technical Assessment. It serves as an automated customer engagement platform for **DroneTV**, featuring an interactive rule-based AI chatbot, commercial UAV service showcase, DGCA pilot training academy listings, end-to-end lead/enquiry collection, and a protected administrative dashboard.

---

## ✨ Core Features

### 1. Frontend (React 18 + TypeScript + Vite)
- **Responsive Layout**: Designed for mobile, tablet, and desktop screens with glassmorphism UI styling.
- **Pages / Views**:
  - **Home**: Hero banner with live counters, feature grid, and quick action presets.
  - **Services**: Filterable showcase of commercial UAV capabilities (Surveillance, Agriculture Spraying, Thermal Audits, Cinematography, Repair).
  - **Courses / Training**: DGCA pilot licensing, agriculture spray workshops, and GIS mapping courses with syllabus previews.
  - **AI Assistant**: Dedicated full-screen chat interface.
  - **Contact**: Direct contact desk with inline lead submission.
  - **Admin Portal**: Restricted CRUD administration dashboard.
- **Floating Chat Drawer**: Accessible from any page at the bottom-right corner.

### 2. Rule-Based AI Support Chatbot
- **Predefined Queries**: Supports rule matching for standard questions:
  - *"What services does DroneTV provide?"*
  - *"What courses / training are available?"*
  - *"How can I contact DroneTV?"*
  - *"How can I register?"*
  - *"I am interested in a service."*
  - *"I am a student."*
  - *"I want to speak with someone."*
- **Action Triggers**: Automatically opens lead enquiry forms when commercial interest or student intent is detected.
- **Graceful Fallback**: Handles unknown input with helpful question chips.
- **Session History**: Persists chat history across sessions using `localStorage` with a **Reset / Clear** button.

### 3. Lead / Enquiry Collection
- Fields collected: `name`, `email`, `phone`, `userType` (`Student` | `Customer` | `Other`), `interest`, `message`.
- **Client & Server Validation**: Validates empty fields, email format regex, and phone length rules.

### 4. RESTful Backend API (Node.js + Express)
- Full CRUD API exposing standard endpoints (`GET`, `POST`, `PUT/PATCH`, `DELETE`).
- **Input Sanitization**: HTML escaping and regex escaping for search.
- **Security**: Security headers via `helmet`, CORS protection, rate limiting (`express-rate-limit`), and 10KB request body size limits.
- **Centralized Error Handler**: Generic user responses that never leak sensitive DB connection details or stack traces.

### 5. MongoDB Database with In-Memory Auto-Fallback
- Structured schema with Mongoose validation and indexing.
- **Zero-Setup Execution**: Automatically initializes `mongodb-memory-server` if local MongoDB is not running!

### 6. Admin Management Dashboard
- **Admin Key Protection**: Access requires header `x-admin-key: droneTV_admin_key_2026`.
- **Metrics Overview**: Real-time status cards (Total, New, Contacted, In Progress, Closed).
- **Search & Filtering**: Search text across name, email, phone, or filter by `Student`/`Customer` user types and statuses.
- **Status Updates**: Inline status changer (`New` -> `Contacted` -> `In Progress` -> `Closed`) and admin follow-up notes.
- **Delete Confirmation**: Deletion modal confirmation.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React 18, TypeScript, Vite, Lucide Icons, Axios, Vanilla CSS Design System |
| **Backend** | Node.js, Express.js, TypeScript, tsx engine |
| **Database** | MongoDB, Mongoose ODM, MongoDB Memory Server |
| **Security & Middleware** | Helmet, CORS, Express Rate Limit, Express Validator, Dotenv |

---

## 📁 Project Directory Structure

```text
FullStack_Chatbot_Task_FirstName_LastName/
├── client/                     # React + TypeScript + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── components/         # Navbar, Footer, Hero, Cards, Chatbot, Form, Admin
│   │   ├── pages/              # Home, Services, Courses, Chatbot, Contact, Admin
│   │   ├── services/           # Axios API client & Chatbot rule engine
│   │   ├── types/              # TypeScript interfaces
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── server/                     # Node.js + Express REST API backend
│   ├── src/
│   │   ├── config/             # DB connection with MemoryServer fallback
│   │   ├── controllers/        # Enquiry CRUD & Chatbot controller
│   │   ├── middleware/         # Auth, validation, rate limiting & error handling
│   │   ├── models/             # Mongoose Enquiry schema
│   │   ├── routes/             # Enquiry & Chatbot API routes
│   │   ├── seed.ts             # Database seeder script
│   │   └── index.ts            # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── 01_Source_Code/             # Submission copy of source code
├── 02_Screenshots/            # Application screenshots & guide
├── 03_API_Documentation/      # API docs & Postman collection JSON
├── 04_Database/               # Database schema & seed instructions
├── 05_Video_Walkthrough/      # 5-10 min video presentation script
├── 06_GitHub/                 # Repository setup & push guide
├── 07_Resume/                 # Resume attachment instructions
├── package.json               # Root scripts to run dev servers concurrently
├── .env.example               # Environment variables template
└── README.md                  # Detailed documentation
```

---

## 🔑 Environment Variables Setup

### Server Environment (`server/.env`)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dronetv_db
ADMIN_SECRET_KEY=droneTV_admin_key_2026
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

### Client Environment (`client/.env`)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🚀 How to Run the Application

### Prerequisites
- **Node.js**: v18.0.0 or higher (Tested on Node v22)
- **npm**: v9.0.0 or higher

### Step 1: Install Dependencies
Run the following command at the root directory to install dependencies for root, server, and client:
```bash
npm run install:all
```

### Step 2: Seed Sample Data (Optional)
To populate sample lead data:
```bash
npm run seed
```

### Step 3: Start Application in Development Mode
Run both frontend and backend concurrently:
```bash
npm run dev
```

- **Frontend Application**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000/api`
- **API Health Check**: `http://localhost:5000/api/health`

---

## 📡 REST API Reference Table

| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Public | System status & health check |
| `POST` | `/api/enquiries` | Public | Create new lead enquiry submission |
| `GET` | `/api/enquiries` | Admin (`x-admin-key`) | List, search & filter enquiries |
| `GET` | `/api/enquiries/:id` | Admin (`x-admin-key`) | Fetch single enquiry details |
| `PUT / PATCH` | `/api/enquiries/:id` | Admin (`x-admin-key`) | Update enquiry status or admin notes |
| `DELETE` | `/api/enquiries/:id` | Admin (`x-admin-key`) | Delete an enquiry record |
| `POST` | `/api/chatbot/message` | Public | Rule-based chatbot question reply |

---

## 🔒 Security Practices Summary
1. **Header Authorization**: Admin endpoints require header `x-admin-key`.
2. **Double Validation**: Frontend validation for UX and backend validation via `express-validator`.
3. **Regex Escaping**: Search inputs sanitised against ReDoS attacks.
4. **Helmet Security Headers**: Protects against XSS, clickjacking, and MIME sniffing.
5. **Rate Limiting**: Protects backend against brute force and denial of service attacks.
6. **No Secret Exposure**: All credentials managed via `.env` environment variables.

---

## 📦 Submission Folder Requirements
The submission folder is organized as follows:
- `01_Source_Code`: Complete frontend & backend source code
- `02_Screenshots`: Application screenshots & guide
- `03_API_Documentation`: Markdown documentation & Postman Collection JSON
- `04_Database`: Mongoose JSON schema & database seed guide
- `05_Video_Walkthrough`: 5-10 min video presentation script
- `06_GitHub`: Git repository setup instructions
- `07_Resume`: Candidate resume placeholder

---

## 👤 Contact & Submission
- **Prepared for**: IPAGE Group — Talent & Engineering Team
- **Assignment**: DroneTV AI Support & Lead Assistant Web Application
- **Queries Email**: pindipolu@ipageums.com
