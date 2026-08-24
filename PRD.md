# PRD: Laptop Rental Platform
## Product Requirements Document

**Tanggal:** 22 Agustus 2026  
**Versi:** 1.0 (Draft)  
**Status:** Review - Awaiting Client Input  
**Project:** Laptop Rental Platform - Landing Page & Admin Panel  
**Referensi:** Savanna Bromo (Motor Trail Rental)

---

## Daftar Isi

1. [Executive Summary](#1-executive-summary)
2. [System Architecture](#2-system-architecture)
3. [Tech Stack](#3-tech-stack)
4. [Database Design](#4-database-design)
5. [Public API (Landing Page)](#5-public-api-landing-page)
6. [Admin API (Backyard)](#6-admin-api-backyard)
7. [Admin Frontend](#7-admin-frontend)
8. [Authentication & Security](#8-authentication--security)
9. [Payment Integration](#9-payment-integration)
10. [Response Format](#10-response-format)

---

## 1. Executive Summary

Platform rental laptop untuk bisnis/event/personal. Sistem terdiri dari 3 komponen:

| Komponen | Deskripsi | Teknologi |
|----------|-----------|-----------|
| **Landing Page** | Website publik - customer lihat laptop, paket, booking | Next.js 14 + React 19 |
| **Backend API** | Server untuk Landing Page + Admin | Cloudflare Workers + Hono + D1 |
| **Admin Panel** | Backyard untuk manage inventory & operasional | React 19 + React Router v7 + Tailwind v4 |

### Core Features

**Phase 1 - Foundation:**
- Laptop inventory management
- Customer management
- Booking workflow (pending → confirmed → active → completed)
- Payment integration (Midtrans/Xendit)
- Lead/inquiry management
- Basic reporting

**Phase 2 - Operational:**
- Equipment inspection (pre/post rental)
- Deposit system
- Penalty/fines (late return, damage)
- ID/license verification
- Rental agreement generation
- WhatsApp notifications

---

## 2. System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLOUDFLARE                               │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              Cloudflare Worker (Hono)                     │  │
│  │                                                           │  │
│  │  ┌─────────────────┐    ┌──────────────────────────────┐  │  │
│  │  │  Public API     │    │  Admin API (JWT Auth)        │  │  │
│  │  │  (API Key)      │    │                              │  │  │
│  │  │                 │    │  - Auth                       │  │  │
│  │  │  - Availability │    │  - Laptops CRUD               │  │  │
│  │  │  - Bookings     │    │  - Customers CRUD             │  │  │
│  │  │  - Leads        │    │  - Bookings Workflow          │  │  │
│  │  │  - Laptops      │    │  - Payments                   │  │  │
│  │  │  - Packages     │    │  - Maintenance                │  │  │
│  │  │  - Pricing      │    │  - Dashboard                  │  │  │
│  │  │  - Reviews      │    │  - Reports                    │  │  │
│  │  │  - Settings     │    │  - Users                      │  │  │
│  │  └─────────────────┘    └──────────────────────────────┘  │  │
│  │                                                           │  │
│  │  ┌─────────────────┐    ┌──────────────────────────────┐  │  │
│  │  │  Webhook        │    │  Static Assets (SPA)         │  │  │
│  │  │  (No Auth)      │    │  /dist/client/               │  │  │
│  │  │                 │    │  (Admin React App)           │  │  │
│  │  │  - Midtrans     │    └──────────────────────────────┘  │  │
│  │  │  - Xendit       │                                      │  │
│  │  └─────────────────┘                                      │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                  │
│                    ┌─────────▼──────────┐                       │
│                    │  Cloudflare D1     │                       │
│                    │  (SQLite Database) │                       │
│                    └────────────────────┘                       │
└─────────────────────────────────────────────────────────────────┘

External:
┌──────────────┐         ┌──────────────┐
│  Landing     │────────▶│  Backend API │   X-API-Key
│  Page (FE)   │         │  /api/v1/    │
└──────────────┘         └──────────────┘

┌──────────────┐         ┌──────────────┐
│  Payment     │────────▶│  Webhook     │   Signature verify
│  Gateway     │         │  /api/v1/    │
└──────────────┘         └──────────────┘
```

---

## 3. Tech Stack

| Layer | Teknologi | Versi |
|-------|-----------|-------|
| Runtime | Cloudflare Workers | - |
| Backend | Hono | ^4.11 |
| Database | Cloudflare D1 (SQLite) | - |
| ORM | Drizzle ORM | ^0.38 |
| Language | TypeScript | ^5.8 |
| Frontend (Admin) | React 19 | ^19.0 |
| Router (Admin) | React Router v7 | ^7.0 |
| Styling | Tailwind CSS v4 | ^4.0 |
| UI Components | shadcn/ui (Radix) | - |
| State Management | Zustand + TanStack Query | ^5.0 |
| Validation | Zod | ^3.23 |
| Auth (Admin) | JWT (httpOnly cookie) | @tsndr/cloudflare-worker-jwt |
| Auth (Public) | X-API-Key header | - |
| Payment | Midtrans/Xendit | - |
| Build | Vite + @cloudflare/vite-plugin | ^6.0 |

---

## 4. Database Design

### Core Tables

#### `laptops` — Laptop Inventory

```typescript
export const laptops = sqliteTable('laptops', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),                    // "MacBook Pro 14" M3"
  serialNumber: text('serial_number').notNull().unique(),
  brand: text('brand').notNull(),                  // "Apple", "Dell", "Lenovo"
  model: text('model').notNull(),                  // "MacBook Pro 14-inch 2024"
  category: text('category').notNull(),            // "Developer", "Designer", "Student", "Gaming"
  
  // Specs (JSON)
  specs: text('specs').notNull(),                  // { processor, ram, storage, gpu, screen, ports }
  
  // Pricing
  dailyRateIdr: real('daily_rate_idr').notNull(),
  weeklyRateIdr: real('weekly_rate_idr').notNull(),
  monthlyRateIdr: real('monthly_rate_idr').notNull(),
  
  // Status
  status: text('status', { 
    enum: ['Available', 'Rented', 'Maintenance', 'Inactive', 'Cleaning'] 
  }).notNull().default('Available'),
  
  // Condition tracking
  conditionStatus: text('condition_status', {
    enum: ['Excellent', 'Good', 'Fair', 'Poor', 'Maintenance']
  }),
  
  // Media
  photoUrl: text('photo_url'),
  description: text('description'),
  
  // Accessories included (JSON array)
  includedAccessories: text('included_accessories'),  // ["Charger", "Mouse", "Bag", "USB Hub"]
  
  // Timestamps
  purchaseDate: text('purchase_date'),
  warrantyExpiry: text('warranty_expiry'),
  lastMaintenanceDate: text('last_maintenance_date'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
}, (table) => ({
  statusIdx: index('laptops_status_idx').on(table.status),
  brandIdx: index('laptops_brand_idx').on(table.brand),
  categoryIdx: index('laptops_category_idx').on(table.category),
  serialIdx: index('laptops_serial_idx').on(table.serialNumber),
}));
```

**Sample specs JSON:**
```json
{
  "processor": "Apple M3 Pro 12-core",
  "ram": "18GB Unified Memory",
  "storage": "512GB SSD",
  "gpu": "18-core GPU",
  "screen": "14.2\" Liquid Retina XDR (3024x1964)",
  "ports": "3x Thunderbolt 4, HDMI, SD Card, MagSafe 3",
  "battery": "Up to 18 hours",
  "weight": "1.6 kg",
  "os": "macOS Sonoma"
}
```

---

#### `customers` — Customer Database

```typescript
export const customers = sqliteTable('customers', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  phone: text('phone').notNull().unique(),
  email: text('email').notNull(),
  idNumber: text('id_number'),                     // KTP/Passport number
  idType: text('id_type'),                         // "KTP", "Passport", "SIM"
  address: text('address'),
  company: text('company'),                        // For corporate rentals
  notes: text('notes'),
  isBlacklisted: integer('is_blacklisted', { mode: 'boolean' }).default(false),
  blacklistReason: text('blacklist_reason'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});
```

---

#### `bookings` — Rental Bookings

```typescript
export const bookings = sqliteTable('bookings', {
  id: text('id').primaryKey(),
  bookingNumber: text('booking_number').notNull().unique(),  // "LPR-2026-0001"
  
  // Relations
  customerId: text('customer_id').notNull().references(() => customers.id),
  laptopId: text('laptop_id').notNull().references(() => laptops.id),
  
  // Rental period
  startDate: text('start_date').notNull(),
  endDate: text('end_date').notNull(),
  actualReturnDate: text('actual_return_date'),
  
  // Status workflow
  status: text('status', {
    enum: ['Pending', 'pending_payment', 'Confirmed', 'Active', 'Completed', 
           'Cancelled', 'payment_failed', 'expired', 'refunded']
  }).notNull().default('Pending'),
  
  // Payment
  paymentTerms: text('payment_terms', { 
    enum: ['Full_Upfront', 'DP_50', 'DP_30', 'Monthly_Invoice'] 
  }).notNull(),
  paymentStatus: text('payment_status'),
  paymentMethod: text('payment_method'),
  snapToken: text('snap_token'),
  paymentPageUrl: text('payment_page_url'),
  paidAt: text('paid_at'),
  
  // Amounts
  baseAmount: real('base_amount').notNull(),
  addonsAmount: real('addons_amount').default(0),
  depositAmount: real('deposit_amount').default(0),
  lateFee: real('late_fee').default(0),
  damageFee: real('damage_fee').default(0),
  totalAmount: real('total_amount').notNull(),
  totalPenalty: real('total_penalty').default(0),
  currency: text('currency', { enum: ['IDR', 'USD'] }).default('IDR'),
  
  // DP flow (Xendit partial payment)
  paymentType: text('payment_type', { enum: ['full', 'dp'] }).default('full'),
  dpAmount: real('dp_amount').default(0),
  dpPaidAt: text('dp_paid_at'),
  remainingAmount: real('remaining_amount').default(0),
  fullyPaidAt: text('fully_paid_at'),
  xenditInvoiceId: text('xendit_invoice_id'),
  
  // Pickup/Return confirmation
  pickupConfirmed: integer('pickup_confirmed', { mode: 'boolean' }).default(false),
  pickupConfirmedAt: text('pickup_confirmed_at'),
  returnConfirmed: integer('return_confirmed', { mode: 'boolean' }).default(false),
  returnConfirmedAt: text('return_confirmed_at'),
  
  // Checklist refs
  pickupChecklistId: text('pickup_checklist_id'),
  returnChecklistId: text('return_checklist_id'),
  
  // Misc
  purpose: text('purpose'),                        // "Work", "Event", "Project", "Gaming"
  notes: text('notes'),
  createdBy: text('created_by').references(() => users.id),
  cancelledAt: text('cancelled_at'),
  
  // Notification tracking
  reminderSentAt: text('reminder_sent_at'),
  reviewRequestSentAt: text('review_request_sent_at'),
  
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
}, (table) => ({
  customerIdx: index('bookings_customer_idx').on(table.customerId),
  laptopIdx: index('bookings_laptop_idx').on(table.laptopId),
  statusIdx: index('bookings_status_idx').on(table.status),
  datesIdx: index('bookings_dates_idx').on(table.startDate, table.endDate),
  numberIdx: index('bookings_number_idx').on(table.bookingNumber),
}));
```

---

#### `booking_addons` — Additional Items

```typescript
export const bookingAddons = sqliteTable('booking_addons', {
  id: text('id').primaryKey(),
  bookingId: text('booking_id').notNull().references(() => bookings.id),
  name: text('name').notNull(),                    // "Wireless Mouse", "Laptop Bag", "USB Hub"
  quantity: integer('quantity').notNull().default(1),
  pricePerDay: real('price_per_day').notNull(),
  totalPrice: real('total_price').notNull(),
  createdAt: text('created_at').notNull(),
});
```

---

#### `packages` — Rental Packages

```typescript
export const packages = sqliteTable('packages', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),                    // "Developer Pro", "Student Starter", "Gaming Beast"
  tagline: text('tagline'),
  description: text('description'),
  image: text('image'),
  
  // Package details
  laptopCategory: text('laptop_category'),         // Filter laptops by category
  duration: text('duration'),                      // "1 week", "1 month", "3 months"
  
  // Pricing
  price: integer('price').notNull(),
  
  // Included items (JSON array)
  includedItems: text('included_items'),           // ["Laptop", "Mouse", "Bag", "Insurance"]
  
  // Meta
  sortOrder: integer('sort_order').default(0),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});
```

---

#### `pricing_tiers` — Pricing Plans

```typescript
export const pricingTiers = sqliteTable('pricing_tiers', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),                    // "Basic", "Pro", "Enterprise"
  description: text('description'),
  
  // Rates
  dailyPrice: integer('daily_price').notNull(),
  weeklyPrice: integer('weekly_price').notNull(),
  monthlyPrice: integer('monthly_price').notNull(),
  
  // Features (JSON arrays)
  features: text('features').notNull(),
  notIncluded: text('not_included').notNull(),
  
  // Display
  highlighted: integer('highlighted', { mode: 'boolean' }).default(false),
  icon: text('icon'),
  sortOrder: integer('sort_order').default(0),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});
```

---

#### `reviews` — Customer Reviews

```typescript
export const reviews = sqliteTable('reviews', {
  id: text('id').primaryKey(),
  customerId: text('customer_id').references(() => customers.id),
  bookingId: text('booking_id').references(() => bookings.id),
  
  name: text('name').notNull(),
  location: text('location'),
  rating: integer('rating').notNull(),             // 1-5
  text: text('text').notNull(),
  avatar: text('avatar'),
  
  isPublished: integer('is_published', { mode: 'boolean' }).default(false),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});
```

---

#### `leads` — Inquiry/Lead Management

```typescript
export const leads = sqliteTable('leads', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  email: text('email').notNull(),
  message: text('message'),
  
  // Preferences
  preferredStart: text('preferred_start'),
  preferredEnd: text('preferred_end'),
  laptopInterest: text('laptop_interest'),         // "Developer", "Designer", "Student", "Gaming"
  budget: text('budget'),
  purpose: text('purpose'),
  
  // Meta
  source: text('source').notNull().default('Website'),  // "Website", "WhatsApp", "Phone", "Instagram"
  status: text('status', { 
    enum: ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'] 
  }).default('New'),
  
  assignedTo: text('assigned_to').references(() => users.id),
  notes: text('notes'),
  
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});
```

---

#### `payments` — Payment Records

```typescript
export const payments = sqliteTable('payments', {
  id: text('id').primaryKey(),
  bookingId: text('booking_id').notNull().references(() => bookings.id),
  
  amount: real('amount').notNull(),
  currency: text('currency').default('IDR'),
  method: text('method'),                          // "online", "bank_transfer", "cash"
  
  status: text('status', {
    enum: ['pending', 'verified', 'rejected', 'refunded']
  }).default('pending'),
  
  gateway: text('gateway'),                        // "midtrans", "xendit", "manual"
  transactionId: text('transaction_id'),
  proofUrl: text('proof_url'),
  
  verifiedBy: text('verified_by').references(() => users.id),
  verifiedAt: text('verified_at'),
  notes: text('notes'),
  
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});
```

---

#### `maintenance_records` — Laptop Maintenance

```typescript
export const maintenanceRecords = sqliteTable('maintenance_records', {
  id: text('id').primaryKey(),
  laptopId: text('laptop_id').notNull().references(() => laptops.id),
  
  type: text('type', {
    enum: ['Scheduled', 'Repair', 'Upgrade', 'Cleaning', 'Inspection']
  }).notNull(),
  
  description: text('description').notNull(),
  cost: real('cost'),
  
  status: text('status', {
    enum: ['Scheduled', 'In_Progress', 'Completed', 'Cancelled']
  }).default('Scheduled'),
  
  scheduledDate: text('scheduled_date'),
  startedAt: text('started_at'),
  completedAt: text('completed_at'),
  
  performedBy: text('performed_by'),               // Technician name
  notes: text('notes'),
  
  createdBy: text('created_by').references(() => users.id),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});
```

---

#### `users` — Admin Users

```typescript
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),            // PBKDF2-SHA256
  role: text('role', { enum: ['SUPER_ADMIN', 'STAFF'] }).default('STAFF'),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});
```

---

#### `system_config` — System Configuration

```typescript
export const systemConfig = sqliteTable('system_config', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
  updatedAt: text('updated_at').notNull(),
});
```

**Config Keys:**
```
contact_email
contact_phone
whatsapp_number
location
instagram_url
facebook_url
bank_name
bank_account_number
bank_account_holder
deposit_amount
deposit_description
public_api_enabled
public_api_key
late_fee_per_day
damage_fee_minor
damage_fee_major
```

---

#### `token_blacklist` — JWT Blacklist

```typescript
export const tokenBlacklist = sqliteTable('token_blacklist', {
  jti: text('jti').primaryKey(),
  expiresAt: text('expires_at').notNull(),
  createdAt: text('created_at').notNull(),
});
```

---

#### `laptop_checklists` — Equipment Inspection (Phase 2)

```typescript
export const laptopChecklists = sqliteTable('laptop_checklists', {
  id: text('id').primaryKey(),
  laptopId: text('laptop_id').notNull().references(() => laptops.id),
  bookingId: text('booking_id').references(() => bookings.id),
  
  type: text('type', { enum: ['pickup', 'return'] }).notNull(),
  
  // Checklist items (JSON)
  checklistData: text('checklist_data').notNull(),  // Physical condition, accessories, battery, etc.
  
  // Photos
  photos: text('photos'),                          // JSON array of photo URLs
  
  // Issues
  issuesFound: text('issues_found'),               // JSON array of issues
  damageFee: real('damage_fee').default(0),
  
  performedBy: text('performed_by').references(() => users.id),
  createdAt: text('created_at').notNull(),
});
```

**Sample checklistData:**
```json
{
  "physicalCondition": "Good",
  "screen": { "status": "Good", "notes": "" },
  "keyboard": { "status": "Good", "notes": "" },
  "trackpad": { "status": "Good", "notes": "" },
  "ports": { "status": "Good", "notes": "" },
  "batteryHealth": "85%",
  "charger": true,
  "mouse": true,
  "bag": true,
  "usbHub": false
}
```

---

#### `verification_codes` — ID/License Verification (Phase 2)

```typescript
export const verificationCodes = sqliteTable('verification_codes', {
  id: text('id').primaryKey(),
  customerId: text('customer_id').notNull().references(() => customers.id),
  bookingId: text('booking_id').references(() => bookings.id),
  
  documentType: text('document_type', { enum: ['KTP', 'SIM', 'Passport'] }).notNull(),
  documentNumber: text('document_number').notNull(),
  documentPhotoUrl: text('document_photo_url'),
  selfiePhotoUrl: text('selfie_photo_url'),
  
  status: text('status', {
    enum: ['pending', 'verified', 'rejected']
  }).default('pending'),
  
  verifiedBy: text('verified_by').references(() => users.id),
  verifiedAt: text('verified_at'),
  rejectionReason: text('rejection_reason'),
  
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});
```

---

## 5. Public API (Landing Page)

Base: `GET/POST /api/v1/public/*`  
Auth: `X-API-Key` header  
CORS: `ALLOWED_PUBLIC_API_ORIGINS` env var

### Core Endpoints

#### `GET /public/availability`

**Query:**
- `startDate` (required): YYYY-MM-DD
- `endDate` (required): YYYY-MM-DD
- `category` (optional): Developer, Designer, Student, Gaming

**Response 200:**
```json
{
  "success": true,
  "data": {
    "requestedPeriod": { "startDate": "2026-09-01", "endDate": "2026-09-07" },
    "availableLaptops": [
      {
        "id": "uuid",
        "name": "MacBook Pro 14\" M3",
        "brand": "Apple",
        "category": "Developer",
        "dailyRateIdr": 250000,
        "weeklyRateIdr": 1500000,
        "photoUrl": "/images/macbook-pro-14.jpg",
        "specs": { "processor": "Apple M3 Pro", "ram": "18GB", "storage": "512GB SSD" }
      }
    ],
    "unavailableLaptops": [
      { "id": "uuid", "name": "Dell XPS 15", "reason": "Booked for selected dates" }
    ],
    "totalAvailable": 5
  }
}
```

---

#### `POST /public/bookings`

**Request:**
```json
{
  "laptopId": "uuid",
  "startDate": "2026-09-01",
  "endDate": "2026-09-07",
  "customerName": "John Doe",
  "customerPhone": "+6281234567890",
  "customerEmail": "john@email.com",
  "purpose": "Work",
  "notes": "Need delivery to office"
}
```

**Response 200:**
```json
{
  "success": true,
  "data": {
    "bookingId": "uuid",
    "bookingNumber": "LPR-2026-0001",
    "snapToken": "midtrans-snap-token",
    "snapRedirectUrl": "https://app.sandbox.midtrans.com/snap/v2/...",
    "totalAmount": 1500000
  }
}
```

**Business Flow:**
1. Validate input
2. Check laptop exists & available
3. Check date conflicts
4. Find or create customer (by phone)
5. Calculate: `totalAmount = days * weeklyRateIdr / 7` (pro-rata)
6. Generate booking number: `LPR-YYYY-NNNN`
7. Create booking: status=`pending_payment`
8. Hit payment gateway → get token
9. Save snapToken
10. Return response

---

#### `POST /public/leads`

**Request:**
```json
{
  "name": "Jane Smith",
  "phone": "+6281234567890",
  "email": "jane@email.com",
  "message": "Need laptop for 2-month project",
  "source": "Website",
  "preferredDates": {
    "start": "2026-09-15",
    "end": "2026-11-15",
    "laptopInterest": "Developer",
    "budget": "5000000",
    "purpose": "Software Development Project"
  }
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Inquiry submitted successfully",
  "data": { "id": "uuid", "status": "New", "createdAt": "2026-08-22T10:30:00Z" }
}
```

---

#### `GET /public/laptops`

**Query:** `category`, `minPrice`, `maxPrice`, `brand`

**Response 200:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "MacBook Pro 14\" M3",
      "brand": "Apple",
      "model": "MacBook Pro 14-inch 2024",
      "category": "Developer",
      "dailyRateIdr": 250000,
      "weeklyRateIdr": 1500000,
      "monthlyRateIdr": 5000000,
      "specs": {
        "processor": "Apple M3 Pro 12-core",
        "ram": "18GB Unified Memory",
        "storage": "512GB SSD",
        "screen": "14.2\" Liquid Retina XDR"
      },
      "description": "Perfect for developers and content creators",
      "photoUrl": "/images/macbook-pro-14.jpg",
      "includedAccessories": ["Charger", "USB-C Cable", "Cleaning Kit"],
      "available": true
    }
  ]
}
```

---

#### `GET /public/packages`

**Response 200:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Developer Pro",
      "tagline": "High-performance laptop for coding",
      "description": "Includes MacBook Pro or equivalent, accessories, and tech support",
      "image": "/images/package-dev-pro.jpg",
      "duration": "1 month",
      "price": 5000000,
      "laptopCategory": "Developer",
      "includedItems": ["Laptop", "Mouse", "Bag", "Tech Support", "Insurance"]
    }
  ]
}
```

---

#### `GET /public/pricing`

**Response 200:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Basic",
      "description": "For short-term needs",
      "dailyPrice": 150000,
      "weeklyPrice": 900000,
      "monthlyPrice": 3000000,
      "features": [
        "Laptop rental",
        "Standard accessories",
        "Basic insurance",
        "24/7 support"
      ],
      "notIncluded": [
        "Delivery",
        "Premium accessories",
        "Extended warranty"
      ],
      "highlighted": false,
      "icon": "Laptop"
    }
  ]
}
```

---

#### `GET /public/reviews`

**Query:** `limit`, `offset`, `rating`

**Response 200:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Ahmad Rizki",
      "location": "Jakarta",
      "rating": 5,
      "text": "Laptop bersih, performa bagus, pelayanan cepat",
      "avatar": "AR",
      "createdAt": "2026-08-15T08:00:00Z"
    }
  ],
  "meta": { "total": 12, "averageRating": 4.8 }
}
```

---

#### `GET /public/settings`

**Response 200:**
```json
{
  "success": true,
  "data": {
    "contactEmail": "hello@laptoprental.com",
    "contactPhone": "+6281234567890",
    "whatsappNumber": "6281234567890",
    "location": "Jakarta, Indonesia",
    "instagramUrl": "https://instagram.com/laptoprental",
    "facebookUrl": "https://facebook.com/laptoprental",
    "bankAccount": {
      "bankName": "BCA",
      "accountNumber": "123 456 7890",
      "accountHolder": "Laptop Rental Co."
    },
    "deposit": {
      "amount": 1000000,
      "description": "Fully refundable upon return"
    }
  }
}
```

---

#### `GET /public/bookings/:bookingNumber/status`

**Response 200:**
```json
{
  "success": true,
  "data": {
    "bookingNumber": "LPR-2026-0001",
    "status": "confirmed",
    "paymentStatus": "settlement",
    "laptopName": "MacBook Pro 14\" M3",
    "startDate": "2026-09-01",
    "endDate": "2026-09-07",
    "totalAmount": 1500000,
    "paidAt": "2026-08-22T10:35:00Z"
  }
}
```

---

#### `POST /webhooks/midtrans/notification`

**Body dari Midtrans:**
```json
{
  "transaction_status": "settlement",
  "order_id": "LPR-2026-0001",
  "gross_amount": "1500000.00",
  "signature_key": "abc123...",
  "payment_type": "bank_transfer",
  "transaction_id": "midtrans-txn-001",
  "status_code": "200",
  "fraud_status": "accept"
}
```

**Status Mapping:**

| Midtrans Status | Booking Status | Payment Status |
|----------------|---------------|---------------|
| settlement | Confirmed | settlement |
| capture | Confirmed | settlement |
| pending | pending_payment | pending |
| deny | payment_failed | deny |
| expire | expired | expire |
| cancel | Cancelled | cancel |
| refund | refunded | refund |

**Response:**
```json
{ "status_code": "200", "status_message": "OK" }
```

---

## 6. Admin API (Backyard)

Base: `/api/v1/*` (except `/public/*` and `/webhooks/*`)  
Auth: JWT httpOnly cookie  
Role: `SUPER_ADMIN` or `STAFF`

### Existing Modules (From Savanna Reference)

| Module | Endpoints | Description |
|--------|-----------|-------------|
| **Auth** | `POST /login`, `GET /me`, `POST /logout` | Authentication |
| **Customers** | `GET/POST/PATCH /customers`, `/by-phone/:phone`, `/:id/blacklist` | Customer management |
| **Laptops** | `GET/POST/PATCH /laptops`, `/:id/status`, `/availability`, `/:id/calendar` | Laptop inventory |
| **Leads** | `GET/POST/PATCH /leads`, `/:id/status`, `/:id/notes`, `/:id/assign`, `/stats` | Lead management |
| **Bookings** | `GET/POST/PATCH /bookings`, `/:id/confirm`, `/:id/start`, `/:id/complete`, `/:id/cancel`, `/stats` | Booking workflow |
| **Payments** | `GET/POST /payments`, `/:id/verify`, `/:id/reject`, `/pending`, `/stats` | Payment verification |
| **Maintenance** | `GET/POST/PATCH /maintenance`, `/:id/start`, `/:id/complete`, `/upcoming` | Maintenance tracking |
| **Dashboard** | `GET /dashboard/overview`, `/revenue`, `/fleet`, `/activities` | Statistics |
| **Reports** | `GET /reports/revenue`, `/fleet-utilization`, `/customers` (CSV export) | Reports |

### New Modules

#### Packages CRUD

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/packages` | List packages |
| GET | `/packages/:id` | Get package detail |
| POST | `/packages` | Create package (SUPER_ADMIN) |
| PATCH | `/packages/:id` | Update package (SUPER_ADMIN) |
| PATCH | `/packages/:id/toggle` | Toggle active |
| DELETE | `/packages/:id` | Delete package (SUPER_ADMIN) |

#### Pricing CRUD

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/pricing` | List pricing tiers |
| GET | `/pricing/:id` | Get pricing detail |
| POST | `/pricing` | Create pricing (SUPER_ADMIN) |
| PATCH | `/pricing/:id` | Update pricing (SUPER_ADMIN) |
| PATCH | `/pricing/:id/toggle` | Toggle active |

#### Reviews CRUD

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/reviews` | List reviews |
| GET | `/reviews/:id` | Get review detail |
| POST | `/reviews` | Create review |
| PATCH | `/reviews/:id` | Update review |
| PATCH | `/reviews/:id/toggle` | Toggle published |
| DELETE | `/reviews/:id` | Delete review (SUPER_ADMIN) |

#### Settings Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/settings` | List all settings |
| PATCH | `/settings` | Bulk update (SUPER_ADMIN) |
| GET | `/settings/:key` | Get single setting |
| PATCH | `/settings/:key` | Update single setting (SUPER_ADMIN) |

#### Users Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | List users (SUPER_ADMIN) |
| POST | `/users` | Create staff (SUPER_ADMIN) |
| PATCH | `/users/:id` | Update user (SUPER_ADMIN) |
| PATCH | `/users/:id/toggle` | Toggle active (SUPER_ADMIN) |
| PATCH | `/users/:id/password` | Change password |

---

## 7. Admin Frontend

### Existing Pages (From Savanna)

- `/login` — Login
- `/` — Dashboard
- `/customers` — Customers list + detail
- `/laptops` — Laptops list + detail
- `/leads` — Leads list + detail
- `/bookings` — Bookings list + detail
- `/payments` — Payments list + detail
- `/maintenance` — Maintenance list + detail
- `/reports/*` — Reports

### New Pages

| Route | Page | Components |
|-------|------|------------|
| `/packages` | Packages list | `PackagesPage` |
| `/packages/:id` | Package edit | `PackageDetailPage`, `PackageForm` |
| `/pricing` | Pricing tiers list | `PricingPage` |
| `/pricing/:id` | Pricing edit | `PricingDetailPage`, `PricingForm` |
| `/reviews` | Reviews list | `ReviewsPage` |
| `/reviews/:id` | Review edit | `ReviewDetailPage`, `ReviewForm` |
| `/settings` | Settings | `SettingsPage` |
| `/users` | Users list | `UsersPage` (SUPER_ADMIN only) |

### Sidebar Navigation

```
Dashboard
---
Laptops           (renamed from Vehicles)
Customers
Leads
Bookings
Payments
Maintenance
---
Packages          (NEW)
Pricing           (NEW)
Reviews           (NEW)
---
Settings          (NEW)
Users             (NEW)
---
Reports
```

---

## 8. Authentication & Security

### Admin Auth (JWT)

```
Login:
1. POST /api/v1/auth/login { email, password }
2. Verify PBKDF2-SHA256
3. Generate JWT { userId, role, jti, exp: 7d }
4. Set httpOnly cookie: token=<jwt>, SameSite=Strict
5. Return user data

Request:
1. Cookie: token=<jwt>
2. Auth middleware extract + verify
3. Check token_blacklist
4. Set c.set('user', { userId, role })

Logout:
1. POST /api/v1/auth/logout
2. Add JTI to blacklist
3. Clear cookie
```

### Public API Auth

```
Header: X-API-Key: <key>
Validate against system_config.public_api_key
```

### CORS

| Context | Allowed Origins |
|---------|----------------|
| Admin | `CORS_ALLOWED_ORIGINS` env |
| Public API | `ALLOWED_PUBLIC_API_ORIGINS` env |
| Webhooks | All (signature verification) |

---

## 9. Payment Integration

### Midtrans Snap

```
Booking Flow:
1. Create booking → status: pending_payment
2. Hit Midtrans Snap API
3. Get token + redirect_url
4. Save snapToken to booking
5. Return to FE → redirect user
6. User completes payment
7. Midtrans webhook → update booking
8. status: Confirmed, paymentStatus: settlement
```

### Xendit (Alternative)

- Invoice API
- Partial payment support (DP flow)
- Similar webhook flow

### Booking Number Format

`LPR-YYYY-NNNN`
- `LPR` = Laptop Rental prefix
- `YYYY` = Year
- `NNNN` = Sequential (4-digit, zero-padded)

---

## 10. Response Format

### Success

```json
{
  "success": true,
  "data": { ... }
}
```

### Error

```json
{
  "success": false,
  "message": "Human readable error",
  "error": {
    "code": "ERROR_CODE",
    "message": "Detail message"
  }
}
```

### HTTP Status

| Code | Usage |
|------|-------|
| 200 | Success |
| 201 | Created |
| 400 | Validation error |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 409 | Conflict (duplicate, already booked) |
| 500 | Internal error |

---

## Next Steps

**Client Input Needed:**

1. **Branding & Design**
   - Company name
   - Logo & color scheme
   - Target market (B2B/B2C/Both)

2. **Business Rules**
   - Rental duration options (daily/weekly/monthly)
   - Deposit amount
   - Late fee policy
   - Damage fee tiers
   - Cancellation policy

3. **Payment Gateway**
   - Midtrans or Xendit?
   - Sandbox credentials

4. **Laptop Inventory**
   - Initial laptop list (brands, models, specs)
   - Pricing structure
   - Categories (Developer/Designer/Student/Gaming)

5. **Features Priority**
   - Phase 1 must-haves
   - Phase 2 nice-to-haves
   - Phase 3 future features

6. **Operational Flow**
   - Pickup/delivery process
   - ID verification requirements
   - Insurance/deposit handling
   - Customer support channels

---

## Update Log

### [2026-08-23] Client Input Session — WhatsApp Integration + Anti-AI-Slop Design

**Client Feedback:**
- Current operation: Instagram-only (customer visit IG profile → chat WhatsApp)
- Goal: Web platform to expand audience reach, similar to Savanna Bromo trail rental
- Key requirements:
  1. **Real-time availability** — customer see unit tersedia/tidak by date
  2. **Smart recommendation** — quiz system suggest laptop based on work needs
  3. **WhatsApp integration** — structured booking flow to WhatsApp (free, no Business API)
  4. **Anti-AI-slop design** — avoid generic "clean modern" look

**WhatsApp Integration Strategy (UPDATED):**
- **Option 1:** WhatsApp Web Integration (`wa.me` links)
- **Option 2:** Smart Template Generator (pre-filled structured messages)
- **Option 4:** Hybrid Smart Form → generate WhatsApp template with customer details, rental period, recommended laptop, pricing

**Design Approach:**
- **Hallmark Skill** — anti-AI-slop design system
- **Genre:** Editorial (default) / Modern-minimal (for enterprise feel)
- **Diversification:** No purple gradients, no Inter-only, asymmetric layouts
- **Typography:** Display + body font pairing (not single font)
- **Color:** OKLCH palette, single anchor hue, <5% accent

**Technical Stack (CONFIRMED):**
- Landing Page: Next.js 14 + React 19 + Tailwind v4
- Backend: Cloudflare Workers + Hono + D1
- Admin: React 19 + React Router v7 + Tailwind v4
- Database: 15+ tables (laptops, customers, bookings, leads, whatsapp_leads)
- Payment: Midtrans (familiar from Savanna)

**Project Structure:**
- `laptop-rental-landingpage/` — public website
- `laptop-rental-backyard/` — admin dashboard

**Updated Flow:**
1. Customer visits landing page
2. Recommendation quiz (5 questions → suggested laptop)
3. Availability calendar check
4. Fill booking details
5. Generate WhatsApp template message
6. Redirect to WhatsApp with structured inquiry
7. Business owner handles conversion manually

**Next Phase:** Implementation Phase 1 (2-3 months)
- Core booking flow + WhatsApp integration  
- Recommendation engine + availability calendar
- Admin dashboard basic

---

**Status:** UPDATED — Technical requirements confirmed, ready for implementation.
