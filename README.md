
---

# 🍳 Foodieland. – Full-Stack Recipe Platform

**Foodieland.** is a modern full-stack web application for recipe discovery and management.
The project combines a powerful **Laravel 8.2 REST API** with a dynamic **Angular 21 frontend**, fully containerized using **Docker** for seamless development and deployment.

This project demonstrates clean architecture, secure authentication, PostgreSQL advanced querying, and professional API testing practices.

> **💡 Development workflow:** I work on each feature or task in its own Git branch. In this repository every task has its own branch, which is merged back to `main` when complete.

---

# 🚀 Technology Stack

## 🔹 Backend – Laravel 8.2

* Framework: Laravel 8.2
* Authentication: Laravel Sanctum (Bearer Token)
* Database: PostgreSQL
* Architecture: RESTful API
* Features:

  * Case-insensitive search using PostgreSQL `ILIKE`
  * Category filtering
  * Admin-only CRUD operations
  * Database seeding
  * Secure token-based authentication

---

## 🔹 Frontend – Angular v21

* Angular v21
* HttpClient for API communication
* Reactive services architecture
* SCSS / Tailwind CSS styling
* Figma-based UI implementation
* Modular and scalable structure

---

## 🔹 Infrastructure

* Docker & Docker Compose
* Nginx reverse proxy
* Multi-container architecture
* Isolated development environment

---

# 📂 Project Structure

```
CUISINE/
├── cuisine-backend/      # Laravel REST API
├── cuisine-frontend/     # Angular Application
├── nginx/                # Nginx configuration
└── docker-compose.yml    # Container orchestration
```

---

# ⚙️ Installation & Setup

## 1️⃣ Prerequisites

Make sure you have installed:

* Docker Desktop
* Git

---

## 2️⃣ Clone the Repository

```bash
git clone https://github.com/lahcen404/Foodieland
cd cuisine-project
cp .env.example .env
```

---

## 3️⃣ Build & Run Containers

```bash
docker compose up -d --build
```

This command:

* Builds Laravel backend container
* Builds Angular frontend container
* Starts PostgreSQL database
* Configures Nginx reverse proxy

---

## 4️⃣ Backend Initialization

Run inside backend container:

```bash
docker compose exec cuisine_app composer install
docker compose exec cuisine_app php artisan key:generate
docker compose exec cuisine_app php artisan migrate:refresh --seed

```

The seeder populates the database with demo recipes.

---

# 📡 API Documentation

## 🌍 Public Endpoints

| Method | Endpoint                   | Description                                |
| ------ | -------------------------- | ------------------------------------------ |
| GET    | /api/recipes               | Retrieve all recipes                       |
| GET    | /api/recipes?search=Salmon | Search recipes by title (case-insensitive) |
| GET    | /api/recipes?category=Meat | Filter recipes by category                 |

---

## 🔐 Protected Admin Endpoints

Requires Bearer Token from:

```
POST /api/login
```

| Method | Endpoint          | Description       |
| ------ | ----------------- | ----------------- |
| POST   | /api/recipes      | Create new recipe |
| PUT    | /api/recipes/{id} | Update recipe     |
| DELETE | /api/recipes/{id} | Delete recipe     |

---

# 📬 Postman Collection

To simplify API testing and demonstration, a complete Postman collection is available.

🔗 **Public Postman Collection Link:**

[https://yguhijopl.postman.co/workspace/My-Workspace~49aab289-6de5-487b-8f91-58ce1aacf8db/collection/41299916-934216d1-5599-4478-b6ab-9d1399fa8875?action=share&creator=41299916](https://yguhijopl.postman.co/workspace/My-Workspace~49aab289-6de5-487b-8f91-58ce1aacf8db/collection/41299916-934216d1-5599-4478-b6ab-9d1399fa8875?action=share&creator=41299916)

The collection includes:

* Authentication (Login)
* Get all recipes
* Search functionality
* Category filtering
* Admin CRUD operations

This demonstrates structured API testing and professional backend validation workflow.

---

# 🎯 What This Project Demonstrates

* Full-stack development (Laravel + Angular)
* Secure API design
* PostgreSQL query optimization
* Containerized deployment
* Frontend–Backend integration
* Professional testing workflow (Postman)

---

# 🧪 Testing the Application

## Default Admin Credentials

To access the admin dashboard, use these credentials:

```
Email: lahcen.maskour2003@gmail.com
Password: lahcen123
```

## Test Scenarios

| Feature | How to Test |
|---------|-------------|
| **View Recipes** | Navigate to `http://localhost:4201` (guest access allowed) |
| **Search Recipes** | Use the search bar on home page (debounced, 300ms) |
| **Filter by Category** | Click on category cards (Breakfast, Meat, etc.) |
| **View Recipe Details** | Click on any recipe card |
| **Admin Login** | Go to `/login`, use admin credentials above |
| **Add Recipe** | In admin dashboard, click "Add New Recipe", fill form with image upload |
| **Edit Recipe** | Click "Edit" button on any recipe in admin table |
| **Delete Recipe** | Click "Delete" button on any recipe in admin table |
| **Image Upload** | When adding/editing, use the file upload area or provide URL |

## Access URLs

| Service | URL |
|---------|-----|
| Frontend (Angular) | `http://localhost:4201` |
| Backend API | `http://localhost:8080` |
| pgAdmin | `http://localhost:5051` |

---

# 👨‍💻 Author

**Lahcen Ait Maskour**
---
