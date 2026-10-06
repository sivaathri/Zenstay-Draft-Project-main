import { useState } from 'react';

export function Settings() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'general' | 'integrations' | 'operations' | 'finance' | 'security'>('general');

  // Interactive toggle states
  const [whatsappArrival, setWhatsappArrival] = useState(true);
  const [aiTranslations, setAiTranslations] = useState(true);
  const [turnaroundPush, setTurnaroundPush] = useState(true);
  const [autoEarlyCheckin, setAutoEarlyCheckin] = useState(false);
  const [photoMandatory, setPhotoMandatory] = useState(true);
  const [anomalyEscalation, setAnomalyEscalation] = useState(true);
  const [turnaroundBuffer, setTurnaroundBuffer] = useState('60');
  const [stripeLive, setStripeLive] = useState(true);
  const [sepaAutoBatch, setSepaAutoBatch] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [guestyWebhookSecretRevealed, setGuestyWebhookSecretRevealed] = useState(false);

  // Form values
  const [companyName, setCompanyName] = useState('ZENSTAY LUXURY HOSPITALITY SAS');
  const [subdomain, setSubdomain] = useState('concierge.zenstay.luxury');
  const [currency, setCurrency] = useState('EUR');
  const [timezone, setTimezone] = useState('Europe/Paris');
  const [conciergeEmail, setConciergeEmail] = useState('concierge@zenstay.luxury • +33 2 97 50 12 34 (24/7 Desk)');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  return (
    <div className="settings-page-root">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="ops-toast">
          <svg className="icon" style={{ stroke: 'var(--gold)' }}><use href="#i-check" /></svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="pagehead">
        <div>
          <span className="section-eyebrow">ENTERPRISE SYSTEM CONFIGURATION</span>
          <h2>Platform Settings & Integrations</h2>
          <p>
            Portfolio tenant identity, Guesty PMS webhooks, Stripe Connect payout rails, Nuki smart lock automation, and quality SLAs.
          </p>
        </div>
        <div className="actions">
          <button
            className="btn"
            onClick={() => showToast('Diagnostics check completed: All 5 external APIs reporting 100% SLA health (42ms avg ping)')}
          >
            ⚡ Run Health Diagnostic
          </button>
          <button
            className="btn primary"
            onClick={() => showToast('Configuration saved successfully across 350 European residences!')}
          >
            💾 Save Changes
          </button>
        </div>
      </div>

      {/* Modern Segmented Tab Ribbon */}
      <div className="settings-nav-tabs">
        <button
          className={`settings-tab-btn ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          🏢 Tenant & Brand Identity
        </button>
        <button
          className={`settings-tab-btn ${activeTab === 'integrations' ? 'active' : ''}`}
          onClick={() => setActiveTab('integrations')}
        >
          🔌 Connected Ecosystem (PMS & IoT)
        </button>
        <button
          className={`settings-tab-btn ${activeTab === 'operations' ? 'active' : ''}`}
          onClick={() => setActiveTab('operations')}
        >
          🧹 Operational Quality SLAs
        </button>
        <button
          className={`settings-tab-btn ${activeTab === 'finance' ? 'active' : ''}`}
          onClick={() => setActiveTab('finance')}
        >
          💶 Financial & SEPA Treasury
        </button>
        <button
          className={`settings-tab-btn ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          🛡️ Security & Role Governance
        </button>
      </div>

      {/* ============================================================
          TAB 1: TENANT & BRAND IDENTITY
          ============================================================ */}
      {activeTab === 'general' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Top 2-Column Grid */}
          <div className="settings-grid-2col">
            {/* Card 1: Legal Entity & Persona */}
            <div className="card settings-card">
              <div className="cardhead">
                <div>
                  <h3 style={{ fontSize: 16 }}>Brand Identity & Hospitality Persona</h3>
                  <small>Public domain, legal entity, and operating currency</small>
                </div>
                <span className="badge-gold">Enterprise Tier</span>
              </div>

              <div className="settings-form-grid">
                <div className="settings-field">
                  <label>Company Legal Entity</label>
                  <input
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    placeholder="e.g. ZENSTAY LUXURY HOSPITALITY SAS"
                  />
                  <small>Appears on official French invoices & owner reports</small>
                </div>

                <div className="settings-field">
                  <label>Tenant Custom Domain / URL</label>
                  <input
                    value={subdomain}
                    onChange={e => setSubdomain(e.target.value)}
                    placeholder="concierge.zenstay.luxury"
                  />
                  <small>Verified TLS 1.3 Certificate • Wildcard active</small>
                </div>

                <div className="settings-field">
                  <label>Primary Accounting Currency</label>
                  <select value={currency} onChange={e => setCurrency(e.target.value)}>
                    <option value="EUR">Euro (€ - EUR) [Primary Operating Currency]</option>
                    <option value="CHF">Swiss Franc (CHF) [Geneva / Alpine Estates]</option>
                    <option value="GBP">British Pound (£ - GBP) [London Office]</option>
                    <option value="USD">US Dollar ($ - USD) [International Folios]</option>
                  </select>
                  <small>Base currency for all SEPA and Guesty payouts</small>
                </div>

                <div className="settings-field">
                  <label>Headquarters Timezone</label>
                  <select value={timezone} onChange={e => setTimezone(e.target.value)}>
                    <option value="Europe/Paris">Europe/Paris (CET / UTC+1) [HQ]</option>
                    <option value="Europe/London">Europe/London (GMT / UTC+0)</option>
                    <option value="Europe/Zurich">Europe/Zurich (CET / UTC+1)</option>
                  </select>
                  <small>Synchronizes check-in deadlines & automated SMS dispatch</small>
                </div>

                <div className="settings-field" style={{ gridColumn: 'span 2' }}>
                  <label>VIP Guest Concierge Contact Hotline</label>
                  <input
                    value={conciergeEmail}
                    onChange={e => setConciergeEmail(e.target.value)}
                    placeholder="concierge@zenstay.luxury • +33 2 97 50 12 34"
                  />
                  <small>Dispatched automatically on digital keys and reservation confirmation dossiers</small>
                </div>
              </div>
            </div>

            {/* Card 2: Hospitality Brand Standards */}
            <div className="card settings-card">
              <div className="cardhead">
                <div>
                  <h3 style={{ fontSize: 16 }}>VIP Guest Hospitality Standards</h3>
                  <small>Linen specification & signature welcome amenities</small>
                </div>
                <span className="badge-navy">5-Star Standards</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: 'var(--card2)', borderRadius: 10 }}>
                  <div>
                    <b style={{ fontSize: 13, display: 'block', color: 'var(--text)' }}>🛏️ Bed Linen Standard</b>
                    <small style={{ color: 'var(--muted)' }}>400TC Egyptian Percale Cotton (White Sateen Striped)</small>
                  </div>
                  <span className="status ok">Enforced</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: 'var(--card2)', borderRadius: 10 }}>
                  <div>
                    <b style={{ fontSize: 13, display: 'block', color: 'var(--text)' }}>🛁 Bath & Spa Towel Density</b>
                    <small style={{ color: 'var(--muted)' }}>650 GSM Combed Ring-Spun Terry with Gold Monogram</small>
                  </div>
                  <span className="status ok">Enforced</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: 'var(--card2)', borderRadius: 10 }}>
                  <div>
                    <b style={{ fontSize: 13, display: 'block', color: 'var(--text)' }}>🌿 Signature Toiletries Package</b>
                    <small style={{ color: 'var(--muted)' }}>L'Occitane en Provence Verveine & Shea Butter Eco-Dispensers</small>
                  </div>
                  <span className="status ok">Active</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: 'var(--card2)', borderRadius: 10 }}>
                  <div>
                    <b style={{ fontSize: 13, display: 'block', color: 'var(--text)' }}>🍾 Curated Welcome Hamper</b>
                    <small style={{ color: 'var(--muted)' }}>Breton Artisanal Biscuits, Salted Butter Caramels & Organic Cider</small>
                  </div>
                  <span className="status ok">Complimentary</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: 'var(--card2)', borderRadius: 10 }}>
                  <div>
                    <b style={{ fontSize: 13, display: 'block', color: 'var(--text)' }}>🍷 Sommelier Grand Cru Cellar</b>
                    <small style={{ color: 'var(--muted)' }}>3 Temperature-controlled Grand Cru bottles stocked for VIP direct stays</small>
                  </div>
                  <span className="status info">VIP Direct</span>
                </div>
              </div>
            </div>
          </div>

          {/* Full-Width Card: Automated Guest Communications */}
          <div className="card settings-card">
            <div className="cardhead">
              <div>
                <h3 style={{ fontSize: 16 }}>Automated Guest Communications & Touchpoints</h3>
                <small>Multi-channel messaging triggers, translations, and field notifications</small>
              </div>
              <span className="status ok">4 Active Triggers</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginTop: 14 }}>
              {/* Toggle 1: WhatsApp Arrival */}
              <div className="toggle-switch-wrap">
                <div className="toggle-switch-info">
                  <b>Automated Guest Arrival WhatsApp & SMS</b>
                  <p>Dispatches directions and Nuki 6-digit keycode 2 hours before 16:00 arrival.</p>
                </div>
                <button
                  type="button"
                  className={`luxury-switch ${whatsappArrival ? 'on' : ''}`}
                  onClick={() => {
                    setWhatsappArrival(!whatsappArrival);
                    showToast(whatsappArrival ? 'Guest arrival SMS paused' : 'Guest arrival SMS activated');
                  }}
                >
                  <span className="luxury-switch-thumb"></span>
                </button>
              </div>

              {/* Toggle 2: Multilingual Translations */}
              <div className="toggle-switch-wrap">
                <div className="toggle-switch-info">
                  <b>Multilingual AI Concierge Auto-Translation</b>
                  <p>Translates incoming inquiries across French, English, German, and Italian in real time.</p>
                </div>
                <button
                  type="button"
                  className={`luxury-switch ${aiTranslations ? 'on' : ''}`}
                  onClick={() => {
                    setAiTranslations(!aiTranslations);
                    showToast(aiTranslations ? 'AI translation paused' : 'AI multilingual translation active');
                  }}
                >
                  <span className="luxury-switch-thumb"></span>
                </button>
              </div>

              {/* Toggle 3: Turnaround Push Alerts */}
              <div className="toggle-switch-wrap">
                <div className="toggle-switch-info">
                  <b>Real-Time Turnaround Push Alerts</b>
                  <p>Sends instant mobile alert to assigned specialist the second a guest departs.</p>
                </div>
                <button
                  type="button"
                  className={`luxury-switch ${turnaroundPush ? 'on' : ''}`}
                  onClick={() => {
                    setTurnaroundPush(!turnaroundPush);
                    showToast(turnaroundPush ? 'Turnaround push alerts muted' : 'Turnaround push alerts enabled');
                  }}
                >
                  <span className="luxury-switch-thumb"></span>
                </button>
              </div>

              {/* Toggle 4: Early Check-in Approvals */}
              <div className="toggle-switch-wrap">
                <div className="toggle-switch-info">
                  <b>Autonomous Early Check-in Approval</b>
                  <p>Auto-approve 14:00 check-in if unit photo audit is 100% approved by 13:00.</p>
                </div>
                <button
                  type="button"
                  className={`luxury-switch ${autoEarlyCheckin ? 'on' : ''}`}
                  onClick={() => {
                    setAutoEarlyCheckin(!autoEarlyCheckin);
                    showToast(autoEarlyCheckin ? 'Early check-in auto-approval disabled' : 'Early check-in auto-approval enabled');
                  }}
                >
                  <span className="luxury-switch-thumb"></span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Enterprise Summary Strip */}
          <div className="settings-summary-strip">
            <div className="settings-summary-item">
              <span className="ops-kpi-icon blue">🏢</span>
              <div>
                <b>350 Residences Active</b>
                <span>Full Portfolio Connected</span>
              </div>
            </div>
            <div className="settings-summary-item">
              <span className="ops-kpi-icon green">⚡</span>
              <div>
                <b>Guesty PMS Synced</b>
                <span>Webhook latency 42ms</span>
              </div>
            </div>
            <div className="settings-summary-item">
              <span className="ops-kpi-icon purple">🛡️</span>
              <div>
                <b>100% URSSAF Verified</b>
                <span>All 48 Contractors Insured</span>
              </div>
            </div>
            <div className="settings-summary-item">
              <span className="ops-kpi-icon gold">🥂</span>
              <div>
                <b>24/7 Priority Concierge</b>
                <span>Average response 2m 14s</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          TAB 2: CONNECTED ECOSYSTEM (PMS & IOT)
          ============================================================ */}
      {activeTab === 'integrations' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="settings-grid-2col">
            {/* Guesty PMS API */}
            <div className="card settings-card">
              <div className="cardhead">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="iconbox blue" style={{ width: 44, height: 44, borderRadius: 12 }}>
                    <svg className="icon" style={{ width: 22, height: 22 }}><use href="#i-sync" /></svg>
                  </div>
                  <div>
                    <h3 style={{ fontSize: 16 }}>Guesty Enterprise PMS API</h3>
                    <small>Version: v2.1 • Bi-directional Channel Sync</small>
                  </div>
                </div>
                <span className="status ok">🟢 42ms Live</span>
              </div>

              <p style={{ fontSize: 12.5, color: 'var(--muted)', margin: '10px 0 14px', lineHeight: 1.5 }}>
                Syncs all 350 properties, reservation calendars, Airbnb / Booking.com / Direct stays, guest phone numbers, and financial cleaning fee allocations.
              </p>

              <div className="integration-secret-row">
                <span>Webhook Secret:</span>
                <b>{guestyWebhookSecretRevealed ? 'whsec_9941a8fe902341ba920' : 'whsec_••••••••••••••••••••'}</b>
                <button
                  type="button"
                  style={{ border: 0, background: 'transparent', color: 'var(--blue)', cursor: 'pointer', fontSize: 11, fontWeight: 700 }}
                  onClick={() => setGuestyWebhookSecretRevealed(!guestyWebhookSecretRevealed)}
                >
                  {guestyWebhookSecretRevealed ? 'Hide' : 'Reveal'}
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 18, paddingTop: 14, borderTop: '1px solid var(--line-light)' }}>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>Last webhook received: 34 seconds ago</span>
                <button className="btn primary" onClick={() => showToast('Forced full Guesty portfolio resynchronization (350 units)')}>
                  ⚡ Force Full Resync
                </button>
              </div>
            </div>

            {/* Nuki Smart Locks Bridge */}
            <div className="card settings-card">
              <div className="cardhead">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="iconbox green" style={{ width: 44, height: 44, borderRadius: 12 }}>
                    <svg className="icon" style={{ width: 22, height: 22 }}><use href="#i-house" /></svg>
                  </div>
                  <div>
                    <h3 style={{ fontSize: 16 }}>Nuki Smart Lock IoT Bridge</h3>
                    <small>Version: v2.4 • 385 Digital Locks Online</small>
                  </div>
                </div>
                <span className="status ok">🟢 All Online</span>
              </div>

              <p style={{ fontSize: 12.5, color: 'var(--muted)', margin: '10px 0 14px', lineHeight: 1.5 }}>
                Autonomous keyless entry system. Automatically generates a unique 6-digit PIN code for every guest, valid strictly from 16:00 arrival until 10:00 departure.
              </p>

              <div className="integration-secret-row">
                <span>Bridge Hardware:</span>
                <b>Nuki Bridge Ultra-Pro (Carnac HQ Gateway)</b>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 18, paddingTop: 14, borderTop: '1px solid var(--line-light)' }}>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>Active guest PINs armed: 28 for today</span>
                <button className="btn" onClick={() => showToast('Pinged all 385 smart locks: 100% battery > 85%')}>
                  🔋 Run Battery Diagnostics
                </button>
              </div>
            </div>

            {/* Stripe Connect & SEPA */}
            <div className="card settings-card">
              <div className="cardhead">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="iconbox blue" style={{ width: 44, height: 44, borderRadius: 12 }}>
                    <svg className="icon" style={{ width: 22, height: 22 }}><use href="#i-money" /></svg>
                  </div>
                  <div>
                    <h3 style={{ fontSize: 16 }}>Stripe Connect & SEPA B2B Rails</h3>
                    <small>Banking Partner: BNP Paribas / Stripe Treasury</small>
                  </div>
                </div>
                <span className="status ok">{stripeLive ? '🟢 Production Live' : '🟠 Sandbox'}</span>
              </div>

              <p style={{ fontSize: 12.5, color: 'var(--muted)', margin: '10px 0 14px', lineHeight: 1.5 }}>
                Processes traveler security pre-authorizations, direct VIP booking folios, automated owner monthly revenue distributions, and field specialist payouts.
              </p>

              <div className="integration-secret-row">
                <span>Stripe Account ID:</span>
                <b>acct_1HkZenstayProd7729</b>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 18, paddingTop: 14, borderTop: '1px solid var(--line-light)' }}>
                <button
                  className="btn"
                  onClick={() => {
                    setStripeLive(!stripeLive);
                    showToast(stripeLive ? 'Switched to Stripe Test Mode' : 'Switched to Stripe Live Production');
                  }}
                >
                  {stripeLive ? 'Toggle Sandbox Mode' : 'Toggle Live Mode'}
                </button>
                <button className="btn primary" onClick={() => showToast('Stripe Connect management portal opened')}>
                  Manage Banking Rails →
                </button>
              </div>
            </div>

            {/* Beyond Pricing Engine */}
            <div className="card settings-card">
              <div className="cardhead">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="iconbox amber" style={{ width: 44, height: 44, borderRadius: 12 }}>
                    <svg className="icon" style={{ width: 22, height: 22 }}><use href="#i-money" /></svg>
                  </div>
                  <div>
                    <h3 style={{ fontSize: 16 }}>Beyond Pricing Dynamic Engine</h3>
                    <small>Algorithmic ADR & Yield Optimization</small>
                  </div>
                </div>
                <span className="status ok">🟢 Active Sync</span>
              </div>

              <p style={{ fontSize: 12.5, color: 'var(--muted)', margin: '10px 0 14px', lineHeight: 1.5 }}>
                Real-time competitor tracking, minimum stay rules (e.g. 7-night minimum in August, 3-night in spring), and local Brittany event demand surge adjustments.
              </p>

              <div className="integration-secret-row">
                <span>Revenue Uplift:</span>
                <b>+€38.40 RevPAR avg across portfolio</b>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 18, paddingTop: 14, borderTop: '1px solid var(--line-light)' }}>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>Next price recalculation: 04:00 AM</span>
                <button className="btn" onClick={() => showToast('Triggered Beyond Pricing rate table update')}>
                  Recalculate Yield
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          TAB 3: OPERATIONAL QUALITY SLAS
          ============================================================ */}
      {activeTab === 'operations' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="settings-grid-2col">
            <div className="card settings-card">
              <div className="cardhead">
                <div>
                  <h3 style={{ fontSize: 16 }}>Turnaround Inspection & Photo Proof SLAs</h3>
                  <small>Enforce visual audit criteria before property can be marked "Ready"</small>
                </div>
                <span className="badge-gold">Audit Protocol</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 14 }}>
                <div className="toggle-switch-wrap">
                  <div className="toggle-switch-info">
                    <b>Mandatory 18-Photo Photographic Audit</b>
                    <p>Field specialists must upload high-resolution photos of every room before checkout can be finalized.</p>
                  </div>
                  <button
                    type="button"
                    className={`luxury-switch ${photoMandatory ? 'on' : ''}`}
                    onClick={() => {
                      setPhotoMandatory(!photoMandatory);
                      showToast(photoMandatory ? 'Photo requirement relaxed' : '18-Photo audit requirement strictly enforced');
                    }}
                  >
                    <span className="luxury-switch-thumb"></span>
                  </button>
                </div>

                <div className="settings-field">
                  <label>Turnaround Cleaning Buffer Window</label>
                  <select value={turnaroundBuffer} onChange={e => {
                    setTurnaroundBuffer(e.target.value);
                    showToast(`Turnaround buffer set to ${e.target.value} minutes`);
                  }}>
                    <option value="30">30 Minutes (Express Turnaround for City Apartments)</option>
                    <option value="60">60 Minutes (Standard Luxury Hospitality Protocol - Default)</option>
                    <option value="90">90 Minutes (Deep Clean Protocol for Coastal Villas)</option>
                    <option value="120">120 Minutes (Grand Private Estates & Châteaux)</option>
                  </select>
                  <small>Guaranteed airing and sanitization window between back-to-back reservations</small>
                </div>

                <div className="toggle-switch-wrap">
                  <div className="toggle-switch-info">
                    <b>Autonomous Technician Escalation</b>
                    <p>Auto-creates high-priority contractor work order if field lead flags water leak or HVAC failure.</p>
                  </div>
                  <button
                    type="button"
                    className={`luxury-switch ${anomalyEscalation ? 'on' : ''}`}
                    onClick={() => {
                      setAnomalyEscalation(!anomalyEscalation);
                      showToast(anomalyEscalation ? 'Autonomous escalation disabled' : 'Autonomous escalation active');
                    }}
                  >
                    <span className="luxury-switch-thumb"></span>
                  </button>
                </div>
              </div>
            </div>

            <div className="card settings-card">
              <div className="cardhead">
                <div>
                  <h3 style={{ fontSize: 16 }}>Specialist Remuneration & Quality Bonuses</h3>
                  <small>Performance tiers and monthly incentive disbursements</small>
                </div>
                <span className="badge-navy">URSSAF Compliant</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 14 }}>
                <div style={{ padding: 14, background: 'var(--card2)', borderRadius: 10, border: '1px solid var(--line-light)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <b>Tier 1: Master Turnaround Lead (&gt;98% Quality)</b>
                    <span className="status ok">+€410 Monthly Bonus</span>
                  </div>
                  <small style={{ color: 'var(--muted)', display: 'block', marginTop: 4 }}>
                    Allocated to specialists maintaining over 98% photo audit pass rate and zero guest cleanliness complaints.
                  </small>
                </div>

                <div style={{ padding: 14, background: 'var(--card2)', borderRadius: 10, border: '1px solid var(--line-light)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <b>Tier 2: Senior Specialist (&gt;95% Quality)</b>
                    <span className="status ok">+€320 Monthly Bonus</span>
                  </div>
                  <small style={{ color: 'var(--muted)', display: 'block', marginTop: 4 }}>
                    Standard luxury threshold. Includes reimbursement for certified eco-friendly cleaning supplies.
                  </small>
                </div>

                <div style={{ padding: 14, background: 'var(--card2)', borderRadius: 10, border: '1px solid var(--line-light)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <b>Penalty Clause: Cleanliness Refund Offset</b>
                    <span className="status wait">Deducted from fee</span>
                  </div>
                  <small style={{ color: 'var(--muted)', display: 'block', marginTop: 4 }}>
                    If traveler cleaning fee is refunded due to verified field oversight, housekeeper fee is prorated accordingly.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          TAB 4: FINANCIAL & SEPA TREASURY
          ============================================================ */}
      {activeTab === 'finance' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="settings-grid-2col">
            <div className="card settings-card">
              <div className="cardhead">
                <div>
                  <h3 style={{ fontSize: 16 }}>SEPA B2B Payout Automation</h3>
                  <small>Automated bank wire distribution to owners & contractors</small>
                </div>
                <span className="status ok">SEPA XML Ready</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 14 }}>
                <div className="toggle-switch-wrap">
                  <div className="toggle-switch-info">
                    <b>Automated Weekly SEPA Transfer Batch</b>
                    <p>Submits approved contractor invoices to BNP Paribas gateway every Friday at 17:00 CET.</p>
                  </div>
                  <button
                    type="button"
                    className={`luxury-switch ${sepaAutoBatch ? 'on' : ''}`}
                    onClick={() => {
                      setSepaAutoBatch(!sepaAutoBatch);
                      showToast(sepaAutoBatch ? 'SEPA auto-batch disabled' : 'SEPA weekly auto-batch active');
                    }}
                  >
                    <span className="luxury-switch-thumb"></span>
                  </button>
                </div>

                <div className="settings-field">
                  <label>French VAT Standard Rate (Hospitality Services)</label>
                  <select defaultValue="20">
                    <option value="20">20.0% (Standard French Commercial Services & Maintenance)</option>
                    <option value="10">10.0% (Parahôtellerie Cleaning Package Rate)</option>
                    <option value="0">0.0% (Auto-Entrepreneur Auto-Liquidated Article 293B)</option>
                  </select>
                  <small>Automatically applies correct VAT line on all ZS-INV invoices</small>
                </div>

                <div className="settings-field">
                  <label>Monthly Owner Statement Closing Day</label>
                  <select defaultValue="5">
                    <option value="1">1st of the month (Instant closing)</option>
                    <option value="5">5th of the month (Recommended - 5-day reconciliation buffer)</option>
                    <option value="10">10th of the month</option>
                  </select>
                  <small>Date when finalized owner revenue packets & SEPA disbursements are frozen</small>
                </div>
              </div>
            </div>

            <div className="card settings-card">
              <div className="cardhead">
                <div>
                  <h3 style={{ fontSize: 16 }}>French Legal & FEC Accounting Export</h3>
                  <small>Compliance with French General Tax Code (CGI)</small>
                </div>
                <span className="badge-gold">FEC Certified</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 14 }}>
                <p style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.5, margin: 0 }}>
                  All financial transactions, owner commissions, housekeeper remuneration, and VAT declarations are sealed cryptographically to generate official <b>Fichier des Écritures Comptables (FEC)</b> exports.
                </p>

                <div style={{ padding: 14, background: 'var(--card2)', borderRadius: 10 }}>
                  <b style={{ fontSize: 13, display: 'block', color: 'var(--text)' }}>SIRET Entity:</b>
                  <span style={{ fontSize: 12, color: 'var(--muted)' }}>849 204 192 00018 • RCS Vannes • TVA Intracommunautaire: FR 48 849204192</span>
                </div>

                <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
                  <button className="btn" onClick={() => showToast('Exporting FEC 2026 accounting audit file (FEC.txt)...')}>
                    📥 Download FEC Export
                  </button>
                  <button className="btn" onClick={() => showToast('Exporting Sep-Oct 2026 VAT declaration summary...')}>
                    📊 VAT Declaration Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          TAB 5: SECURITY & ROLE GOVERNANCE
          ============================================================ */}
      {activeTab === 'security' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="settings-grid-2col">
            <div className="card settings-card">
              <div className="cardhead">
                <div>
                  <h3 style={{ fontSize: 16 }}>Access Control & Two-Factor Authentication</h3>
                  <small>Enterprise security protocols and session policies</small>
                </div>
                <span className="status ok">2FA Enforced</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 14 }}>
                <div className="toggle-switch-wrap">
                  <div className="toggle-switch-info">
                    <b>Mandatory 2FA for Super Administrators</b>
                    <p>Enforce TOTP authenticator (Google/1Password) for all finance and user role modifications.</p>
                  </div>
                  <button
                    type="button"
                    className={`luxury-switch ${twoFactorAuth ? 'on' : ''}`}
                    onClick={() => {
                      setTwoFactorAuth(!twoFactorAuth);
                      showToast(twoFactorAuth ? '2FA enforcement relaxed' : '2FA strictly enforced for admins');
                    }}
                  >
                    <span className="luxury-switch-thumb"></span>
                  </button>
                </div>

                <div className="settings-field">
                  <label>Session Timeout Policy</label>
                  <select defaultValue="12">
                    <option value="4">4 Hours (Strict Banking Grade)</option>
                    <option value="12">12 Hours (Standard Full Working Shift - Default)</option>
                    <option value="24">24 Hours</option>
                  </select>
                  <small>Automatically logs out inactive sessions to prevent unauthorized terminal access</small>
                </div>
              </div>
            </div>

            <div className="card settings-card">
              <div className="cardhead">
                <div>
                  <h3 style={{ fontSize: 16 }}>Cryptographic Audit Trail & GDPR Vault</h3>
                  <small>Tenant isolation & SHA-256 event integrity</small>
                </div>
                <span className="badge-navy">GDPR Compliant</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 14 }}>
                <p style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.5, margin: 0 }}>
                  Every administrative action, reservation modification, contract signing, and financial disbursement is logged with an immutable SHA-256 hash.
                </p>

                <div style={{ padding: 14, background: 'var(--card2)', borderRadius: 10 }}>
                  <b style={{ fontSize: 13, display: 'block', color: 'var(--text)' }}>Active Administrative Sessions:</b>
                  <span style={{ fontSize: 12, color: 'var(--muted)' }}>Albert Yvard (Super Admin • IP: 192.168.0.157 • Paris HQ)</span>
                </div>

                <div>
                  <button
                    className="btn primary"
                    onClick={() => showToast('Cryptographic audit trail downloaded (last 90 days, SHA-256 verified)')}
                  >
                    📥 Download Cryptographic Audit Trail
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
