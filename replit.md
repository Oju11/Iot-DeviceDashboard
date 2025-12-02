# IoT Device Management Dashboard

## Overview

This is a real-time IoT device management dashboard built with React and Express. The application enables users to monitor IoT devices, view live telemetry data through streaming charts, and simulate device telemetry submissions. The system features a modern glassmorphism UI with real-time data visualization, device status monitoring, and Server-Sent Events (SSE) for live updates.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR (Hot Module Replacement)
- Wouter for lightweight client-side routing instead of React Router
- TanStack Query (React Query) for server state management and data fetching

**UI Component System**
- Shadcn/ui component library with Radix UI primitives for accessible, headless components
- Tailwind CSS for utility-first styling with custom design tokens
- Custom glassmorphism design system with semi-transparent cards, backdrop blur effects, and gradient backgrounds
- Recharts library for data visualization and live telemetry charts

**Design Philosophy**
- Dark mode glassmorphism aesthetic with violet-to-slate gradients
- Reference-based design inspired by modern dashboards (Vercel Analytics, Linear, Grafana)
- Inter font family throughout with defined typographic hierarchy
- Responsive grid layouts with consistent spacing units (4, 6, 8, 12)

### Backend Architecture

**Server Framework**
- Express.js with TypeScript running on Node.js
- HTTP server created with Node's native `http` module for WebSocket/SSE support
- Development mode uses Vite middleware for seamless frontend integration
- Production mode serves static assets from compiled build

**Data Flow & Real-time Communication**
- Server-Sent Events (SSE) for real-time telemetry streaming from server to clients
- RESTful API endpoints for device management and telemetry simulation
- In-memory storage implementation (MemStorage class) for development/demo purposes
- Broadcast pattern: telemetry updates are pushed to all connected SSE clients simultaneously

**API Structure**
- `GET /api/devices` - Retrieve list of all IoT devices with status information
- `POST /api/simulate` - Submit new telemetry data for a device
- `GET /api/telemetry/stream` - SSE endpoint for real-time telemetry updates

**Data Storage Strategy**
- Uses in-memory storage with IStorage interface abstraction
- Storage interface defined to enable future database implementations (PostgreSQL with Drizzle ORM)
- Schema defined using Zod for runtime validation and type safety
- Maximum telemetry retention of 100 data points to prevent memory issues

## Recent Changes (December 2025)

- Implemented full backend API with SSE streaming
- Connected frontend to real APIs (replaced mock data)
- Added POST /api/simulate endpoint for telemetry submission
- Added GET /api/devices endpoint for device listing
- Added GET /api/telemetry/stream SSE endpoint for real-time updates
- All tests passing for end-to-end telemetry flow

### Data Models

**Device Schema**
- `id`: Unique device identifier (string)
- `name`: Human-readable device name
- `status`: Enum of "active", "inactive", or "warning"
- `lastReading`: Most recent telemetry value (nullable number)
- `lastSeen`: ISO timestamp of last communication (nullable string)

**Telemetry Schema**
- `id`: Unique telemetry record identifier (UUID)
- `deviceId`: Reference to source device
- `value`: Numeric telemetry reading
- `timestamp`: ISO timestamp of data collection

**Validation Approach**
- Zod schemas used for both runtime validation and TypeScript type inference
- Drizzle-zod integration ready for future database schema validation
- Insert schemas omit auto-generated fields (id, timestamp)

### External Dependencies

**Database (Configured but Not Active)**
- Neon serverless PostgreSQL configured via `@neondatabase/serverless`
- Drizzle ORM set up for type-safe database queries
- Connection configured through `DATABASE_URL` environment variable
- Migration system configured with drizzle-kit but currently unused (app uses in-memory storage)

**UI Component Libraries**
- Radix UI primitives for 30+ accessible component patterns (dialogs, dropdowns, tooltips, etc.)
- Recharts for chart rendering with declarative API
- Embla Carousel for carousel functionality
- Lucide React for consistent icon system

**Development Tools**
- ESBuild for server-side bundling in production
- Replit-specific plugins for development banner, error overlay, and cartographer
- TypeScript strict mode for type safety
- Path aliases configured for clean imports (@/, @shared/, @assets/)

**Build & Deployment**
- Production build process bundles server with allowlisted dependencies to reduce syscalls
- Client builds to `dist/public` directory
- Server bundles to single `dist/index.cjs` file
- Static file serving with SPA fallback for client-side routing