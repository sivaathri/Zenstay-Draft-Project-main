# MIGRATION PLAN

This plan details how we will transition from the current static workspace to the fully functional ZENSTAY SaaS product.

## Phase 1: Foundation & Monorepo Setup
1. Initialize the root workspace (npm workspaces).
2. Set up `apps/web` (React/Vite).
3. Set up `apps/api` (Express/TypeScript).
4. Set up `packages/database` (Prisma/PostgreSQL).
5. Create `docker-compose.yml` for local PostgreSQL database.
6. Extract the global CSS and assets from `index.html` into `apps/web`.

## Phase 2: Frontend Componentization
1. Break down the static `index.html` into reusable React components.
2. Establish the App Shell (Sidebar, Topbar).
3. Establish the routing system for different pages (Dashboard, Properties, Messages, Finance, Housekeeping).
4. *Validation*: The React app must look exactly like the original `index.html`.

## Phase 3: Core Database & Multi-Tenancy
1. Design the core Prisma schema: `Tenant`, `User`, `Role`, `Permission`.
2. Generate migrations and a seed script with 3 Demo Tenants.
3. Build the Auth API (Login, Token generation).
4. Implement strict `tenant_id` middleware in `apps/api`.
5. Connect `apps/web` login form to the real Auth API.

## Phase 4: Properties & Reservations (The Core PMS)
1. Add `Property`, `Unit`, `Traveler`, `Reservation` to the database schema.
2. Build CRUD API routes with tenant isolation.
3. Hook up the Frontend Property Grid and Reservation lists to the real APIs.
4. *Validation*: Create properties and reservations in UI, verify persistence in Database.

## Phase 5: Operations (Housekeeping & Maintenance)
1. Add `Task`, `HousekeepingJob`, `MaintenanceRequest` schemas.
2. Build APIs for task assignment and status updates.
3. Connect the Housekeeper mobile-friendly UI to the backend APIs.
4. *Validation*: Complete a checklist in the UI, verify status transition.

## Phase 6: Finance & CRM
1. Add `Invoice`, `Payment`, `Lead`, `Opportunity` schemas.
2. Build API routes for generating invoices and tracking payments.
3. Connect the Finance Dashboard and CRM UI.

## Phase 7: Integrations & AI
1. Build the Guesty adapter structure (mocked initially).
2. Set up pgvector and the AI Service layer for answering operational questions based on tenant data.
3. Connect the AI Intelligence UI.

## Phase 8: Polish & Client Demo
1. Ensure the E2E flow (Login -> Dashboard -> Property -> Reservation -> Housekeeping -> Invoice) works flawlessly.
2. Finalize demo seed data.
3. Verify Responsive layouts.
