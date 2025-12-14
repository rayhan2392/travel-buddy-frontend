# State Management & Data Fetching Setup

## Stack

- **TanStack Query (React Query)** - Server state & data fetching
- **Context API** - Client state (auth)
- **Axios** - HTTP client

## Structure

```
src/
├── lib/
│   ├── axios.ts                  # Axios instance with interceptors
│   ├── queryClient.ts            # React Query configuration
│   └── api/
│       └── auth.api.ts           # Auth API endpoints
├── context/
│   └── AuthContext.tsx           # Auth state management
├── hooks/
│   └── mutations/
│       ├── useRegister.ts        # Register mutation hook
│       └── useLogin.ts           # Login mutation hook
├── types/
│   └── auth.types.ts             # TypeScript types
└── components/
    └── providers/
        └── Providers.tsx         # App-wide providers wrapper
```

## Configuration

### Base URL

- **Development**: `http://localhost:5000/api/v1`
- Update in: `src/lib/axios.ts`

### Features

#### Axios Instance

- Auto-attaches JWT token to requests
- Global error handling (401 redirects to login)
- Automatic JSON content-type headers

#### Auth Context

- User state management
- Token persistence (localStorage)
- Auto-load on app mount
- Login/Logout/UpdateUser methods

#### React Query

- 5-minute stale time
- Retry failed queries once
- DevTools enabled in development
- No refetch on window focus

## Usage

### Using Auth Context

```tsx
import { useAuth } from "@/context/AuthContext";

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div>
      {isAuthenticated && <p>Welcome {user?.name}</p>}
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Using Register Mutation

```tsx
import { useRegister } from "@/hooks/mutations/useRegister";

function RegisterForm() {
  const { mutate, isPending, error } = useRegister();

  const handleSubmit = (data) => {
    mutate(data);
  };

  return (
    // Your form JSX
  );
}
```

## Next Steps

1. Update API endpoint paths if different from `/auth/register`, `/auth/login`
2. Adjust User type in `auth.types.ts` based on your backend response
3. Create registration form component
4. Create login form component
5. Update Navbar to use `useAuth()` hook
