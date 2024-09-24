# MERN Project

This project is a MERN (MongoDB, Express, React, Node.js) stack application with a Vite-powered frontend.

## Project Structure

- `frontend/`: Contains the Vite-powered React frontend
- `backend/`: Contains the Express.js backend

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js (v14 or later recommended)
- npm (usually comes with Node.js)
- MongoDB (Make sure it's running on your machine)

## Running the Project

### Backend

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm start
   ```

   The backend should now be running on `http://localhost:5000` (or your configured port).

### Frontend

1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

   The frontend should now be running on `http://localhost:5173` (Vite's default port).

4. Open your browser and visit `http://localhost:5173` to see the application.

## Additional Notes

- Make sure your MongoDB instance is running before starting the backend.
- You may need to configure environment variables for database connection, API keys, etc. Check the `.env.example` files in both frontend and backend folders (if they exist) and create your own `.env` files accordingly.
- For production deployment, you'll need to build the frontend (`npm run build` in the frontend folder) and serve it through your backend or a static file server.