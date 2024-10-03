## Live Demo

A live demo of the application can be found at:

https://eclectic-peony-207aa8.netlify.app/

# Library Management System

This project is a **Library Management System** built with **Java Spring Boot** for the backend and **React** for the frontend. The project is containerized and deployed using **Docker** for ease of setup and deployment. The system allows users to manage books, categories, authors, and track borrowing records.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Live Demo](#live-demo)
- [License](#license)

---

## Features

- **Book Management**: Add, update, delete, and view books.
- **Author Management**: Manage author details.
- **Category Management**: Organize books by categories.
- **Borrowing System**: Track borrowers, borrow dates, and return status of books.
- **User-Friendly Interface**: Interactive and modern UI for both users and administrators.
- **Containerized Deployment**: Easily deployable using Docker.

---

## Technologies Used

- **Backend**:
  - Java Spring Boot
  - PostgreSQL
- **Frontend**:
  - React
  - HTML
  - CSS
- **Containerization**: Docker

---

## Prerequisites

Make sure you have the following installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/en/download/) (for running the React frontend)
- [Java 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) or later

---

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/deerborg/BookStore.git
   cd library-management-system
   ```

2. **Build the Backend:** Navigate to the backend directory and build the application:

   ```bash
   cd backend
   ./mvnw clean install
   ```

3. **Set Up Docker:**

```bash
 docker-compose up
```

4. **Start the Frontend:** Navigate to the frontend directory:

```bash
   cd frontend
   npm install
   npm start
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
