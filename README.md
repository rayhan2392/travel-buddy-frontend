# Travel Buddy – Connect with Fellow Travelers Worldwide

> A modern travel companion platform connecting travelers for shared adventures and memorable experiences.

## 📖 Project Overview

Travel Buddy is a full-stack web application designed to connect travelers with compatible companions for their journeys. Whether you're a solo adventurer seeking company, someone looking to share travel costs, or simply wanting to meet like-minded explorers, Travel Buddy makes finding the perfect travel buddy effortless. The platform features comprehensive travel planning tools, real-time matching, secure authentication, and an intuitive admin dashboard for managing the community.

## 🔗 Live Demo & Repository

- **Frontend Live:** [Coming Soon]
- **Backend Live:** [https://travel-buddy-backend-omega.vercel.app](https://travel-buddy-backend-omega.vercel.app)
- **Frontend Repository:** [Current Repository]
- **Backend Repository:** [https://github.com/rayhan2392/travel-buddy-backend](https://github.com/rayhan2392/travel-buddy-backend)

## 🛠️ Tech Stack

**Frontend:**

- Next.js 16 (with Turbopack)
- React 19
- TypeScript 5
- Tailwind CSS 4
- TanStack React Query
- Axios
- Sonner (Toast Notifications)
- Radix UI Components

**State Management:**

- React Context API (Authentication)
- TanStack Query (Server State)

**Form Handling:**

- React Hook Form
- Zod (Validation)

**Authentication:**

- JWT (JSON Web Tokens)
- HTTP-only Cookies

**Deployment:**

- Vercel (Recommended)

## ✨ Key Features

- **Role-based Authentication** – Secure JWT authentication with User and Admin roles
- **User Profiles** – Comprehensive profiles with bio, interests, travel preferences, and ratings
- **Travel Plan Creation** – Create detailed travel plans with destinations, dates, budget, and categories
- **Smart Matching** – Find compatible travel buddies based on preferences and interests
- **Advanced Filtering** – Search and filter travelers by location, verification status, and more
- **Join Requests** – Request to join travel plans with host approval system
- **Reviews & Ratings** – Post-trip review system with star ratings
- **Admin Dashboard** – Complete admin panel with user management, travel plan oversight, and analytics
- **Responsive Design** – Seamless experience across desktop, tablet, and mobile devices
- **Accessibility** – ARIA labels, keyboard navigation, and focus management

## 🔑 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_API_URL=https://travel-buddy-backend-omega.vercel.app/api
```

**Note:** Replace the API URL with your backend endpoint if using a different deployment.

## 🚀 Installation & Setup

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd travel-buddy-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your backend API URL
   ```

4. **Run development server**

   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   Navigate to http://localhost:3000
   ```

### Demo Credentials

**User Account:**

- Email: `mine@traveler.com`
- Password: `123456`

**Admin Account:**

- Email: `super@admin.com`
- Password: `12345678`

## 📜 Available Scripts

- `npm run dev` – Start development server with Turbopack
- `npm run build` – Create production build
- `npm start` – Start production server
- `npm run lint` – Run ESLint
- `npm run lint:fix` – Fix ESLint errors automatically

## 🎯 Future Improvements

- **Real-time Chat** – In-app messaging between matched travel buddies
- **Social Login** – Google and Facebook OAuth integration
- **Payment Integration** – Secure payment processing for verified memberships
- **Trip Itinerary Builder** – Detailed day-by-day itinerary planning tools
- **Photo Gallery** – Share travel photos and experiences
- **Push Notifications** – Real-time alerts for new matches and messages
- **Multi-language Support** – Internationalization for global users
- **Mobile App** – Native iOS and Android applications
- **AI-Powered Recommendations** – Smart travel buddy suggestions based on preferences

## 👨‍💻 Author & Contact

**Shawn**  
Full-Stack Developer

- GitHub: [@shawn](https://github.com/shawn)
- LinkedIn: [Shawn](https://linkedin.com/in/shawn)
- Email: shawn@example.com

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">
  <p>Made with ❤️ by Shawn</p>
  <p>⭐ Star this repository if you find it helpful!</p>
</div>

- Tailwind CSS styling

## ✨ Key Features

### 🔐 Authentication & User Management

- **Secure Authentication**: JWT-based auth with HTTP-only cookies
- **Role-Based Access**: User and Admin roles with protected routes
- **User Profiles**: Comprehensive profiles with avatars, bios, interests, and visited countries
- **Verified Badges**: Special badges for verified travelers with multiple visual variants
- **Profile Customization**: Edit profile information, upload photos, and manage preferences
- **Rating System**: 5-star rating system with average ratings displayed

### 🗺️ Travel Planning & Discovery

- **Create Travel Plans**: Rich travel plan creation with destinations, dates, budgets, and itineraries
- **Smart Search & Filters**: Real-time filtering by destination, dates, interests, and budget
- **Travel Buddy Matching**: Intelligent matching algorithm to find compatible travel companions
- **Explore Travelers**: Browse and discover fellow travelers with detailed profile cards
- **Interactive Cards**: Modern travel plan cards with glass-morphism and hover effects
- **Plan Management**: Edit, delete, and manage your travel plans with ease

### ⭐ Reviews & Social Features

- **Post-Trip Reviews**: Share experiences with star ratings and detailed feedback
- **Review Management**: Edit and delete your own reviews
- **Community Ratings**: View aggregate ratings on user profiles
- **Join Requests**: Request to join travel plans and manage incoming requests
- **Real-time Updates**: Instant notifications for plan updates and join requests

### 👨‍💼 Admin Dashboard

- **User Management**: View, manage, and moderate user accounts
- **Travel Plan Oversight**: Monitor and moderate travel plans
- **Analytics Dashboard**: View platform statistics and user metrics
- **Sidebar Navigation**: Dedicated admin interface separate from user views
- **Content Moderation**: Tools to maintain platform quality and safety

### 🎨 UI/UX Excellence

- **Glass-morphism Design**: Modern backdrop-blur effects with gradient overlays
- **Gradient Themes**: Blue→Purple→Violet color scheme throughout
- **Smooth Animations**: Scale, translate, and fade effects on interactions
- **Loading States**: Beautiful skeleton screens with shimmer effects
- **Toast Notifications**: Non-intrusive feedback using Sonner
- **Dark Mode Support**: System-aware theme switching
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

---

## 🛠️ Tech Stack

### Frontend Framework

| Technology     | Version | Purpose                                 |
| -------------- | ------- | --------------------------------------- |
| **Next.js**    | 16.0.8  | React framework with App Router and SSR |
| **React**      | 19      | UI library with concurrent features     |
| **TypeScript** | 5.0+    | Type-safe development                   |
| **Turbopack**  | Latest  | Ultra-fast bundler and dev server       |

### State Management & Data Fetching

| Technology            | Purpose                                               |
| --------------------- | ----------------------------------------------------- |
| **TanStack Query v5** | Server state management, caching, and synchronization |
| **Axios**             | HTTP client with interceptors for auth                |
| **React Hook Form**   | Performant form management                            |
| **Zod**               | Runtime schema validation                             |
| **React Context**     | Global auth state management                          |

### UI & Styling

| Technology          | Purpose                                    |
| ------------------- | ------------------------------------------ |
| **Shadcn/ui**       | Accessible, customizable component library |
| **Tailwind CSS v4** | Utility-first CSS framework                |
| **Radix UI**        | Unstyled, accessible primitives            |
| **Lucide React**    | Beautiful, consistent icon library         |
| **Sonner**          | Modern toast notification system           |
| **Next.js Image**   | Optimized image loading and optimization   |

### Development Tools

| Tool                  | Purpose                               |
| --------------------- | ------------------------------------- |
| **ESLint**            | Code quality and consistency          |
| **TypeScript ESLint** | TypeScript-specific linting rules     |
| **PostCSS**           | CSS transformations and autoprefixing |
| **Git**               | Version control                       |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.17.0 ([Download](https://nodejs.org/))
- **npm** >= 9.0.0 or **yarn** >= 1.22.0
- **Git** ([Download](https://git-scm.com/))
- A modern web browser (Chrome, Firefox, Safari, or Edge)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/rayhan2392/travel-buddy-frontend.git
   cd travel-buddy-frontend
   ```

2. **Install dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Using yarn:

   ```bash
   yarn install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # API Configuration
   NEXT_PUBLIC_API_BASE_URL=https://travel-buddy-backend-omega.vercel.app/api/v1

   # Optional: Add other configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Start the development server**

   Using npm:

   ```bash
   npm run dev
   ```

   Using yarn:

   ```bash
   yarn dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000)

5. **Build for production** (optional)

   ```bash
   npm run build
   npm start
   ```

### Quick Start for Developers

```bash
# Clone and setup in one go
git clone https://github.com/rayhan2392/travel-buddy-frontend.git && \
cd travel-buddy-frontend && \
npm install && \
echo "NEXT_PUBLIC_API_BASE_URL=https://travel-buddy-backend-omega.vercel.app/api/v1" > .env.local && \
npm run dev
```

---

## 📁 Project Structure

```
travel-buddy-frontend/
├── public/                           # Static assets
│   └── destinations/                 # Destination images
│       ├── paris.jpg
│       ├── tokyo.avif
│       └── ...
│
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Auth route group
│   │   │   ├── login/                # Login page
│   │   │   └── register/             # Registration page
│   │   │
│   │   ├── admin/                    # Admin route group
│   │   │   ├── dashboard/            # Admin dashboard
│   │   │   ├── users/                # User management
│   │   │   └── travel-plans/         # Travel plan management
│   │   │
│   │   ├── dashboard/                # User dashboard
│   │   ├── explore/                  # Discover travelers
│   │   ├── find-buddy/               # Search & match travel buddies
│   │   ├── my-plans/                 # User's travel plans
│   │   ├── past-trips/               # Completed trips
│   │   ├── profile/                  # Profile pages
│   │   │   ├── page.tsx              # Current user profile
│   │   │   └── [id]/page.tsx         # Other user profiles
│   │   │
│   │   ├── reviews/                  # Review management
│   │   ├── travel-plans/             # Travel plan CRUD
│   │   │   ├── [id]/page.tsx         # Plan details
│   │   │   └── add/page.tsx          # Create new plan
│   │   │
│   │   ├── upcoming-trips/           # Future trips
│   │   ├── error.tsx                 # Error boundary
│   │   ├── globals.css               # Global styles & animations
│   │   ├── layout.tsx                # Root layout
│   │   ├── loading.tsx               # Loading state
│   │   ├── not-found.tsx             # 404 page
│   │   └── page.tsx                  # Landing page
│   │
│   ├── components/
│   │   ├── layout/                   # Layout components
│   │   │   ├── AdminLayout.tsx       # Admin wrapper with sidebar
│   │   │   ├── ConditionalNavbar.tsx # Route-aware navbar
│   │   │   ├── Footer.tsx            # Site footer
│   │   │   └── Navbar.tsx            # Main navigation
│   │   │
│   │   ├── modules/                  # Feature-specific components
│   │   │   ├── auth/                 # Authentication
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── RegisterForm.tsx
│   │   │   │
│   │   │   ├── home/                 # Landing page sections
│   │   │   │   ├── CTASection.tsx
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── HowItWorksSection.tsx
│   │   │   │   ├── PopularDestinationsSection.tsx
│   │   │   │   ├── StatsSection.tsx
│   │   │   │   ├── TestimonialsSection.tsx
│   │   │   │   └── WhyChooseUsSection.tsx
│   │   │   │
│   │   │   └── profile/              # Profile components
│   │   │       └── EditProfileDialog.tsx
│   │   │
│   │   ├── providers/                # React Context providers
│   │   │   └── Providers.tsx         # Query & Auth providers
│   │   │
│   │   └── ui/                       # Reusable UI components
│   │       ├── alert-dialog.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── empty-state.tsx       # No data states
│   │       ├── error-display.tsx     # Error messages
│   │       ├── feature-card.tsx      # Feature showcase
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── loading-spinner.tsx
│   │       ├── popover.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── skeleton.tsx          # Loading skeletons
│   │       ├── stat-card.tsx         # Statistics display
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       ├── tooltip.tsx
│   │       ├── typography.tsx        # Semantic typography
│   │       ├── user-card.tsx         # Traveler cards
│   │       └── verified-badge.tsx    # Verified user badge
│   │
│   ├── context/                      # React Context
│   │   └── AuthContext.tsx           # Authentication state
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── mutations/                # TanStack Query mutations
│   │   │   ├── useCreateTravelPlan.ts
│   │   │   ├── useDeleteTravelPlan.ts
│   │   │   ├── useJoinTravelPlan.ts
│   │   │   ├── useLeaveTravelPlan.ts
│   │   │   ├── useLogin.ts
│   │   │   ├── useRegister.ts
│   │   │   ├── useSubmitReview.ts
│   │   │   └── useUpdateProfile.ts
│   │   │
│   │   └── queries/                  # TanStack Query queries
│   │       ├── useGetAllUsers.ts
│   │       ├── useGetJoinedTravelPlans.ts
│   │       ├── useGetMe.ts
│   │       ├── useGetMyTravelPlans.ts
│   │       ├── useGetPastJoinedTravelPlans.ts
│   │       ├── useGetTravelPlanById.ts
│   │       ├── useGetTravelPlans.ts
│   │       ├── useGetUserById.ts
│   │       ├── useGetUserReviews.ts
│   │       └── useMatchTravelPlans.ts
│   │
│   ├── lib/                          # Utilities & configurations
│   │   ├── api/                      # API client functions
│   │   │   ├── auth.api.ts           # Authentication APIs
│   │   │   └── travel.api.ts         # Travel-related APIs
│   │   │
│   │   ├── axios.ts                  # Axios configuration with interceptors
│   │   ├── queryClient.ts            # TanStack Query setup
│   │   └── utils.ts                  # Helper functions (cn, etc.)
│   │
│   └── types/                        # TypeScript definitions
│       ├── auth.types.ts             # Auth & user types
│       └── travel.types.ts           # Travel plan types
│
├── .env.local                        # Environment variables (create this)
├── .eslintrc.json                    # ESLint configuration
├── .gitignore                        # Git ignore rules
├── components.json                   # Shadcn/ui configuration
├── eslint.config.mjs                 # ESLint config
├── next-env.d.ts                     # Next.js TypeScript declarations
├── next.config.ts                    # Next.js configuration
├── package.json                      # Dependencies & scripts
├── postcss.config.mjs                # PostCSS configuration
├── README.md                         # This file
├── SETUP.md                          # Setup instructions
├── tailwind.config.ts                # Tailwind CSS configuration
└── tsconfig.json                     # TypeScript configuration
```

### Key Directories Explained

- **`app/`**: Next.js 13+ App Router with file-based routing
- **`components/ui/`**: Shadcn/ui components with custom styling
- **`hooks/`**: Separation of concerns - mutations for writes, queries for reads
- **`lib/api/`**: Centralized API calls with consistent error handling
- **`types/`**: TypeScript interfaces for type safety

---

## 🎨 Design System

Our design system follows modern principles with a focus on accessibility, consistency, and visual appeal.

### Color Palette

**Primary Gradient**: Blue (600) → Purple (600) → Violet (600)

```css
/* Primary Colors */
--blue-600: #2563eb --purple-600: #9333ea --violet-600: #7c3aed
  /* Secondary Colors */ --blue-500: #3b82f6 --purple-500: #a855f7
  --violet-500: #8b5cf6 /* Semantic Colors */ --success: #16a34a (Green)
  --warning: #f59e0b (Amber) --error: #dc2626 (Red) --info: #0284c7 (Blue);
```

### Design Patterns

#### Glass-morphism

```css
.glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border: 2px solid rgba(200, 200, 200, 0.3);
}
```

#### Gradient Borders

```css
.gradient-border {
  height: 2px;
  background: linear-gradient(to right, #3b82f6, #9333ea, #8b5cf6);
  transition: height 0.3s ease;
}

.gradient-border:hover {
  height: 3px;
}
```

#### Hover Effects

```css
.interactive-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.interactive-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

### Typography Scale

| Name    | Size            | Line Height | Use Case          |
| ------- | --------------- | ----------- | ----------------- |
| Display | 4.5rem (72px)   | 1.1         | Hero headings     |
| H1      | 3rem (48px)     | 1.2         | Page titles       |
| H2      | 2.25rem (36px)  | 1.3         | Section headings  |
| H3      | 1.875rem (30px) | 1.4         | Subsection titles |
| H4      | 1.5rem (24px)   | 1.5         | Card titles       |
| H5      | 1.25rem (20px)  | 1.5         | Small headings    |
| H6      | 1.125rem (18px) | 1.5         | Labels            |
| Body    | 1rem (16px)     | 1.6         | Body text         |
| Small   | 0.875rem (14px) | 1.5         | Captions          |
| Caption | 0.75rem (12px)  | 1.4         | Meta text         |

### Spacing System

Based on 4px base unit:

| Token | Value         | Use Case        |
| ----- | ------------- | --------------- |
| xs    | 0.25rem (4px) | Icon spacing    |
| sm    | 0.5rem (8px)  | Tight spacing   |
| md    | 1rem (16px)   | Default spacing |
| lg    | 1.5rem (24px) | Section spacing |
| xl    | 2rem (32px)   | Large gaps      |
| 2xl   | 3rem (48px)   | Page sections   |
| 3xl   | 4rem (64px)   | Hero sections   |

### Animation Utilities

```css
/* Fade In */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Slide Up */
@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Shimmer (Loading) */
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Spin Slow (Loaders) */
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

### Custom Components

#### UserCard Variants

- **Compact**: Minimal profile card (14x14 avatar)
- **Default**: Full profile card (24x24 avatar)
- **Detailed**: Extended info with bio and badges

#### VerifiedBadge Variants

- **Default**: Simple blue checkmark
- **Premium**: Gradient with pulse animation
- **Glow**: Animated glow ring with sparkle

#### Button Variants

- **Default**: Solid background
- **Outline**: Bordered with transparent background
- **Ghost**: Minimal styling
- **Gradient**: Blue→Violet gradient

### Accessibility

- ✅ WCAG 2.1 Level AA compliant
- ✅ Keyboard navigation support
- ✅ Screen reader optimized
- ✅ Focus indicators on all interactive elements
- ✅ Semantic HTML structure
- ✅ ARIA labels where needed

---

## 🏗️ Architecture

## 🏗️ Architecture

### Application Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Browser (Client)                     │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌─────────────────────────────────────────────────┐   │
│  │           Next.js App Router (RSC)               │   │
│  │  - Server Components (default)                   │   │
│  │  - Client Components ("use client")              │   │
│  │  - Streaming & Suspense                          │   │
│  └─────────────────────────────────────────────────┘   │
│                         │                                │
│  ┌─────────────────────┴─────────────────────┐         │
│  │                                              │         │
│  ▼                                              ▼         │
│  ┌──────────────┐                    ┌──────────────┐  │
│  │   UI Layer   │                    │  State Layer │  │
│  │              │                    │              │  │
│  │ - Shadcn/ui  │                    │ - TanStack   │  │
│  │ - Tailwind   │◄───────────────────│   Query      │  │
│  │ - Lucide     │                    │ - Context    │  │
│  └──────────────┘                    │   API        │  │
│                                       └──────┬───────┘  │
│                                              │           │
└──────────────────────────────────────────────┼───────────┘
                                               │
                                               ▼
                                    ┌──────────────────┐
                                    │   Axios HTTP     │
                                    │   Client         │
                                    │  - Interceptors  │
                                    │  - Auth tokens   │
                                    └────────┬─────────┘
                                             │
                                             ▼
                                    ┌──────────────────┐
                                    │  Backend API     │
                                    │  (Express.js)    │
                                    │                  │
                                    │  - REST API      │
                                    │  - JWT Auth      │
                                    │  - MongoDB       │
                                    └──────────────────┘
```

### Data Flow

1. **User Interaction** → Component triggers action
2. **React Hook** → Custom hook (query/mutation) called
3. **TanStack Query** → Manages cache and loading states
4. **Axios Client** → Sends HTTP request with auth token
5. **Backend API** → Processes request and returns data
6. **TanStack Query** → Updates cache automatically
7. **Component** → Re-renders with new data

### State Management Strategy

#### Server State (TanStack Query)

- All API data (users, travel plans, reviews)
- Automatic caching with stale-while-revalidate
- Optimistic updates for better UX
- Background refetching

#### Client State (React Context)

- Authentication state (user, token)
- Global UI state (modals, toasts)
- Theme preferences

#### Local State (useState/useReducer)

- Form inputs
- UI toggles
- Component-specific state

### Authentication Flow

```
┌────────────┐
│   Login    │
└─────┬──────┘
      │
      ▼
┌────────────────────┐
│ POST /auth/login   │
│ - email            │
│ - password         │
└─────┬──────────────┘
      │
      ▼
┌────────────────────┐
│  Backend validates │
│  Returns JWT token │
└─────┬──────────────┘
      │
      ▼
┌────────────────────┐
│ Store in Context   │
│ Set in Axios       │
│ headers            │
└─────┬──────────────┘
      │
      ▼
┌────────────────────┐
│ Redirect to        │
│ Dashboard/Admin    │
└────────────────────┘
```

### Routing Strategy

**Public Routes**: `/`, `/login`, `/register`  
**Protected Routes**: `/dashboard`, `/profile`, `/my-plans`, etc.  
**Admin Routes**: `/admin/*` (role-based)

Route protection implemented via:

- Middleware redirects
- Client-side auth checks
- Conditional rendering

---

## 🔌 API Integration

### Base Configuration

```typescript
// src/lib/axios.ts
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add auth token
axiosInstance.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - Handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      clearAuthToken();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
```

### API Endpoints

#### Authentication

```typescript
POST   /auth/login          - User login
POST   /auth/register       - User registration
GET    /auth/me             - Get current user
PUT    /auth/profile        - Update profile
```

#### Travel Plans

```typescript
GET    /travel-plans                    - Get all plans
GET    /travel-plans/:id                - Get plan by ID
POST   /travel-plans                    - Create new plan
PUT    /travel-plans/:id                - Update plan
DELETE /travel-plans/:id                - Delete plan
GET    /travel-plans/my-plans           - Get user's plans
GET    /travel-plans/match              - Search/filter plans
```

#### Users

```typescript
GET    /users                - Get all users
GET    /users/:id            - Get user by ID
GET    /users/:id/reviews    - Get user reviews
```

#### Reviews

```typescript
POST   /reviews/:userId      - Post review
PUT    /reviews/:reviewId    - Update review
DELETE /reviews/:reviewId    - Delete review
```

#### Admin

```typescript
GET    /admin/users          - Get all users (admin)
GET    /admin/travel-plans   - Get all plans (admin)
GET    /admin/stats          - Get platform statistics
```

### TanStack Query Setup

```typescript
// src/lib/queryClient.ts
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      retry: 1,
    },
    mutations: {
      retry: 0,
    },
  },
});
```

### Example Query Hook

```typescript
// src/hooks/queries/useGetTravelPlans.ts
export function useGetTravelPlans() {
  return useQuery({
    queryKey: ["travel-plans"],
    queryFn: () => travelApi.getTravelPlans(),
    staleTime: 5 * 60 * 1000,
  });
}
```

### Example Mutation Hook

```typescript
// src/hooks/mutations/useCreateTravelPlan.ts
export function useCreateTravelPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => travelApi.createTravelPlan(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["travel-plans"]);
      toast.success("Travel plan created!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
```

---

## 🔐 Environment Variables

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Required: Backend API URL
NEXT_PUBLIC_API_BASE_URL=https://travel-buddy-backend-omega.vercel.app/api/v1

# Optional: Application URL (for redirects)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Analytics (if integrated)
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Optional: Sentry (error tracking)
# NEXT_PUBLIC_SENTRY_DSN=https://...
```

### Variable Descriptions

| Variable                   | Required | Description                    | Example                          |
| -------------------------- | -------- | ------------------------------ | -------------------------------- |
| `NEXT_PUBLIC_API_BASE_URL` | ✅ Yes   | Backend API base URL           | `https://api.example.com/api/v1` |
| `NEXT_PUBLIC_APP_URL`      | ❌ No    | Frontend URL for SEO/redirects | `https://travelbuddy.com`        |
| `NEXT_PUBLIC_GA_ID`        | ❌ No    | Google Analytics tracking ID   | `G-XXXXXXXXXX`                   |
| `NEXT_PUBLIC_SENTRY_DSN`   | ❌ No    | Sentry error tracking DSN      | `https://...`                    |

**Note**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

---

## 📜 Scripts

### Development

```bash
# Start development server with Turbopack (fast refresh)
npm run dev

# Start on a different port
npm run dev -- -p 3001
```

### Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start

# Build and start in one command
npm run build && npm start
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Fix auto-fixable ESLint issues
npm run lint -- --fix

# Type check without building
npx tsc --noEmit
```

### Package Management

```bash
# Install dependencies
npm install

# Update dependencies
npm update

# Check for outdated packages
npm outdated

# Clean install (remove node_modules and reinstall)
rm -rf node_modules package-lock.json && npm install
```

---

## 🚢 Deployment

### Vercel (Recommended)

Travel Buddy is optimized for deployment on Vercel, the platform built by the creators of Next.js.

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables
   - Deploy!

3. **Environment Variables**
   - Add all variables from `.env.local`
   - Vercel will automatically use them

4. **Custom Domain** (Optional)
   - Add your domain in Vercel dashboard
   - Update DNS records as instructed

### Manual Deployment

```bash
# Build for production
npm run build

# The output will be in the .next folder
# Copy this folder to your server

# Install only production dependencies
npm ci --production

# Start the server
npm start
```

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

```bash
# Build and run with Docker
docker build -t travel-buddy-frontend .
docker run -p 3000:3000 travel-buddy-frontend
```

### Performance Optimization

- ✅ Image optimization with Next.js Image
- ✅ Code splitting and lazy loading
- ✅ Static generation where possible
- ✅ API response caching with TanStack Query
- ✅ Turbopack for fast development builds
- ✅ Production bundle size optimization

---

