# REPOSITORY ANALYSIS

## 1. Existing Workspace
**Location**: `/zenstay-production-ai`
- **Type**: Static Frontend Prototype
- **Technology**: Single `index.html` file (~78KB) containing HTML, inline CSS, and UI structure.
- **Contents**: High-quality, premium dashboard, operations UI, authentication screens, property listings, and AI assistant mockups.
- **Status**: Design Source of Truth. No dynamic backend, no database.

## 2. Reference: Kamra PMS
**Location**: `/references/kamra-pms-develop`
- **Type**: Open-source PMS
- **Technology**: Python, Frappe Framework, frontend SPA (Node-based build).
- **Database**: MariaDB/PostgreSQL (via Frappe).
- **Features**: Property management, reservations, guests, operational workflows.
- **Verdict**: Use for understanding PMS workflows, data schemas for reservations, and property entities.

## 3. Reference: OpenSTR
**Location**: `/references/OpenSTR-main`
- **Type**: Open-source Housekeeping / Operations
- **Technology**: Node.js/TypeScript (Express), React (Vite) Admin frontend, PostgreSQL.
- **Features**: Cleaning jobs, checklists, photo evidence, task completion.
- **Verdict**: Use for understanding housekeeping workflows, checklists, cleaner assignments, and task status machines.

## 4. Reference: QloApps
**Location**: `/references/QloApps-develop`
- **Type**: Open-source PMS / Booking Engine
- **Technology**: PHP 8.1+, MySQL.
- **Features**: Reservation workflows, booking engine, pricing, customer management.
- **Verdict**: Use to understand pricing logic, availability calculations, and administration.

## Summary
The reference projects provide excellent business logic blueprints but utilize disparate technologies (Python/Frappe, Node.js, PHP) and cannot be merged. ZENSTAY requires a unified, modern architecture.
