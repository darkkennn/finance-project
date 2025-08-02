# 📊 Full-Stack Finance Tracker

A comprehensive, full-stack web application built from the ground up to provide users with a secure and intuitive platform for personal expense and income management. The application features a decoupled architecture with a React frontend and a Node.js/Express backend, deployed on a scalable cloud infrastructure.

**[https://finance-project-rho.vercel.app/]**

Tech Stack & Tools

- **Frontend**: React, Vite, React Router, Tailwind CSS, Axios, Recharts
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT), bcrypt.js
- **Deployment**: Backend on Render, Frontend on Vercel


**Prerequisites**
- [Node.js](https://nodejs.org/en/) (v18 or later)
- [Git](https://git-scm.com/)

#### **Installation & Setup**

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/finance-project.git](https://github.com/your-username/finance-project.git)
    cd finance-project
    ```

2.  **Install dependencies for all parts:**
    ```bash
    npm install                 # Installs root dependencies (concurrently)
    npm install --prefix client # Installs frontend dependencies
    npm install --prefix server # Installs backend dependencies
    ```

3.  **Set up Environment Variables:**
    - Create a `.env` file in the `server` directory and add the following:
      ```
      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET=your_super_secret_jwt_key
      CORS_ORIGIN=http://localhost:5173
      ```
    - Create a `.env` file in the `client` directory and add the following:
      ```
      VITE_API_URL=http://localhost:5001/api
      ```

**Running the Application**

- From the root directory, run the development server:
  ```bash
  npm run dev
  ```
