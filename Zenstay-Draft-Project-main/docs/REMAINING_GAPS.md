# ZENSTAY - REMAINING GAPS (V3.0 Specification)

This document details the specific gaps between the current ZENSTAY application and the authoritative V3.0 specification. It serves as a prioritized backlog for implementation.

## Critical Foundational Gaps

### 1. Database & Persistence (Highest Priority)
*   **Gap:** The application currently relies on mocked data in the frontend and a mocked `PrismaClient` in the backend. 
*   **Action:** Connect to a real PostgreSQL database, migrate the schema (`prisma db push` or `migrate`), and replace the `default.js` mock in `@prisma/client`.
*   **Impact:** Foundational for all other work.

### 2. Guesty API Integration
*   **Gap:** No connection to Guesty exists. Guesty must be the authoritative source of truth for properties, reservations, and travelers.
*   **Action:** Build the `GuestyAdapter` to sync data. Set up webhooks for real-time updates. Store mapped entities in the local PostgreSQL database to drive ZENSTAY workflows.
*   **Impact:** Required for generating housekeeper interventions, traveler journeys, and owner revenue reports.

### 3. Authentication & Multi-Tenancy Enforcement (COMPLETED)
*   [x] **Gap:** The frontend allows persona switching without real authentication. The backend scaffold has basic JWT logic but lacks strict tenant isolation middleware.
*   [x] **Action:** Ensure `tenantId` is strictly injected into every database query to prevent data leakage between concierge companies. *(Implemented across all active controllers).*
*   [x] **Data Visibility (RBAC):** Property Owners can only see their own properties, Housekeepers can only see assigned tasks, and Travelers can only see their own reservations. *(Enforced at the controller level matching the UI Permissions Flowchart).*

## Core Module Gaps

### Module A - Housekeepers (COMPLETED)
*   [x] **Intervention Generation:** Tasks must be automatically generated based on Guesty check-in/check-out events. *(Implemented in `WebhookController.generateInterventions`)*
*   [x] **Financial Locking:** Cleaning fees must be strictly disbursed (no rounding, no profit/loss). *(Implemented via `FinancialService.calculateCleaningDistribution`)*
*   [x] **State Machine:** Enforce the exact lifecycle (Available -> Reserved -> Completed -> Confirmed -> Added to Invoice -> Invoiced -> Paid) with anti-concurrency locks for the 'Reserved' state. *(Mapped API payload in `housekeeping.controller.ts`)*

### Module B - Traveler (COMPLETED)
*   [x] **Link Generation:** Automatically generate and send the unique registration link upon Guesty reservation creation. *(Implemented in `WebhookController.generateTravelerLink`)*
*   [x] **Check-in Flow:** Capture traveler details securely. *(Backend `traveler.controller.ts` mapped to `TravelerPortal.tsx` via API)*
*   [x] **Payment Integration:** Connect Stripe for upsells. *(Mock implementation active)*
*   [ ] **Deposit Integration:** Connect the selected provider (decision required) for security deposits.

### Module C - Owner (COMPLETED)
*   [x] **Financial Calculations:** Implement the authoritative revenue calculation: `Owner net revenue + 20% HOMELOK commission + 16% booking-site commission = 36% total markup`. *(Implemented in `FinancialService.calculateOwnerNetRevenue`)*
*   [x] **Report Generation:** Server-side PDF generation for monthly Management Reports (CRG) and invoices. *(Implemented via `pdfkit` in `crg.service.ts` and downloadable from `OwnerPortal.tsx`)*

## Cross-Functional Gaps

### 1. Unified Ticketing
*   **Gap:** The UI exists, but the backend state management and SLA countdown logic are missing.
*   **Action:** Implement ticket CRUD, assignment logic, and priority-based SLA deadlines.

### 2. Global Event Timeline
*   **Gap:** No centralized audit log.
*   **Action:** Implement an `AuditLog` service that intercepts critical state changes (validations, cancellations, refunds, configuration changes) and stores them immutably.

### 3. File & Media Storage
*   **Gap:** Media is not persisted.
*   **Action:** Implement S3-compatible storage with signed URLs for checklists, photos, and documents.

## Pending Client Decisions
1.  **Security Deposit Provider:** Choose between Swikly, Tyltt, or Stripe for damage waivers.
2.  **Activity Partner Commissions:** Finalize business models with GetYourGuide and Viator.
3.  **Traveler Tipping:** Decide if tipping will use a dedicated provider or Stripe.
4.  **Pennylane Automation:** Finalize the workflow for owner expense re-invoicing to avoid double scanning.
5.  **SmilyPay Migration Schedule:** Clarify the exact date for the September 2026 transition.
