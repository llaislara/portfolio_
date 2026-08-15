# Testing Guidelines for Next.js Feature-Based Architecture

This document provides a comprehensive guide to testing in our Next.js feature-based architecture. It explains our testing approach, organization, best practices, and how to effectively test different parts of our application.

## Table of Contents

1. [Testing Framework and Setup](#testing-framework-and-setup)
2. [Test Organization](#test-organization)
3. [Testing Different Components](#testing-different-components)
4. [Mocking Strategies](#mocking-strategies)
5. [Best Practices](#best-practices)
6. [Running Tests](#running-tests)
7. [Coverage Requirements](#coverage-requirements)

## Testing Framework and Setup

Our application uses **Vitest** as the primary testing framework, with the following configuration:

- **Environment**: JSDOM for simulating browser APIs
- **Setup File**: `./src/testing/setup-tests.ts` contains global test setup
- **Coverage Reporting**: Includes text, JSON, and HTML reports
- **Framework Plugins**: React testing capabilities via `@vitejs/plugin-react`

```typescript
// Key configuration from vitest.config.ts
test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: './src/testing/setup-tests.ts',
  exclude: ['**/node_modules/**', '**/e2e/**'],
  coverage: {
    include: ['src/**'],
    exclude: ['**/*.d.ts', '**/*.test.*'],
    reporter: ['text', 'json', 'html'],
    thresholds: {
      statements: 75,
      branches: 70,
      functions: 75,
      lines: 75,
    },
  },
}
```

## Test Organization

Our tests follow the same feature-based organization as our source code:

```
tests/
├── features/                  # Tests for feature-specific code
│   ├── auth/                  # Tests for auth feature
│   │   ├── components/        # Tests for auth components
│   │   ├── hooks/             # Tests for auth hooks
│   │   └── utils/             # Tests for auth utilities
│   ├── user/                  # Tests for user feature
│   └── ...                    # Other feature tests
├── shared/                    # Tests for shared code
│   ├── components/            # Tests for shared components
│   ├── hooks/                 # Tests for shared hooks
│   └── lib/                   # Tests for shared libraries
│       ├── api-client/        # Tests for API client
│       └── ...                # Other shared lib tests
└── setup.ts                   # Test setup configuration
```

This organization ensures:

1. **Discoverability**: Tests are easy to find based on the feature they test
2. **Isolation**: Feature tests are isolated from each other
3. **Completeness**: Coverage can be assessed at the feature level

## Testing Different Components

### 1. React Components

Component tests focus on rendering, user interactions, and integration with hooks:

```typescript
// Example component test for a login form
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { LoginForm } from '@/features/auth/components/login-form';
import { useLogin } from '@/features/auth/api/mutations';

// Mock the hook
vi.mock('@/features/auth/api/mutations', () => ({
  useLogin: vi.fn(),
}));

describe('LoginForm', () => {
  it('renders login form correctly', () => {
    // Mock implementation
    const mockLogin = vi.fn();
    (useLogin as any).mockReturnValue({
      mutate: mockLogin,
      isLoading: false,
    });

    render(<LoginForm />);

    // Assert form elements are present
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('submits form with user credentials', async () => {
    // Mock implementation
    const mockLogin = vi.fn();
    (useLogin as any).mockReturnValue({
      mutate: mockLogin,
      isLoading: false,
    });

    render(<LoginForm />);

    // Fill form and submit
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Assert login was called with correct data
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });
});
```

### 2. Custom Hooks

Hook tests use `renderHook` from the React Testing Library:

```typescript
// Example hook test for useAuth
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { useAuthStore } from '@/features/auth/store/auth-store';

// Mock the store
vi.mock('@/features/auth/store/auth-store', () => ({
  useAuthStore: vi.fn(),
}));

describe('useAuth', () => {
  it('returns authentication status and user data', () => {
    // Mock store implementation
    (useAuthStore as any).mockReturnValue({
      user: { id: '123', email: 'test@example.com' },
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual({ id: '123', email: 'test@example.com' });
    expect(result.current.isLoading).toBe(false);
  });

  it('handles unauthenticated state correctly', () => {
    // Mock store implementation for unauthenticated state
    (useAuthStore as any).mockReturnValue({
      user: null,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });
});
```

### 3. API Client & Queries

Testing API clients and TanStack Query hooks:

```typescript
// Example test for an API query hook
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import { useCurrentUser } from '@/features/user/api/queries';
import { apiClient } from '@/shared/lib/api-client/client';

// Mock the API client
vi.mock('@/shared/lib/api-client/client', () => ({
  apiClient: vi.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useCurrentUser', () => {
  it('fetches current user data successfully', async () => {
    const mockUser = { id: '123', email: 'user@example.com', name: 'Test User' };
    (apiClient as any).mockResolvedValue(mockUser);

    const { result } = renderHook(() => useCurrentUser(), {
      wrapper: createWrapper(),
    });

    // Initially in loading state
    expect(result.current.isLoading).toBe(true);

    // Wait for query to resolve
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Check data and status
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual(mockUser);
  });

  it('handles error states correctly', async () => {
    const error = new Error('Failed to fetch user');
    (apiClient as any).mockRejectedValue(error);

    const { result } = renderHook(() => useCurrentUser(), {
      wrapper: createWrapper(),
    });

    // Wait for query to resolve
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Check error state
    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBeDefined();
  });
});
```

### 4. Utility Functions

Utility function tests are straightforward unit tests:

```typescript
// Example test for a permission utility
import { vi } from 'vitest';
import { hasPermission } from '@/shared/lib/auth/permissions';

describe('hasPermission', () => {
  it('returns true when user has required permission', () => {
    const user = {
      direct_permissions: ['read:users', 'write:posts'],
      // ... other user properties
    };

    expect(hasPermission(user, 'read:users')).toBe(true);
  });

  it('returns false when user lacks required permission', () => {
    const user = {
      direct_permissions: ['read:users'],
      // ... other user properties
    };

    expect(hasPermission(user, 'admin:system')).toBe(false);
  });

  it('handles null or undefined user object', () => {
    expect(hasPermission(null, 'read:users')).toBe(false);
    expect(hasPermission(undefined, 'read:users')).toBe(false);
  });
});
```

## Mocking Strategies

### 1. API Requests

Use the `vi.mock()` function to mock API client implementations:

```typescript
// Mock the entire API client
vi.mock('@/shared/lib/api-client/client', () => ({
  apiClient: vi.fn(),
}));

// Set up mock responses for specific endpoints
(apiClient as any).mockResolvedValueOnce({ data: 'mocked response' });
```

### 2. Zustand Store

Mock Zustand store hooks to provide controlled test data:

```typescript
// Mock the store
vi.mock('@/features/auth/store/auth-store', () => ({
  useAuthStore: vi.fn(),
}));

// Configure mock return values
(useAuthStore as any).mockReturnValue({
  user: { id: '123', name: 'Test User' },
  isLoading: false,
  setUser: vi.fn(),
});
```

### 3. Next.js Router

Mock the Next.js router when testing components that use routing:

```typescript
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
}));

// Configure router mocks
(useRouter as any).mockReturnValue({
  push: vi.fn(),
  replace: vi.fn(),
  back: vi.fn(),
});
```

### 4. Feature Flags

Mock feature flag configurations for testing different scenarios:

```typescript
vi.mock('@/shared/config/feature-flags', () => ({
  featureFlags: {
    FEATURE_X_ENABLED: true,
    FEATURE_Y_ENABLED: false,
  },
}));
```

## Best Practices

1. **Test by User Behavior**: Focus on how users interact with your components rather than implementation details.

2. **Isolate Tests**: Each test should be independent and not rely on the state from previous tests.

3. **Test Features in Isolation**: Mock dependencies outside the feature being tested.

4. **Use Data Builders**: Create helper functions that generate test data to keep tests DRY:

   ```typescript
   // Example user data builder
   export const buildUser = (overrides = {}) => ({
     id: '123',
     email: 'test@example.com',
     name: 'Test User',
     role: 'user',
     ...overrides,
   });
   ```

5. **Test Error Scenarios**: Don't just test the happy path; test error states, loading states, and edge cases.

6. **Use Test IDs Consistently**: Add data-testid attributes to elements that don't have accessible names or roles:

   ```tsx
   <div data-testid="user-profile-container">{/* Component content */}</div>
   ```

7. **Keep Tests Focused**: Test one specific behavior per test case.

## Running Tests

You can run tests using the following npm scripts:

```bash
# Run all tests
npm test

# Run tests in watch mode during development
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests for a specific feature
npm test -- features/auth
```

## Coverage Requirements

Our project has defined the following minimum coverage thresholds:

- **Statements**: 75%
- **Branches**: 70%
- **Functions**: 75%
- **Lines**: 75%

These thresholds are enforced in the CI/CD pipeline to maintain code quality. The coverage reports are generated in HTML, JSON, and text formats for easy review.

When writing new features, ensure your tests cover:

1. **Component rendering**: All components render without errors
2. **Interactive behavior**: User interactions (clicks, inputs, etc.)
3. **State changes**: Component state changes correctly
4. **Edge cases**: Loading states, error states, empty states
5. **Integration points**: Interactions with hooks, stores, and other components

---

By following these guidelines, we ensure our application is thoroughly tested, maintainable, and robust. The feature-based testing approach aligns with our architecture and makes it easier to maintain tests as the application evolves.
