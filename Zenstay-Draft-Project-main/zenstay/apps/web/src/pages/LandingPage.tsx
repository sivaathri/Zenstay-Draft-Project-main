import { useState } from 'react';
import { ZenImage } from '../components/ZenImage';

interface LandingPageProps {
  onExploreApp: () => void;
  onOpenLogin: () => void;
}

export function LandingPage({ onExploreApp, onOpenLogin }: LandingPageProps) {
  const [activeProductTab, setActiveProductTab] = useState<'control' | 'calendar' | 'housekeeping' | 'owner' | 'concierge' | 'ai'>('control');
  const [activeSolution, setActiveSolution] = useState<'managers' | 'owners' | 'travelers' | 'teams'>('managers');
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  const productScreens = {
    control: {
      title: 'Enterprise Control Center',
      tagline: 'Real-time visibility over all properties, guest arrivals, and field interventions.',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80',
      stats: [
        { label: 'Active Fleet', val: '350 units' },
        { label: 'Today Arrivals', val: '28 units' },
        { label: 'Turnaround Rate', val: '98.4%' },
        { label: 'Avg Clean Time', val: '84 mins' }
      ]
    },
    calendar: {
      title: 'Multi-Unit Reservation Matrix',
      tagline: 'Institutional PMS calendar with instantaneous Guesty webhook reconciliation.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
      stats: [
        { label: '30-Day Occupancy', val: '92.6%' },
        { label: 'RevPAR Index', val: '€248.50' },
        { label: 'ADR Average', val: '€315.00' },
        { label: 'Sync Latency', val: '<350ms' }
      ]
    },
    housekeeping: {
      title: 'Photo-Verified Housekeeping',
      tagline: 'Automated dispatch, geo-fenced time tracking, and before/after photo audits.',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80',
      stats: [
        { label: 'Checklist Pass', val: '99.2%' },
        { label: 'Audited Photos', val: '1,420/wk' },
        { label: 'Field Staff', val: '42 specialists' },
        { label: 'Ready SLA', val: '100% on-time' }
      ]
    },
    owner: {
      title: 'Owner Financial Clarity Portal',
      tagline: 'Institutional investor reporting with live gross margins, expenses, and automated payouts.',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80',
      stats: [
        { label: 'Disbursed YTD', val: '€3.84M' },
        { label: 'Net Owner Yield', val: '8.4%' },
        { label: 'Expense Ratio', val: '14.2%' },
        { label: 'Tax Statements', val: 'Automated' }
      ]
    },
    concierge: {
      title: 'VIP Guest Digital Concierge',
      tagline: 'Bespoke hospitality experience with smart lock PINs, Wi-Fi guides, and luxury service requests.',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1400&q=80',
      stats: [
        { label: 'Guest CSAT', val: '4.96 / 5.0' },
        { label: 'Concierge Upsell', val: '+€46/stay' },
        { label: 'Keyless Entry', val: '100% digital' },
        { label: 'Response Time', val: '90 secs' }
      ]
    },
    ai: {
      title: 'ZENSTAY AI Operational Assistant',
      tagline: 'RAG-powered conversational intelligence querying guest histories, maintenance logs, and schedules.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80',
      stats: [
        { label: 'RAG Precision', val: '99.4%' },
        { label: 'Triage Time', val: 'Instant' },
        { label: 'Queries Answered', val: '8.4K/mo' },
        { label: 'Actions Created', val: 'Automatic' }
      ]
    }
  };

  return (
    <div className="landing-root">
      {/* 1. ULTRA-PREMIUM NAVIGATION BAR */}
      <header className="landing-nav">
        <div className="landing-nav-inner">
          <div className="landing-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="landing-brandmark">
              <svg viewBox="0 0 48 48">
                <path d="M8 23 24 10l16 13v16H8z" fill="#081726" />
                <path d="M19 39V27h10v12" fill="#c59b4e" />
                <path d="M14 21V14h6" stroke="#c59b4e" strokeWidth="2.5" fill="none" />
              </svg>
            </div>
            <div>
              <span className="landing-brand-title">ZENSTAY</span>
              <span className="landing-brand-sub">LUXURY HOSPITALITY OS</span>
            </div>
          </div>

          <nav className="landing-links">
            <div
              className="landing-nav-item has-dropdown"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <button className="landing-nav-btn">
                Platform <span className="arrow">▾</span>
              </button>
              {megaMenuOpen && (
                <div className="mega-menu">
                  <div className="mega-col">
                    <span className="mega-heading">CORE OPERATIONS</span>
                    <a href="#product-showcase" onClick={() => { setActiveProductTab('control'); setMegaMenuOpen(false); }}>
                      <b>Control Center</b>
                      <small>Fleet-wide live telemetry & readiness</small>
                    </a>
                    <a href="#product-showcase" onClick={() => { setActiveProductTab('calendar'); setMegaMenuOpen(false); }}>
                      <b>Reservation Matrix</b>
                      <small>Multi-unit Gantt calendar & Guesty sync</small>
                    </a>
                    <a href="#product-showcase" onClick={() => { setActiveProductTab('housekeeping'); setMegaMenuOpen(false); }}>
                      <b>Housekeeping Dispatch</b>
                      <small>Photo audits & checklist verification</small>
                    </a>
                  </div>
                  <div className="mega-col">
                    <span className="mega-heading">FINANCE & STAKEHOLDERS</span>
                    <a href="#product-showcase" onClick={() => { setActiveProductTab('owner'); setMegaMenuOpen(false); }}>
                      <b>Owner Yield Portal</b>
                      <small>Transparent statements & automatic payouts</small>
                    </a>
                    <a href="#product-showcase" onClick={() => { setActiveProductTab('concierge'); setMegaMenuOpen(false); }}>
                      <b>Traveler Concierge</b>
                      <small>Keyless access & on-demand luxury services</small>
                    </a>
                    <a href="#product-showcase" onClick={() => { setActiveProductTab('ai'); setMegaMenuOpen(false); }}>
                      <b>ZENSTAY AI Engine</b>
                      <small>Operational intelligence & RAG triage</small>
                    </a>
                  </div>
                  <div className="mega-col mega-feature">
                    <div className="mega-feature-card">
                      <span className="badge-gold">ENTERPRISE</span>
                      <h4>High-Volume Portfolios</h4>
                      <p>Built for operators managing 25 to 500+ luxury European properties.</p>
                      <button className="btn-link" onClick={() => { setDemoModalOpen(true); setMegaMenuOpen(false); }}>
                        Request Architecture Brief →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a href="#solutions" className="landing-nav-link">Solutions</a>
            <a href="#operations" className="landing-nav-link">Operations</a>
            <a href="#ai-section" className="landing-nav-link">AI Intelligence</a>
            <a href="#enterprise" className="landing-nav-link">Enterprise Trust</a>
          </nav>

          <div className="landing-cta-group">
            <button className="landing-btn-ghost" onClick={onOpenLogin}>
              Client Sign In
            </button>
            <button className="landing-btn-gold" onClick={() => setDemoModalOpen(true)}>
              Book a Demo
            </button>
            <button className="landing-btn-primary" onClick={onExploreApp}>
              Explore Live Platform →
            </button>
          </div>
        </div>
      </header>

      {/* 2. ULTRA-PREMIUM EDITORIAL HERO */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              <span>ENTERPRISE PROPERTY OPERATIONS & CONCIERGE PLATFORM</span>
            </div>

            <h1 className="hero-title">
              Property Operations.<br />
              <span className="hero-title-accent">Beautifully Connected.</span>
            </h1>

            <p className="hero-description">
              One unified enterprise operating system connecting luxury European properties,
              VIP travelers, asset owners, and field operations in real time.
            </p>

            <div className="hero-actions">
              <button className="hero-btn-primary" onClick={onExploreApp}>
                <span>Explore Live Platform</span>
                <span className="btn-icon">→</span>
              </button>
              <button className="hero-btn-secondary" onClick={() => setDemoModalOpen(true)}>
                <span>Book a Private Demo</span>
              </button>
            </div>

            <div className="hero-trust-row">
              <div className="hero-trust-item">
                <span className="trust-number">1,800+</span>
                <span className="trust-label">Luxury Units Managed</span>
              </div>
              <div className="hero-trust-divider"></div>
              <div className="hero-trust-item">
                <span className="trust-number">€42M+</span>
                <span className="trust-label">Gross Bookings Processed</span>
              </div>
              <div className="hero-trust-divider"></div>
              <div className="hero-trust-item">
                <span className="trust-number">99.98%</span>
                <span className="trust-label">PMS Sync Availability</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <ZenImage
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80"
                alt="Haussmannian Luxury Apartment Interior"
                className="hero-main-image"
                aspectRatio="4/3"
                loading="eager"
              />
              <div className="hero-image-overlay"></div>

              {/* Floating Live Telemetry Cards */}
              <div className="hero-telemetry card-1">
                <div className="telemetry-icon green">●</div>
                <div>
                  <div className="telemetry-title">Guesty PMS Synchronized</div>
                  <div className="telemetry-subtitle">Villa Les Embruns • Unit #402</div>
                </div>
                <div className="telemetry-stat">320ms</div>
              </div>

              <div className="hero-telemetry card-2">
                <div className="telemetry-icon gold">★</div>
                <div>
                  <div className="telemetry-title">Turnaround Inspection Passed</div>
                  <div className="telemetry-subtitle">18/18 Checklist Items Verified</div>
                </div>
                <div className="telemetry-stat">100%</div>
              </div>

              <div className="hero-telemetry card-3">
                <div className="telemetry-title-sm">PORTFOLIO OCCUPANCY</div>
                <div className="telemetry-big-val">94.8%</div>
                <div className="telemetry-delta">+18.4% vs European Benchmark</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORPORATE TRUST BAR */}
      <section className="trust-bar">
        <div className="trust-bar-inner">
          <span className="trust-bar-caption">ENGINEERED FOR PREMIER EUROPEAN HOSPITALITY BRANDS & PROPERTY FUNDS</span>
          <div className="trust-badges">
            <div className="trust-badge">PARIS • CÔTE D'AZUR</div>
            <div className="trust-badge">LONDON MAYFAIR</div>
            <div className="trust-badge">ZERMATT & GENEVA</div>
            <div className="trust-badge">AMALFI & TUSCANY</div>
            <div className="trust-badge">BRITTANY EMERALD COAST</div>
          </div>
        </div>
      </section>

      {/* 4. PLATFORM PILLARS & PROPERTY OPERATIONS */}
      <section id="operations" className="pillars-section">
        <div className="section-head">
          <span className="section-eyebrow">THE OPERATING FORMULA</span>
          <h2 className="section-title">Everything required to orchestrate world-class stays.</h2>
          <p className="section-subtitle">
            Say goodbye to fragmented point solutions. ZENSTAY replaces disparate PMS plugins,
            messaging apps, and paper clipboards with a single high-performance engine.
          </p>
        </div>

        <div className="pillars-grid">
          <div className="pillar-card">
            <div className="pillar-num">01</div>
            <div className="pillar-icon">
              <svg viewBox="0 0 24 24" className="icon"><use href="#i-grid" /></svg>
            </div>
            <h3>Autonomous Operations</h3>
            <p>
              Automated housekeeper dispatch tied to real-time checkout signals, flight trackers,
              and smart door lock triggers.
            </p>
            <ul className="pillar-list">
              <li>Instant Guesty/Beds24 webhook intake</li>
              <li>Geo-fenced mobile technician check-in</li>
              <li>Dynamic cleaning buffer optimization</li>
            </ul>
          </div>

          <div className="pillar-card">
            <div className="pillar-num">02</div>
            <div className="pillar-icon">
              <svg viewBox="0 0 24 24" className="icon"><use href="#i-cal" /></svg>
            </div>
            <h3>Reservation Matrix</h3>
            <p>
              Institutional multi-unit calendar view giving revenue managers comprehensive control
              over rates, minimum stays, and gap nights.
            </p>
            <ul className="pillar-list">
              <li>Direct Channel PMS two-way sync</li>
              <li>Real-time booking drawer with guest dossier</li>
              <li>Automated payment capture & deposit holds</li>
            </ul>
          </div>

          <div className="pillar-card">
            <div className="pillar-num">03</div>
            <div className="pillar-icon">
              <svg viewBox="0 0 24 24" className="icon"><use href="#i-users" /></svg>
            </div>
            <h3>Digital Concierge</h3>
            <p>
              A five-star branded digital guest experience for luxury travelers. Keyless entry,
              high-speed WiFi, local guides, and yacht charters.
            </p>
            <ul className="pillar-list">
              <li>Nuki & Yale smart lock PIN issuance</li>
              <li>On-demand sommelier & private chef booking</li>
              <li>24/7 AI-assisted concierge messaging</li>
            </ul>
          </div>

          <div className="pillar-card">
            <div className="pillar-num">04</div>
            <div className="pillar-icon">
              <svg viewBox="0 0 24 24" className="icon"><use href="#i-money" /></svg>
            </div>
            <h3>Institutional Owner Yield</h3>
            <p>
              Complete transparency for high-net-worth property owners. Monthly tax-compliant
              PDF distribution statements and live yield trackers.
            </p>
            <ul className="pillar-list">
              <li>Itemized maintenance receipts & approvals</li>
              <li>Automated Stripe split payouts</li>
              <li>Year-end tax & depreciation export</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE PRODUCT EXPERIENCE (REAL ZENSTAY UI) */}
      <section id="product-showcase" className="showcase-section">
        <div className="section-head">
          <span className="section-eyebrow">THE PRODUCT EXPERIENCE</span>
          <h2 className="section-title">Built like institutional SaaS. Designed like luxury editorial.</h2>
          <p className="section-subtitle">
            Experience the real interfaces that power thousands of luxury European hospitality nights.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="showcase-tabs">
          <button
            className={`showcase-tab ${activeProductTab === 'control' ? 'active' : ''}`}
            onClick={() => setActiveProductTab('control')}
          >
            Control Center
          </button>
          <button
            className={`showcase-tab ${activeProductTab === 'calendar' ? 'active' : ''}`}
            onClick={() => setActiveProductTab('calendar')}
          >
            Reservation Matrix
          </button>
          <button
            className={`showcase-tab ${activeProductTab === 'housekeeping' ? 'active' : ''}`}
            onClick={() => setActiveProductTab('housekeeping')}
          >
            Photo Housekeeping
          </button>
          <button
            className={`showcase-tab ${activeProductTab === 'owner' ? 'active' : ''}`}
            onClick={() => setActiveProductTab('owner')}
          >
            Owner Portal
          </button>
          <button
            className={`showcase-tab ${activeProductTab === 'concierge' ? 'active' : ''}`}
            onClick={() => setActiveProductTab('concierge')}
          >
            Traveler Concierge
          </button>
          <button
            className={`showcase-tab ${activeProductTab === 'ai' ? 'active' : ''}`}
            onClick={() => setActiveProductTab('ai')}
          >
            ZENSTAY AI
          </button>
        </div>

        {/* Browser Mockup Device */}
        <div className="browser-device">
          <div className="browser-chrome">
            <div className="browser-dots">
              <span className="dot-red"></span>
              <span className="dot-yellow"></span>
              <span className="dot-green"></span>
            </div>
            <div className="browser-url-bar">
              <span className="lock-icon">🔒</span>
              <span>https://app.zenstay.eu/{activeProductTab}</span>
            </div>
            <div className="browser-actions">
              <button className="badge-live">● LIVE DEMO</button>
            </div>
          </div>

          <div className="browser-body">
            <div className="showcase-split">
              <div className="showcase-info">
                <span className="badge-gold">ENTERPRISE MODULE</span>
                <h3>{productScreens[activeProductTab].title}</h3>
                <p>{productScreens[activeProductTab].tagline}</p>

                <div className="showcase-stats-grid">
                  {productScreens[activeProductTab].stats.map((s, idx) => (
                    <div key={idx} className="showcase-stat-box">
                      <b>{s.val}</b>
                      <span>{s.label}</span>
                    </div>
                  ))}
                </div>

                <div className="showcase-cta">
                  <button className="landing-btn-primary" onClick={onExploreApp}>
                    Open in Workspace →
                  </button>
                  <button className="landing-btn-ghost" onClick={() => setDemoModalOpen(true)}>
                    Schedule Walkthrough
                  </button>
                </div>
              </div>

              <div className="showcase-visual">
                <ZenImage
                  src={productScreens[activeProductTab].image}
                  alt={productScreens[activeProductTab].title}
                  className="showcase-hero-img"
                  aspectRatio="16/10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ROLE-BASED SOLUTIONS */}
      <section id="solutions" className="solutions-section">
        <div className="section-head">
          <span className="section-eyebrow">TAILORED SOLUTIONS</span>
          <h2 className="section-title">One platform. Every stakeholder aligned.</h2>
        </div>

        <div className="solution-switcher">
          <button
            className={`sol-btn ${activeSolution === 'managers' ? 'active' : ''}`}
            onClick={() => setActiveSolution('managers')}
          >
            Property Managers
          </button>
          <button
            className={`sol-btn ${activeSolution === 'owners' ? 'active' : ''}`}
            onClick={() => setActiveSolution('owners')}
          >
            Property Owners
          </button>
          <button
            className={`sol-btn ${activeSolution === 'travelers' ? 'active' : ''}`}
            onClick={() => setActiveSolution('travelers')}
          >
            VIP Travelers
          </button>
          <button
            className={`sol-btn ${activeSolution === 'teams' ? 'active' : ''}`}
            onClick={() => setActiveSolution('teams')}
          >
            Field Teams & Crews
          </button>
        </div>

        <div className="solution-card">
          {activeSolution === 'managers' && (
            <div className="solution-layout">
              <div className="solution-text">
                <span className="badge-navy">OPERATIONS SUITE</span>
                <h3>Command large portfolios with effortless elegance.</h3>
                <p>
                  Manage 50 to 500+ premium residences with real-time PMS synchronization, automated task assignments,
                  contractor escalation, and high-velocity financial reconciliation.
                </p>
                <ul className="sol-points">
                  <li><strong>Centralized Dispatch:</strong> Intelligent route scheduling reduces transit time between properties by up to 34%.</li>
                  <li><strong>Automated Invoicing:</strong> Generate client invoices and contractor payment batches in one click.</li>
                  <li><strong>Audit-Proof Quality:</strong> Photographic evidence before check-in protects against fraudulent chargebacks.</li>
                </ul>
                <button className="hero-btn-primary" onClick={onExploreApp}>
                  View Operations Center →
                </button>
              </div>
              <div className="solution-media">
                <ZenImage
                  src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80"
                  alt="Luxury Coastal Villa"
                  aspectRatio="4/3"
                />
              </div>
            </div>
          )}

          {activeSolution === 'owners' && (
            <div className="solution-layout">
              <div className="solution-text">
                <span className="badge-navy">INVESTOR INTEGRITY</span>
                <h3>Total financial transparency for discerning owners.</h3>
                <p>
                  High-net-worth individuals and family offices trust ZENSTAY for real-time portfolio performance,
                  itemized maintenance receipts, and automated dividend distribution.
                </p>
                <ul className="sol-points">
                  <li><strong>Real-Time Yield:</strong> Live RevPAR, ADR, and occupancy dashboards updated every 15 minutes.</li>
                  <li><strong>Maintenance Approvals:</strong> Instant push notifications for works exceeding owner-set thresholds.</li>
                  <li><strong>Tax Documentation:</strong> Automated French, UK, and Swiss tax reporting packages.</li>
                </ul>
                <button className="hero-btn-primary" onClick={onExploreApp}>
                  Explore Owner Portal →
                </button>
              </div>
              <div className="solution-media">
                <ZenImage
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
                  alt="Historic Luxury Villa Estate"
                  aspectRatio="4/3"
                />
              </div>
            </div>
          )}

          {activeSolution === 'travelers' && (
            <div className="solution-layout">
              <div className="solution-text">
                <span className="badge-navy">GUEST CONCIERGE</span>
                <h3>A bespoke digital companion for every guest journey.</h3>
                <p>
                  Elevate the stay from arrival to departure. Keyless access, curated local recommendations, private chef
                  bookings, and 24/7 multilingual messaging.
                </p>
                <ul className="sol-points">
                  <li><strong>Instant Keyless Entry:</strong> Time-restricted door access codes generated directly on the phone.</li>
                  <li><strong>Seamless Services:</strong> Request champagne on arrival, mid-stay linen refreshes, or luxury airport transfers.</li>
                  <li><strong>High-Speed WiFi:</strong> One-tap QR code connectivity without cumbersome paper manuals.</li>
                </ul>
                <button className="hero-btn-primary" onClick={onExploreApp}>
                  View Guest Concierge →
                </button>
              </div>
              <div className="solution-media">
                <ZenImage
                  src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80"
                  alt="Sommelier & Fine Dining"
                  aspectRatio="4/3"
                />
              </div>
            </div>
          )}

          {activeSolution === 'teams' && (
            <div className="solution-layout">
              <div className="solution-text">
                <span className="badge-navy">FIELD PRODUCTIVITY</span>
                <h3>Empowering housekeepers and maintenance specialists.</h3>
                <p>
                  Clean, fast mobile interface designed for one-handed operation. Step-by-step room checklists, photo
                  upload, issue reporting, and route navigation.
                </p>
                <ul className="sol-points">
                  <li><strong>Photo-Verified Tasks:</strong> Capture linen, bathroom, and kitchen photos with instant supervisor sign-off.</li>
                  <li><strong>Instant Issue Reporting:</strong> Flag broken fixtures or missing amenities with immediate contractor dispatch.</li>
                  <li><strong>Earnings Clarity:</strong> Housekeepers see completed jobs and calculated revenue in real time.</li>
                </ul>
                <button className="hero-btn-primary" onClick={onExploreApp}>
                  View Field App →
                </button>
              </div>
              <div className="solution-media">
                <ZenImage
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
                  alt="Luxury Housekeeping Detailing"
                  aspectRatio="4/3"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 7. ZENSTAY AI SECTION */}
      <section id="ai-section" className="ai-highlight-section">
        <div className="ai-highlight-inner">
          <div className="ai-highlight-content">
            <span className="badge-gold">ZENSTAY AI ENGINE</span>
            <h2 className="ai-highlight-title">Operational Intelligence.<br />Zero Hallucinations.</h2>
            <p className="ai-highlight-sub">
              Unlike generic chat assistants, ZENSTAY AI utilizes Retrieval-Augmented Generation (RAG) linked directly
              to your live Guesty PMS webhooks, maintenance invoices, and housekeeping checklists.
            </p>

            <div className="ai-query-examples">
              <div className="ai-chip">"Summarize today's arrivals across Carnac & Quiberon"</div>
              <div className="ai-chip">"Which villas have pending maintenance approvals over €100?"</div>
              <div className="ai-chip">"Identify delayed turnarounds before 15:00 check-in"</div>
            </div>

            <div className="ai-feature-checklist">
              <div className="ai-check-item">
                <span className="check-icon">✓</span>
                <span>Contextual citations back to specific PMS reservations and invoice IDs</span>
              </div>
              <div className="ai-check-item">
                <span className="check-icon">✓</span>
                <span>Automated operational suggestions with one-click dispatch triggers</span>
              </div>
              <div className="ai-check-item">
                <span className="check-icon">✓</span>
                <span>Role-isolated security ensuring staff only see data within their RBAC permissions</span>
              </div>
            </div>

            <button className="hero-btn-primary" onClick={onExploreApp}>
              Test AI Intelligence →
            </button>
          </div>

          <div className="ai-highlight-card">
            <div className="ai-card-header">
              <div className="ai-brand-badge">
                <span className="ai-dot"></span>
                <b>ZENSTAY AI ASSISTANT</b>
              </div>
              <span className="ai-live-tag">CONNECTED TO HOMELOK DB</span>
            </div>

            <div className="ai-card-body">
              <div className="ai-msg user">
                "Which properties need immediate operational attention before 15:00?"
              </div>
              <div className="ai-msg assistant">
                <p>
                  Based on live PMS telemetry, <strong>Villa Guidel</strong> requires immediate intervention:
                </p>
                <div className="ai-alert-box">
                  <b>⚠️ Villa Guidel (Guidel-Plages)</b>
                  <p>Check-out was delayed by 45 mins. Turnaround checklist is at 4/22. Guest arrival scheduled for 17:30.</p>
                  <small>Recommendation: Dispatch secondary housekeeper Sophie M. from Carnac sector.</small>
                </div>
                <div className="ai-citations-row">
                  <span className="citation-pill">Source: Guesty Stay #G-8821</span>
                  <span className="citation-pill">Checklist #HK-409</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. ENTERPRISE SECURITY & ECOSYSTEM */}
      <section id="enterprise" className="enterprise-section">
        <div className="section-head">
          <span className="section-eyebrow">SECURITY & CONNECTIVITY</span>
          <h2 className="section-title">Engineered to integrate seamlessly with your existing tech stack.</h2>
        </div>

        <div className="integrations-grid">
          <div className="int-card">
            <div className="int-logo">GUESTY</div>
            <h4>Guesty Certified</h4>
            <p>Sub-second webhook updates for reservations, listings, rates, and guest messaging.</p>
          </div>
          <div className="int-card">
            <div className="int-logo">STRIPE</div>
            <h4>Stripe Connect</h4>
            <p>Automated payment intent capture, damage deposit holds, and instant housekeeper payouts.</p>
          </div>
          <div className="int-card">
            <div className="int-logo">YOUSIGN</div>
            <h4>YouSign eIDAS</h4>
            <p>Legally binding electronic lease agreements and owner management contracts.</p>
          </div>
          <div className="int-card">
            <div className="int-logo">NUKI / YALE</div>
            <h4>Smart Lock API</h4>
            <p>Automatic PIN rotation generated 2 hours before check-in and expired at checkout.</p>
          </div>
        </div>

        <div className="security-banner">
          <div className="sec-item">
            <b>GDPR Compliant</b>
            <span>European data sovereignty hosted in Frankfurt & Paris</span>
          </div>
          <div className="sec-divider"></div>
          <div className="sec-item">
            <b>Tenant Isolation</b>
            <span>PostgreSQL row-level isolation & scoped JWT claims</span>
          </div>
          <div className="sec-divider"></div>
          <div className="sec-item">
            <b>99.98% Uptime SLA</b>
            <span>High-availability clustered API with automated failover</span>
          </div>
        </div>
      </section>

      {/* 9. VIP CALL TO ACTION */}
      <section className="cta-section">
        <div className="cta-container">
          <span className="cta-eyebrow">READY TO ELEVATE YOUR OPERATIONS?</span>
          <h2 className="cta-title">Join Europe's leading luxury property operators.</h2>
          <p className="cta-subtitle">
            Experience the platform that delivers flawless guest experiences, happy owners, and seamless field operations.
          </p>
          <div className="cta-buttons">
            <button className="landing-btn-gold lg" onClick={() => setDemoModalOpen(true)}>
              Schedule a Private Demo
            </button>
            <button className="landing-btn-ghost lg" onClick={onExploreApp}>
              Enter Live Environment →
            </button>
          </div>
        </div>
      </section>

      {/* 10. LUXURY EDITORIAL FOOTER */}
      <footer className="landing-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="landing-brand">
              <div className="landing-brandmark">
                <svg viewBox="0 0 48 48">
                  <path d="M8 23 24 10l16 13v16H8z" fill="#fff" />
                  <path d="M19 39V27h10v12" fill="#c59b4e" />
                </svg>
              </div>
              <div>
                <span className="landing-brand-title" style={{ color: '#fff' }}>ZENSTAY</span>
                <span className="landing-brand-sub">LUXURY HOSPITALITY OS</span>
              </div>
            </div>
            <p className="footer-desc">
              The unified enterprise platform connecting luxury European properties,
              VIP travelers, asset owners, and field operations.
            </p>
          </div>

          <div className="footer-cols">
            <div className="footer-col">
              <h5>PLATFORM</h5>
              <a href="#product-showcase" onClick={onExploreApp}>Control Center</a>
              <a href="#product-showcase" onClick={onExploreApp}>Reservation Calendar</a>
              <a href="#product-showcase" onClick={onExploreApp}>Housekeeping Engine</a>
              <a href="#product-showcase" onClick={onExploreApp}>Owner Yield Portal</a>
              <a href="#product-showcase" onClick={onExploreApp}>Traveler Concierge</a>
              <a href="#ai-section" onClick={onExploreApp}>ZENSTAY AI</a>
            </div>

            <div className="footer-col">
              <h5>SOLUTIONS</h5>
              <a href="#solutions">Property Managers</a>
              <a href="#solutions">Property Owners</a>
              <a href="#solutions">VIP Travelers</a>
              <a href="#solutions">Field Teams</a>
              <a href="#enterprise">Enterprise Security</a>
            </div>

            <div className="footer-col">
              <h5>INTEGRATIONS</h5>
              <a href="#enterprise">Guesty PMS</a>
              <a href="#enterprise">Beds24 Engine</a>
              <a href="#enterprise">Stripe Payments</a>
              <a href="#enterprise">YouSign eIDAS</a>
              <a href="#enterprise">Nuki Smart Locks</a>
            </div>

            <div className="footer-col">
              <h5>COMPANY</h5>
              <a href="#about" onClick={() => setDemoModalOpen(true)}>About ZENSTAY</a>
              <a href="#careers">Careers</a>
              <a href="#privacy">Privacy & GDPR</a>
              <a href="#terms">Terms of Service</a>
              <a href="#contact" onClick={() => setDemoModalOpen(true)}>Contact Corporate</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 ZENSTAY International SAS. All rights reserved. Enterprise Property Operations.</p>
          <div className="footer-bottom-links">
            <span>Server Status: Operational (99.98%)</span>
            <span>Region: EU-West (Frankfurt / Paris)</span>
          </div>
        </div>
      </footer>

      {/* DEMO MODAL */}
      {demoModalOpen && (
        <div className="modal-backdrop" onClick={() => setDemoModalOpen(false)}>
          <div className="demo-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Schedule a ZENSTAY Enterprise Walkthrough</h3>
              <button className="close-btn" onClick={() => setDemoModalOpen(false)}>✕</button>
            </div>
            {demoSubmitted ? (
              <div className="demo-success">
                <div className="success-badge">✓</div>
                <h4>Thank you for your interest.</h4>
                <p>Our European deployment director will contact you within 2 business hours with access credentials.</p>
                <button className="landing-btn-primary" onClick={onExploreApp}>
                  Explore Demo Workspace Directly →
                </button>
              </div>
            ) : (
              <form
                className="demo-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setDemoSubmitted(true);
                }}
              >
                <p>See how ZENSTAY unifies operations for your portfolio.</p>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="e.g. Laurent de Montmirail" required defaultValue="Laurent de Montmirail" />
                </div>
                <div className="form-group">
                  <label>Corporate Email</label>
                  <input type="email" placeholder="laurent@luxuryestates.eu" required defaultValue="laurent@luxuryestates.eu" />
                </div>
                <div className="form-group">
                  <label>Portfolio Size</label>
                  <select defaultValue="25-100">
                    <option value="10-25">10 - 25 Luxury Units</option>
                    <option value="25-100">25 - 100 Luxury Units</option>
                    <option value="100+">100+ Commercial / Villa Units</option>
                  </select>
                </div>
                <div className="form-actions">
                  <button type="submit" className="landing-btn-gold">Request Personalized Demo</button>
                  <button type="button" className="landing-btn-ghost" onClick={() => { setDemoModalOpen(false); onExploreApp(); }}>
                    Test Demo Online Immediately
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
