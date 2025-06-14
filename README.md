# 🍔 Slooze Food Order API — Backend (MERN)

This is the backend for a food ordering system built with **Node.js**, **Express**, and **MongoDB**. It includes features like authentication, role-based access control, region filtering, and complete order management.

---

## ✨ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- TypeScript
- JWT Authentication
- Role & Region-based Access Control

---

## 📁 Folder Structure

```
server/
├── routes/
│   ├── auth.ts
│   ├── restaurantRoutes.ts
│   └── orderRoutes.ts
├── middleware/
│   ├── authMiddleware.ts
├── .env
├── db.ts
├── index.ts
```

---

## 🔐 Environment Variables (`.env`)

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
```

---

## 📦 Installation

```bash
git clone https://github.com/your-username/slooze-api.git
cd server
npm install
npm run dev
```

> 🧃️ The database is manually seeded with **restaurant** and **menu item** data for testing purposes.

---

## 🔑 Authentication Routes (Public)

### POST `/api/auth/register`

Registers a new user with role and region.

### POST `/api/auth/login`

Returns JWT token for authenticated users.

---

## 🌍 Restaurant Routes (All Roles)

### GET `/api/restaurants`

Returns all restaurants (filtered by user region, unless admin).

### GET `/api/restaurants/:id/menu`

Returns menu items for a restaurant (region-based access).

---

## 🛒 Order Routes

### POST `/api/orders`

Creates a new order.

```json
{
  "paymentMethod": "UPI",
  "items": [{ "menuItemId": "id", "quantity": 2 }]
}
```

### PATCH `/api/orders/:id/checkout`

Marks an order as placed (admin/manager only).

### DELETE `/api/orders/:id`

Cancels an order (admin/manager only).

### GET `/api/orders`

Fetches all orders (admin = all, manager = region-only).

### PATCH `/api/orders/:id/payment-method`

Updates payment method (admin only).

```json
{ "paymentMethod": "Card" }
```

---

## 🧪 Testing

Use Postman or Thunder Client. All routes (except `/auth`) require a valid JWT.

---

## ✅ Sample Users

Seed the database with the following roles:

- Admin: Nick Fury
- Managers: Captain Marvel (India), Captain America (America)
- Members: Thor (India), Travis (America)

---

## 🌐 API Endpoint Summary (Quick Reference)

### Auth Routes

```
POST    /api/auth/register
POST    /api/auth/login
```

### Restaurant Routes

```
GET     /api/restaurants
GET     /api/restaurants/:id/menu
```

### Order Routes

```
POST    /api/orders
PATCH   /api/orders/:id/checkout
DELETE  /api/orders/:id
GET     /api/orders
PATCH   /api/orders/:id/payment-method
```

---

## 🙌 Author

Ashish Kunthe
