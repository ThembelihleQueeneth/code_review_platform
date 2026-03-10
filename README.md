#  Code Review Platform API

A backend API built with **Express** and **TypeScript** that powers a collaborative **code review platform**.  
It provides authentication, user management, and project endpoints to support reviewing and managing code submissions.

---

##  Features
- **Authentication**: Secure login and registration with JWT
- **User Management**: CRUD operations for users
- **Project Management**: Create, update, and delete projects
- **Code Review Support**: Projects serve as containers for code review discussions
- **Database Connectivity**: Verified at startup for reliability

---

##  Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd <your-repo-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```env
   PORT=5000
   DATABASE_URL=your_database_connection_string
   JWT_SECRET=your_secret_key
   ```

4. Run the server:
   ```bash
   npm run dev
   ```
   The API will be available at **http://localhost:5000**

---

##  API Endpoints

### Authentication
- `POST /api/auth/register` → Register a new user  
- `POST /api/auth/login` → Login and receive a JWT  

### Users
- `GET /api/users` → List all users  
- `GET /api/users/:id` → Get user by ID  
- `PUT /api/users/:id` → Update user details  
- `DELETE /api/users/:id` → Delete user  

### Projects
- `GET /api/projects` → List all projects  
- `POST /api/projects` → Create a new project (e.g., code repository for review)  
- `GET /api/projects/:id` → Get project details  
- `PUT /api/projects/:id` → Update project info  
- `DELETE /api/projects/:id` → Remove a project  

---

##  Error Handling
- `400` → Bad request (missing/invalid fields)
- `401` → Unauthorized (invalid/missing token)
- `404` → Resource not found
- `500` → Internal server error

---

##  Tech Stack
- **Node.js**
- **Express**
- **TypeScript**
- **dotenv** for environment variables
- **Database driver/ORM** (configured in `./config/database`)

## Author
```Thembelihle Maluka```
