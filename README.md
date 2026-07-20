# GenLeaders

GenLeaders is a production-ready content publishing platform designed for organizations that publish editorial content, manage newsletters, and administer their publishing workflow through a secure web dashboard.

The platform consists of a React frontend and a Node.js backend that together provide a complete content management experience, including article publishing, category management, newsletter subscriptions, role-based administration, scheduled publishing, and media management.

The project is organized as a monorepo containing independent frontend and backend applications, allowing both services to evolve together while remaining modular, maintainable, and independently deployable.

---

## Production Status

This repository contains the production codebase for GenLeaders.

The frontend and backend are designed to be deployed independently while sharing a common development workflow and release lifecycle.

---

## Repository Structure

```text
.
├── frontend/    # React web application
└── backend/     # Node.js REST API
```

Each module contains its own documentation.

| Module | Description |
| :------ | :---------- |
| [`frontend`](./frontend) | React application, UI architecture, setup instructions, and deployment guide |
| [`backend`](./backend) | REST API, business logic, infrastructure, and deployment guide |

---

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- TanStack Query
- React Router
- React Hook Form

### Backend

- Node.js
- Express
- TypeScript
- PostgreSQL
- JWT Authentication
- Cloudinary
- Nodemailer

### Infrastructure

- Neon PostgreSQL
- Render
- Vercel
- Cloudinary

---

## Core Capabilities

- Public content publishing platform
- Rich article management
- Category management
- Featured article management
- Newsletter subscription and verification
- Newsletter unsubscription
- Staff management
- Role-based access control
- Image upload and media management
- Scheduled publishing workflow

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
- Featured content management
- Newsletter subscriber management
- Staff management
- Role-based permissions
- Image uploads
- Scheduled publishing

---

## Architecture

GenLeaders follows a modular client-server architecture.

The frontend is responsible for presenting the publishing platform and administrative dashboard, while the backend exposes REST APIs that manage authentication, business logic, persistence, media uploads, newsletter workflows, and scheduled publishing operations.

This separation allows each application to be developed, tested, deployed, and scaled independently while maintaining a unified development experience within a single repository.

---

## Getting Started

Clone the repository.

```bash
git clone https://github.com/<your-username>/genleaders.git
cd genleaders
```

Choose the component you want to run.

- **Frontend:** See the [Frontend README](./frontend/README.md)
- **Backend:** See the [Backend README](./backend/README.md)

Each module contains its own setup instructions, environment configuration, development workflow, and deployment guide.

---

## Repository Layout

```text
genleaders/
├── frontend/
│   └── React application
│
├── backend/
│   └── Express API
│
└── README.md
```

---

## Deployment

The applications are designed to be deployed independently.

Typical production deployment consists of:

- Frontend → Vercel
- Backend → Render
- Database → Neon PostgreSQL
- Media Storage → Cloudinary

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
