import React, { useState } from 'react';

interface AiQueryResponse {
  answer: string;
  supportingData: { label: string; value: string; klass?: 'ok' | 'wait' | 'bad' }[];
  sources: { title: string; ref: string; type: string }[];
  suggestedActions: string[];
}

export function AiIntelligence() {
  const [activeQuestion, setActiveQuestion] = useState("Which properties need attention?");
  const [customInput, setCustomInput] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [altMessage, setAltMessage] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const operationalAnswers: Record<string, AiQueryResponse> = {
    "Which properties need attention?": {
      answer: "Two properties require immediate operational management prior to the 15:00 check-in window: Villa Guidel (turnaround delayed due to late guest departure at 11:45) and Villa Océane (master bedroom linen photo audit missing from Marie L.'s submission).",
      supportingData: [
        { label: "Villa Guidel", value: "Checklist 4/22", klass: "bad" },
        { label: "Villa Océane", value: "Missing Photos", klass: "wait" },
        { label: "Resolution Window", value: "< 2 hours", klass: "bad" },
        { label: "Impacted Arrivals", value: "2 VIP Stays", klass: "wait" }
      ],
      sources: [
        { title: "Housekeeping Mobile Checklist", ref: "Task #TASK-403 (Villa Guidel)", type: "Mobile Field Audit" },
        { title: "Photo Audit Validator", ref: "Audit #AUD-912 (Villa Océane)", type: "Computer Vision Telemetry" },
        { title: "Nuki Smart Lock Bridge", ref: "Checkout event #NL-773 (11:45 AM)", type: "IoT Sensor Event" }
      ],
      suggestedActions: [
        "Dispatch backup housekeeper Sophie M. to expedite Villa Guidel",
        "Request photo re-upload from Marie L. via mobile SMS link",
        "Send VIP pre-arrival concierge notice with estimated 15:30 window"
      ]
    },
    "Summarize today's operations": {
      answer: "Today across your 350 managed residences, 28 guest arrivals and 24 departures are scheduled. 24 of 28 turnaround cleanings are currently complete or in progress. Overall portfolio guest readiness delivery is tracking at 94.8% SLA compliance.",
      supportingData: [
        { label: "Scheduled Arrivals", value: "28 units" },
        { label: "Completed Departures", value: "24 units", klass: "ok" },
        { label: "Readiness Rate", value: "94.8%", klass: "ok" },
        { label: "Field Specialists Active", value: "14 specialists", klass: "ok" }
      ],
      sources: [
        { title: "Guesty Live Webhook Intake", ref: "Sync event #G-9941 (10:14)", type: "PMS Channel Sync" },
        { title: "Field Operations Dispatch Feed", ref: "Cluster: Brittany South", type: "Dispatch Telemetry" }
      ],
      suggestedActions: [
        "Open Reservation Matrix Gantt Calendar",
        "Broadcast turn-down notification to field teams",
        "Generate 14:00 Executive Midday Briefing"
      ]
    },
    "Show delayed cleaning jobs": {
      answer: "Only 1 turnaround is currently flagged as delayed: Villa Guidel (Guidel-Plages). The prior guest departed 45 minutes past the 11:00 checkout window. Estimated turnaround completion is now 16:15 for a 17:30 arrival (1h 15m safety buffer remaining).",
      supportingData: [
        { label: "Property Flagged", value: "Villa Guidel", klass: "wait" },
        { label: "Target Check-in", value: "17:30" },
        { label: "Revised Readiness ETA", value: "16:15", klass: "wait" },
        { label: "Buffer Remaining", value: "1h 15m", klass: "ok" }
      ],
      sources: [
        { title: "Nuki Smart Lock Checkout Event", ref: "Locked at 11:45", type: "IoT Keypad Log" },
        { title: "Turnaround Progress Tracker", ref: "Task #TASK-403", type: "Field Checklist" }
      ],
      suggestedActions: [
        "Reassign secondary technician to expedite pool deck sanitization",
        "Notify arrival guest via automated WhatsApp update",
        "Lock 60-min cleaning buffer in PMS calendar"
      ]
    },
    "What are tomorrow's arrivals?": {
      answer: "Tomorrow (Friday, Oct 2) features 19 confirmed VIP arrivals across Quiberon, Carnac, and Arzon. All 19 units have verified digital smart lock PIN codes pre-issued, 400TC linens allocated, and dedicated field specialists assigned.",
      supportingData: [
        { label: "Friday Arrivals", value: "19 units", klass: "ok" },
        { label: "Pre-Paid Folios", value: "19 / 19 (100%)", klass: "ok" },
        { label: "Nuki PINs Ready", value: "19 / 19", klass: "ok" },
        { label: "Gross Nightly ADR", value: "€362 avg", klass: "ok" }
      ],
      sources: [
        { title: "Guesty Channel Manager", ref: "Reservations feed 2026-10-02", type: "PMS Reservations" },
        { title: "Stripe Payment Intent Ledger", ref: "All deposits confirmed", type: "Treasury Gateway" }
      ],
      suggestedActions: [
        "Send automatic pre-arrival concierge welcome SMS to tomorrow's guests",
        "Lock housekeeping dispatch sequences for Friday morning",
        "Confirm L'Occitane welcome hampers stock for arrival units"
      ]
    },
    "Show outstanding invoices": {
      answer: "There are currently 3 outstanding contractor invoices totaling €785.00 awaiting manager approval before the weekly Friday SEPA transfer batch. All work orders have verified before/after photographic proof.",
      supportingData: [
        { label: "Pending Invoices", value: "3 orders", klass: "wait" },
        { label: "Total Amount", value: "€785.00", klass: "wait" },
        { label: "Oldest Vendor", value: "Carnac Plomberie", klass: "wait" },
        { label: "Compliance Status", value: "100% URSSAF OK", klass: "ok" }
      ],
      sources: [
        { title: "Contractor Invoicing Module", ref: "Batch #INV-WK40", type: "Vendor Accounting" },
        { title: "Work Order Evidence Attachments", ref: "WO-801, WO-803, WO-804", type: "Visual Proof Vault" }
      ],
      suggestedActions: [
        "One-click batch approve verified work orders under €500",
        "Review Carnac Plomberie decennial guarantee certificate",
        "Download itemized SEPA XML batch for banking export"
      ]
    },
    "Summarize unresolved traveler requests": {
      answer: "There are 2 open guest concierge tickets: Baron Laurent de Montmirail requested private sommelier arrangements for Villa Les Embruns, and Camille Bernard requested an early check-in at 14:00 for Maison Moriconi.",
      supportingData: [
        { label: "Open VIP Tickets", value: "2 requests", klass: "wait" },
        { label: "Avg First Response", value: "2m 14s", klass: "ok" },
        { label: "High Priority Flag", value: "1 (Sommelier VIP)", klass: "ok" },
        { label: "CSAT Sentiment", value: "100% Positive", klass: "ok" }
      ],
      sources: [
        { title: "VIP Concierge Messaging Channel", ref: "Thread #ZEN-88402", type: "Omnichannel Inbound" },
        { title: "Direct Guest SMS Gateway", ref: "Thread #ZEN-88404", type: "Twilio Gateway" }
      ],
      suggestedActions: [
        "Confirm Sommelier booking with Chef Antoine for Villa Les Embruns",
        "Approve 14:00 early arrival for Maison Moriconi (Unit is 100% Ready)",
        "Dispatch updated Nuki access activation time to Camille B."
      ]
    }
  };

  const suggestedQuestions = [
    { text: "Which properties need attention?", icon: "⚠️" },
    { text: "Summarize today's operations", icon: "📋" },
    { text: "Show delayed cleaning jobs", icon: "⏳" },
    { text: "What are tomorrow's arrivals?", icon: "🛎️" },
    { text: "Show outstanding invoices", icon: "💶" },
    { text: "Summarize unresolved traveler requests", icon: "💬" }
  ];

  const currentResponse = operationalAnswers[activeQuestion] || operationalAnswers["Which properties need attention?"];

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    setActiveQuestion(customInput);
    showToast(`Querying Zenstay Knowledge Base for: "${customInput}"...`);
    setCustomInput('');
  };

  const handleRunScan = () => {
    setIsScanning(true);
    showToast('Running AI telemetry scan across 350 residences...');
    setTimeout(() => {
      setIsScanning(false);
      showToast('Scan complete: 4 operational risks identified, 24 residences ready.');
    }, 1800);
  };

  return (
    <div className="ai-intelligence-root">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="ops-toast">
          <svg className="icon" style={{ stroke: 'var(--gold)' }}><use href="#i-check" /></svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Enterprise AI Hero Banner */}
      <div className="ai-hero">
        <div className="ai-hero-top">
          <div>
            <div className="ai-eyebrow">
              <span className="dot" style={{ background: '#74efb6', width: 8, height: 8 }}></span>
              ENTERPRISE OPERATIONAL ASSISTANT • ZERO-HALLUCINATION RAG
            </div>
            <h1 className="ai-title">ZENSTAY AI INTELLIGENCE</h1>
            <p className="ai-sub">
              Autonomous hospitality copilot connected to live Guesty PMS webhooks, field photo audit evidence,
              Nuki IoT smart lock access logs, and multilingual guest concierge streams.
            </p>
          </div>
          <div className="ai-live">
            <span className="dot" style={{ background: '#10b981' }}></span>
            <span>CONNECTED TO ZENSTAY PMS & IOT VAULT</span>
          </div>
        </div>

        {/* 4 Hero Telemetry Metrics */}
        <div className="ai-metrics">
          <div className="ai-metric">
            <b>1,248</b>
            <span>Indexed SOPs & Checklists</span>
          </div>
          <div className="ai-metric">
            <b>385</b>
            <span>Connected Nuki Smart Locks</span>
          </div>
          <div className="ai-metric">
            <b>99.4%</b>
            <span>Grounded Source Citations</span>
          </div>
          <div className="ai-metric">
            <b>&lt; 1.2s</b>
            <span>Vector RAG Retrieval Latency</span>
          </div>
        </div>

        {/* Suggested Operational Questions */}
        <div className="prompt-chips">
          {suggestedQuestions.map(q => (
            <button
              key={q.text}
              className={`prompt-chip ${activeQuestion === q.text ? 'active' : ''}`}
              onClick={() => {
                setActiveQuestion(q.text);
                showToast(`Grounded answer retrieved from 3 verified sources`);
              }}
            >
              <span>{q.icon}</span>
              <span>{q.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main AI Consultation Workspace */}
      <div className="ai-layout">
        {/* Left Column: Natural Language Input & Grounded Answer */}
        <div className="rag-card">
          <form onSubmit={handleCustomSubmit}>
            <div className="rag-input-box">
              <svg className="icon" style={{ stroke: 'var(--muted)', width: 18, height: 18 }}>
                <use href="#i-search" />
              </svg>
              <input
                placeholder="Ask ZENSTAY AI any operational, financial, or guest inquiry..."
                value={customInput}
                onChange={e => setCustomInput(e.target.value)}
              />
              {customInput && (
                <button
                  type="button"
                  style={{ border: 0, background: 'transparent', color: 'var(--muted)', cursor: 'pointer', padding: 4 }}
                  onClick={() => setCustomInput('')}
                >
                  ✕
                </button>
              )}
              <button type="submit" className="btn primary" style={{ padding: '0 18px', height: 38 }}>
                ⚡ Query Platform
              </button>
            </div>
          </form>

          {/* Grounded Response Dossier */}
          <div className="rag-answer">
            <div className="rag-answer-head">
              <b>Grounded Operational Response</b>
              <span className="badge-gold">Verified via Live Telemetry</span>
            </div>

            <p className="rag-answer-text">
              {currentResponse.answer}
            </p>

            {/* Supporting Data Metrics */}
            <div className="supporting-data-grid">
              {currentResponse.supportingData.map((d, i) => (
                <div key={i} className="supporting-metric-card">
                  <span>{d.label}</span>
                  <b style={{
                    color: d.klass === 'bad' ? '#ef4444' : d.klass === 'wait' ? '#d97706' : d.klass === 'ok' ? '#10b981' : 'var(--text)'
                  }}>
                    {d.value}
                  </b>
                </div>
              ))}
            </div>

            {/* Recommended Operational Next Actions */}
            <div className="recommended-actions-container">
              <span className="recommended-actions-eyebrow">
                RECOMMENDED OPERATIONAL ACTIONS
              </span>
              <div>
                {currentResponse.suggestedActions.map((act, i) => (
                  <div key={i} className="recommended-action-row">
                    <span>→ {act}</span>
                    <button
                      className="btn"
                      style={{ padding: '4px 12px', fontSize: 11 }}
                      onClick={() => showToast(`Executing action: ${act}`)}
                    >
                      Execute
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Context & Source Citations */}
            <div className="citations">
              {currentResponse.sources.map((src, i) => (
                <div key={i} className="citation">
                  <div className="source-dot"></div>
                  <div>
                    <b>{src.title}</b>
                    <span>Context reference: <code>{src.ref}</code> • <small>{src.type}</small></span>
                  </div>
                </div>
              ))}
            </div>

            {/* 5-Step RAG Pipeline Visualizer */}
            <div className="rag-flow">
              <div className="rag-step">
                <b>1. Question</b>
                <span>Intent Analyzed</span>
              </div>
              <div className="rag-step">
                <b>2. Vector RAG</b>
                <span>SOP & DB Embeddings</span>
              </div>
              <div className="rag-step">
                <b>3. Reranker</b>
                <span>Cross-Encoder Scoring</span>
              </div>
              <div className="rag-step">
                <b>4. Grounding</b>
                <span>Guesty Telemetry Lock</span>
              </div>
              <div className="rag-step">
                <b>5. Answer</b>
                <span>Cited Response</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Copilot Scanner & Enterprise Guardrails */}
        <div className="ai-side">
          {/* Operations Copilot Card */}
          <div className="card ai-card">
            <div className="cardhead" style={{ marginBottom: 14 }}>
              <div>
                <h3 style={{ fontSize: 15 }}>AI Operations Copilot</h3>
                <small>Autonomous anomaly detection for today</small>
              </div>
              <button
                className="filter"
                onClick={handleRunScan}
                disabled={isScanning}
                style={{ cursor: 'pointer', background: 'var(--card2)' }}
              >
                {isScanning ? '⏳ Scanning...' : '⚡ Run Scan'}
              </button>
            </div>

            <div className="insight">
              <div className="iconbox amber" style={{ width: 34, height: 34, borderRadius: 10 }}>
                <svg className="icon" style={{ width: 17, height: 17 }}><use href="#i-file" /></svg>
              </div>
              <div>
                <b>3 evidence gaps</b>
                <p>Bedroom linen photos missing on active checkouts.</p>
              </div>
              <span className="ai-risk high">High</span>
            </div>

            <div className="insight">
              <div className="iconbox purple" style={{ width: 34, height: 34, borderRadius: 10 }}>
                <svg className="icon" style={{ width: 17, height: 17 }}><use href="#i-money" /></svg>
              </div>
              <div>
                <b>2 billing anomalies</b>
                <p>Contractor line items differ from cleaning package.</p>
              </div>
              <span className="ai-risk high">High</span>
            </div>

            <div className="insight">
              <div className="iconbox blue" style={{ width: 34, height: 34, borderRadius: 10 }}>
                <svg className="icon" style={{ width: 17, height: 17 }}><use href="#i-cal" /></svg>
              </div>
              <div>
                <b>1 tight turnaround</b>
                <p>Villa Guidel guest departure delay (45 min shift).</p>
              </div>
              <span className="ai-risk medium">Medium</span>
            </div>

            <div className="insight">
              <div className="iconbox green" style={{ width: 34, height: 34, borderRadius: 10 }}>
                <svg className="icon" style={{ width: 17, height: 17 }}><use href="#i-check" /></svg>
              </div>
              <div>
                <b>24 residences ready</b>
                <p>All checklist photos and Nuki PINs verified.</p>
              </div>
              <span className="ai-risk low">Good</span>
            </div>
          </div>

          {/* Enterprise Governance Guardrails */}
          <div className="card ai-card">
            <div className="cardhead" style={{ marginBottom: 14 }}>
              <div>
                <h3 style={{ fontSize: 15 }}>Enterprise Governance Guardrails</h3>
                <small>Strict compliance & tenant isolation concept</small>
              </div>
              <span className="badge-navy">GDPR & SLA Compliant</span>
            </div>

            <div className="guardrail-row">
              <div>
                <b>Tenant-Isolated RAG Memory</b>
                <small>PostgreSQL row-level isolation guarantees zero cross-tenant exposure.</small>
              </div>
              <span className="status ok">Enforced</span>
            </div>

            <div className="guardrail-row">
              <div>
                <b>Strict Traceable Citations</b>
                <small>Every response mapped to a specific PMS reservation ID or checklist record.</small>
              </div>
              <span className="status ok">Enforced</span>
            </div>

            <div className="guardrail-row">
              <div>
                <b>Financial Action Human Gate</b>
                <small>All payments, refunds, and contract updates require administrator authorization.</small>
              </div>
              <span className="status wait">Required</span>
            </div>

            <div className="guardrail-row">
              <div>
                <b>Sensitive Guest Reply Approval</b>
                <small>AI message drafts require manager confirmation before transmission.</small>
              </div>
              <span className="status wait">Required</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6-Card AI Capability Matrix */}
      <div className="ai-features-grid">
        <div className="feature-card">
          <div className="iconbox blue" style={{ width: 38, height: 38, borderRadius: 10 }}>
            <svg className="icon" style={{ width: 19, height: 19 }}><use href="#i-msg" /></svg>
          </div>
          <h3>AI Concierge Message Assistant</h3>
          <p>Drafts context-aware traveler replies using live PMS reservation dates and unit readiness, with human gatekeeping.</p>
          <div className="ai-preview">
            <strong>{altMessage ? 'Alternative Concierge Draft:' : 'Grounded Draft:'}</strong>
            {altMessage
              ? '“Hello Camille, our field lead is completing final pillow-top staging at Maison Moriconi. We will dispatch your Nuki PIN code at 14:00.”'
              : '“Hello Camille, the property is currently being prepared. I can confirm an early arrival as soon as the readiness check is completed.”'}
          </div>
          <button
            className="btn"
            style={{ marginTop: 12, justifyContent: 'center' }}
            onClick={() => {
              setAltMessage(!altMessage);
              showToast('Alternative concierge reply generated with dynamic timing');
            }}
          >
            🔄 Generate Alternative Draft
          </button>
        </div>

        <div className="feature-card">
          <div className="iconbox purple" style={{ width: 38, height: 38, borderRadius: 10 }}>
            <svg className="icon" style={{ width: 19, height: 19 }}><use href="#i-chart" /></svg>
          </div>
          <h3>Review & Sentiment Intelligence</h3>
          <p>Extracts guest feedback signals across Direct VIP, Guesty, and Airbnb reviews, correlating ratings back to specific field teams.</p>
          <div className="ai-preview">
            <strong>Weekly Signal (4.96 ★):</strong>
            “Cleanliness trending +1.8 pts. High praise for 400TC Egyptian linens; single observation regarding terrace BBQ grill at Villa Guidel.”
          </div>
        </div>

        <div className="feature-card">
          <div className="iconbox amber" style={{ width: 38, height: 38, borderRadius: 10 }}>
            <svg className="icon" style={{ width: 19, height: 19 }}><use href="#i-cal" /></svg>
          </div>
          <h3>Predictive 07:00 Daily Briefing</h3>
          <p>Simulates daily operational bottlenecks and weather conditions before morning operations commence.</p>
          <div className="ai-preview">
            <strong>07:00 Intelligence Brief:</strong>
            “28 check-ins today • 1 tight turnaround window • 100% specialist URSSAF compliance • Sunny coast, ideal for pool deck prep.”
          </div>
        </div>

        <div className="feature-card">
          <div className="iconbox green" style={{ width: 38, height: 38, borderRadius: 10 }}>
            <svg className="icon" style={{ width: 19, height: 19 }}><use href="#i-house" /></svg>
          </div>
          <h3>Property Readiness Intelligence</h3>
          <p>Multi-factor verification blending checklist completion, 18 photographic proofs, damage tickets, and Nuki lock telemetry.</p>
          <div className="ai-preview">
            <strong>Maison Moriconi:</strong>
            Ready • 8/8 checklist items approved • 0 open damage work orders • Nuki PIN armed for 14:00.
          </div>
        </div>

        <div className="feature-card">
          <div className="iconbox amber" style={{ width: 38, height: 38, borderRadius: 10 }}>
            <svg className="icon" style={{ width: 19, height: 19 }}><use href="#i-money" /></svg>
          </div>
          <h3>Financial Anomaly Detection</h3>
          <p>Identifies pass-through billing discrepancies, duplicate supply charges, and unexpected package differences.</p>
          <div className="ai-preview">
            <strong>Audited Flag:</strong>
            Villa Océane invoice line differs by €12.50 from reservation cleaning-fee snapshot. Human review required before SEPA batch.
          </div>
        </div>

        <div className="feature-card">
          <div className="iconbox purple" style={{ width: 38, height: 38, borderRadius: 10 }}>
            <svg className="icon" style={{ width: 19, height: 19 }}><use href="#i-users" /></svg>
          </div>
          <h3>AI Route & Workload Optimizer</h3>
          <p>Computes optimal travel sequence across the Morbihan coastline based on check-in deadlines, traffic, and specialist locations.</p>
          <div className="ai-preview">
            <strong>Suggested Sequence:</strong>
            Carnac Plage (10:00) → La Trinité (13:30) → Guidel (15:00) • 42 km total • 1h 08m drive window.
          </div>
        </div>
      </div>

      {/* AI Audit Trail Table */}
      <div className="card ai-card">
        <div className="cardhead" style={{ marginBottom: 14 }}>
          <div>
            <h3 style={{ fontSize: 16 }}>AI Operational Audit Trail</h3>
            <small>Immutable record of all grounded queries and copilot actions</small>
          </div>
          <button
            className="filter"
            onClick={() => showToast('Exporting cryptographic audit log (CSV)...')}
          >
            📊 Export Audit Log
          </button>
        </div>

        <div className="ai-log">
          <div className="ai-log-row">
            <time>10:42 AM</time>
            <div>
              <b>RAG Answer Generated</b>
              <div style={{ color: 'var(--muted)', fontSize: 11 }}>
                Query: "Which properties need attention?" • 3 approved sources retrieved
              </div>
            </div>
            <span className="status ok">Cited</span>
          </div>

          <div className="ai-log-row">
            <time>10:31 AM</time>
            <div>
              <b>Financial Anomaly Flagged</b>
              <div style={{ color: 'var(--muted)', fontSize: 11 }}>
                Villa Océane • Invoice #HL-F-2026-00123 (€12.50 discrepancy)
              </div>
            </div>
            <span className="status wait">Review Required</span>
          </div>

          <div className="ai-log-row">
            <time>09:58 AM</time>
            <div>
              <b>Traveler Reply Drafted</b>
              <div style={{ color: 'var(--muted)', fontSize: 11 }}>
                Camille Bernard • Early arrival request for Maison Moriconi
              </div>
            </div>
            <span className="status info">Approval Gated</span>
          </div>

          <div className="ai-log-row">
            <time>07:00 AM</time>
            <div>
              <b>Executive Morning Briefing Compiled</b>
              <div style={{ color: 'var(--muted)', fontSize: 11 }}>
                Portfolio telemetry • 28 check-ins, 24 check-outs evaluated
              </div>
            </div>
            <span className="status ok">Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
