# Dashboard Challenge

A Next.js dashboard application with authentication, role-based permissions, and project management.

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd dashboard-challenge
```

1. Install dependencies:

```bash
npm install
```

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to access the application.

## Example Credentials

Use these credentials to test different user roles:

### Manager Account

- **Email:** <manager@example.com>
- **Password:** Password#123
- **Permissions:** Full access to create, edit, and delete projects

### Viewer Account

- **Email:** <viewer@example.com>
- **Password:** Password#123
- **Permissions:** Read-only access to view projects

## Features

- **Authentication:** JWT-based authentication with automatic token refresh
- **Role-Based Access Control:** Different permissions for managers and viewers
- **Project Management:** Create, edit, view, and delete projects
- **Responsive Design:** Mobile-friendly interface using Tailwind CSS
- **Real-time Updates:** Optimistic updates and automatic data synchronization

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- TanStack Query (Data Fetching)
