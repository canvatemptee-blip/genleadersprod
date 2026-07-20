# GenLeaders Frontend

The frontend for GenLeaders, built with React, TypeScript, and Vite.

The application delivers both the public publishing platform and the administrative dashboard, providing a modern interface for discovering content, managing articles, administering users, and operating the publishing workflow. It communicates with the backend through REST APIs to handle authentication, content management, newsletter operations, media uploads, and administrative tasks.

---

## Features

### Public Platform

- Homepage
- Featured articles
- Article catalogue
- Individual article pages
- Category browsing
- Newsletter subscription
- Email verification
- Newsletter unsubscription

### Administrative Dashboard

- Secure authentication
- Article management
- Category management
- Featured article management
- Newsletter subscriber management
- Staff management
- Role-based access control
- Image uploads
- Scheduled publishing

---

## User Interface

The application consists of two primary experiences.

The public platform enables visitors to discover published content, browse articles by category, and subscribe to newsletters through a responsive reading experience.

The administrative dashboard provides authorized staff with the tools required to manage articles, organize categories, administer users, upload media, configure featured content, and oversee newsletter subscriptions through a unified interface.

---

## Technology Stack

| Category        | Technology      |
| :-------------- | :-------------- |
| Language        | TypeScript      |
| Framework       | React           |
| Build Tool      | Vite            |
| Styling         | Tailwind CSS    |
| Routing         | React Router    |
| Server State    | TanStack Query  |
| Forms           | React Hook Form |
| HTTP Client     | Fetch API       |
| Package Manager | npm             |

---

## Prerequisites

Before running the application, ensure you have:

- Node.js 22 or later
- npm
- Git
- A running GenLeaders backend

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/<your-username>/genleaders.git
cd genleaders/frontend
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file in the frontend directory.

Example:

```env
VITE_API_URL=http://localhost:8081/api
```

Update the API URL if your backend is running on a different host.

---

### Run the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## Building for Production

Create a production build.

```bash
npm run build
```

Preview the production build locally.

```bash
npm run preview
```

---

## Project Structure

```text
frontend/
├── public/
├── src/
│   ├── app/
│   ├── assets/
│   ├── components/
│   ├── features/
│   ├── hooks/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   ├── providers/
│   ├── routes/
│   ├── shared/
│   ├── types/
│   └── ...
├── package.json
└── vite.config.ts
```

The project follows a feature-oriented architecture that separates reusable UI components, application features, routing, shared utilities, and infrastructure concerns into dedicated modules to improve maintainability and scalability.

---

## Backend Integration

The frontend communicates with the Express backend through REST APIs.

The backend is responsible for:

- Authentication and authorization
- Article management
- Category management
- Newsletter operations
- Media uploads
- User management
- Scheduled publishing
- Business logic and data persistence

For backend setup instructions, see the [Backend README](../backend/README.md).

---

## Development

Useful commands:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

---

## Deployment

The frontend is designed to be deployed independently from the backend.

Before deployment, ensure that:

- `VITE_API_URL` points to the production backend.
- Environment variables are correctly configured.
- The backend is accessible from the deployed frontend.
- The hosting platform is configured to serve the application as a single-page application.

A typical production deployment consists of:

- Frontend → Vercel
- Backend → Render

---

## Contributing

Contributions are welcome.

If you would like to improve the frontend, please open an issue to discuss significant architectural, user interface, or user experience changes before submitting a pull request.
