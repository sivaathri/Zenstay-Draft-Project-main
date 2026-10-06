# ZENSTAY Visual Asset Documentation & Image Sources

This document retains licensing, attribution, and curation details for externally sourced visual assets utilized throughout the ZENSTAY ultra-premium web application.

---

## Licensing Standard
All photography assets utilized in the ZENSTAY production interface are curated from high-resolution, unwatermarked sources that permit free commercial and non-commercial use under the **Unsplash License** and **Creative Commons Zero (CC0)** standards. 

No copyrighted marketing materials from third-party enterprise corporations (such as Microsoft, Amazon, TCS, or Louis Vuitton) are utilized. All assets represent original curated hospitality and architectural photography.

---

## Curated Photography Registry

### 1. Landing Page & Hero
- **Hero Master Interior**: Luxury Parisian Haussmannian living room with chevron parquet and floor-to-ceiling French windows.
  - *Source URL*: `https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80`
  - *Attribution*: Spacejoy / Unsplash
  - *Module*: Landing Page Hero, Overview Spotlight

- **Luxury Coastal Villa Exterior**: Modern French Riviera / Breton coastal villa overlooking the sea.
  - *Source URL*: `https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=80`
  - *Attribution*: Ralph (Ravi) Kayden / Unsplash
  - *Module*: Landing Page Property Operations, Villa Les Embruns

- **Editorial Kitchen & Dining**: Architectural minimalist kitchen with Calacatta marble island and ambient evening lighting.
  - *Source URL*: `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80`
  - *Attribution*: R Architecture / Unsplash
  - *Module*: Property Gallery, Traveler Concierge

### 2. Properties Portfolio
- **Villa Les Embruns (Carnac)**:
  - *Exterior*: `https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80`
  - *Living Room*: `https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80`
  - *Master Suite*: `https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80`
  - *Bathroom*: `https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80`
  - *Terrace*: `https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80`

- **Maison Moriconi (La Trinité-sur-Mer)**:
  - *Exterior*: `https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80`
  - *Living Room*: `https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80`

- **Villa Guidel (Guidel-Plages)**:
  - *Exterior*: `https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80`
  - *Pool & Deck*: `https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80`

- **Appartement Kerjouanno (Arzon)**:
  - *Interior*: `https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80`

- **Maison de la Plage (Quiberon)**:
  - *Interior*: `https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80`

- **Villa Océane (Larmor-Plage)**:
  - *Interior*: `https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80`

### 3. Traveler & Digital Concierge Experiences
- **Private Sommelier & Gastronomy**:
  - *Source URL*: `https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=80`
- **Private Coastal Yacht Charter**:
  - *Source URL*: `https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1000&q=80`
- **Destination Coastline & Sunset**:
  - *Source URL*: `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80`

### 4. Housekeeping & Field Operations
- **Professional Hospitality Linen & Detailing**:
  - *Source URL*: `https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80`
- **Turnaround Inspection Ready Suite**:
  - *Source URL*: `https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80`

### 5. Maintenance & Contractor Work Orders
- **HVAC & Smart Home Infrastructure**:
  - *Source URL*: `https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80`
- **Architectural Fixtures & Plumbing**:
  - *Source URL*: `https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80`

### 6. Real Estate & Owner Portfolio
- **Contemporary European Architecture**:
  - *Source URL*: `https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1000&q=80`
  - *Source URL*: `https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80`

---

## Technical Specifications
- **Format**: Modern WebP/JPEG via progressive CDN query parameters.
- **Optimization**: Images are dimension-capped (`w=1200` to `w=1600` for desktop heroes, `w=600` for cards, `w=120` for thumbnails) and compressed at `q=80`.
- **Component**: Loaded via `<ZenImage />` with native `loading="lazy"`, blur placeholder skeleton, and offline fallback.
