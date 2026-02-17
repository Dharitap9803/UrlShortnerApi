# Shortly — URL Shortener Platform

Shortly is a full-stack web platform that enables users to create, manage, and analyze shortened links. The application provides a unified interface for generating compact URLs, tracking engagement metrics, editing link details, and viewing analytics—all within a responsive, multi-language–ready experience.

## Live Demo

You can view the live demo of the application [link](https://urlshortnerapi-0ah1.onrender.com).

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
  - [Root / Backend Environment Variables](#root--backend-environment-variables)
  - [Frontend Environment Variables](#frontend-environment-variables)
- [Code Explanation](#code-explanation)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Deployment](#deployment)
- [About](#about)

## Features

- **Home Page**: Landing page with hero section, URL shortener entry point, feature highlights, trusted-by section, metrics strip, use-case cards, and footer with navigation and legal links.
- **URL Shortening**: Paste a long URL to receive a shortened link; requires authentication. Validation and auth prompts guide the user.
- **Links Page**: Create new short links with an inline form; view success state and copy shortened URL.
- **Link Details Page**: Central list of all user links with filter bar, date filter, and three view modes—compact, list, and grid—for different density and layout preferences.
- **Link Card Actions**: Each link card supports Edit, Share, Analytics, and More options, with consistent placement and icons across views.
- **Edit Link Page**: Dedicated page to update short link back-half, destination URL, title, and tags; Cancel and Save actions with validation and error handling.
- **Analytics Page**: Per-link analytics including summary, QR code section, Bitly-style page section, and an engagements-over-time chart derived from visit history.
- **Short URL Redirect**: Visiting a short path (e.g. `/{shortId}`) redirects to the original destination; invalid IDs fall back to the React app or a clear error.
- **Authentication**: Sign up and log in with JWT-based sessions; token and user details stored for authenticated API calls and profile display.
- **Profile Display**: Header profile shows logged-in user initials and name across all authenticated pages; sign out clears session and redirects appropriately.
- **Internationalization (i18n)**: Language selector on the home page with multiple locales; all selected languages currently display English copy with fallback support and persistence.
- **Responsive Design**: Layout and components adapt to phone, tablet, laptop, and large screens using Tailwind CSS breakpoints and flexible layouts.
- **Logout**: Secure sign-out from the profile dropdown, clearing token and user data and redirecting to the home page.

## Technologies Used

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Vite**: Build tool and dev server for fast development and optimized production bundles.
- **React Router**: Declarative routing for single-page navigation.
- **Tailwind CSS**: Utility-first CSS framework for styling and responsive design.
- **Axios**: HTTP client for API requests with interceptors for auth and error handling.

### Backend

- **Node.js**: JavaScript runtime for the server.
- **Express.js**: Web framework for API routes, middleware, and static serving.
- **MongoDB**: NoSQL database for storing users, URLs, and visit history.
- **Mongoose**: ODM for schema definition, validation, and database operations.
- **JWT**: JSON Web Tokens for authentication.
- **bcryptjs**: Password hashing for secure credential storage.

### APIs and Integrations

- **REST API**: Custom backend for auth, URL shortening, analytics, and link updates.

## Setup

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- MongoDB instance (local or Atlas)

### Installation

Clone the repository:

```bash
git clone https://github.com/Dharitap9803/UrlShortnerApi.git
cd UrlShortnerApi
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the `frontend` directory if your app uses environment-specific URLs (e.g. API base URL):

```env
VITE_API_URL="Your backend base URL (e.g. http://localhost:8001)"
```

4. Start the development server:

```bash
npm run dev
```

5. Build for production:

```bash
npm run build
```

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the `backend` directory with the required environment variables (see [Environment Variables](#environment-variables)). Do not commit real credentials.

4. Start the backend server:

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

### Running the Application

- **Monorepo / production-style**: From the project root, install root dependencies, then run the build and start scripts as defined in the root `package.json` (e.g. `npm run build` then `npm start`) so the backend serves the built frontend from `frontend/dist`.

- **Development**: Run the backend from `backend` (e.g. `npm start` or `npm run dev`) and the frontend from `frontend` (e.g. `npm run dev`) separately; use the frontend dev server URL and ensure the frontend is configured to call the backend API URL.

## API Endpoints

### Authentication

- **`POST /auth/signup`**  
  Register a new user. Expects body fields such as name, email, and password. Returns token and user object on success.

- **`POST /auth/login`**  
  Authenticate user with email and password. Returns token and user object (e.g. id, name, email).

### URL Shortening and Management

- **`POST /url`**  
  Create a new short link. Expects `url` (long URL) in the body. Optional auth; if authenticated, link is associated with the user.

- **`GET /url/user`**  
  Returns all short links for the currently authenticated user. Requires valid JWT.

- **`GET /url/:id`**  
  Returns a single URL document by short ID, including visit history and metadata. Used for edit and analytics pages. Requires authentication.

- **`PATCH /url/:id`**  
  Update an existing link (e.g. title, tags, back-half/shortId). Requires authentication. Validates unique back-half when changed.

### Redirect

- **`GET /:shortId`**  
  Resolves a short ID to the original URL and responds with a redirect. If no link is found, the server may serve the frontend or return an error depending on configuration.

## Environment Variables

### Root / Backend Environment Variables

Create a `.env` file in the project root or in the `backend` directory. Use placeholder values; never commit real secrets.

```env
PORT=8001
MONGODB_URI="mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority"
```

- **PORT**: Port on which the server listens.
- **MONGODB_URI**: Full MongoDB connection string (Atlas or local). Replace placeholders with your own values and ensure network access (e.g. IP whitelist) is configured.

### Frontend Environment Variables

If the frontend uses env-based API URL (e.g. with Vite):

```env
VITE_API_URL="http://localhost:8001"
```

Replace with your backend base URL in development and production as needed.

## Code Explanation

### Frontend

- **Home Page**: Landing content, navigation, language selector, URL shortener form, feature and use-case sections, footer. Uses shared i18n context for labels.
- **Login / Signup Pages**: Forms for authentication; on success, store token and user in localStorage and redirect to the app.
- **Links Page**: Form to create a short link; displays result and copy action. Uses the same layout (header, sidebar) as other authenticated pages.
- **Link Details Page**: Lists user links with filters and view modes (compact, list, grid). Cards show short link, destination, date, and actions (Edit, Share, Analytics, More). Edit and Analytics navigate to dedicated routes.
- **Edit Link Page**: Loads link by short ID, form for title, tags, back-half, and destination; save calls PATCH and navigates back or to updated link.
- **Analytics Page**: Fetches link by short ID; displays summary, QR code block, and engagements-over-time chart from visit history.
- **API Client**: Central Axios instance with request interceptor to attach JWT and response interceptor to handle 401 (e.g. redirect to login).
- **i18n**: Global context and hook for language and translations; language preference persisted so the selected locale is used across the app.

### Backend

- **Auth Routes**: Signup and login handlers; hash passwords, issue JWT, return user payload. Middleware validates JWT for protected routes.
- **URL Routes**: Create short link (optional auth), list user links, get single link, update link (title, tags, back-half). Short ID generation and uniqueness handled in controller/model layer.
- **Redirect Route**: Look up short ID and send redirect response; otherwise pass through to static/frontend handling.
- **Static Serving**: In production setup, serve built frontend from `frontend/dist` and fallback to `index.html` for client-side routing.
- **Database**: Mongoose schemas for User and URL; URL includes visit history, title, tags, and timestamps.

## Deployment

- **Build**: Ensure the frontend is built before starting the server (e.g. `npm run build` from root or as part of CI/CD). The root `package.json` defines build and start scripts suitable for platforms like Render.
- **Environment**: Set `PORT` and `MONGODB_URI` (and any other required variables) in the deployment environment. Do not commit `.env` or real credentials.
- **MongoDB Atlas**: If using Atlas, configure network access (e.g. allow deployment platform IPs or use allowed list) so the backend can connect.

## About

**Shortly** is a full-stack URL shortener built to demonstrate production-style practices: RESTful API design, JWT authentication, responsive React UI, and deployment-ready structure with a single codebase for frontend and backend. The public-facing app lets users create and manage short links and view analytics, while the backend ensures secure, scalable link storage and redirect handling.
