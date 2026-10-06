# TARGET ARCHITECTURE

## ONE Canonical Architecture
ZENSTAY will be built as a single, unified, multi-tenant SaaS application using a modern, scalable TypeScript stack.

## Technology Stack
- **Monorepo Management**: npm workspaces or Turborepo (optional but recommended for clean separation).
- **Backend / API**: Node.js with **Express** (TypeScript)
  - *Reasoning*: Lightweight, highly flexible, standard for building fast REST APIs. Great for clear architectural layers (Route -> Controller -> Service -> Repository).
- **Frontend**: **React** with **Vite** (TypeScript)
  - *Reasoning*: React allows us to componentize the massive `index.html` file easily while preserving the vanilla CSS and classes. Vite provides a fast development experience.
- **Database**: **PostgreSQL**
  - *Reasoning*: The best relational database for complex schema relations and SaaS applications. 
- **ORM / Query Builder**: **Prisma**
  - *Reasoning*: Excellent type safety, great migration system, straightforward to enforce `tenant_id` filtering.
- **Authentication**: Custom JWT with bcrypt (or specialized library) handling strict Multi-Tenancy.
- **Vector Database (AI/RAG)**: pgvector (PostgreSQL extension) to keep infra simple and unified.

## Infrastructure & Multi-Tenancy
- **Tenant Isolation**: Row-Level isolation. Every table (except system-wide config) will have a `tenant_id`. The API layer will automatically inject the authenticated user's `tenant_id` into all database queries.
- **Roles & Permissions (RBAC)**: Stored in the database. Middleware will check permissions before controller execution.

## Directory Structure
```
zenstay/
├── apps/
│   ├── web/               # React / Vite SPA frontend
│   └── api/               # Express REST API
├── packages/
│   ├── database/          # Prisma schema, migrations, and seeds
│   ├── shared/            # Shared types (DTOs, Enums) between API and Web
│   └── config/            # Shared configurations
├── docs/                  # Project documentation
├── docker-compose.yml     # Local dev infrastructure (Postgres, etc)
└── package.json           # Root workspace config
```

## Guesty Integration & AI
- **Guesty**: Implemented as a separate Service module in the API, interacting with a generic Integration interface. Mocked in development.
- **AI RAG**: The API will have endpoints to handle RAG queries, utilizing a generic LLM service provider and pgvector for embeddings.
