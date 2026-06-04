# RaftLabs Senior Full Stack Developer Assessment

## Order Management Feature for a Food Delivery Application

This project demonstrates a complete order management system built as part of the RaftLabs Senior Full Stack Developer assessment. It simulates a food delivery application where users can browse menu items, add them to cart, place orders, and track order status in real-time.

## 🎥 Walkthrough

**Loom Video:** _[Add your Loom video link here]_

## 🌐 Live Demo

**Production URL:** https://raftlabs-assignment-lemon.vercel.app

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** MongoDB Atlas
- **ODM:** Mongoose
- **Validation:** Zod
- **State Management:** Zustand
- **Form Handling:** React Hook Form
- **Data Fetching:** TanStack Query (React Query)
- **Icons:** Lucide React

## ✨ Features

### Menu Management

- Display menu items fetched from MongoDB
- Automatic menu seeding when the collection is empty
- Responsive menu card layout with item details and pricing

### Shopping Cart

- Add/remove items with quantity management
- Real-time cart total calculation (subtotal, delivery fee, tax)
- Cart state persistence using Zustand with localStorage
- Maximum quantity limit per item (20 units)

### Order Placement

- Checkout form with validation using React Hook Form
- Customer details capture (name, address, phone number)
- Order summary with itemized breakdown
- Create orders via REST API with Zod validation

### Order Tracking

- Real-time order status updates using TanStack Query polling
- Visual status timeline with progress indicators
- Order details page showing customer info and items
- Dedicated tracking page with estimated delivery times

### Order Status Flow

The system supports four order statuses:

- **ORDER_RECEIVED** → Initial state when order is placed
- **PREPARING** → Restaurant is preparing the order
- **OUT_FOR_DELIVERY** → Order is on its way
- **DELIVERED** → Order successfully delivered

### Status Auto-Progression (Demo)

For demonstration purposes, the system includes automatic status updates:

- **ORDER_RECEIVED → PREPARING:** After 1 minute
- **PREPARING → OUT_FOR_DELIVERY:** After 3 minutes

> **Note:** This auto-progression is a simulation for the assessment. In a real production environment, status updates would typically be handled by an admin dashboard, restaurant system, delivery partner app, queue worker, or scheduled job based on actual business workflows.

## 🏗️ Architecture & Flow

### Application Flow

1. **Browse Menu** → User views available menu items
2. **Add to Cart** → Items are added with quantity selection
3. **Checkout** → User fills out delivery details
4. **Place Order** → Order is created and stored in MongoDB
5. **Track Order** → User can view order status and progress
6. **Status Updates** → Order status progresses automatically (demo) or manually via API

### Key Technical Patterns

- **Cached MongoDB Connection:** Reuses connection in serverless environment
- **Centralized API Handler:** Consistent error handling and response formatting
- **Schema Validation:** Zod schemas for request/response validation
- **Type Safety:** End-to-end TypeScript with strict typing
- **Client-side State:** Zustand for cart with localStorage persistence
- **Server-side State:** TanStack Query for caching and polling

## 🔌 API Routes

### Menu

- **GET** `/api/menu` - Fetch all menu items

### Orders

- **POST** `/api/orders` - Create a new order
- **GET** `/api/orders` - Fetch all orders (admin view)
- **GET** `/api/orders/[orderId]` - Get specific order details
- **PATCH** `/api/orders/[orderId]` - Update order status

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB instance)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd raftlabs_assignment
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your MongoDB Atlas connection string.

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

The menu will be automatically seeded on first load if the collection is empty.

## 📝 Environment Variables

| Variable      | Description               | Required |
| ------------- | ------------------------- | -------- |
| `MONGODB_URI` | MongoDB connection string | Yes      |

Example MongoDB URI format:

```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
```

## 📜 Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build production application
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality checks
- `npm run test` - Run Vitest unit tests

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── menu/
│   │   │   └── route.ts          # Menu API endpoints
│   │   └── orders/
│   │       ├── route.ts          # Orders API endpoints
│   │       └── [orderId]/
│   │           └── route.ts      # Individual order endpoints
│   ├── cart/
│   │   └── page.tsx              # Shopping cart page
│   ├── checkout/
│   │   └── page.tsx              # Checkout page
│   ├── order/
│   │   └── [orderId]/
│   │       ├── page.tsx          # Order details page
│   │       └── track/
│   │           └── page.tsx      # Order tracking page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   ├── cart/
│   │   ├── CartItem.tsx          # Individual cart item
│   │   └── CartSummary.tsx       # Cart totals summary
│   ├── checkout/
│   │   └── CheckoutForm.tsx      # Checkout form component
│   ├── layout/
│   │   └── Header.tsx            # App header
│   ├── menu/
│   │   └── MenuCard.tsx          # Menu item card
│   └── order/
│       └── OrderStatusTimeline.tsx # Visual status tracker
├── data/
│   └── menu.data.ts              # Sample menu data for seeding
├── lib/
│   ├── api-handler.ts            # Centralized API handler
│   ├── ApiError.ts               # Custom error class
│   ├── db.ts                     # MongoDB connection with caching
│   ├── seed-menu.ts              # Menu seeding utility
│   └── api/
│       ├── menus.ts              # Menu API client functions
│       └── orders.ts             # Orders API client functions
├── models/
│   ├── menu.model.ts             # Menu Mongoose schema
│   └── order.model.ts            # Order Mongoose schema
├── providers/
│   └── ReactQueryProvider.tsx    # TanStack Query provider
├── schemas/
│   └── order.schema.ts           # Zod validation schemas
├── store/
│   └── useCartStore.ts           # Zustand cart store
└── types/
    ├── menu.ts                   # Menu TypeScript types
    └── order.ts                  # Order TypeScript types
```

## 🧪 Testing

The project includes automated tests using **Vitest** to ensure core functionality works correctly.

### Test Coverage

**Zustand Cart Store:**

- Add item to cart
- Increase quantity for existing items
- Update item quantity
- Total price calculation with delivery fee and tax

**Zod Order Schema Validation:**

- Valid order payload
- Missing customer name validation
- Missing menu item ID validation
- Invalid quantity validation

### Running Tests

```bash
npm run test
```

### Future Enhancements

For a production application, you would add:

- Integration tests for API routes
- E2E tests (Playwright/Cypress)
- Component tests (React Testing Library)

## 🚀 Deployment Notes

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add `MONGODB_URI` environment variable
4. Deploy

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- AWS Amplify
- Netlify
- Railway
- Render

Make sure to:

- Set the `MONGODB_URI` environment variable
- Use Node.js 18+ runtime
- Configure build command: `npm run build`
- Configure start command: `npm start`

## 📋 Key Implementation Details

### MongoDB Connection Caching

The app uses a cached connection pattern to prevent exhausting database connections in the serverless environment. The connection is reused across function invocations.

### Cart Persistence

Cart state is automatically persisted to localStorage and hydrated on page load using Zustand's persist middleware.

### Order Status Polling

The tracking page uses TanStack Query's `refetchInterval` to poll for status updates every 5 seconds, providing near real-time updates without WebSockets.

### Automatic Menu Seeding

On application startup, if the menu collection is empty, it's automatically populated with sample data from `menu.data.ts`.

### Price Freezing

When an order is placed, item prices are captured as `priceAtPurchase` to ensure order totals remain accurate even if menu prices change later.

---

**Built for RaftLabs Senior Full Stack Developer Assessment**
