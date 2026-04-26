# ShopApp — React + Vite 7span-ecommerce

A full-stack ecommerce application with separate **Admin** and **Customer** flows, built with React, TypeScript, Vite, and Tailwind CSS.

---

## Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- The **backend API** server running on `http://localhost:5000` (see backend repo for setup)

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd 7span-ecommerce-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment (optional)

By default the frontend proxies all `/api` requests to `http://localhost:5000`. If your backend runs on a different port, create a `.env.local` file:

```env
VITE_HOST_API=http://localhost:<your-port>/api
```

### 4. Start the development server

```bash
npm run dev
```

The app will be available at **http://localhost:5173**.

> Make sure the backend server is running before starting the frontend.

---

## Build for Production

```bash
npm run build
```

The compiled output will be in the `dist/` folder. To preview it locally:

```bash
npm run preview
```

---

## Seed Accounts

The backend seed data includes two pre-created accounts for testing:

| Role     | Email           | Password   |
|----------|-----------------|------------|
| Admin    | admin@test.com  | qwerty1234 |
| Customer | user@test.com   | qwerty1234 |

**Admin** can manage products (create, edit, delete) via the `/admin/products` route.  
**Customer** can browse products, manage their cart, and place/view orders.

---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Framework  | React 19 + TypeScript             |
| Build tool | Vite 8                            |
| Styling    | Tailwind CSS 4                    |
| Routing    | React Router DOM 7                |
| Forms      | React Hook Form + Yup             |
| HTTP       | Axios (with JWT interceptor)      |
| Auth       | JWT (localStorage) + httpOnly cookie |

---

## Project Structure

```
src/
├── components/       # Reusable UI components (Button, Card, Table, …)
├── context/          # React context providers (AuthContext, CartContext)
├── guards/           # Route guards (AuthGuard, GuestGuard, RoleGuard)
├── hooks/            # Custom hooks
├── layouts/          # Page layout wrappers
├── lib/              # Axios client
├── pages/            # Route-level page components
├── routes/           # Route definitions
├── sections/         # Feature sections (admin/customer)
└── types/            # TypeScript interfaces
```