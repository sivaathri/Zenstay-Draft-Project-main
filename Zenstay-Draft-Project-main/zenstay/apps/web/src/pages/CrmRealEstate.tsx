import { useState } from 'react';
import { ZenImage } from '../components/ZenImage';

interface Lead {
  id: string;
  ownerName: string;
  propertyName: string;
  location: string;
  estimatedUnits: string;
  projectedArr: string;
  stage: 'New Lead' | 'Valuation & Audit' | 'Proposal Sent' | 'Contract Review' | 'Onboarded';
  image: string;
  lastContact: string;
  notes: string;
}

export function CrmRealEstate() {
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const leads: Lead[] = [
    {
      id: 'LEAD-201',
      ownerName: 'Comte de Rohan-Chabot',
      propertyName: 'Château du Golfe',
      location: 'Arzon, Golfe du Morbihan',
      estimatedUnits: '6 Luxury Suites',
      projectedArr: '€185,000 / yr',
      stage: 'New Lead',
      image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80',
      lastContact: 'Yesterday via Private Referral',
      notes: 'Historical seaside estate requiring full concierge management and high-end seasonal tenant selection.'
    },
    {
      id: 'LEAD-202',
      ownerName: 'Dr. Édouard Valmont',
      propertyName: 'Villa Bel-Air',
      location: 'La Baule-Escoublac',
      estimatedUnits: '4-Bed Oceanfront Villa',
      projectedArr: '€120,000 / yr',
      stage: 'Valuation & Audit',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=80',
      lastContact: 'Sep 29 • Audit Completed',
      notes: 'Inspection score 96/100. Owner wants Guesty calendar integration with 4 blackout weeks for family use.'
    },
    {
      id: 'LEAD-203',
      ownerName: 'Sybille de La Tour',
      propertyName: 'Résidence de l’Océan',
      location: 'Quiberon Centre',
      estimatedUnits: '3 Penthouse Apartments',
      projectedArr: '€140,000 / yr',
      stage: 'Proposal Sent',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80',
      lastContact: 'Sep 27 • 18% Management Fee Proposed',
      notes: 'Draft proposal presented with full housekeeping turnaround service and dynamic pricing optimization.'
    },
    {
      id: 'LEAD-204',
      ownerName: 'Marc & Hélène Fontaine',
      propertyName: 'Maison de la Plage',
      location: 'Quiberon',
      estimatedUnits: '1 Waterfront Villa',
      projectedArr: '€78,000 / yr',
      stage: 'Contract Review',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80',
      lastContact: 'Today • Sent via YouSign',
      notes: 'Standard 24-month exclusive hospitality mandate currently under review by owner counsel.'
    }
  ];

  const stages: Lead['stage'][] = ['New Lead', 'Valuation & Audit', 'Proposal Sent', 'Contract Review', 'Onboarded'];

  return (
    <div className="crm-root">
      <div className="pagehead">
        <div>
          <span className="section-eyebrow">PORTFOLIO EXPANSION & ACQUISITIONS</span>
          <h2>Real Estate CRM & Owner Pipeline</h2>
          <p>Institutional tracking of luxury European properties entering the ZENSTAY management network.</p>
        </div>
        <div className="actions">
          <div className="seg">
            <button className={viewMode === 'kanban' ? 'active' : ''} onClick={() => setViewMode('kanban')}>
              Pipeline Kanban
            </button>
            <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')}>
              Table View
            </button>
          </div>
          <button className="btn primary" onClick={() => alert('New lead acquisition modal opened.')}>
            + Add Property Lead
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid kpis">
        <div className="card kpi">
          <div className="kpi-top"><span className="label">PIPELINE VALUE</span><span className="iconbox gold">€</span></div>
          <div className="value">€523,000</div>
          <div className="delta">Annual management potential</div>
        </div>
        <div className="card kpi">
          <div className="kpi-top"><span className="label">ACTIVE LEADS</span><span className="iconbox blue">🏠</span></div>
          <div className="value">14 Properties</div>
          <div className="delta">8 villas • 6 apartments</div>
        </div>
        <div className="card kpi">
          <div className="kpi-top"><span className="label">AVG COMMISSION</span><span className="iconbox green">%</span></div>
          <div className="value">17.8%</div>
          <div className="delta">Includes full turnarounds</div>
        </div>
        <div className="card kpi">
          <div className="kpi-top"><span className="label">WIN RATE</span><span className="iconbox purple">🏆</span></div>
          <div className="value">74.2%</div>
          <div className="delta">vs Traditional Real Estate Agencies</div>
        </div>
      </div>

      {/* Kanban Board */}
      {viewMode === 'kanban' && (
        <div className="crm-kanban-board">
          {stages.map(stage => {
            const stageLeads = leads.filter(l => l.stage === stage);
            return (
              <div key={stage} className="crm-column">
                <div className="crm-column-header">
                  <span>{stage}</span>
                  <span className="count-pill">{stageLeads.length}</span>
                </div>
                <div className="crm-column-body">
                  {stageLeads.map(lead => (
                    <div key={lead.id} className="card crm-lead-card" onClick={() => setSelectedLead(lead)}>
                      <ZenImage
                        src={lead.image}
                        alt={lead.propertyName}
                        aspectRatio="16/9"
                      />
                      <div className="crm-card-content">
                        <h4>{lead.propertyName}</h4>
                        <p className="location-txt">{lead.location}</p>
                        <div className="crm-specs">
                          <span>👤 {lead.ownerName}</span>
                          <span className="arr-pill">{lead.projectedArr}</span>
                        </div>
                        <small className="last-contact">{lead.lastContact}</small>
                      </div>
                    </div>
                  ))}
                  {stageLeads.length === 0 && (
                    <div className="crm-empty-col">No leads in this stage</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'list' && (
        <div className="card tablecard">
          <div className="tablewrap">
            <table>
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Owner</th>
                  <th>Location</th>
                  <th>Units</th>
                  <th>Projected Revenue</th>
                  <th>Stage</th>
                  <th>Last Activity</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {leads.map(lead => (
                  <tr key={lead.id} onClick={() => setSelectedLead(lead)} style={{ cursor: 'pointer' }}>
                    <td><b>{lead.propertyName}</b></td>
                    <td>{lead.ownerName}</td>
                    <td>{lead.location}</td>
                    <td>{lead.estimatedUnits}</td>
                    <td><b style={{ color: '#c59b4e' }}>{lead.projectedArr}</b></td>
                    <td><span className="status wait">{lead.stage}</span></td>
                    <td>{lead.lastContact}</td>
                    <td><button className="iconbtn">→</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Lead Detail Drawer */}
      {selectedLead && (
        <div className="modal-backdrop" onClick={() => setSelectedLead(null)}>
          <div className="drawer open" onClick={e => e.stopPropagation()} style={{ width: 560 }}>
            <div className="drawer-head">
              <div>
                <span className="badge-gold">{selectedLead.id} • {selectedLead.stage}</span>
                <h3>{selectedLead.propertyName}</h3>
              </div>
              <button className="iconbtn" onClick={() => setSelectedLead(null)}>✕</button>
            </div>
            <div className="drawer-body">
              <ZenImage src={selectedLead.image} alt={selectedLead.propertyName} aspectRatio="16/9" />
              <div className="detail-grid" style={{ marginTop: 16 }}>
                <div className="detailbox">
                  <span>OWNER</span>
                  <b>{selectedLead.ownerName}</b>
                </div>
                <div className="detailbox">
                  <span>LOCATION</span>
                  <b>{selectedLead.location}</b>
                </div>
                <div className="detailbox">
                  <span>PORTFOLIO SIZE</span>
                  <b>{selectedLead.estimatedUnits}</b>
                </div>
                <div className="detailbox">
                  <span>PROJECTED ARR</span>
                  <b style={{ color: '#c59b4e' }}>{selectedLead.projectedArr}</b>
                </div>
              </div>

              <h4 style={{ marginTop: 20 }}>Audit Notes & Strategy</h4>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--text)' }}>
                {selectedLead.notes}
              </p>

              <h4 style={{ marginTop: 20 }}>Activity Timeline</h4>
              <div className="timeline">
                <div className="tline">
                  <p><strong>Initial discovery inquiry</strong> via luxury estate agency partner</p>
                  <small>5 days ago</small>
                </div>
                <div className="tline">
                  <p><strong>Physical property condition inspection</strong> passed with 96/100 readiness score</p>
                  <small>2 days ago</small>
                </div>
                <div className="tline">
                  <p><strong>Commercial mandate contract</strong> generated and dispatched via YouSign</p>
                  <small>Today at 10:45</small>
                </div>
              </div>
            </div>
            <div className="drawer-foot">
              <button className="btn" onClick={() => setSelectedLead(null)}>Close</button>
              <button className="btn primary" onClick={() => { alert('Contract resend triggered.'); setSelectedLead(null); }}>
                Advance to Next Stage →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
