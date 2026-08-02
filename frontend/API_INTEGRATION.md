# 🔌 API Integration — GearUp

> Mapping of **frontend pages/components → backend endpoints** for the GearUp (Gear Rental Marketplace) application.

---

# 1. Overview

| Item | Value |
|------|------|
| **Base URL (Dev)** | `http://localhost:5000` (from `.env` → `BACKEND_API_URL`) |
| **Backend Framework** | Express + Prisma (PostgreSQL) |
| **Data Fetching** | Next.js Server Actions (`"use server"`) + Native `fetch` |
| **Auth Strategy** | JWT stored in **httpOnly Cookies** (`accessToken`, `refreshToken`) |
| **Payment Gateway** | Stripe Checkout |
| **Response Shape** | `{ success, message, data, meta? }` |

All Server Actions live inside `app/**/_actions/` and communicate with the backend through `process.env.BACKEND_API_URL`.

---

# 2. Backend Endpoint Mapping

## 🔐 Authentication

| Method | Endpoint | Frontend Consumer |
|---------|----------|------------------|
| POST | `/api/auth/register` | Register Form |
| POST | `/api/auth/login` | Login Form |
| GET | `/api/auth/me` | Profile, Dashboard, Navbar |
| POST | `/api/auth/refresh-token` | Auto Refresh Token |

---

## 📂 Categories

| Method | Endpoint | Frontend Consumer |
|---------|----------|------------------|
| GET | `/api/categories` | Home, Category Page |
| POST | `/api/categories` | Admin Category Create |
| PATCH | `/api/categories/:id` | Admin Category Update |
| DELETE | `/api/categories/:id` | Admin Category Delete |

---

## ⛺ Gear

| Method | Endpoint | Frontend Consumer |
|---------|----------|------------------|
| GET | `/api/gear` | Home, Gear Page |
| GET | `/api/gear/:id` | Gear Details |
| GET | `/api/gear/provider/gear` | Provider Dashboard |
| POST | `/api/gear` | Create Gear |
| PATCH | `/api/gear/:id` | Update Gear |
| DELETE | `/api/gear/:id` | Delete Gear |

---

## 👤 User

| Method | Endpoint | Frontend Consumer |
|---------|----------|------------------|
| PATCH | `/api/user` | Update Profile |

---

## 📦 Rentals

| Method | Endpoint | Frontend Consumer |
|---------|----------|------------------|
| POST | `/api/rentals` | Rental Form |
| GET | `/api/rentals` | My Rentals |
| PATCH | `/api/rentals/:id/cancel` | Cancel Rental |
| GET | `/api/rentals/provider/orders` | Provider Orders |
| PATCH | `/api/rentals/provider/orders/:id` | Provider Status Update |
| GET | `/api/rentals/admin/rentals` | Admin Rentals |

---

## ⭐ Reviews

| Method | Endpoint | Frontend Consumer |
|---------|----------|------------------|
| POST | `/api/reviews` | Create Review |
| GET | `/api/reviews/my` | My Reviews |
| GET | `/api/reviews/gear/:gearId` | Gear Details |
| PATCH | `/api/reviews/:id` | Update Review |
| DELETE | `/api/reviews/:id` | Delete Review |

---

## 💳 Payments

| Method | Endpoint | Frontend Consumer |
|---------|----------|------------------|
| POST | `/api/payments/create` | Pay Now Button |
| POST | `/api/payments/confirm` | Stripe Webhook (Backend Only) |
| GET | `/api/payments` | My Payments |
| GET | `/api/payments/:id` | Payment Details |

---

## 🛡 Admin

| Method | Endpoint | Frontend Consumer |
|---------|----------|------------------|
| GET | `/api/admin/users` | Admin Users |
| PATCH | `/api/admin/users/:id` | Update User Status |
| GET | `/api/admin/gear` | Admin Dashboard |

---

# 3. Frontend Page → API Mapping

| Page | Endpoint |
|------|----------|
| Home | GET `/api/gear`, GET `/api/categories` |
| Gear | GET `/api/gear` |
| Gear Details | GET `/api/gear/:id`, GET `/api/reviews/gear/:gearId` |
| Rental | GET `/api/gear/:id`, POST `/api/rentals` |
| Profile | GET `/api/auth/me`, PATCH `/api/user` |
| My Rentals | GET `/api/rentals`, PATCH `/api/rentals/:id/cancel`, POST `/api/payments/create` |
| My Payments | GET `/api/payments` |
| Provider Dashboard | GET `/api/gear/provider/gear`, GET `/api/rentals/provider/orders` |
| Admin Dashboard | GET `/api/admin/users`, GET `/api/rentals/admin/rentals` |
| Login | POST `/api/auth/login` |
| Register | POST `/api/auth/register` |

---

# 4. Stripe Payment Flow

1. Customer clicks **Pay Now**
2. Frontend calls `POST /api/payments/create`
3. Backend creates Stripe Checkout Session
4. User is redirected to Stripe Checkout
5. After successful payment Stripe calls `/api/payments/confirm`
6. Backend updates Payment Status and Rental Status
7. User is redirected to `/payment/success`
8. If payment is cancelled, user is redirected to `/payment/cancel`

---

# 5. Authentication

- JWT Authentication
- httpOnly Cookies
- Refresh Token
- Next.js Middleware Protected Routes
- Role Based Route Protection

---

# 6. Admin Credentials (For Testing)

| Role | Email | Password |
|------|-------|----------|
| **Admin** | **milonmondolmd33@gmail.com** | 12345678 |

---

# 7. Revalidation

- my-profile
- public-gears
- single-gear
- my-gear
- my-rentals
- provider-orders
- admin-rentals
- admin-users
- all-category
- all-reviews
- my-reviews

---

# 8. Error Handling

The frontend provides consistent error handling across the application.

- Toast Notifications (Sonner)
- Inline Form Validation
- Error Boundary (`error.tsx`)
- Custom 404 Page (`not-found.tsx`)
- Loading UI (`loading.tsx`)
- API Error Messages
- Network Error Handling

---

# 9. Technologies Used

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI
- Server Actions
- Native Fetch API
- JWT Authentication
- Next.js Middleware
- Stripe Checkout
- Prisma Backend
- PostgreSQL

---

## Conclusion

The GearUp Frontend consumes all required backend APIs, implements role-based authentication, middleware protection, full CRUD operations, Stripe payment integration, responsive UI, loading states, and robust error handling according to the Assignment 5 requirements.