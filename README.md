# Spikerz Frontend Dashboard

A modern, real-time dashboard built with Next.js for monitoring and managing the Spikerz rate limiting system. Features live WebSocket updates, analytics visualization, and administrative controls.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [API Client Code Generation](#api-client-code-generation)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)

## 🎯 Overview

Spikerz Frontend is a responsive web application that provides real-time monitoring and management of user rate limits. It communicates with the Spikerz Backend API via REST endpoints and WebSocket connections to deliver instant updates on user activity, request counts, and rate limit status.

## 🛠 Tech Stack

### Core Framework
- **[Next.js](https://nextjs.org/)** (v16.0.1) - React framework with server-side rendering and file-based routing
  - Built with **React 19.2.0** for modern component architecture
  - App Router for improved routing and layouts
  - Server and Client Components support
  - Automatic code splitting and optimization
  
- **[TypeScript](https://www.typescriptlang.org/)** (v5) - Type-safe development with static type checking

### UI Framework & Styling
- **[Material-UI (MUI)](https://mui.com/)** (v7.3.4) - Comprehensive React component library
  - **[@mui/material](https://www.npmjs.com/package/@mui/material)** - Core components (Button, Typography, Container, etc.)
  - **[@mui/icons-material](https://www.npmjs.com/package/@mui/icons-material)** - Material Design icons
  - **[@mui/x-date-pickers](https://www.npmjs.com/package/@mui/x-date-pickers)** - Advanced date/time pickers for analytics filtering
  
- **[Emotion](https://emotion.sh/)** (v11.14.0) - CSS-in-JS styling solution
  - **[@emotion/react](https://www.npmjs.com/package/@emotion/react)** - Framework agnostic emotion
  - **[@emotion/styled](https://www.npmjs.com/package/@emotion/styled)** - Styled component API

### Data Management
- **[TanStack React Query](https://tanstack.com/query/latest)** (v5.90.6) - Powerful data fetching and caching library
  - Server state management
  - Automatic refetching and caching
  - Optimistic updates
  - Background synchronization
  
- **[Axios](https://axios-http.com/)** (v1.13.1) - Promise-based HTTP client for API requests

### Real-time Communication
- **[Socket.io Client](https://socket.io/)** (v4.8.1) - WebSocket client for real-time updates
  - Live user request monitoring
  - Rate limit status notifications
  - Instant UI updates without polling

### Data Display
- **[Material React Table](https://www.material-react-table.com/)** (v3.2.1) - Advanced data table component
  - Sorting, filtering, and pagination
  - Responsive design
  - Built on MUI and TanStack Table
  
- **[Day.js](https://day.js.org/)** (v1.11.19) - Lightweight date utility library for formatting timestamps

### API Client Generation
- **[@openapitools/openapi-generator-cli](https://www.npmjs.com/package/@openapitools/openapi-generator-cli)** (v2.25.0) - Auto-generates TypeScript API client from OpenAPI specification
  - Type-safe API calls
  - Automatic TypeScript interfaces
  - Consistent with backend API

### Development Tools
- **[ESLint](https://eslint.org/)** (v9) - Code linting and quality enforcement
  - **[eslint-config-next](https://www.npmjs.com/package/eslint-config-next)** - Next.js-specific linting rules

## ✨ Features

### 1. **Real-time Dashboard**
- Live monitoring of user requests via WebSocket
- Instant updates when rate limits are hit
- User status indicators (Active, Suspended, Limit Exceeded)

### 2. **User Management**
- Interactive data table with all users
- View detailed user history and statistics
- Sort, filter, and search functionality

### 3. **Admin Controls**
- Add/remove rate limit tokens for users
- Adjust rate limit configuration
- Suspend/unsuspend users

### 4. **Analytics**
- Summary statistics (total requests, rate limited)
- Top users by request count
- Time-range filtering (hourly, daily)

### 5. **User Detail Pages**
- Individual user request history
- Statistics per user
- Timeline of rate limit events

## 📦 Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** - v18.x or higher recommended
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`
  
- **npm** - v9.x or higher (comes with Node.js)
  - Verify installation: `npm --version`
  
- **Spikerz Backend** - The backend API must be running
  - Default: `http://localhost:3000`
  - See backend README for setup instructions

## 🚀 Installation

1. **Clone the repository** (if not already done):
```bash
git clone <repository-url>
cd spikerz-frontend
```

2. **Install dependencies**:
```bash
npm install
```

This will install all required packages listed in `package.json`.

## 🏃 Running the Project

### Development Mode

Start the development server with hot-reload:

```bash
npm run dev
```

The application will be available at **http://localhost:3001** by default.

Open your browser and navigate to the URL. You should see the Spikerz Rate Limit Dashboard.

### Production Build

To create an optimized production build:

```bash
npm run build
```

This compiles and optimizes the application for production deployment.

### Start Production Server

After building, start the production server:

```bash
npm run start
```

The production server will run on **http://localhost:3001** by default.

## 🔄 API Client Code Generation

### What is Code Generation?

The `codegen` command automatically generates a **type-safe TypeScript API client** from the backend's OpenAPI specification. This ensures that:

- All API endpoints are available as TypeScript functions
- Request/response types are automatically inferred
- API changes are immediately reflected in the frontend
- Reduces manual coding and potential errors

### How Code Generation Works

1. **Backend Exposes OpenAPI Spec**: The Spikerz backend provides an OpenAPI/Swagger specification at `http://localhost:3000/docs-json`

2. **OpenAPI Generator CLI**: The tool reads this specification and generates TypeScript code

3. **Output Location**: Generated files are placed in `src/api-client/`

### When to Run Codegen

Run the codegen command whenever:

- You start working on the project for the first time
- The backend API changes (new endpoints, modified parameters, etc.)
- You pull updates that modify the backend API
- You encounter TypeScript errors related to API types

### Running Code Generation

**Important**: The backend server must be running before you execute this command.

```bash
# Ensure backend is running at http://localhost:3000
npm run codegen
```

### What Gets Generated

The command generates the following in `src/api-client/`:

```
src/api-client/
├── api.ts                      # Main API classes with methods
├── base.ts                     # Base API client configuration
├── common.ts                   # Common types and utilities
├── configuration.ts            # API client configuration
├── index.ts                    # Barrel export file
└── docs/                       # Markdown documentation
    ├── AdminRateLimitApi.md    # Admin endpoint docs
    ├── AnalyticsApi.md         # Analytics endpoint docs
    ├── UsersApi.md             # Users endpoint docs
    └── ...                     # DTO documentation
```

### Generated API Classes

The generated client includes three main API classes:

1. **AdminRateLimitApi** - Administrative rate limit controls
   - `addTokens()` - Add tokens to a user
   - `adjust()` - Adjust rate limit configuration
   - `suspend()` - Suspend/unsuspend a user

2. **AnalyticsApi** - Analytics and statistics
   - `getAnalyticsSummary()` - Get summary statistics
   - `getTopUsers()` - Get top users by request count

3. **UsersApi** - User information and history
   - `getAllUsers()` - Get all users with stats
   - `getUserHistory()` - Get request history for a user
   - `getUserStats()` - Get statistics for a user

### Using the Generated Client

Example usage in a component:

```typescript
import { UsersApi, Configuration } from '@/api-client';
import { API_BASE_URL } from '@/lib/config';

// Create API instance
const usersApi = new UsersApi(
  new Configuration({ basePath: API_BASE_URL })
);

// Use with React Query
const { data } = useQuery({
  queryKey: ['users'],
  queryFn: () => usersApi.getAllUsers()
});
```

### Customizing the Generation

The codegen behavior is configured in two files:

1. **`package.json`** - The codegen script:
```json
{
  "scripts": {
    "codegen": "openapi-generator-cli generate -i http://localhost:3000/docs-json -g typescript-axios -o ./src/api-client"
  }
}
```

Parameters explained:
- `-i` : Input OpenAPI specification URL
- `-g` : Generator to use (typescript-axios for TypeScript with Axios)
- `-o` : Output directory

2. **`openapitools.json`** - Generator configuration:
```json
{
  "generator-cli": {
    "version": "7.17.0"
  }
}
```

### Troubleshooting Codegen

**Error: Connection refused**
- Ensure the backend is running at `http://localhost:3000`
- Check that the backend's Swagger endpoint is accessible at `http://localhost:3000/docs`

**Error: Generator version mismatch**
- Clear the generator cache: `npx openapi-generator-cli version-manager list`
- Reinstall dependencies: `npm install`

**TypeScript errors after generation**
- Run `npm install` to ensure all dependencies are installed
- Restart your IDE/TypeScript server

## 📁 Project Structure

```
spikerz-frontend/
├── src/
│   ├── api-client/           # Auto-generated API client (from codegen)
│   │   ├── api.ts
│   │   ├── base.ts
│   │   ├── configuration.ts
│   │   └── docs/
│   │
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx        # Root layout with providers
│   │   ├── page.tsx          # Home page (dashboard)
│   │   ├── analytics/        # Analytics page
│   │   │   └── page.tsx
│   │   └── users/            # User detail pages
│   │       └── [userId]/
│   │           └── page.tsx
│   │
│   ├── components/           # React components
│   │   ├── AdminModal.tsx        # Admin controls modal
│   │   ├── QueryProvider.tsx     # React Query provider
│   │   ├── ThemeProviderClient.tsx # MUI theme provider
│   │   └── UserTable.tsx         # Main user data table
│   │
│   ├── hooks/                # Custom React hooks
│   │   └── useWebSocket.ts   # WebSocket connection hook
│   │
│   ├── lib/                  # Utility libraries
│   │   ├── config.ts         # Configuration (API URL)
│   │   ├── socket.ts         # Socket.io setup
│   │   └── utils.ts          # Helper functions
│   │
│   ├── theme.ts              # MUI theme customization
│   └── types.ts              # Shared TypeScript types
│
├── public/                   # Static assets
├── openapitools.json         # OpenAPI generator config
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── next.config.js            # Next.js configuration
└── README.md                 # This file
```

## 🔧 Environment Variables

Create a `.env.local` file in the project root to configure environment variables:

```bash
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3000

# Default is http://localhost:3000 if not specified
```

**Note**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. All other variables are server-side only.

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot-reload (port 3001) |
| `npm run build` | Create optimized production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint to check code quality |
| `npm run codegen` | Generate API client from backend OpenAPI spec |

## 🔗 Related Links

- **Backend Repository**: See the backend README for API documentation
- **Next.js Documentation**: https://nextjs.org/docs
- **Material-UI Documentation**: https://mui.com/
- **TanStack Query Documentation**: https://tanstack.com/query/latest/docs/react/overview
- **Socket.io Documentation**: https://socket.io/docs/v4/

## 🤝 Development Workflow

1. **Start Backend**: Ensure the Spikerz backend is running
2. **Generate API Client**: Run `npm run codegen` if this is your first time or after API changes
3. **Install Dependencies**: Run `npm install`
4. **Start Development**: Run `npm run dev`
5. **Make Changes**: Edit files and see changes hot-reload instantly
6. **Regenerate Client**: Run `npm run codegen` if backend API changes
7. **Build**: Run `npm run build` before deploying

## 📝 Notes

- The application expects the backend to be running at `http://localhost:3000` by default
- WebSocket connection is automatically established when the app loads
- The data table updates in real-time when users make requests
- Admin operations require the backend API to be accessible
- Generated API client files in `src/api-client/` should not be manually edited

## 🐛 Troubleshooting

**Port already in use**
```bash
# Kill process on port 3001 (Windows)
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Or use a different port
PORT=3002 npm run dev
```

**Cannot connect to backend**
- Verify backend is running at `http://localhost:3000`
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Ensure no CORS issues (backend should allow frontend origin)

**WebSocket not connecting**
- Check browser console for connection errors
- Verify Socket.io server is running on backend
- Ensure firewall isn't blocking WebSocket connections

**TypeScript errors in api-client**
- Run `npm run codegen` to regenerate the client
- Ensure backend is running during codegen
- Check that all dependencies are installed
