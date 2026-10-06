import { useState } from 'react';
import { ZenImage } from '../components/ZenImage';

export function Overview({ role }: { role: 'manager' | 'housekeeper' }) {
  const [filterStatus, setFilterStatus] = useState('All');

  const operations = [
    {
      p: 'Villa Les Embruns',
      loc: 'Carnac',
      img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=140&q=80',
      type: 'Check-out & Turnover',
      time: '10:00',
      who: 'Marie Le Guen',
      cl: '18 / 18 Verified',
      status: 'Ready for Guest',
      klass: 'ok',
      amt: '€185.00'
    },
    {
      p: 'Maison Moriconi',
      loc: 'La Trinité',
      img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=140&q=80',
      type: 'VIP Check-in Prep',
      time: '13:30',
      who: 'Marie Le Guen',
      cl: '8 / 8 Verified',
      status: 'Ready for Guest',
      klass: 'ok',
      amt: '€120.00'
    },
    {
      p: 'Villa Guidel',
      loc: 'Guidel-Plages',
      img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=140&q=80',
      type: 'Deep Clean & Pool Check',
      time: '15:00',
      who: 'Sophie Martin',
      cl: '4 / 22 Checklist',
      status: 'In Progress (Delayed)',
      klass: 'bad',
      amt: '€200.00'
    },
    {
      p: 'Appartement Kerjouanno',
      loc: 'Arzon',
      img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=140&q=80',
      type: 'Check-in Readiness',
      time: '16:00',
      who: 'Julie Renaud',
      cl: '8 / 8 Verified',
      status: 'Ready for Guest',
      klass: 'ok',
      amt: '€95.00'
    },
    {
      p: 'Maison de la Plage',
      loc: 'Quiberon',
      img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=140&q=80',
      type: 'Full Turnover',
      time: '17:00',
      who: 'Sophie Martin',
      cl: '18 / 18 Verified',
      status: 'Completed',
      klass: 'ok',
      amt: '€152.00'
    }
  ];

  const filteredOps = operations.filter(o => {
    if (filterStatus === 'All') return true;
    if (filterStatus === 'Ready') return o.klass === 'ok';
    if (filterStatus === 'Attention') return o.klass === 'bad';
    return true;
  });

  return (
    <div className="overview-page-root">
      {/* Page Header */}
      <div className="pagehead">
        <div>
          <span className="section-eyebrow">ENTERPRISE CONTROL CENTER</span>
          <h2>Good morning, {role === 'manager' ? 'Albert' : 'Marie'}</h2>
          <p>Thursday, 1 October 2026 • Live telemetry across 350 managed European properties.</p>
        </div>
        <div className="actions">
          <span className="badge-live">● Guesty Synchronized</span>
          <button className="btn primary" onClick={() => alert('New intervention dispatch modal opened.')}>
            + Dispatch Intervention
          </button>
        </div>
      </div>

      {/* Primary KPI Row */}
      <div className="grid kpis" style={{ gridTemplateColumns: 'repeat(5, minmax(0, 1fr))' }}>
        <div className="card kpi">
          <div className="kpi-top">
            <span className="label">TODAY'S ARRIVALS</span>
            <span className="iconbox blue">✈</span>
          </div>
          <div className="value">28 Stays</div>
          <div className="delta">↑ 6 from yesterday</div>
        </div>

        <div className="card kpi">
          <div className="kpi-top">
            <span className="label">TODAY'S DEPARTURES</span>
            <span className="iconbox amber">🚪</span>
          </div>
          <div className="value">24 Units</div>
          <div className="delta">100% check-out verified</div>
        </div>

        <div className="card kpi">
          <div className="kpi-top">
            <span className="label">FLEET OCCUPANCY</span>
            <span className="iconbox green">%</span>
          </div>
          <div className="value">94.8%</div>
          <div className="delta">+18.4% YoY vs Regional</div>
        </div>

        <div className="card kpi">
          <div className="kpi-top">
            <span className="label">ACTIVE FLEET</span>
            <span className="iconbox purple">🏠</span>
          </div>
          <div className="value">350 Units</div>
          <div className="delta">344 online • 6 turnover</div>
        </div>

        <div className="card kpi">
          <div className="kpi-top">
            <span className="label">MONTHLY REVENUE</span>
            <span className="iconbox gold">€</span>
          </div>
          <div className="value">€148.2K</div>
          <div className="delta">On track vs forecast</div>
        </div>
      </div>

      {/* Main Charts & Side Panels */}
      <div className="grid dash-main">
        <div className="card chartcard">
          <div className="cardhead">
            <div>
              <h3>Turnaround Velocity & Guest Arrivals</h3>
              <small>Real-time 14-day operational throughput (Guesty Webhook Feed)</small>
            </div>
            <div className="seg">
              <button className="active">14D</button>
              <button>30D</button>
              <button>90D</button>
            </div>
          </div>

          <div className="chart">
            <svg viewBox="0 0 720 220" preserveAspectRatio="none">
              <defs>
                <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity=".28" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path className="gridline" d="M0 35H720M0 85H720M0 135H720M0 185H720" />
              <path className="area" fill="url(#blueGrad)" d="M0 172 C45 150,65 156,100 138 S170 135,205 115 S270 92,310 110 S380 132,420 104 S490 79,530 90 S610 70,650 53 S700 45,720 38 L720 220 L0 220 Z" />
              <path className="line" stroke="#2563eb" strokeWidth="3" fill="none" d="M0 172 C45 150,65 156,100 138 S170 135,205 115 S270 92,310 110 S380 132,420 104 S490 79,530 90 S610 70,650 53 S700 45,720 38" />
            </svg>
          </div>

          <div className="chart-labels">
            <span>Sep 18</span>
            <span>Sep 21</span>
            <span>Sep 24</span>
            <span>Sep 27</span>
            <span>Sep 30</span>
            <span>Today (Oct 1)</span>
          </div>

          <div className="legend">
            <span>Completed Interventions (99.4%)</span>
            <span>Same-Day Guest Arrivals</span>
          </div>
        </div>

        {/* Side Column: Readiness & Live Activity */}
        <div className="sidecol">
          <div className="card readiness">
            <div className="cardhead">
              <h3>Next VIP Arrivals</h3>
              <small>Pre-check readiness</small>
            </div>

            <div className="ready-row">
              <div className="overview-thumb">
                <ZenImage
                  src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=120&q=80"
                  alt="Villa Les Embruns"
                  aspectRatio="1/1"
                />
              </div>
              <div>
                <b>Villa Les Embruns</b>
                <small>Arrival 15:00 • Laurent de Montmirail (4)</small>
              </div>
              <span className="status ok">Ready</span>
            </div>

            <div className="ready-row">
              <div className="overview-thumb">
                <ZenImage
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=120&q=80"
                  alt="Maison Moriconi"
                  aspectRatio="1/1"
                />
              </div>
              <div>
                <b>Maison Moriconi</b>
                <small>Arrival 16:00 • Claire Delacroix (2)</small>
              </div>
              <span className="status ok">Ready</span>
            </div>

            <div className="ready-row">
              <div className="overview-thumb">
                <ZenImage
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=120&q=80"
                  alt="Villa Guidel"
                  aspectRatio="1/1"
                />
              </div>
              <div>
                <b>Villa Guidel</b>
                <small>Arrival 17:30 • Henrik Lindqvist (8)</small>
              </div>
              <span className="status bad">Attention</span>
            </div>
          </div>

          {/* Live Activity Feed */}
          <div className="card activity">
            <div className="cardhead">
              <h3>Live Operations Stream</h3>
              <small>Instant Telemetry</small>
            </div>
            <div className="feed">
              <div className="feeditem">
                <div className="feedicon">✓</div>
                <div>
                  <b>Turnaround Photo Audit Passed</b>
                  <p>Marie verified 18/18 checklist items for Villa Océane.</p>
                  <time>4 mins ago</time>
                </div>
              </div>
              <div className="feeditem">
                <div className="feedicon">💳</div>
                <div>
                  <b>Stripe Security Deposit Hold</b>
                  <p>€1,500.00 pre-authorized for Stay #ZEN-88402.</p>
                  <time>12 mins ago</time>
                </div>
              </div>
              <div className="feeditem">
                <div className="feedicon">🔑</div>
                <div>
                  <b>Smart Lock PIN Generated</b>
                  <p>Nuki keypad synced code 8402# for Villa Les Embruns.</p>
                  <time>19 mins ago</time>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real Operations Table */}
      <div className="card tablecard" style={{ marginTop: 24 }}>
        <div className="tabletop">
          <div>
            <h3>Today's Turnaround Interventions</h3>
            <small>Live field execution linked to Guesty checkout schedule</small>
          </div>
          <div className="filters">
            <select
              className="filter"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Ready">Ready for Guest</option>
              <option value="Attention">Attention Needed</option>
            </select>
            <button className="filter" onClick={() => alert('CSV exported.')}>Export CSV</button>
          </div>
        </div>

        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>Property</th>
                <th>Intervention Type</th>
                <th>Target Time</th>
                <th>Specialist</th>
                <th>Audit Checklist</th>
                <th>Status</th>
                <th>Fee</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOps.map((op, idx) => (
                <tr key={idx}>
                  <td>
                    <div className="propertycell">
                      <div className="overview-thumb sm">
                        <ZenImage src={op.img} alt={op.p} aspectRatio="1/1" />
                      </div>
                      <div>
                        <b>{op.p}</b>
                        <small style={{ color: 'var(--muted)', display: 'block' }}>{op.loc}</small>
                      </div>
                    </div>
                  </td>
                  <td>{op.type}</td>
                  <td><b>{op.time}</b></td>
                  <td>
                    <div className="person">
                      <div className="avatar sm">{op.who.split(' ').map(x => x[0]).join('')}</div>
                      {op.who}
                    </div>
                  </td>
                  <td>
                    <span className="checklist-tag">{op.cl}</span>
                  </td>
                  <td>
                    <span className={`status ${op.klass}`}>{op.status}</span>
                  </td>
                  <td><b>{op.amt}</b></td>
                  <td>
                    <button className="btn-link" onClick={() => alert(`Inspecting ${op.p}`)}>
                      Audit Proof →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
