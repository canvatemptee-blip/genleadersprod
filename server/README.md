# GenLeaders Backend

The backend service powering GenLeaders, built with Node.js, Express, TypeScript, and PostgreSQL.

It exposes the REST APIs that drive the public publishing platform and administrative dashboard, handling authentication, content management, newsletter operations, media uploads, scheduled publishing, and role-based access control. The application follows a modular architecture that separates routing, business logic, persistence, and infrastructure concerns to provide a scalable and maintainable production backend.

---

## Features

- RESTful API
- JWT authentication
- Role-based access control
- Article management
- Category management
- Featured article management
- Newsletter subscription
- Email verification
- Newsletter unsubscription
- Staff management
- Image uploads
- Scheduled publishing
- PostgreSQL persistence
- Background jobs
- Modular service architecture

---

## Technology Stack

| Category        | Technology        |
| :-------------- | :---------------- |
| Runtime         | Node.js           |
| Language        | TypeScript        |
| Framework       | Express           |
| Database        | PostgreSQL        |
| Authentication  | JWT               |
| ORM / Driver    | PostgreSQL Driver |
| File Storage    | Cloudinary        |
| Email           | Nodemailer        |
| Validation      | Zod               |
| Package Manager | npm               |

---

## Prerequisites

Before running the backend, ensure you have:

- Node.js 22 or later
- PostgreSQL
- npm
- Git
- Cloudinary account
- SMTP credentials for email delivery

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/<your-username>/genleaders.git
cd genleaders/backend
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file in the backend directory.

Example:

```env
PORT=8081

DATABASE_URL=postgresql://username:password@localhost:5432/genleaders

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_app_password
MAIL_FROM=your_email
```

Update the values according to your local environment.

---

### Run the development server

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:8081
```

---

## Building for Production

Compile the application.

```bash
npm run build
```

Start the production server.

```bash
npm run start
```

---

## Project Structure

```text
backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── repositories/
│   ├── jobs/
│   ├── utils/
│   ├── types/
│   ├── db/
│   └── ...
├── package.json
└── tsconfig.json
```

The project follows a layered architecture that separates HTTP routing, business logic, database access, middleware, scheduled jobs, and infrastructure services into dedicated modules.

---

## Architecture

The backend is responsible for enforcing the application's business rules and coordinating communication between the database, authentication layer, email services, and media storage.

Requests flow through middleware responsible for authentication, authorization, and validation before reaching controllers and service layers, where business operations are executed. Persistence is handled through dedicated database modules, while background jobs perform scheduled maintenance and publishing tasks independently of incoming requests.

This separation of responsibilities promotes maintainability, testability, and scalability while keeping the application logic independent of infrastructure concerns.

---

## Core Responsibilities

The backend manages all server-side functionality required by the platform, including:

- User authentication
- Authorization and permissions
- Article publishing
- Category management
- Featured content management
- Newsletter subscriptions
- Email verification
- Newsletter unsubscription
- Image management
- Scheduled publishing
- Staff administration
- Database persistence

---

## External Services

The backend integrates with several third-party services.

| Service    | Purpose                                    |
| :--------- | :----------------------------------------- |
| PostgreSQL | Primary data storage                       |
| Cloudinary | Image hosting and media management         |
| SMTP       | Email verification and newsletter delivery |

---

## API

The backend exposes REST endpoints consumed by the React frontend.

Core API capabilities include:

- Authentication
- User management
- Article management
- Category management
- Featured article management
- Newsletter management
- Media uploads
- Administrative operations

---

## Development

Useful commands:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production application
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

---

## Deployment

The backend is designed to be deployed independently from the frontend.

Before deployment, ensure that:

- PostgreSQL is accessible.
- Cloudinary credentials are configured.
- SMTP credentials are valid.
- JWT secrets are securely configured.
- All required environment variables are available.
- The frontend is configured to communicate with the deployed API.

A typical production deployment consists of:

- Backend → Render
- Database → Neon PostgreSQL
- Media Storage → Cloudinary

---

## Contributing

Contributions are welcome.

If you would like to improve the backend, please open an issue to discuss significant architectural, infrastructure, or API changes before submitting a pull request.
