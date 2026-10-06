import { ZenImage } from '../components/ZenImage';

export function HkHome() {
  return (
    <div className="housekeeper-home-root">
      <div className="hk-hero">
        <div>
          <h2>Bonjour Marie 👋</h2>
          <p>You have 5 assignments scheduled across Carnac and La Trinité today. Next turnover starts at 10:00.</p>
        </div>
        <div className="hk-rev">
          <span>October Projected Earnings</span>
          <b>€2,860.00</b>
          <span style={{ color: '#bad0e0' }}>€1,740.00 approved & paid</span>
        </div>
      </div>

      <div className="grid kpis">
        <div className="card kpi">
          <span className="label">TODAY'S JOBS</span>
          <div className="value">5</div>
          <div className="delta">3 check-outs • 2 check-ins</div>
        </div>
        <div className="card kpi">
          <span className="label">ACTION REQUIRED</span>
          <div className="value">2</div>
          <div className="delta warn">Photo sign-off needed</div>
        </div>
        <div className="card kpi">
          <span className="label">AUDIT SCORE</span>
          <div className="value">96.8%</div>
          <div className="delta">Top 5% in Brittany Sector</div>
        </div>
        <div className="card kpi">
          <span className="label">5★ GUEST RATINGS</span>
          <div className="value">14</div>
          <div className="delta">This month</div>
        </div>
      </div>

      <div className="grid hk-grid" style={{ gridTemplateColumns: '1.3fr 0.7fr', gap: 16 }}>
        <div>
          <div className="card" style={{ padding: 18 }}>
            <div className="cardhead">
              <h3>Today's Turnaround Sequence</h3>
              <span className="badge-navy">GEO-TRACKED ROUTE</span>
            </div>
            <div className="nextcards">
              <div className="nexttask" style={{ gridTemplateColumns: '60px 70px 1fr auto', gap: 14 }}>
                <time style={{ fontWeight: 800 }}>10:00</time>
                <div style={{ width: 64, height: 48, borderRadius: 8, overflow: 'hidden' }}>
                  <ZenImage
                    src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=140&q=80"
                    alt="Villa Les Embruns"
                    aspectRatio="4/3"
                  />
                </div>
                <div>
                  <h4>Villa Les Embruns</h4>
                  <p>Check-out & turnover • 18 checklist items • €92.50</p>
                </div>
                <span className="status info">Start Job</span>
              </div>

              <div className="nexttask" style={{ gridTemplateColumns: '60px 70px 1fr auto', gap: 14 }}>
                <time style={{ fontWeight: 800 }}>13:30</time>
                <div style={{ width: 64, height: 48, borderRadius: 8, overflow: 'hidden' }}>
                  <ZenImage
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=140&q=80"
                    alt="Maison Moriconi"
                    aspectRatio="4/3"
                  />
                </div>
                <div>
                  <h4>Maison Moriconi</h4>
                  <p>Pre-arrival setup • arrival 16:00 • €38.00</p>
                </div>
                <span className="status wait">Upcoming</span>
              </div>

              <div className="nexttask" style={{ gridTemplateColumns: '60px 70px 1fr auto', gap: 14 }}>
                <time style={{ fontWeight: 800 }}>15:00</time>
                <div style={{ width: 64, height: 48, borderRadius: 8, overflow: 'hidden' }}>
                  <ZenImage
                    src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=140&q=80"
                    alt="Villa Guidel"
                    aspectRatio="4/3"
                  />
                </div>
                <div>
                  <h4>Villa Guidel</h4>
                  <p>Shared deep clean with Sophie M. • €140.00</p>
                </div>
                <span className="status wait">Shared</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card check" style={{ padding: 18 }}>
          <div className="cardhead">
            <h3>Supervisor Action Center</h3>
            <span className="status bad">3 Pending</span>
          </div>
          <div className="checkline">
            <input type="checkbox" id="chk1" />
            <label htmlFor="chk1">Upload master bedroom photos — Villa Océane</label>
          </div>
          <div className="checkline">
            <input type="checkbox" id="chk2" />
            <label htmlFor="chk2">Confirm shared intervention completion — Villa Guidel</label>
          </div>
          <div className="checkline">
            <input type="checkbox" id="chk3" />
            <label htmlFor="chk3">Renew micro-enterprise URSSAF compliance attestation</label>
          </div>

          <div style={{ marginTop: 24, padding: 14, borderRadius: 10, background: 'var(--card2)', border: '1px solid var(--line)' }}>
            <b>Field Support Hotline</b>
            <p style={{ margin: '4px 0 0', fontSize: 11, color: 'var(--muted)' }}>
              Operations Desk: +33 (0)2 97 88 40 00 • Radio channel 4
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
