# Overview

AquaAlert is a Brazilian water monitoring application built for Nova Cruz, designed to track water availability status across different neighborhoods. The application allows users to view water status in real-time, report issues, view neighborhood maps, and manage water status updates through an admin panel. The system features a mobile-first Progressive Web App (PWA) design with Portuguese localization.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development/build tooling
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack React Query for server state management and caching
- **Form Handling**: React Hook Form with Zod schema validation
- **Navigation**: Custom client-side routing with view state management
- **Mobile-First Design**: Responsive layout optimized for mobile devices with bottom navigation and floating action buttons

## Backend Architecture
- **Runtime**: Node.js with Express.js web framework
- **API Design**: RESTful API with JSON responses
- **Request Handling**: Express middleware for JSON parsing and logging
- **Error Handling**: Centralized error middleware with status code mapping
- **Development**: Hot module replacement via Vite integration in development mode

## Data Architecture
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle migrations with schema definitions in shared directory
- **Database Provider**: Neon serverless PostgreSQL
- **Storage Pattern**: Repository pattern with in-memory fallback for development
- **Data Models**: Neighborhoods (with water status) and Alerts (user reports)

## Core Features
- **Water Status Monitoring**: Three-state system (Available, Unavailable, Maintenance) for each neighborhood
- **Real-time Updates**: Live status updates with automatic cache invalidation
- **User Reporting**: Citizen-generated alerts and issue reporting system
- **Geographic Organization**: Neighborhood-based water status tracking
- **Administrative Controls**: Admin panel for status management and system oversight

## Development Workflow
- **Build System**: Vite for frontend bundling, esbuild for backend compilation
- **Type Safety**: Full TypeScript coverage across frontend, backend, and shared schemas
- **Development Server**: Concurrent frontend/backend development with proxy setup
- **Database Operations**: Schema-first development with type generation from database models

## Progressive Web App Features
- **Mobile Optimization**: Touch-friendly interface with mobile-specific navigation patterns
- **PWA Manifest**: Configured for installation as a mobile app
- **Responsive Design**: Adaptive layout for various screen sizes
- **Performance**: Optimized loading and caching strategies

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Drizzle ORM**: Type-safe database client with migration management
- **PostgreSQL**: Primary database engine for data persistence

## UI and Styling
- **Radix UI**: Headless component library for accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide React**: Icon library for consistent iconography
- **Google Fonts**: Roboto font family for typography

## Development Tools
- **Vite**: Frontend build tool with HMR and development server
- **TypeScript**: Static type checking across the entire codebase
- **ESBuild**: Fast JavaScript/TypeScript bundler for production builds
- **Replit Integration**: Development environment optimization for Replit platform

## Validation and Forms
- **Zod**: Schema validation library for type-safe data validation
- **React Hook Form**: Form state management with validation integration
- **Hookform Resolvers**: Bridge between React Hook Form and Zod schemas

## State Management
- **TanStack React Query**: Server state management, caching, and synchronization
- **React Context**: Local state management for UI interactions

## Session Management
- **Connect PG Simple**: PostgreSQL-based session storage for Express sessions