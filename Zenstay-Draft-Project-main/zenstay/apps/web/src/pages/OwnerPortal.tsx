import { useState, useEffect } from 'react';
import { ZenImage } from '../components/ZenImage';
import { fetchApi, API_URL } from '../api';

export function OwnerPortal() {
  const [activeTab, setActiveTab] = useState<'overview' | 'statements' | 'maintenance' | 'properties'>('overview');
  const [selectedProperty, setSelectedProperty] = useState('all');
  const [ownerId, setOwnerId] = useState<string | null>(null);

  useEffect(() => {
    async function loadOwner() {
      try {
        const owners = await fetchApi('/owners');
        if (owners.length > 0) {
          setOwnerId(owners[0].id);
        } else {
          // Fallback mock owner ID
          setOwnerId('mock-owner-123');
        }
      } catch (err) {
        console.error('Failed to load owner', err);
        setOwnerId('mock-owner-123');
      }
    }
    loadOwner();
  }, []);

  const handleDownloadCrg = (monthIdx: number, year: number = 2026) => {
    if (!ownerId) return;
    
    // In a real app with proper auth cookies we might just window.open or fetch blob
    // For this mock, we'll use window.open pointing to the API route (assuming no strict auth header on the download route for demo)
    const token = localStorage.getItem('token');
    
    // We'll do a direct fetch and trigger browser download
    fetch(`${API_URL}/owners/${ownerId}/crg/download?month=${monthIdx}&year=${year}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `CRG_${year}_${monthIdx}_${ownerId.substring(0, 6)}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(err => {
        console.error('Download failed', err);
        alert('CRG PDF generation failed. Is the API running?');
      });
  };

  const portfolio = [
    {
      id: 'prop-1',
      name: 'Villa Les Embruns',
      location: 'Carnac, Brittany',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
      revenueYtd: '€64,280',
      occupancy: '91.4%',
      adr: '€380',
      upcomingBookings: 8,
      status: 'In Good Standing'
    },
    {
      id: 'prop-2',
      name: 'Maison Moriconi',
      location: 'La Trinité-sur-Mer',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      revenueYtd: '€42,150',
      occupancy: '88.2%',
      adr: '€240',
      upcomingBookings: 5,
      status: 'In Good Standing'
    }
  ];

  const expenses = [
    { id: 'EXP-104', prop: 'Villa Les Embruns', date: 'Sep 28, 2026', desc: 'Pool heating pump sensor replacement', vendor: 'Carnac Plomberie', amount: '€280.00', status: 'Approved' },
    { id: 'EXP-103', prop: 'Maison Moriconi', date: 'Sep 24, 2026', desc: 'Quarterly garden landscaping & hedge trimming', vendor: 'Bretagne Espaces Verts', amount: '€350.00', status: 'Approved' },
    { id: 'EXP-102', prop: 'Villa Les Embruns', date: 'Sep 19, 2026', desc: 'High-thread organic linen inventory replenishment', vendor: 'Linvosges Pro', amount: '€420.00', status: 'Approved' },
    { id: 'EXP-101', prop: 'Villa Les Embruns', date: 'Sep 10, 2026', desc: 'Smart lock battery replacement & annual calibration', vendor: 'Nuki Certified Tech', amount: '€85.00', status: 'Approved' }
  ];

  const statements = [
    { monthStr: 'September 2026', monthIdx: 9, year: 2026, gross: '€18,420.00', fee: '€2,763.00', exp: '€1,135.00', net: '€14,522.00', payoutDate: 'Oct 3, 2026', status: 'Ready for Payout' },
    { monthStr: 'August 2026', monthIdx: 8, year: 2026, gross: '€24,800.00', fee: '€3,720.00', exp: '€940.00', net: '€20,140.00', payoutDate: 'Sep 3, 2026', status: 'Disbursed' },
    { monthStr: 'July 2026', monthIdx: 7, year: 2026, gross: '€26,450.00', fee: '€3,967.50', exp: '€1,420.00', net: '€21,062.50', payoutDate: 'Aug 3, 2026', status: 'Disbursed' },
    { monthStr: 'June 2026', monthIdx: 6, year: 2026, gross: '€17,900.00', fee: '€2,685.00', exp: '€680.00', net: '€14,535.00', payoutDate: 'Jul 3, 2026', status: 'Disbursed' }
  ];

  return (
    <div className="owner-portal-root">
      {/* Page Header */}
      <div className="pagehead">
        <div>
          <span className="section-eyebrow">OWNER ASSET PORTAL</span>
          <h2>Portfolio Performance & Yield</h2>
          <p>Institutional financial clarity and property operations for <strong>Baron & Mme de Montmirail</strong>.</p>
        </div>
        <div className="actions">
          <select
            className="filter"
            value={selectedProperty}
            onChange={e => setSelectedProperty(e.target.value)}
          >
            <option value="all">All Managed Properties (2)</option>
            <option value="embruns">Villa Les Embruns</option>
            <option value="moriconi">Maison Moriconi</option>
          </select>
          <button className="btn primary" onClick={() => handleDownloadCrg(9, 2026)}>
            Download Sept 2026 Statement (PDF)
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid kpis">
        <div className="card kpi">
          <div className="kpi-top">
            <span className="label">SEPTEMBER NET REVENUE</span>
            <span className="iconbox green">€</span>
          </div>
          <div className="value">€14,522.00</div>
          <div className="delta">↑ 16.4% vs Sept 2025</div>
        </div>

        <div className="card kpi">
          <div className="kpi-top">
            <span className="label">2026 YTD NET DISTRIBUTIONS</span>
            <span className="iconbox blue">€</span>
          </div>
          <div className="value">€106,430.00</div>
          <div className="delta">Target yield: 8.8%</div>
        </div>

        <div className="card kpi">
          <div className="kpi-top">
            <span className="label">AVERAGE OCCUPANCY</span>
            <span className="iconbox amber">%</span>
          </div>
          <div className="value">89.8%</div>
          <div className="delta">+6.2% vs Regional Benchmark</div>
        </div>

        <div className="card kpi">
          <div className="kpi-top">
            <span className="label">NEXT PAYOUT DATE</span>
            <span className="iconbox purple">📅</span>
          </div>
          <div className="value">Oct 3, 2026</div>
          <div className="delta">IBAN •••• 4910 via SEPA Instant</div>
        </div>
      </div>

      {/* Owner Nav Tabs */}
      <div className="traveler-nav-tabs" style={{ margin: '20px 0' }}>
        <button
          className={`traveler-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Performance & Portfolio
        </button>
        <button
          className={`traveler-tab ${activeTab === 'statements' ? 'active' : ''}`}
          onClick={() => setActiveTab('statements')}
        >
          Monthly P&L Statements
        </button>
        <button
          className={`traveler-tab ${activeTab === 'maintenance' ? 'active' : ''}`}
          onClick={() => setActiveTab('maintenance')}
        >
          Itemized Maintenance & Expenses
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="owner-overview-grid">
          <div className="card chartcard">
            <div className="cardhead">
              <div>
                <h3>Gross Rental Revenue vs Net Owner Yield (2026)</h3>
                <small>Updated via real-time Guesty PMS reconciliation</small>
              </div>
              <span className="badge-gold">8.8% NET YIELD</span>
            </div>
            <div className="chart">
              <svg viewBox="0 0 720 220" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="ownerGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c59b4e" stopOpacity=".3" />
                    <stop offset="100%" stopColor="#c59b4e" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path className="gridline" d="M0 35H720M0 85H720M0 135H720M0 185H720" />
                <path className="area" fill="url(#ownerGrad)" d="M0 180 C80 160, 160 140, 240 100 S400 60, 480 30 S600 45, 720 40 L720 220 L0 220 Z" />
                <path className="line" stroke="#c59b4e" strokeWidth="3" fill="none" d="M0 180 C80 160, 160 140, 240 100 S400 60, 480 30 S600 45, 720 40" />
              </svg>
            </div>
            <div className="chart-labels">
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct (Forecast)</span>
            </div>
          </div>

          {/* Properties Showcase */}
          <div className="owner-properties-list">
            {portfolio.map(p => (
              <div key={p.id} className="card owner-prop-card">
                <ZenImage
                  src={p.image}
                  alt={p.name}
                  aspectRatio="16/9"
                />
                <div className="owner-prop-body">
                  <div className="prop-title-row">
                    <div>
                      <h4>{p.name}</h4>
                      <small>{p.location}</small>
                    </div>
                    <span className="status ok">{p.status}</span>
                  </div>
                  <div className="owner-prop-metrics">
                    <div>
                      <span>2026 YTD REVENUE</span>
                      <b>{p.revenueYtd}</b>
                    </div>
                    <div>
                      <span>OCCUPANCY</span>
                      <b>{p.occupancy}</b>
                    </div>
                    <div>
                      <span>ADR AVERAGE</span>
                      <b>{p.adr}</b>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Monthly Statements */}
      {activeTab === 'statements' && (
        <div className="card tablecard">
          <div className="tabletop">
            <div>
              <h3>Institutional P&L Statements</h3>
              <small>Certified monthly distributions compliant with French fiscal regulations</small>
            </div>
            <button className="btn" onClick={() => alert('Full year statements exported in ZIP.')}>Export All Statements</button>
          </div>
          <div className="tablewrap">
            <table>
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Gross Bookings</th>
                  <th>Management Fee (15%)</th>
                  <th>Expenses & Maintenance</th>
                  <th>Net Disbursed</th>
                  <th>Disbursement Date</th>
                  <th>Status</th>
                  <th>Statement</th>
                </tr>
              </thead>
              <tbody>
                {statements.map((s, idx) => (
                  <tr key={idx}>
                    <td><b>{s.monthStr}</b></td>
                    <td>{s.gross}</td>
                    <td>{s.fee}</td>
                    <td>{s.exp}</td>
                    <td><b style={{ color: '#10b981' }}>{s.net}</b></td>
                    <td>{s.payoutDate}</td>
                    <td><span className={`status ${s.status === 'Disbursed' ? 'ok' : 'wait'}`}>{s.status}</span></td>
                    <td>
                      <button className="btn-link" onClick={() => handleDownloadCrg(s.monthIdx, s.year)}>
                        PDF ↓
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Maintenance Ledger */}
      {activeTab === 'maintenance' && (
        <div className="card tablecard">
          <div className="tabletop">
            <div>
              <h3>Itemized Property Maintenance Ledger</h3>
              <small>All receipts verified with photographic proof and contractor sign-off</small>
            </div>
            <span className="badge-navy">AUTO-APPROVED UNDER €500 THRESHOLD</span>
          </div>
          <div className="tablewrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Property</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Vendor</th>
                  <th>Amount</th>
                  <th>Receipt</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map(e => (
                  <tr key={e.id}>
                    <td><code>{e.id}</code></td>
                    <td><b>{e.prop}</b></td>
                    <td>{e.date}</td>
                    <td>{e.desc}</td>
                    <td>{e.vendor}</td>
                    <td><b>{e.amount}</b></td>
                    <td>
                      <button className="btn-link" onClick={() => alert(`Viewing receipt for ${e.id}`)}>
                        View Receipt ↗
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
