# Event Management System

A full-stack web application for managing events with Spring Boot backend and React frontend.

## Features
- Create, Read, Update, Delete (CRUD) operations for events
- Modern UI with responsive design
- MySQL database integration
- RESTful API endpoints
- Colorful and intuitive user interface

## Technologies
- **Backend**: Spring Boot 3, Java 17
- **Frontend**: React 18, Bootstrap 5
- **Database**: MySQL
- **Build Tools**: Maven, npm

## Prerequisites
- Java 17 JDK
- Node.js 16+
- MySQL 8+
- Maven 3.8+

## Setup

### Backend Setup
1. Create MySQL database:
```sql
CREATE DATABASE event_management;
```

2. Update database credentials in `src/main/resources/application.properties`

3. Build and run:
```bash
mvn spring-boot:run
```

### Frontend Setup
1. Install dependencies:
```bash
cd frontend
npm install
```

2. Run development server:
```bash
npm start
```

## Project Structure
```
event-managment-system/
├── src/                    # Backend source
│   ├── main/java/          # Java code
│   └── main/resources/     # Configuration files
├── frontend/               # Frontend source
│   ├── public/             # Static files
│   └── src/               # React components
├── pom.xml                # Maven config
└── README.md              # This file
```

## API Endpoints
| Method | Endpoint       | Description          |
|--------|---------------|----------------------|
| GET    | /api/events   | Get all events       |
| POST   | /api/events   | Create new event     |
| GET    | /api/events/{id} | Get single event  |
| PUT    | /api/events/{id} | Update event      |
| DELETE | /api/events/{id} | Delete event      |


