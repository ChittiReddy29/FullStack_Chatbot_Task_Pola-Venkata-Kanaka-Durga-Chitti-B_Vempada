# DroneTV AI Support & Lead Assistant — REST API Documentation

## 1. Specification Overview
- **Service Name**: DroneTV Full-Stack Lead Assistant & Chatbot API
- **Protocol**: HTTP/1.1 / HTTPS
- **Data Format**: JSON (`application/json`)
- **Base URL**:
  - Local Server: `http://localhost:5000/api`
  - Production (Deployed): `https://dronetv-api.onrender.com/api` (or configured environment host)

---

## 2. Authentication & Security Headers

### Public Endpoints
No authentication headers required for public lead creation, health checks, or conversational bot queries.

### Administrative Endpoints
Protected administration endpoints (`GET /api/enquiries`, `PUT /api/enquiries/:id`, `DELETE /api/enquiries/:id`) require the following header:

| Header Name | Value | Description |
| :--- | :--- | :--- |
| `x-admin-key` | `droneTV_admin_key_2026` | Secret administrative authentication key configured in `server/.env` |

If the key is omitted or invalid, the API returns:
```json
{
  "success": false,
  "message": "Unauthorized access. Valid x-admin-key header is required."
}
```
HTTP Status: `401 Unauthorized`

---

## 3. Endpoints Summary Table

| Method | Route | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Public | System status, DB connection mode, and server time |
| `POST` | `/api/enquiries` | Public | Submit new lead enquiry from web UI or chatbot |
| `GET` | `/api/enquiries` | Admin Only | Search, filter, and paginate leads with status counters |
| `GET` | `/api/enquiries/:id` | Admin Only | Retrieve single enquiry by MongoDB ObjectId |
| `PUT` | `/api/enquiries/:id` | Admin Only | Update lead status (`New`, `Contacted`, `In Progress`, `Closed`) and admin follow-up notes |
| `DELETE` | `/api/enquiries/:id` | Admin Only | Remove an enquiry record permanently |
| `POST` | `/api/chatbot/message` | Public | Query rule-based natural language assistant |

---

## 4. Detailed Endpoint Specifications

### 4.1 System Health Check
Returns operational state, server time, and execution environment.

- **Method**: `GET`
- **Path**: `/api/health`
- **Headers**: None

#### Response: `200 OK`
```json
{
  "status": "online",
  "system": "DroneTV AI Support & Lead Assistant API",
  "timestamp": "2026-10-10T05:30:00.000Z",
  "environment": "development"
}
```

---

### 4.2 Submit New Lead Enquiry (Public)
Creates a new lead submission validated against length and format rules.

- **Method**: `POST`
- **Path**: `/api/enquiries`
- **Headers**: `Content-Type: application/json`

#### Request Body
```json
{
  "name": "Aarav Sharma",
  "email": "aarav.sharma@example.com",
  "phone": "+91 98765 43210",
  "userType": "Student",
  "interest": "DGCA Certified Drone Pilot Training",
  "message": "I would like to apply for the upcoming batch of DGCA pilot certification course."
}
```

#### Field Constraints
- `name`: String, 2 to 100 characters (Required)
- `email`: String, valid email format (Required)
- `phone`: String, 7 to 20 digits/symbols (Required)
- `userType`: String, one of `Student`, `Customer`, `Other` (Required, defaults to `Customer`)
- `interest`: String, up to 200 characters (Required)
- `message`: String, up to 2000 characters (Required)

#### Response: `201 Created`
```json
{
  "success": true,
  "message": "Enquiry submitted successfully! Our DroneTV team will contact you shortly.",
  "data": {
    "_id": "6614a8b7e4b0123456789abc",
    "name": "Aarav Sharma",
    "email": "aarav.sharma@example.com",
    "phone": "+91 98765 43210",
    "userType": "Student",
    "interest": "DGCA Certified Drone Pilot Training",
    "message": "I would like to apply for the upcoming batch of DGCA pilot certification course.",
    "status": "New",
    "adminNotes": "",
    "createdAt": "2026-10-10T05:30:00.000Z",
    "updatedAt": "2026-10-10T05:30:00.000Z"
  }
}
```

