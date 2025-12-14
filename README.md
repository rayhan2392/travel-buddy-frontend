# 🧳 Travel Buddy - Frontend

A modern, feature-rich travel companion platform built with Next.js 16 and TypeScript. Connect with fellow travelers, discover new destinations, and plan your next adventure together.

## ✨ Features

### 🔐 Authentication & Authorization

- Secure JWT-based authentication
- Role-based access control (User, Admin)
- Protected routes and API calls
- Persistent user sessions with cookies

### 👤 User Management

- Comprehensive user profiles with avatars
- Bio, interests, and travel preferences
- Visited countries tracking
- Rating and review system
- Profile editing and customization

### 🗺️ Travel Planning

- Create and manage travel plans
- Destination, dates, and budget configuration
- Travel type categorization (Solo, Family, Friends)
- Rich itinerary descriptions
- Plan visibility controls

### 🔍 Discovery & Matching

- Advanced search filters (destination, dates, interests)
- Smart travel buddy matching
- User discovery and exploration
- Real-time plan browsing

### ⭐ Reviews & Ratings

- Post-trip review system
- Star ratings (1-5)
- Review management (edit/delete)
- Average rating display on profiles

### 👨‍💼 Admin Dashboard

- User management interface
- Travel plan oversight
- System statistics and analytics
- Content moderation tools

### 🎨 Modern UI/UX

- Responsive design for all devices
- Dark mode support
- Smooth animations and transitions
- Skeleton loading states
- Toast notifications
- Custom gradient themes
- Shadcn/ui component library
- Tailwind CSS styling

## 🛠️ Technologies

### Core

- **Next.js 16.0.8** - React framework with App Router
- **TypeScript** - Type-safe development
- **React 19** - UI library
- **Turbopack** - Fast bundler

### State Management & Data Fetching

- **TanStack Query v5** - Server state management
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### UI Components & Styling

- **Shadcn/ui** - Accessible component library
- **Tailwind CSS v4** - Utility-first CSS
- **Lucide React** - Icon library
- **Sonner** - Toast notifications
- **Radix UI** - Unstyled, accessible components

### Development Tools

- **ESLint** - Code linting
- **TypeScript ESLint** - TS-specific linting
- **PostCSS** - CSS transformations

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Setup Steps

1. **Clone the repository**

```bash
git clone https://github.com/rayhan2392/travel-buddy-frontend.git
cd travel-buddy-frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
# Add other environment variables as needed
```

4. **Run development server**

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🚀 Available Scripts

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 📁 Project Structure

```
travel-buddy-frontend/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── (auth)/              # Authentication routes
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── admin/               # Admin dashboard routes
│   │   │   ├── dashboard/
│   │   │   ├── users/
│   │   │   └── travel-plans/
│   │   ├── dashboard/           # User dashboard
│   │   ├── explore/             # User discovery
│   │   ├── find-buddy/          # Travel buddy search
│   │   ├── my-plans/            # User's travel plans
│   │   ├── past-trips/          # Completed trips
│   │   ├── profile/             # Profile management
│   │   ├── reviews/             # Review system
│   │   ├── travel-plans/        # Travel plan CRUD
│   │   ├── upcoming-trips/      # Future trips
│   │   ├── globals.css          # Global styles
│   │   └── layout.tsx           # Root layout
│   │
│   ├── components/              # Reusable components
│   │   ├── layout/              # Layout components
│   │   │   └── Navbar.tsx
│   │   ├── modules/             # Feature-specific components
│   │   │   ├── auth/            # Auth components
│   │   │   ├── home/            # Landing page sections
│   │   │   └── profile/         # Profile components
│   │   ├── providers/           # Context providers
│   │   └── ui/                  # Shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── typography.tsx
│   │       ├── stat-card.tsx
│   │       ├── feature-card.tsx
│   │       ├── empty-state.tsx
│   │       └── ...
│   │
│   ├── context/                 # React Context
│   │   └── AuthContext.tsx
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── mutations/           # TanStack Query mutations
│   │   │   ├── useLogin.ts
│   │   │   ├── useRegister.ts
│   │   │   ├── useCreateTravelPlan.ts
│   │   │   └── ...
│   │   └── queries/             # TanStack Query queries
│   │       ├── useGetMe.ts
│   │       ├── useGetTravelPlans.ts
│   │       └── ...
│   │
│   ├── lib/                     # Utilities and configurations
│   │   ├── api/                 # API client functions
│   │   │   ├── auth.api.ts
│   │   │   └── travel.api.ts
│   │   ├── axios.ts             # Axios configuration
│   │   ├── queryClient.ts       # TanStack Query setup
│   │   └── utils.ts             # Helper functions
│   │
│   └── types/                   # TypeScript type definitions
│       ├── auth.types.ts
│       └── travel.types.ts
│
├── public/                      # Static assets
├── .env.local                   # Environment variables
├── components.json              # Shadcn/ui config
├── eslint.config.mjs           # ESLint configuration
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies
├── postcss.config.mjs          # PostCSS configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🎨 Design System

### Color Palette

- **Primary**: Violet (500-950)
- **Secondary**: Purple (500-950)
- **Accent**: Pink (500-950)
- **Semantic Colors**: Success (Green), Warning (Amber), Info (Blue)

### Typography Scale

- Display: 4.5rem (72px)
- H1: 3rem (48px)
- H2: 2.25rem (36px)
- H3: 1.875rem (30px)
- H4: 1.5rem (24px)
- H5: 1.25rem (20px)
- H6: 1.125rem (18px)
- Body: 1rem (16px)
- Small: 0.875rem (14px)
- Caption: 0.75rem (12px)

### Custom Components

- **StatCard**: Display statistics with trend indicators
- **FeatureCard**: Showcase features with icons
- **EmptyState**: User-friendly no-data states
- **UserCard**: Display user profiles in various layouts
- **Typography**: Semantic heading and text components

### Utilities

- Elevation system (sm, md, lg, xl)
- Animation utilities (fade-in, slide-up)
- Container utilities (wide, narrow)
- Gradient text effects

## 🔒 Environment Variables

| Variable                   | Description     | Example                     |
| -------------------------- | --------------- | --------------------------- |
| `NEXT_PUBLIC_API_BASE_URL` | Backend API URL | `http://localhost:5000/api` |

## 🚢 Deployment

### Production Build

```bash
npm run build
npm start
```

### Deployment Platforms

- **Vercel** (Recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Railway**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [TanStack Query](https://tanstack.com/query)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

---

Built with ❤️ using Next.js and TypeScript
