Release Checklist Tool

A minimal Single Page Application (SPA) built with React.js and Express to help developers manage their release processes.

Tech Stack
Frontend: React JS (Create React App), Axios, CSS
Backend: Node.js, Express, PostgreSQL
Database Schema

```sql
CREATE TABLE IF NOT EXISTS releases (
id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
release_date TIMESTAMP NOT NULL,
additional_info TEXT,
completed_steps BOOLEAN[] DEFAULT '{false,false,false,false,false,false,false,false,false,false}'
);
```

API Endpoints
GET /api/releases - Fetches all releases (computes status dynamically).
POST /api/releases - Creates a new release.
PUT /api/releases/:id - Updates additional_info and completed_steps.
Local Development Instructions
1. Database Setup

Ensure PostgreSQL is running.

Create a database named release_db.

2. Backend Setup

Navigate to backend/.

Create .env:

```env
DATABASE_URL=postgres://postgres:YOUR_PASSWORD@localhost:5432/release_db
PORT=3001
```

Run:

```bash
npm install
node server.js
```

The backend runs on port 3001.

3. Frontend Setup

Navigate to frontend/.

Run:

```bash
npm install
npm start
```

The frontend runs on port 3000