#### Validation Error: `400 Bad Request`
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "A valid email address is required" },
    { "field": "phone", "message": "Phone number must be between 7 and 20 digits" }
  ]
}
```

---

### 4.3 Get All Enquiries (Admin Protected)
Retrieves a paginated list of leads with full-text search and faceted status counts.

- **Method**: `GET`
- **Path**: `/api/enquiries`
- **Headers**:
  - `x-admin-key: droneTV_admin_key_2026`

#### Query Parameters
| Parameter | Type | Example | Description |
| :--- | :--- | :--- | :--- |
| `q` | String | `sharma` | Case-insensitive substring match in name, email, phone, or message |
| `userType` | String | `Student` | Filter by `Student`, `Customer`, or `Other` |
| `status` | String | `New` | Filter by `New`, `Contacted`, `In Progress`, or `Closed` |
| `page` | Integer | `1` | Page number (defaults to `1`) |
| `limit` | Integer | `10` | Number of documents per page (defaults to `10`) |

#### Response: `200 OK`
```json
{
  "success": true,
  "count": 1,
  "total": 12,
  "page": 1,
  "totalPages": 2,
  "statusCounts": {
    "New": 4,
    "Contacted": 3,
    "In Progress": 3,
    "Closed": 2
  },
  "data": [
    {
      "_id": "6614a8b7e4b0123456789abc",
      "name": "Aarav Sharma",
      "email": "aarav.sharma@example.com",
      "phone": "+91 98765 43210",
      "userType": "Student",
      "interest": "DGCA Certified Drone Pilot Training",
      "message": "I would like to apply for the upcoming batch of DGCA pilot certification course.",
      "status": "New",
      "adminNotes": "",
      "createdAt": "2026-10-10T05:30:00.000Z",
      "updatedAt": "2026-10-10T05:30:00.000Z"
    }
  ]
}
```

---

### 4.4 Get Single Enquiry By ID (Admin Protected)
Retrieves complete record details for a specific lead.

- **Method**: `GET`
- **Path**: `/api/enquiries/:id`
- **Headers**:
  - `x-admin-key: droneTV_admin_key_2026`

#### Response: `200 OK`
```json
{
  "success": true,
  "data": {
    "_id": "6614a8b7e4b0123456789abc",
    "name": "Aarav Sharma",
    "email": "aarav.sharma@example.com",
    "phone": "+91 98765 43210",
    "userType": "Student",
    "interest": "DGCA Certified Drone Pilot Training",
    "message": "I would like to apply for the upcoming batch of DGCA pilot certification course.",
    "status": "New",
    "adminNotes": "",
    "createdAt": "2026-10-10T05:30:00.000Z",
    "updatedAt": "2026-10-10T05:30:00.000Z"
  }
}
```

#### Error: `404 Not Found`
```json
{
  "success": false,
  "message": "Enquiry not found"
}
```

---

### 4.5 Update Enquiry Status & Admin Notes (Admin Protected)
Updates the lifecycle status and appends internal follow-up comments.

- **Method**: `PUT`
- **Path**: `/api/enquiries/:id`
- **Headers**:
  - `Content-Type: application/json`
  - `x-admin-key: droneTV_admin_key_2026`

#### Request Body
```json
{
  "status": "Contacted",
  "adminNotes": "Spoke with Aarav via phone. Shared syllabus and confirmed seat for next Monday."
}
```

#### Response: `200 OK`
```json
{
  "success": true,
  "message": "Enquiry updated successfully.",
  "data": {
    "_id": "6614a8b7e4b0123456789abc",
    "name": "Aarav Sharma",
    "email": "aarav.sharma@example.com",
    "phone": "+91 98765 43210",
    "userType": "Student",
    "interest": "DGCA Certified Drone Pilot Training",
    "message": "I would like to apply for the upcoming batch of DGCA pilot certification course.",
    "status": "Contacted",
    "adminNotes": "Spoke with Aarav via phone. Shared syllabus and confirmed seat for next Monday.",
    "createdAt": "2026-10-10T05:30:00.000Z",
    "updatedAt": "2026-10-10T05:35:00.000Z"
  }
}
```

---

### 4.6 Delete Enquiry (Admin Protected)
Deletes an enquiry document permanently from the database.

- **Method**: `DELETE`
- **Path**: `/api/enquiries/:id`
- **Headers**:
  - `x-admin-key: droneTV_admin_key_2026`

#### Response: `200 OK`
```json
{
  "success": true,
  "message": "Enquiry record deleted successfully."
}
```

---

### 4.7 Chatbot Rule Message Evaluation (Public)
Processes natural language user questions using intent-matching rule algorithms and returns answers with contextual question chips.

- **Method**: `POST`
- **Path**: `/api/chatbot/message`
- **Headers**: `Content-Type: application/json`

#### Request Body
```json
{
  "message": "What services does DroneTV provide?"
}
```

#### Response: `200 OK`
```json
{
  "success": true,
  "data": {
    "reply": "DroneTV provides cutting-edge drone services including Aerial Surveillance & Mapping, Agriculture Crop Monitoring & Spraying, Infrastructure & Thermal Inspection, Aerial Cinematography, and Custom Drone Engineering & Maintenance.",
    "suggestedQuestions": [
      "What courses / training are available?",
      "I am interested in a service.",
      "How can I contact DroneTV?"
    ],
    "actionTrigger": "open_services"
  }
}
```

---

## 5. cURL Execution Examples

### Health Check
```bash
curl -X GET http://localhost:5000/api/health
```

### Submit Lead Enquiry
```bash
curl -X POST http://localhost:5000/api/enquiries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pola Venkata",
    "email": "pola.venkata@example.com",
    "phone": "+91 63032 30227",
    "userType": "Student",
    "interest": "DGCA Certified Drone Pilot Training",
    "message": "Enquiring about admission fee and schedule."
  }'
```

### Query All Enquiries (Admin)
```bash
curl -X GET "http://localhost:5000/api/enquiries?status=New" \
  -H "x-admin-key: droneTV_admin_key_2026"
```

### Ask Chatbot
```bash
curl -X POST http://localhost:5000/api/chatbot/message \
  -H "Content-Type: application/json" \
  -d '{"message": "I am a student interested in pilot training"}'
```
