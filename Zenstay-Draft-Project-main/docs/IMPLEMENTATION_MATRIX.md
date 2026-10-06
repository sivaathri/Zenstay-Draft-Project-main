# ZENSTAY Implementation Matrix (V3.0 Specification)

| Requirement | Spec Section | Existing Implementation | Status | Missing Behavior | Backend Impact | Frontend Impact | Integration | Test Coverage | Priority |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **0. Foundation** | | | | | | | | | |
| Multi-tenant Architecture | 1.5, Part 19 | `schema.prisma` has `Tenant` model. | PARTIALLY IMPLEMENTED | Middleware needs to strictly enforce `tenantId` on all queries. Multi-tenant context switcher for Super Admin. | High | Medium | None | None | 1 |
| RBAC / Roles | 1.4, Part 19 | UserRole relation exists. Mock UI has role switcher. | PARTIALLY IMPLEMENTED | API authorization guards based on roles. Custom role creation. | High | High | None | None | 1 |
| PostgreSQL Database | 17.1 | `schema.prisma` configured for PG. | PARTIALLY IMPLEMENTED | Needs actual PostgreSQL instance running and Prisma client generated. | High | None | Database | None | 1 |
| Premium UI / Design System | 18.2 | React/Vite UI in `apps/web` is highly developed. | IMPLEMENTED | Refine API connections to populate UI without breaking design. | None | Medium | None | None | 1 |
| **1. Guesty and Beyond** | | | | | | | | | |
| Single Source of Truth | 1.1 | Not connected. | NOT IMPLEMENTED | Connect to Guesty API. Sync Properties, Reservations, Travelers, Reviews. | High | High | Guesty | None | 2 |
| Webhook Synchronization | 17.2 | Not connected. | NOT IMPLEMENTED | Webhook endpoints to receive Guesty updates in real-time. | High | None | Guesty | None | 2 |
| **2. Property Manager (A)** | | | | | | | | | |
| Automatic Intervention Gen | A.1 | UI screens exist. | NOT IMPLEMENTED | Generate Check-in/Check-out tasks based on Guesty reservations. | High | Low | Guesty | None | 3 |
| Locked Financial Logic | A.2 | UI displays amounts. | NOT IMPLEMENTED | Strictly disburse cleaning fees. Prevent rounding/changes. | High | Low | None | None | 3 |
| Intervention Lifecycle | A.3 | Statuses in UI. | PARTIALLY IMPLEMENTED | State machine enforcement (Available -> Reserved -> Completed -> ...). Anti-concurrency lock. | High | High | None | None | 3 |
| Shared Interventions | A.7 | UI concept exists. | NOT IMPLEMENTED | Calculate percentage distributions and enforce payment ceilings. | High | High | None | None | 4 |
| Checklists & Evidence | A.14 | UI displays mock photos. | PARTIALLY IMPLEMENTED | S3 upload for media, timestamping, linking to tasks. | High | High | S3/Storage | None | 4 |
| **3. Traveler (B)** | | | | | | | | | |
| Registration / Check-in Web App | B.2 | Traveler portal UI exists. | PARTIALLY IMPLEMENTED | Link generation, identity collection, terms signature. | High | High | YouSign | None | 5 |
| Upsells | B.3 | UI screens exist. | PARTIALLY IMPLEMENTED | Assign upsell tasks to housekeepers, process payments. | High | High | Stripe | None | 5 |
| Security Deposit / Damage Waiver | B.3 | UI options exist. | CLIENT DECISION REQUIRED | Need selection of provider (Swikly/Tyltt vs Stripe). | High | High | Stripe/Other | None | 5 |
| **4. Owner (C)** | | | | | | | | | |
| Revenue / CRG | C.1, C.2 | Dashboard UI exists. | PARTIALLY IMPLEMENTED | Calculate net revenue based on exact formula. Generate PDF. | High | High | None | None | 6 |
| Date Blocking / iCal | C.3, C.11 | UI exists. | NOT IMPLEMENTED | Push blocks to Guesty. iCal sync. | High | Medium | Guesty/iCal | None | 6 |
| **5. Contractor (D)** | | | | | | | | | |
| Quotes & Projects | D.3, D.4 | UI screens exist. | PARTIALLY IMPLEMENTED | Submit quotes, approval workflow, invoice generation. | High | High | None | None | 7 |
| **6. Activities (E)** | | | | | | | | | |
| Catalog & Booking | E.1 | UI screens exist. | EXTERNAL CREDENTIAL REQUIRED | Partner agreements and API keys for GetYourGuide/Viator. | High | High | GYG/Viator | None | 8 |
| **7. Office (F1, F2)** | | | | | | | | | |
| Unified Ticketing | 11.2 | UI screens exist. | PARTIALLY IMPLEMENTED | Create, assign, track SLAs, comment. | High | High | None | None | 9 |
| Management Agreement Onboarding | F.2 | UI exists. | PARTIALLY IMPLEMENTED | Step-by-step progress tracking. | Medium | High | None | None | 9 |
| **8. Super Admin (F3)** | | | | | | | | | |
| Financial Management | F.1 | Dashboard UI exists. | PARTIALLY IMPLEMENTED | Enter expenses, calculate margins, multi-company view. | High | High | None | None | 10 |
| **9. AI (Part 7)** | | | | | | | | | |
| Traveler Concierge | G.1 | UI concepts exist. | NOT IMPLEMENTED | RAG over property guidebooks, automated responses. | High | High | OpenAI/Claude| None | 11 |
| Sentiment Detection | G.8 | UI concepts exist. | NOT IMPLEMENTED | Analyze messages and route based on sentiment. | High | Low | OpenAI/Claude| None | 11 |
| **10. Referrers (H)** | | | | | | | | | |
| Lead Tracking & Commissions | H.1, H.4 | UI screens exist. | PARTIALLY IMPLEMENTED | Track stages, calculate 10% rolling commission. | High | High | HubSpot | None | 12 |
| **11. Photographer (I)** | | | | | | | | | |
| Automatic Assignments | I.1 | UI screens exist. | PARTIALLY IMPLEMENTED | Trigger assignment on mandate signature, batch uploads. | High | Medium | S3/Storage | None | 13 |
| **12. Account Creation** | | | | | | | | | |
| Registration Flow | 12.1 | UI screens exist. | PARTIALLY IMPLEMENTED | Identity, SIRET, YouSign contract execution. | High | High | YouSign | None | 14 |
| **13. Real Estate Sales** | | | | | | | | | |
| Agency Pipeline | Part 13 | UI screens exist. | PARTIALLY IMPLEMENTED | Revenue sharing calculations, track viewings/offers. | High | High | None | None | 15 |
