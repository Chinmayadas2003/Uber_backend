# Uber Backend

This repository contains a small sample backend for a ride hailing service built with Node.js, Express, MongoDB, Redis and Socket.IO.

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Create a `.env` file** in the repository root and define the following environment variables:

   ```dotenv
   PORT=3000
   MONGO_URI=<your mongo connection string>
   REDIS_URL=<your redis connection string>
   JWT_SECRET=<any secret string>
   ```

   The default driver UI expects the API to run on port `3000`.

3. **Start the development server**

   ```bash
   npm run dev
   ```

   This runs `src/index.js` using nodemon so the server automatically reloads when files change.

## Sample Driver UI

A very small sample UI for drivers is located at `src/public/driver.html`.

1. Make sure the server is running using the steps above.
2. Open the HTML file in your browser (for example by double‑clicking it or using `file://`).
3. Login with a driver account. The page communicates with the API at `http://localhost:3000` and listens for booking updates over WebSockets.

The UI is helpful for quickly testing driver workflows during local development.
