# AI Guidelines: Next.js Feature-Based Architecture

This document serves as a comprehensive guide for AI assistants working with our Next.js feature-based architecture. It provides context about our codebase organization, patterns, and best practices.

## Table of Contents

1. [Architectural Overview](#architectural-overview)
2. [Directory Structure](#directory-structure)
3. [Feature Organization](#feature-organization)
4. [Authentication and Authorization](#authentication-and-authorization)
5. [State Management Strategy](#state-management-strategy)
6. [API Client Implementation](#api-client-implementation)
7. [UI Components and Forms](#ui-components-and-forms)
8. [Best Practices](#best-practices)
9. [Prompting Guidelines](#prompting-guidelines)

## Architectural Overview

Our application is built on Next.js with App Router, following a **feature-based architecture** pattern. This means:

- Code is organized by business domain (features) rather than technical concern
- Each feature is encapsulated with its own components, hooks, store, and API calls
- Cross-cutting concerns are in a shared directory
- A clear boundary exists between feature-specific and shared code

Key technologies:

- **Next.js (App Router)**: Core framework
- **TanStack Query**: Data fetching and server state
- **Zustand**: Client-side state management
- **Zod**: Schema validation
- **Axios** (via adapter pattern): API communication

## Directory Structure

```
/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── (auth)/                 # Auth route group
│   │   ├── (protected)/            # Protected routes
│   │   └── ...
│   ├── features/                   # Feature-based organization
│   │   ├── auth/                   # Authentication feature
│   │   │   ├── api/                # Auth-specific API calls
│   │   │   ├── components/         # Auth-specific components
│   │   │   ├── hooks/              # Auth-specific hooks
│   │   │   └── store/              # Auth-related state
│   │   ├── user/                   # User management feature
│   │   │   ├── api/
│   │   │   ├── components/
│   │   │   └── ...
│   │   └── ...
│   ├── shared/                     # Shared/common code
│   │   ├── components/             # Common components
│   │   ├── config/                 # Global configuration
│   │   ├── hooks/                  # Common hooks
│   │   ├── lib/                    # Core libraries
│   │   │   ├── api-client/         # API client with adapter pattern
│   │   │   ├── auth/               # Auth utilities
│   │   │   └── ...
│   │   ├── schemas/                # Zod schemas
│   │   └── utils/                  # Utility functions
│   ├── middleware.ts               # Next.js middleware (auth protection)
│   └── providers/                  # Global providers
├── tests/                          # Vitest tests
└── ...
```

## Feature Organization

Features are self-contained modules that represent a business domain. Each feature contains:

```
features/auth/
├── api/                # API calls specific to auth
│   ├── endpoints.ts    # Auth-specific endpoints
│   ├── mutations.ts    # Auth mutations (login, logout)
│   └── queries.ts      # Auth queries (currentUser)
├── components/
│   ├── auth-provider.tsx  # Auth initialization
│   └── route-guard.tsx    # Permission-based protection
├── hooks/
│   ├── use-auth.ts     # Main auth hook
│   └── use-user.ts     # User data utilities
└── store/
    └── auth-store.ts   # Zustand auth store
```

## Authentication and Authorization

We implement a multi-layered authentication and authorization system:

### 1. Middleware Layer

`src/middleware.ts` provides the first line of defense:

- Checks if the user is authenticated (token in cookies)
- Performs basic role checks from JWT token
- Redirects unauthenticated users to login

### 2. Auth Store Layer

`features/auth/store/auth-store.ts` manages auth state:

- Stores user data from the `/me` endpoint
- Provides authentication status
- Persists necessary auth data

### 3. Route Protection Layer

`features/auth/components/route-guard.tsx` provides advanced protection:

- Verifies complex permissions based on:
  - User roles
  - User modules
  - Feature flags
  - Attributes (ABAC)
- Redirects unauthorized users

### 4. Permission Utilities

`shared/lib/auth/permissions.ts` handles complex authorization logic:

- RBAC (Role-Based Access Control)
- ABAC (Attribute-Based Access Control)
- Feature flag permissions
- Strict and non-strict permission modes

Sample user schema from `/me` endpoint:

```typescript
{
  id: string;
  cpf: string;
  email: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  current_module: {
    id: number;
    name: string;
  }
  current_role: {
    id: number;
    name: string;
  }
  groups: Array<any>;
  direct_permissions: Array<any>;
  available_modules: Array<{
    id: number;
    name: string;
    roles: Array<{
      id: number;
      name: string;
    }>;
  }>;
}
```

## State Management Strategy

We use a **hybrid state management approach**:

### 1. Server State (TanStack Query)

- Handles data fetching, caching, and synchronization
- Provides loading, error, and data states
- Manages cache invalidation and revalidation

### 2. Client State (Zustand)

- Provides global access to authentication state
- Manages UI state that doesn't exist on the server
- Simplified state management with less boilerplate

### 3. Synchronized Approach

`features/auth/components/auth-provider.tsx` synchronizes TanStack Query with Zustand:

```typescript
// Auth provider syncs query results with Zustand store
useEffect(() => {
  setUser(user || null);
  setLoading(isLoading);
  setError(error as Error | null);
}, [user, isLoading, error, setUser, setLoading, setError]);
```

## API Client Implementation

We use the **Adapter Pattern** to abstract the HTTP client:

### 1. Interface

`shared/lib/api-client/adapter/http-client.interface.ts` defines a client interface:

```typescript
export interface HttpClient {
  get<T>(url: string, options?: HttpClientOptions): Promise<T>;
  post<T, D = any>(url: string, data?: D, options?: HttpClientOptions): Promise<T>;
  // ...other methods
}
```

### 2. Concrete Implementation

`shared/lib/api-client/adapter/axios-adapter.ts` implements the interface with Axios:

```typescript
export class AxiosAdapter implements HttpClient {
  // Implementation with Axios
}
```

### 3. Feature-Specific API Clients

Each feature has its own API endpoints and hooks:

```
features/auth/api/
├── endpoints.ts    # Auth-specific endpoint URLs
├── mutations.ts    # Auth mutation hooks (login, logout)
└── queries.ts      # Auth query hooks (currentUser)
```

## UI Components and Forms

We follow a structured approach for UI components:

1. **Base UI components** in `shared/components/ui`
2. **Feature-specific components** in each feature's components directory
3. **Form components** with React Hook Form + Zod validation

## Best Practices

### When to Create a Feature

Create a new feature when:

- It represents a distinct business domain
- It has its own set of components, hooks, and state
- It's logically separate from other features

### When to Use Shared Code

Move code to `shared/` when:

- It's used by multiple features
- It's a core functionality of the application
- It doesn't belong to any specific business domain

### API Client Organization

- Base client and adapters in `shared/lib/api-client`
- Feature-specific endpoints and hooks in `features/[feature]/api`
- Use TanStack Query for data fetching and caching

### State Management Approach

- Server state: Use TanStack Query
- Global UI state: Use Zustand
- Synchronize between them using effects
- Keep state close to where it's used

## Prompting Guidelines

When working with this codebase, provide the following context:

1. **Feature Structure Context**: Share directory structure of relevant features

   ```
   > #buffers
   > #files
   ```

2. **Key Files for Understanding**:

   - Feature API files (endpoints, mutations, queries)
   - Feature components
   - Relevant schemas
   - Auth configuration if related to permissions

3. **For New Features**:

   - Explain where it fits in the feature architecture
   - Show directory structure for the new feature
   - Provide interface definitions before implementations

4. **For Bug Fixing**:

   - Share the error message and stacktrace
   - Include file content around the error
   - Provide relevant hook or component code

5. **For Architecture Questions**:
   - Reference this document first
   - Explain the specific architectural concern
   - Provide examples of similar patterns in the codebase

Remember that this codebase follows a feature-first approach with a clear separation between feature-specific and shared code. New implementations should maintain this separation.
