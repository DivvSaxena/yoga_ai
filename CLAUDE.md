# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

YogaAI is a Next.js 15 web application that provides AI-powered personalized diet and fitness plans tailored for Indian lifestyles. The app uses the Pages Router pattern with HeroUI components and Tailwind CSS 4.

## Common Commands

```bash
# Development
npm run dev          # Start dev server with Turbopack

# Build & Production
npm run build        # Production build
npm start            # Start production server

# Linting
npm run lint         # Run ESLint with --fix
```

## Architecture

### Directory Structure
- `pages/` - Next.js Pages Router (not App Router)
- `components/` - Reusable UI components
- `layouts/` - Page layout wrappers (DefaultLayout with Head, Navbar, Footer)
- `config/` - Site configuration (navigation, fonts)
- `types/` - TypeScript type definitions
- `styles/` - Global CSS

### Key Technologies
- **Next.js 15** with Pages Router and Turbopack
- **HeroUI v2** - Component library (imported from `@heroui/*`)
- **Tailwind CSS 4** with `@tailwindcss/postcss`
- **Framer Motion** - Animations
- **next-themes** - Dark/light mode support

### UI Component Patterns
- HeroUI components are imported from individual packages (e.g., `@heroui/button`, `@heroui/input`)
- Theme provider setup is in `pages/_app.tsx` using `HeroUIProvider` and `NextThemesProvider`
- Custom icons are SVG components in `components/icons.tsx` with `IconSvgProps` type
- Tailwind Variants used for component styling (see `components/primitives.ts`)

### Page Structure
Each page uses `DefaultLayout` which includes:
- `Head` component for meta tags
- `Navbar` with navigation from `config/site.ts`
- Footer with links and social icons

### State Management
- Local React state (useState) for form handling
- No global state management library - app is primarily static content

### AI Planner (`pages/ai-planner/index.tsx`)
Multi-step form wizard that generates personalized diet and workout plans. Currently uses mock data generation (`mockGeneratePlan`) - actual AI integration would replace this function.
