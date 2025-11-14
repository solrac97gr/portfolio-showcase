# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack portfolio showcase web application built with React Router v7 and Firebase. It features server-side rendering, TypeScript development, and cloud-native deployment.

**Tech Stack:**
- Frontend: React Router v7, React 19, TypeScript, Tailwind CSS v4, Vite
- Backend: Firebase Cloud Functions (Node.js 22+), Firebase Admin SDK
- Database: Firestore (Cloud Firestore)
- Infrastructure: Firebase Hosting, Firebase Storage
- CI/CD: GitHub Actions
- Containerization: Docker (multi-stage build)

## Architecture Overview

```
app/                    # React Router frontend SPA
├── routes/            # Route components
├── welcome/           # Welcome component
├── root.tsx           # Root layout and error boundary
├── routes.ts          # Route configuration
└── app.css            # Global styles (Tailwind)

functions/             # Firebase Cloud Functions backend
├── src/
│   ├── index.ts       # Function entry points
│   └── middlewares/   # Request middleware (logging, method checks)
├── lib/               # Compiled JavaScript output
├── package.json
└── tsconfig.json

build/                 # Generated during build (not committed)
├── client/            # Static assets
└── server/            # SSR server code
```

## Common Development Commands

### Building
```bash
# Build everything (frontend + functions)
npm run build
make build

# Build frontend only
npm run build:frontend

# Build functions only
npm run build:functions
# or: cd functions && npm run build

# Build Docker image
docker build -t portfolio-showcase .
```

### Development
```bash
# Start development server with HMR (http://localhost:5173)
npm run dev

# Run local Firebase emulator (Firestore, Functions, Hosting, Storage)
make run
# Emulator UI: http://localhost:4000

# Type checking
npm run typecheck

# Start production server (after build)
npm run start
```

### Deployment
```bash
# Full deployment (frontend + functions + database)
make deploy

# Frontend only to Firebase Hosting
make deploy-hosting

# Functions only to Firebase
make deploy-functions

# Deploy specific function
firebase deploy --only functions:<function-name>
```

## Project Structure Details

### Frontend (`app/`)
- **Routes**: Configured in `app/routes.ts` using React Router file-based routing
- **Global Styles**: `app/app.css` imports Tailwind CSS, configured for dark mode
- **Root Layout**: `app/root.tsx` exports `Layout`, `App`, and `ErrorBoundary`
- **Styling**: Tailwind CSS v4 with `@tailwindcss/vite` plugin
- **Path Aliases**: `~/*` resolves to `./app/*`

### Backend (`functions/`)
- **Entry Point**: `functions/src/index.ts`
- **Current Functions**: `echo` - example HTTP-triggered function
- **Middleware Pattern**: `method-check.ts` (HTTP validation), `logger.ts` (request logging)
- **Compilation**: TypeScript → JavaScript in `functions/lib/`
- **Target**: Node.js ES2017+ (Firebase runtime 22.x)
- **Config**: Strict TypeScript, ES2017 target

### Configuration Files
- **`firebase.json`**: Firebase project configuration (Firestore, Functions, Hosting, Storage, Emulators)
- **`react-router.config.ts`**: React Router configuration (SPA mode, SSR disabled)
- **`vite.config.ts`**: Vite bundler with React Router and Tailwind integration
- **`tsconfig.json`**: Root TypeScript config (ES2022 target, strict mode)
- **`functions/tsconfig.json`**: Functions TypeScript config (ES2017 target)
- **`Dockerfile`**: Multi-stage build for production deployment

### Security & Rules
- **Firestore**: `firestore.rules` - currently denies all read/write (customize as needed)
- **Storage**: `storage.rules` - currently denies all read/write
- **Indexes**: `firestore.indexes.json` - Firestore index definitions

## Type Safety & Development

- Strict TypeScript enabled globally
- React Router type generation: `react-router typegen`
- JSX transform: React 17+ automatic
- Module resolution: bundler (ES2022)
- Check types before committing: `npm run typecheck`

## Build Process

1. **Frontend Build**: `react-router build` (Vite)
   - Client assets → `build/client/`
   - Server code → `build/server/`

2. **Functions Build**: TypeScript compilation
   - Source: `functions/src/`
   - Output: `functions/lib/`

3. **Docker Build**: Multi-stage build
   - Install → build → runtime
   - Final image size optimized
   - Runs `npm run start` on startup

## Firebase Configuration

- **Project ID**: portfolio-showcase-1de4c
- **Region**: eur3 (Europe)
- **Emulator Ports**:
  - Functions: 5001
  - Firestore: 8080
  - Hosting: 5000
  - Storage: 9199
  - Emulator UI: 4000

## Testing

- Testing setup available via `firebase-functions-test@3.1.0`
- No test files currently present
- Ready for Cloud Functions unit/integration tests

## Git & Commits

- Use descriptive commit messages
- CI/CD runs on: push to main (deploy), pull requests (preview)
- Service account secret: `FIREBASE_SERVICE_ACCOUNT_PORTFOLIO_SHOWCASE_1DE4C`

## Key Files to Understand First

1. [app/root.tsx](app/root.tsx) - Root layout and error boundary
2. [app/routes.ts](app/routes.ts) - Route configuration
3. [functions/src/index.ts](functions/src/index.ts) - Cloud Functions entry point
4. [firebase.json](firebase.json) - Firebase infrastructure config
5. [Makefile](Makefile) - Build and deployment targets
6. [vite.config.ts](vite.config.ts) - Frontend build configuration

## Important Notes

- Node.js 22+ required (check `.nvmrc` or `package.json`)
- Build outputs (`build/`, `functions/lib/`) are generated and should not be manually edited
- Environment variables in `.env` (not committed) - add to `.gitignore`
- Firestore and Storage rules need customization before production
- GitHub Actions handles CI/CD - changes to secrets require manual setup

## Adding New Features

### New Routes
1. Create component in `app/routes/`
2. Export metadata (title, description) if needed
3. Add route to `app/routes.ts` using `index()`, `route()`, etc.

### New Cloud Functions
1. Create function in `functions/src/`
2. Export as `onRequest` or other trigger
3. Add to `functions/src/index.ts` exports
4. Deploy with `make deploy-functions`

### Styling
- Use Tailwind CSS classes
- Dark mode: prefix with `dark:`
- Custom CSS: edit `app/app.css`
