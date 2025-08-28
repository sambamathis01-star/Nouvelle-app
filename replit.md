# Travel Security Management System

## Overview

This is a comprehensive travel security management system built with React and Express.js. The application helps organizations track trips, monitor security risks by country, and manage travel alerts. It features a modern frontend using shadcn/ui components with a responsive design, and a robust backend API for data management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript and Vite for fast development and building
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management with optimistic updates
- **UI Library**: shadcn/ui components built on Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom design system and CSS variables for theming
- **Forms**: React Hook Form with Zod validation for type-safe form handling

### Backend Architecture
- **Runtime**: Node.js with Express.js REST API
- **Language**: TypeScript with ES modules
- **Database Layer**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Data Storage**: In-memory storage implementation with interface for easy database integration
- **Validation**: Zod schemas shared between client and server for consistent validation

### Core Data Models
- **Countries**: Security risk levels, travel advisories, embassy information, and health/security risks
- **Trips**: Traveler details, destinations, dates, status tracking, and emergency contacts
- **News Alerts**: Security alerts with severity levels and country-specific information
- **Users**: Basic user authentication structure (prepared for future implementation)

### Component Architecture
- **Layout Components**: Responsive sidebar navigation with mobile-first design
- **Feature Components**: Specialized components for trips, countries, alerts, and dashboard
- **UI Components**: Reusable shadcn/ui components with consistent styling
- **Form Components**: Dynamic forms with validation and error handling

### API Design
- RESTful endpoints following standard HTTP methods
- Consistent error handling and response formats
- Query parameter support for filtering (status, active alerts, etc.)
- Proper HTTP status codes and error messages

### Development Features
- **Hot Reload**: Vite development server with HMR
- **Type Safety**: End-to-end TypeScript with strict mode
- **Code Quality**: ESLint configuration and consistent formatting
- **Build Process**: Optimized production builds with code splitting

## External Dependencies

### Core Framework Dependencies
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight React router
- **react-hook-form**: Form state management and validation
- **framer-motion**: Animation library for smooth interactions

### UI and Styling
- **@radix-ui/react-***: Accessible UI primitives for components
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant handling for components
- **lucide-react**: Icon library with consistent design

### Database and Validation
- **drizzle-orm**: Type-safe SQL query builder
- **@neondatabase/serverless**: PostgreSQL driver for serverless environments
- **zod**: Runtime type validation and schema definition
- **date-fns**: Date manipulation and formatting utilities

### Development Tools
- **vite**: Fast build tool and development server
- **typescript**: Static type checking
- **@replit/vite-plugin-***: Replit-specific development tools
- **esbuild**: Fast JavaScript bundler for production builds

### Database Configuration
- **PostgreSQL**: Primary database with Drizzle ORM configuration
- **Connection**: Uses DATABASE_URL environment variable
- **Migrations**: Drizzle Kit for schema migrations and management