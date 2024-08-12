A basic REST API built with TypeScript. This API provides functionalities similar to a Twitter-like application, including authentication and posting capabilities.

## Features

- **Authentication:** Securely authenticate users using JSON Web Tokens (JWT).
- **Create Posts:** Allow users to create and manage posts.
- **Basic RESTful Endpoints:** Implement standard RESTful API endpoints.

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/edilsonjmavone/rest_api.git
   cd rest_api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

Create a `.env` file in the root directory and add the necessary environment variables. Here’s a sample `.env` file:

```env
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=password
DATABASE_NAME=restful_db
JWT_SECRET=your_jwt_secret
```

### Scripts

- **Start the server:**
  ```bash
  npm start
  ```
  This will start the server in production mode.

- **Run in development mode:**
  ```bash
  npm run dev
  ```
  This will start the server with live reloading.

- **Build the project:**
  ```bash
  npm run build
  ```
  This compiles TypeScript files into JavaScript.

- **Sync the database schema:**
  ```bash
  npm run typeorm:schema:sync
  ```

- **Drop the database schema:**
  ```bash
  npm run typeorm:schema:drop
  ```

### API Endpoints

---

Feel free to adjust the details based on the specific implementation and features of your API.
