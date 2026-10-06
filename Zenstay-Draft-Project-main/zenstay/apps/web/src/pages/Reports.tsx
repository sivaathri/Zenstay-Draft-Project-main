import { useState } from 'react';

export function Reports() {
  const [period, setPeriod] = useState<'7D' | '30D' | 'Q3' | 'YTD'>('30D');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const specialists = [
    {
      name: 'Marie Le Guen',
      role: 'Lead Turnover Specialist',
      avatar: 'ML',
      jobs: 46,
      passRate: '99.2%',
      onTime: '98.5%',
      reviews: '18 reviews',
      bonus: '€410.00',
      status: 'Active on Duty',
      compliance: 'URSSAF & Insurance OK'
    },
    {
      name: 'Sophie Martin',
      role: 'Deep Clean & Sanitization Lead',
      avatar: 'SM',
      jobs: 39,
      passRate: '96.8%',
      onTime: '96.0%',
      reviews: '14 reviews',
      bonus: '€320.00',
      status: 'Active on Duty',
      compliance: 'URSSAF & Insurance OK'
    },
    {
      name: 'Julie Renaud',
      role: 'Audit & Turnaround Specialist',
      avatar: 'JR',
      jobs: 31,
      passRate: '94.5%',
      onTime: '94.0%',
      reviews: '9 reviews',
      bonus: '€180.00',
      status: 'On Standby',
      compliance: 'URSSAF & Insurance OK'
    },
    {
      name: 'Jean-Luc B. (Carnac Plomberie)',
      role: 'HVAC & Plumbing Certified Partner',
      avatar: 'JL',
      jobs: 8,
      passRate: '100%',
      onTime: '100%',
      reviews: '6 reviews',
      bonus: '—',
      status: 'Verified Contractor',
      compliance: 'Decennial Guarantee OK'
    }
  ];

  return (
    <div className="reports-page-root">
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
          <span className="section-eyebrow">PORTFOLIO INTELLIGENCE & AUDIT SUITE</span>
          <h2>Executive Analytics & Portfolio Intelligence</h2>
          <p>
            Comprehensive operational compliance, revenue yield benchmarking, photo inspection pass rates, and guest sentiment across 350 European residences.
          </p>
        </div>
        <div className="actions">
          <div className="seg">
            {(['7D', '30D', 'Q3', 'YTD'] as const).map(p => (
              <button
                key={p}
                className={period === p ? 'active' : ''}
                onClick={() => {
                  setPeriod(p);
                  showToast(`Reports updated for ${p === '7D' ? 'Last 7 Days' : p === '30D' ? 'Last 30 Days' : p === 'Q3' ? 'Quarter 3' : 'Year-to-Date 2026'}`);
                }}
              >
                {p === '7D' ? 'Last 7 Days' : p === '30D' ? 'Last 30 Days' : p === 'Q3' ? 'Q3 2026' : 'YTD'}
              </button>
            ))}
          </div>
          <button
            className="btn"
            onClick={() => showToast('Weekly automated executive intelligence digest scheduled')}
          >
            ⏰ Automated Digest
          </button>
          <button className="btn primary" onClick={() => setIsExportModalOpen(true)}>
            <svg className="icon"><use href="#i-file" /></svg>
            📥 Export Executive Report
          </button>
        </div>
      </div>

      {/* 5-Column High-Impact KPI Intelligence Grid */}
      <div className="reports-kpis-grid">
        <div className="reports-kpi-card">
          <div className="reports-kpi-top">
            <span className="reports-kpi-label">Avg. Quality Audit Score</span>
            <span className="ops-kpi-icon gold">⭐</span>
          </div>
          <div className="reports-kpi-val">94.8%</div>
          <div className="reports-kpi-sub pos">
            <span>↑ +2.4 pts vs previous period</span>
          </div>
        </div>

        <div className="reports-kpi-card">
          <div className="reports-kpi-top">
            <span className="reports-kpi-label">5-Star Review Ratio</span>
            <span className="ops-kpi-icon green">🥂</span>
          </div>
          <div className="reports-kpi-val">98.6%</div>
          <div className="reports-kpi-sub pos">
            <span>248 Five-star reviews this month</span>
          </div>
        </div>

        <div className="reports-kpi-card">
          <div className="reports-kpi-top">
            <span className="reports-kpi-label">Checklist Compliance</span>
            <span className="ops-kpi-icon blue">📋</span>
          </div>
          <div className="reports-kpi-val">98.2%</div>
          <div className="reports-kpi-sub pos">
            <span>312 of 318 photo audits approved</span>
          </div>
        </div>

        <div className="reports-kpi-card">
          <div className="reports-kpi-top">
            <span className="reports-kpi-label">Maintenance Turnaround</span>
            <span className="ops-kpi-icon purple">⚡</span>
          </div>
          <div className="reports-kpi-val">1h 42m</div>
          <div className="reports-kpi-sub pos">
            <span>-38 min resolution turnaround</span>
          </div>
        </div>

        <div className="reports-kpi-card">
          <div className="reports-kpi-top">
            <span className="reports-kpi-label">Guest Issue / Refund Rate</span>
            <span className="ops-kpi-icon green">🛡️</span>
          </div>
          <div className="reports-kpi-val">0.3%</div>
          <div className="reports-kpi-sub pos">
            <span>Target: &lt; 1.5% ceiling (Saved €4.2k)</span>
          </div>
        </div>
      </div>

      {/* Main Analytics Charts: Quality Area Graph + Sector Yield Comparison */}
      <div className="reports-charts-grid">
        {/* Left Card: Operational Quality Trend Chart */}
        <div className="report-chart-card">
          <div className="report-chart-head">
            <div>
              <span className="section-eyebrow">QUALITY ASSURANCE TELEMETRY</span>
              <h3>Portfolio Quality & Turnover Compliance Trend</h3>
              <small>Daily autonomous photo audits vs on-time guest readiness ({period})</small>
            </div>
            <span className="status ok">Exceeding 92% SLA</span>
          </div>

          <div className="report-svg-wrap">
            <svg viewBox="0 0 720 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="qualityAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c59b4e" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#c59b4e" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="readinessAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.20" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Gridlines */}
              <line x1="0" y1="20" x2="720" y2="20" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="70" x2="720" y2="70" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="120" x2="720" y2="120" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="170" x2="720" y2="170" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 3" />

              {/* Quality Area Fill & Line (Gold) */}
              <path
                d="M 0 145 C 90 130, 150 140, 210 110 S 330 95, 390 90 S 510 65, 570 55 S 660 40, 720 32 L 720 200 L 0 200 Z"
                fill="url(#qualityAreaGrad)"
              />
              <path
                d="M 0 145 C 90 130, 150 140, 210 110 S 330 95, 390 90 S 510 65, 570 55 S 660 40, 720 32"
                fill="none"
                stroke="#c59b4e"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* On-Time Readiness Line (Emerald) */}
              <path
                d="M 0 165 C 80 150, 160 145, 230 135 S 350 115, 420 100 S 530 80, 600 70 S 680 55, 720 50"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeDasharray="5 4"
                strokeLinecap="round"
              />

              {/* Active High Point Glow Dot */}
              <circle cx="720" cy="32" r="5" fill="#c59b4e" />
              <circle cx="720" cy="32" r="9" fill="none" stroke="#c59b4e" strokeWidth="1.5" opacity="0.6" />
            </svg>
          </div>

          <div className="report-axis-x">
            <span>Sep 01</span>
            <span>Sep 08</span>
            <span>Sep 15</span>
            <span>Sep 22</span>
            <span>Oct 01 (Today)</span>
          </div>

          <div className="report-chart-legend">
            <div className="chart-legend-item">
              <span className="chart-legend-line" style={{ background: '#c59b4e' }}></span>
              <span>Photo Audit Quality Pass Rate (94.8%)</span>
            </div>
            <div className="chart-legend-item">
              <span className="chart-legend-line" style={{ background: '#10b981', borderTop: '2px dashed #10b981' }}></span>
              <span>On-Time Guest Readiness Delivery (98.2%)</span>
            </div>
          </div>
        </div>

        {/* Right Card: Sector Revenue Yield & ADR vs Market Index */}
        <div className="report-chart-card">
          <div className="report-chart-head">
            <div>
              <span className="section-eyebrow">MARKET YIELD BENCHMARKING</span>
              <h3>Average Daily Rate (ADR) by Sector</h3>
              <small>Zenstay premium vs Southern Brittany market benchmark</small>
            </div>
            <span className="badge-navy">+18% Premium</span>
          </div>

          <div className="sector-bars-list">
            <div className="sector-bar-item">
              <div className="sector-bar-top">
                <b>Carnac Plage & Menhirs</b>
                <span>€420 / night <small style={{ color: '#10b981', fontSize: 11 }}>(+18%)</small></span>
              </div>
              <div className="sector-bar-track">
                <div className="sector-bar-fill" style={{ width: '92%' }}></div>
              </div>
            </div>

            <div className="sector-bar-item">
              <div className="sector-bar-top">
                <b>Guidel-Plages Waterfront</b>
                <span>€450 / night <small style={{ color: '#10b981', fontSize: 11 }}>(+24%)</small></span>
              </div>
              <div className="sector-bar-track">
                <div className="sector-bar-fill" style={{ width: '98%' }}></div>
              </div>
            </div>

            <div className="sector-bar-item">
              <div className="sector-bar-top">
                <b>Quiberon Côte Sauvage</b>
                <span>€340 / night <small style={{ color: '#10b981', fontSize: 11 }}>(+15%)</small></span>
              </div>
              <div className="sector-bar-track">
                <div className="sector-bar-fill" style={{ width: '78%' }}></div>
              </div>
            </div>

            <div className="sector-bar-item">
              <div className="sector-bar-top">
                <b>La Trinité-sur-Mer Marina</b>
                <span>€310 / night <small style={{ color: '#10b981', fontSize: 11 }}>(+12%)</small></span>
              </div>
              <div className="sector-bar-track">
                <div className="sector-bar-fill" style={{ width: '70%' }}></div>
              </div>
            </div>

            <div className="sector-bar-item">
              <div className="sector-bar-top">
                <b>Arzon & Port du Crouesty</b>
                <span>€185 / night <small style={{ color: '#10b981', fontSize: 11 }}>(+9%)</small></span>
              </div>
              <div className="sector-bar-track">
                <div className="sector-bar-fill" style={{ width: '52%' }}></div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid var(--line-light)', fontSize: 11, color: 'var(--muted)' }}>
            💡 <b>Pricing Intelligence:</b> High-season dynamic pricing engine increased portfolio RevPAR by €38.40 per available room night.
          </div>
        </div>
      </div>

      {/* 2-Column Modules Grid: Room Audit Pass Rates + Channel Sentiment */}
      <div className="reports-modules-grid">
        {/* Module 1: Room-by-room Pass Rates */}
        <div className="report-module-card">
          <div className="report-chart-head">
            <div>
              <span className="section-eyebrow">QUALITY AUDIT BREAKDOWN</span>
              <h3>Turnaround Pass Rate by Room Area</h3>
              <small>Photographic validation across 318 executed inspections</small>
            </div>
            <span className="badge-gold">Top 1% Standards</span>
          </div>

          <div className="room-audit-list">
            <div className="room-audit-row">
              <div className="room-audit-left">
                <span>🛋️</span>
                <span>Living Room & Entry Foyer</span>
              </div>
              <b style={{ color: '#10b981' }}>99.4% (316 passed)</b>
            </div>

            <div className="room-audit-row">
              <div className="room-audit-left">
                <span>🛏️</span>
                <span>Master Suites & 400TC Linens</span>
              </div>
              <b style={{ color: '#10b981' }}>98.8% (314 passed)</b>
            </div>

            <div className="room-audit-row">
              <div className="room-audit-left">
                <span>🍽️</span>
                <span>Kitchen, Espresso & Wine Bar</span>
              </div>
              <b style={{ color: '#10b981' }}>96.5% (307 passed)</b>
            </div>

            <div className="room-audit-row">
              <div className="room-audit-left">
                <span>🏊</span>
                <span>Private Heated Pools & Spas</span>
              </div>
              <b style={{ color: 'var(--gold)' }}>94.2% (299 passed)</b>
            </div>

            <div className="room-audit-row">
              <div className="room-audit-left">
                <span>🌿</span>
                <span>Terrace, BBQ & Perimeter Lighting</span>
              </div>
              <b style={{ color: '#10b981' }}>97.1% (309 passed)</b>
            </div>
          </div>
        </div>

        {/* Module 2: Channel Sentiment Matrix */}
        <div className="report-module-card">
          <div className="report-chart-head">
            <div>
              <span className="section-eyebrow">GUEST EXPERIENCE & REVIEWS</span>
              <h3>Channel Sentiment & CSAT Matrix</h3>
              <small>Verified guest ratings across booking platforms</small>
            </div>
            <span className="badge-navy">4.96 ★ Overall</span>
          </div>

          <div className="channel-sentiment-grid">
            <div className="channel-sentiment-box">
              <b>Direct VIP Concierge</b>
              <div className="channel-sentiment-score">
                <span>4.99</span>
                <small style={{ fontSize: 13, color: 'var(--muted)' }}>★ / 5.0</small>
              </div>
              <small style={{ color: 'var(--muted)', fontSize: 11 }}>100% 5-Star Reviews (84 Stays)</small>
            </div>

            <div className="channel-sentiment-box">
              <b>Guesty Direct Engine</b>
              <div className="channel-sentiment-score">
                <span>4.96</span>
                <small style={{ fontSize: 13, color: 'var(--muted)' }}>★ / 5.0</small>
              </div>
              <small style={{ color: 'var(--muted)', fontSize: 11 }}>98.4% 5-Star Reviews (62 Stays)</small>
            </div>

            <div className="channel-sentiment-box">
              <b>Airbnb Superhost</b>
              <div className="channel-sentiment-score">
                <span>4.94</span>
                <small style={{ fontSize: 13, color: 'var(--muted)' }}>★ / 5.0</small>
              </div>
              <small style={{ color: 'var(--muted)', fontSize: 11 }}>97.8% 5-Star Reviews (110 Stays)</small>
            </div>

            <div className="channel-sentiment-box">
              <b>Booking.com Premier</b>
              <div className="channel-sentiment-score">
                <span>4.91</span>
                <small style={{ fontSize: 13, color: 'var(--muted)' }}>★ / 5.0</small>
              </div>
              <small style={{ color: 'var(--muted)', fontSize: 11 }}>96.2% 5-Star Reviews (56 Stays)</small>
            </div>
          </div>
        </div>
      </div>

      {/* Specialist Performance Leaderboard Table */}
      <div className="card reports-table-card">
        <div className="reports-table-top">
          <h3>
            <span>Turnaround Specialist Quality Leaderboard</span>
            <span className="badge-navy">Monthly Audit Ranking</span>
          </h3>
          <button
            className="btn"
            style={{ fontSize: 12 }}
            onClick={() => showToast('Exporting specialist performance scorecard (CSV)...')}
          >
            📊 Export Scorecards
          </button>
        </div>

        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>Specialist & Role</th>
                <th>Turnovers Executed</th>
                <th>Photo Audit Score</th>
                <th>On-Time Readiness</th>
                <th>Guest Praise</th>
                <th>Quality Bonus</th>
                <th>Compliance Dossier</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {specialists.map((spec, idx) => (
                <tr key={spec.name}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--gold)', minWidth: 16 }}>
                        #{idx + 1}
                      </span>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          background: 'var(--nav)',
                          color: '#fff',
                          fontSize: 11,
                          fontWeight: 800,
                          display: 'grid',
                          placeItems: 'center',
                          border: '1px solid var(--gold)'
                        }}
                      >
                        {spec.avatar}
                      </div>
                      <div>
                        <b style={{ fontSize: 13, color: 'var(--text)', display: 'block' }}>{spec.name}</b>
                        <small style={{ color: 'var(--muted)', fontSize: 11 }}>{spec.role}</small>
                      </div>
                    </div>
                  </td>

                  <td>
                    <b>{spec.jobs} Units</b>
                  </td>

                  <td>
                    <span className="status ok">{spec.passRate}</span>
                  </td>

                  <td>
                    <b style={{ color: '#10b981' }}>{spec.onTime}</b>
                  </td>

                  <td>
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{spec.reviews}</span>
                  </td>

                  <td>
                    <b style={{ color: 'var(--gold)' }}>{spec.bonus}</b>
                  </td>

                  <td>
                    <span className="badge-live" style={{ fontSize: 10 }}>● {spec.compliance}</span>
                  </td>

                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="btn"
                      style={{ padding: '4px 10px', fontSize: 11 }}
                      onClick={() => showToast(`Dossier opened for ${spec.name}`)}
                    >
                      Dossier →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Executive Report Export Modal */}
      {isExportModalOpen && (
        <div className="ops-modal-backdrop" onClick={() => setIsExportModalOpen(false)}>
          <div className="ops-modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: 540 }}>
            <div className="ops-modal-head">
              <div>
                <span className="section-eyebrow">EXECUTIVE INTELLIGENCE EXPORT</span>
                <h3>Generate Portfolio Analytics Report</h3>
              </div>
              <button className="iconbtn" onClick={() => setIsExportModalOpen(false)}>✕</button>
            </div>

            <div className="ops-modal-body">
              <div className="ops-form-group">
                <label>Export Format</label>
                <select defaultValue="pdf">
                  <option value="pdf">Boardroom Executive PDF Presentation (300 DPI)</option>
                  <option value="excel">Comprehensive Excel Ledger & KPI Matrix (.xlsx)</option>
                  <option value="csv">Standard French FEC Accounting & Audit CSV</option>
                </select>
              </div>

              <div className="ops-form-group">
                <label>Reporting Period</label>
                <select defaultValue="30d">
                  <option value="30d">September – October 2026 (Monthly Closing)</option>
                  <option value="q3">Q3 2026 Full Quarter Review</option>
                  <option value="ytd">Year-to-Date 2026 Full Portfolio</option>
                </select>
              </div>

              <div className="ops-form-group">
                <label>Sections Included</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, textTransform: 'none', color: 'var(--text)' }}>
                    <input type="checkbox" defaultChecked />
                    <span>Quality Assurance & Photo Audit Pass Rates</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, textTransform: 'none', color: 'var(--text)' }}>
                    <input type="checkbox" defaultChecked />
                    <span>Sector ADR & RevPAR Benchmark vs Regional Market</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, textTransform: 'none', color: 'var(--text)' }}>
                    <input type="checkbox" defaultChecked />
                    <span>Specialist League Scorecards & URSSAF Compliance</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, textTransform: 'none', color: 'var(--text)' }}>
                    <input type="checkbox" defaultChecked />
                    <span>Channel CSAT & Guest Review Transcripts</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="ops-modal-foot">
              <button className="btn" onClick={() => setIsExportModalOpen(false)}>Cancel</button>
              <button
                className="btn primary"
                onClick={() => {
                  setIsExportModalOpen(false);
                  showToast('Executive PDF generated and downloaded to your device!');
                }}
              >
                📥 Download Executive PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
