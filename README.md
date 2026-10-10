# DroneTV AI Support & Lead Assistant — Full Stack Web Application

[![React](https://img.shields.io/badge/Frontend-React%2018%20%7C%20TypeScript-F97316?style=for-the-badge&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-339933?style=for-the-badge&logo=node.js)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20%7C%20Mongoose-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Build-Vite%205-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/Assessment-IPAGE%20Group%20Internship-EA580C?style=for-the-badge)](#)

---

## 📌 1. Project Description
**DroneTV AI Support & Lead Assistant** is an end-to-end, enterprise-grade full-stack web application built for the **IPAGE Group Full Stack Developer Internship Technical Assessment**.

The platform powers **DroneTV**, India's premier aerial robotics, commercial UAV services, and pilot academy network. It automates prospective client engagement and candidate registration through:
- An **intelligent rule-based conversational AI assistant** that matches user intent and handles queries 24/7.
- A **high-converting lead capture engine** with real-time client and server validation.
- A **commercial UAV service showcase** (thermal inspection, crop spraying, aerial surveillance, 3D mapping).
- A **DGCA-compliant Pilot Academy course catalog** (remote pilot licensing, agriculture flight certifications).
- A **secure, role-authenticated Administrative Dashboard** for full CRUD lifecycle management of business leads.
- A **zero-configuration MongoDB setup** with automated in-memory database fallback (`mongodb-memory-server`) to ensure instant zero-friction execution on any machine.

---

## ✨ 2. Key Features

### 💻 Frontend (React 18 + TypeScript + Vite)
- **Modern Sunset Orange & Amber Gold Theme**: Premium dark-mode aesthetic with glassmorphism panels, radiant gradients, and micro-animations.
- **Responsive Layout**: Designed mobile-first, supporting phones, tablets, laptops, and ultra-wide screens.
- **Dedicated Application Views**:
  - **Home**: Hero section with real-time statistics, capability highlights, and quick CTA presets.
  - **Services**: Filterable commercial UAV services with category tabs and capability checklists.
  - **Courses & Academy**: DGCA-aligned drone pilot syllabi, flight simulator details, and admission requirements.
  - **AI Chatbot**: Dedicated full-screen chatbot conversation portal.
  - **Contact**: Direct office hotline, map coordinates, and instant enquiry form.
  - **Admin Portal**: Secret-key protected dashboard for lead review, status updates, search, and deletion.
- **Global Floating Chat Drawer**: Accessible from the bottom-right corner of any page for immediate support.

### 🤖 Rule-Based AI Chatbot Engine
- **Intent Pattern Matching**: Accurately recognizes and replies to standard and variable queries:
  - *"What services does DroneTV provide?"*
  - *"What courses or pilot training are available?"*
  - *"How can I contact DroneTV or speak with someone?"*
  - *"I am a student interested in pilot training."*
  - *"I am looking for commercial drone services."*
  - Pricing, eligibility, and DGCA guidelines.
- **Interactive Action Triggers**: Automatically detects commercial or educational intent and launches the relevant lead modal pre-filled with context.
- **Question Chips**: Displays intelligent follow-up suggestions for seamless user guidance.
- **Session Persistence**: Conversation history saved locally in `localStorage` with a 1-click **Reset** option.

### 📋 Lead Capture & Validation
- **Structured Fields**: `name`, `email`, `phone`, `userType` (`Student` | `Customer` | `Other`), `interest`, `message`.
- **Dual-Layer Validation**:
  - **Client**: Instant inline error feedback with regular expressions for email and telephone.
  - **Server**: Sanitized and validated via `express-validator` to prevent injection and malformed payloads.

### 🛡️ Administrative Portal
- **Key Authentication**: Secured via `x-admin-key: droneTV_admin_key_2026`.
- **Live Metric Cards**: Total leads, New, Contacted, In Progress, and Closed counts.
- **Search & Filtering**: Search text across name, email, phone, and filter by user classification and lifecycle status.
- **Lead Detail Modal**: View full enquiry messages, change workflow status, and log timestamped follow-up remarks.
- **Record Management**: Delete lead records with modal confirmation.

---

## 🛠️ 3. Technologies Used

| Category | Technologies | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 18** | High-performance component-based UI library |
| **Language** | **TypeScript** | Strict type safety for data models and interfaces |
| **Build Tool** | **Vite 5** | Lightning-fast HMR and optimized production bundling |
| **Icons** | **Lucide React** | Clean, modern SVG iconography |
| **Styling** | **Vanilla CSS + Tailwind** | Custom glassmorphism design system & utility classes |
| **HTTP Client** | **Axios** | Promised-based API communication with custom error handling |
| **Backend Framework** | **Node.js + Express** | Scalable REST API with modular architecture |
| **Database** | **MongoDB + Mongoose** | Document database with schema modeling, indexes, and validation |
| **In-Memory Database** | **mongodb-memory-server** | Automated fallback database requiring zero external setup |
| **Security** | **Helmet & CORS** | HTTP security headers and cross-origin resource sharing |
| **Rate Limiting** | **express-rate-limit** | DDoS and brute-force request throttling |
| **Dev Tooling** | **Concurrently & tsx** | Synchronous multi-process orchestration |

---

## 📁 4. Project Directory Structure

```text
FullStack_Chatbot_Task_Pola Venkata Kanaka Durga Chitti B_Vempada/
├── 01_Source_Code/
│   ├── client/                          # React + TypeScript + Vite Frontend
│   │   ├── public/                      # Static assets & favicon
│   │   ├── src/
│   │   │   ├── components/              # UI components
│   │   │   │   ├── AdminDashboard.tsx   # Protected admin portal with filters & metrics
│   │   │   │   ├── ChatbotWidget.tsx    # Conversational chat interface
│   │   │   │   ├── CourseCard.tsx       # DGCA course preview card
│   │   │   │   ├── EnquiryFormModal.tsx # Lead capture modal with validation
│   │   │   │   ├── Footer.tsx           # Global footer with navigation links
│   │   │   │   ├── Hero.tsx             # Homepage hero banner & metric chips
│   │   │   │   ├── Navbar.tsx           # Navigation bar with sticky glassmorphism
│   │   │   │   └── ServiceCard.tsx      # Commercial UAV service card
│   │   │   ├── pages/                   # Application views
│   │   │   │   ├── AdminPage.tsx        # Admin route wrapper
│   │   │   │   ├── ChatbotPage.tsx      # Full-page chatbot view
│   │   │   │   ├── ContactPage.tsx      # Contact desk & direct lead form
│   │   │   │   ├── CoursesPage.tsx      # Drone pilot courses & syllabus
│   │   │   │   ├── HomePage.tsx         # Platform overview & featured items
│   │   │   │   └── ServicesPage.tsx     # Filterable commercial drone services
│   │   │   ├── services/                # API client & chatbot rule algorithms
│   │   │   ├── types/                   # TypeScript interfaces (Enquiry, Course, Service)
│   │   │   ├── App.tsx                  # Main router, state holder & floating drawer
│   │   │   ├── index.css                # Sunset Orange & Amber Gold design system
│   │   │   └── main.tsx                 # Client entry point
│   │   ├── package.json
│   │   ├── tailwind.config.js           # Tailwind theme extensions
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   │
│   ├── server/                          # Node.js + Express REST API Backend
│   │   ├── src/
│   │   │   ├── config/                  # Database connection with MemoryServer fallback
│   │   │   ├── controllers/             # Enquiry CRUD & Chatbot controller
│   │   │   ├── middleware/              # Auth guard, request validation, error handler
│   │   │   ├── models/                  # Mongoose Enquiry schema with indexes
│   │   │   ├── routes/                  # REST endpoint definitions
│   │   │   ├── seed.ts                  # Database seeder with sample leads
│   │   │   └── index.ts                 # Express server bootstrap
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── docs/                            # Documentation & Deliverables
│   │   ├── api_documentation.md         # Full REST API specifications & cURL examples
│   │   ├── database_schema.md           # Schema definitions, indexes & sample documents
│   │   ├── postman_collection.json      # Postman Collection v2.1.0 with tests
│   │   └── Screenshot (*).png           # Application screenshots
│   ├── package.json                     # Root orchestrator scripts
│   └── README.md                        # Complete project documentation
│
├── 02_Screenshots/                      # High-resolution screenshots of all views
├── 03_API_Documentation/               # API Markdown specs & Postman JSON
├── 04_Database/                        # JSON schema & seed guide
├── 05_Video_Walkthrough/               # Video demonstration guide
├── 06_GitHub/                          # Git repository setup
└── 07_Resume/                          # Candidate resume attachment
```

---

## 🔑 5. Environment Variables

### Backend Configuration (`01_Source_Code/server/.env`)
Create a file named `.env` in the `server/` directory:

```env
# Server Port
PORT=5000

# MongoDB Connection String (Leave as localhost or Atlas URI; memory server will fallback if unavailable)
MONGODB_URI=mongodb://localhost:27017/dronetv_db

# Secret Admin Key for Protected Endpoints
ADMIN_SECRET_KEY=droneTV_admin_key_2026

# Allowed Frontend Origin for CORS
CORS_ORIGIN=http://localhost:5173

# Environment
NODE_ENV=development
```

### Frontend Configuration (`01_Source_Code/client/.env`)
Create a file named `.env` in the `client/` directory:

```env
# Base URL pointing to the Express backend API
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🗄️ 6. Database Setup

The backend connects to MongoDB using Mongoose. It supports two execution models:

1. **Standard MongoDB / MongoDB Atlas**:
   - If a local MongoDB instance is running at `mongodb://localhost:27017/dronetv_db` or an Atlas URI is set in `MONGODB_URI`, the server connects automatically.
2. **Automated In-Memory Fallback (`mongodb-memory-server`)**:
   - If no MongoDB instance is found, the server automatically downloads and runs an **in-memory MongoDB database**. No manual installation of MongoDB is required!

### Seeding Sample Data
To populate the database with realistic sample leads (students, farmers, inspection firms):

```bash
# From the 01_Source_Code root
npm run seed
```

---

## 📡 7. API Endpoints Reference

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Public | System status & connectivity check |
| `POST` | `/enquiries` | Public | Submit new lead enquiry from web or chatbot |
| `GET` | `/enquiries` | Admin (`x-admin-key`) | List, search & filter leads with pagination |
| `GET` | `/enquiries/:id` | Admin (`x-admin-key`) | Retrieve single lead by ObjectId |
| `PUT` | `/enquiries/:id` | Admin (`x-admin-key`) | Update lead status (`New`, `Contacted`, `In Progress`, `Closed`) & notes |
| `DELETE` | `/enquiries/:id` | Admin (`x-admin-key`) | Delete lead record permanently |
| `POST` | `/chatbot/message` | Public | Process user message with rule-based NLP engine |

> Detailed request/response payloads, query parameters, and cURL snippets are documented in [`docs/api_documentation.md`](file:///c:/Users/Dell/Downloads/FullStack_Chatbot_Task_Pola%20Venkata%20Kanaka%20Durga%20Chitti%20B_Vempada/01_Source_Code/docs/api_documentation.md) and [`docs/postman_collection.json`](file:///c:/Users/Dell/Downloads/FullStack_Chatbot_Task_Pola%20Venkata%20Kanaka%20Durga%20Chitti%20B_Vempada/01_Source_Code/docs/postman_collection.json).

---

## 🖼️ 8. Application Screenshots

| View | Preview |
| :--- | :--- |
| **1. Landing Page & Hero Section** | ![Landing Page](docs/Screenshot%20(7).png) |
| **2. Commercial Services Showcase** | ![Services](docs/Screenshot%20(8).png) |
| **3. DGCA Pilot Training Courses** | ![Pilot Academy](docs/Screenshot%20(9).png) |
| **4. AI Support Chatbot & Presets** | ![AI Chatbot](docs/Screenshot%20(10).png) |
| **5. Lead Capture & Admin Portal** | ![Admin Portal](docs/Screenshot%20(11).png) |

---

## 🚀 9. Setup & Run Instructions

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

---

### Step 1: Install All Dependencies
Run from the `01_Source_Code` directory:

```bash
cd "01_Source_Code"
npm run install:all
```
*(This installs dependencies across the root, `server/`, and `client/` packages).*

---

### Step 2: Run Both Frontend & Backend Concurrently
Run:

```bash
npm run dev
```

- **Frontend Application**: `http://localhost:5173`
- **Backend REST API**: `http://localhost:5000/api`
- **Health Check Endpoint**: `http://localhost:5000/api/health`

---

### Alternative: Run Frontend and Backend Separately

#### Running Backend Separately:
```bash
cd server
npm install
npm run dev
# Server starts on http://localhost:5000
```

#### Running Frontend Separately:
```bash
cd client
npm install
npm run dev
# Vite client starts on http://localhost:5173
```

---

### Step 3: Production Build & Validation
To test and verify compilation:

```bash
# Build both frontend and backend
npm run build
```

---

## 🌐 10. Live Demo & Deployment Guide

- **Live Web Application Demo**: [https://dronetv-ai-assistant.vercel.app](https://dronetv-ai-assistant.vercel.app) *(or your deployed URL)*
- **Live Backend API**: [https://dronetv-api.onrender.com/api/health](https://dronetv-api.onrender.com/api/health)

### Deployment Instructions:
1. **Frontend (Vercel / Netlify)**:
   - Root directory: `01_Source_Code/client`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Environment Variable: `VITE_API_BASE_URL=https://your-backend-api.onrender.com/api`
2. **Backend (Render / Railway / AWS)**:
   - Root directory: `01_Source_Code/server`
   - Build Command: `npm run build`
   - Start Command: `npm start`
   - Environment Variables: `PORT=5000`, `MONGODB_URI=<your_mongodb_atlas_uri>`, `ADMIN_SECRET_KEY=droneTV_admin_key_2026`, `CORS_ORIGIN=https://your-frontend.vercel.app`

---

## 👤 11. Author & Submission Information
- **Candidate Name**: Pola Venkata Kanaka Durga Chitti B Vempada
- **Assignment**: Full Stack Chatbot Task (DroneTV AI Support & Lead Assistant)
- **Prepared For**: IPAGE Group — Talent Acquisition & Engineering Team
- **Inquiries**: `pindipolu@ipageums.com`
