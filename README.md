https://libraryseymen.netlify.app/     
CANLI LİNK

Library Management System
Description
This is a full-stack Library Management System designed for managing books, authors, publishers, categories, and book borrowings. The backend is built using Java Spring Boot with PostgreSQL for database management, and the frontend is developed using React.

Technologies Used
Backend: Java Spring Boot, Spring Data JPA, PostgreSQL
Frontend: React, Axios, React-Bootstrap
Deployment: Docker, Render (for backend), Netlify (for frontend)
API Documentation: Swagger
Features
The application allows the user to:

Manage Publishers (CRUD operations)
Manage Categories (CRUD operations)
Manage Books (CRUD operations)
Manage Authors (CRUD operations)
Borrow Books (CRUD operations)
View and interact with a user-friendly interface built in React
Responsive modals for error handling and user notifications
Live Demo
Backend: Backend Render Link (to be updated)
Frontend: Frontend Netlify Link (to be updated)
Installation Guide
Backend Setup
Clone the repository:

bash
Kodu kopyala
git clone https://github.com/Seymennbugay/capstone-bitirme-projesi-backend.git
cd capstone-bitirme-projesi-backend
Configure environment variables: Update the application.properties file with your database credentials or provide a .env file with the following values:

properties
Kodu kopyala
spring.datasource.url=jdbc:postgresql://${DBURL}/${DBNAME}
spring.datasource.username=${DBUSERNAME}
spring.datasource.password=${DBPASSWORD}
Run the backend application:

Using Maven:
bash
Kodu kopyala
mvn spring-boot:run
Using Docker:
bash
Kodu kopyala
docker-compose up --build
Access the backend API: Visit http://localhost:8080/swagger-ui.html to view API documentation and interact with the backend using Swagger.

Frontend Setup
Clone the repository:

bash
Kodu kopyala
git clone https://github.com/Seymennbugay/capstone-bitirme-projesi.git
cd library-frontend
Install dependencies:

bash
Kodu kopyala
npm install
Run the application:

bash
Kodu kopyala
npm start
Build the application for production:

bash
Kodu kopyala
npm run build
Deployment Instructions
Backend (Render):
Log in to Render and create a new Web Service.
Connect the GitHub repository for the backend and configure the environment variables.
Deploy the backend.
Frontend (Netlify):
Log in to Netlify and create a new site.
Connect the GitHub repository for the frontend.
Set the build command to:
bash
Kodu kopyala
npm run build
Set the publish directory to:
bash
Kodu kopyala
build/
Deploy the frontend.
API Endpoints
Publisher CRUD
GET /api/v1/publishers: List all publishers
POST /api/v1/publishers: Add a new publisher
PUT /api/v1/publishers/{id}: Update publisher details
DELETE /api/v1/publishers/{id}: Delete a publisher
Category CRUD
GET /api/v1/categories: List all categories
POST /api/v1/categories: Add a new category
PUT /api/v1/categories/{id}: Update category details
DELETE /api/v1/categories/{id}: Delete a category
Book CRUD
GET /api/v1/books: List all books
POST /api/v1/books: Add a new book
PUT /api/v1/books/{id}: Update book details
DELETE /api/v1/books/{id}: Delete a book
Author CRUD
GET /api/v1/authors: List all authors
POST /api/v1/authors: Add a new author
PUT /api/v1/authors/{id}: Update author details
DELETE /api/v1/authors/{id}: Delete an author
Book Borrowing CRUD
GET /api/v1/borrows: List all borrowed books
POST /api/v1/borrows: Borrow a book
PUT /api/v1/borrows/{id}: Update borrow information
DELETE /api/v1/borrows/{id}: Return a borrowed book
Future Improvements
Improve the UI/UX for a more user-friendly experience.
Add authentication and authorization for different user roles (admin, user).
Implement notifications for book return dates.
