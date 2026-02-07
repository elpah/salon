# Professional Hair Stylist

**Professional Hair Stylist** is a full-stack monorepo project featuring a **Salon Website** and **Admin Dashboard**, built with React, TypeScript, Vite, and MongoDB. It includes shared packages for hooks, types, and UI components, designed for scalability and maintainability.  

---

## Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Project Structure](#project-structure)  
- [Setup](#setup)  
- [Formatting & Linting](#formatting--linting)  
- [Future Improvements](#future-improvements)  

---

## Overview

This monorepo contains:  

1. **Admin Dashboard** (`apps/admin`) – Manage bookings, services, products, and view analytics.  
2. **Salon Website** (`apps/web`) – Customer-facing site for browsing services and booking appointments.  
3. **Backend API** (`apps/api`) – RESTful API built with Node.js/Express and MongoDB for persistent data storage.  
4. **Shared Packages** (`packages/`) – Includes reusable hooks, types, and UI components.  

The architecture allows **separate deployment** of web, admin, and API while sharing logic and types across the monorepo.

---

## Features

- **Admin Dashboard**
  - Service, product, and booking, availability, and order management
  - User role and permissions (future development)  

- **Salon Website**
  - Browse services  
  - Book appointments with date/time selection  
  - View availability
  - Shop by product
  - Checkout using stripe


- **Shared Utilities**
  - Reusable hooks (`packages/hooks`)  
  - Type definitions (`packages/types`)  
  - Notification components (`packages/ui`)  
 

---

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS  
- **Backend**: Node.js + Express + MongoDB  
- **State Management**: React Query (shared via `packages/hooks`)  
- **Routing**: React Router  
- **Other**: Toast notifications, Lucide-react for icons.

---

## Project Structure

```bash 
├── apps/
│ ├── admin/ # Admin dashboard application
│ ├── web/ # Salon website
│ └── backend/ # Backend API server
├── packages/
│ ├── data/ # Shared data 
│ ├── hooks/ # Shared React hooks
│ ├── types/ # Shared TypeScript types
│ └── ui/ # Shared UI components & notifications
├── .gitignore
└── package.json

```

---

## Setup

1. Clone the repository:

```bash
git clone <repo-url>
cd hair-stylist

```

2.Install dependencies for the root and workspaces:
```bash
npm install

```

3. Copy .env.example to .env for each workspace and fill in the values:

```bash
 VITE_API_URL=http://localhost:8000
MONGO_URI=mongodb://localhost:27017/salon
```


## Run both frontend applications and API simultaneously:
``` bash
npm run dev

```

---

## Formatting & Linting

This project includes **pre-configured formatting and linting** for consistent code style across workspace(`apps/*`).

- **Formatter**: Prettier  
- **Linter**: ESLint (with TypeScript support)  
- **Style Guide**: Enforces consistent imports, spacing, and code style  

### Usage

Run formatting and linting across all workspaces:

```bash
npm run format
npm run lint

```

Admin Dashboard: http://localhost:5173

Salon Website: http://localhost:5174

Backend API: http://localhost:8000


_Each application (apps/admin, apps/web, apps/api) has its own production-ready build._

## Deployment can be separated:

Frontend → Vercel 
Backend → Vercel, Render, or DigitalOcean
Database → MongoDB Atlas

## Future Improvements

- Authentication & Accounts for general users including role-based access, JWT, OAuth
- Payment Integration – Stripe/PayPal for online bookings and payment checkout
- Analytics & Reporting – Track bookings, revenue in admin dashboard
