import { useState } from 'react';
import { ZenImage } from '../components/ZenImage';

interface WorkOrder {
  id: string;
  property: string;
  problem: string;
  category: 'Plumbing' | 'HVAC' | 'Electrical' | 'Smart Lock' | 'Exterior';
  priority: 'High' | 'Medium' | 'Low';
  contractor: string;
  scheduledDate: string;
  beforeImg: string;
  afterImg?: string;
  quotation: string;
  actualCost?: string;
  status: 'In Progress' | 'Dispatched' | 'Resolved' | 'Waiting Approval';
}

export function Maintenance() {
  const [filter, setFilter] = useState<'All' | 'High' | 'In Progress' | 'Resolved'>('All');
  const [selectedOrder, setSelectedOrder] = useState<WorkOrder | null>(null);

  const workOrders: WorkOrder[] = [
    {
      id: 'WO-801',
      property: 'Villa Les Embruns',
      problem: 'Master ensuite rainfall shower mixer pressure valve replacement',
      category: 'Plumbing',
      priority: 'High',
      contractor: 'Carnac Plomberie Express (Jean-Luc B.)',
      scheduledDate: 'Today, 11:30',
      beforeImg: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
      afterImg: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
      quotation: '€185.00',
      actualCost: '€185.00',
      status: 'In Progress'
    },
    {
      id: 'WO-802',
      property: 'Villa Guidel',
      problem: 'Heat pump HVAC inverter error code E4 - insufficient airflow',
      category: 'HVAC',
      priority: 'High',
      contractor: 'Atlantic Clim & Chauffage (Marc D.)',
      scheduledDate: 'Today, 14:00',
      beforeImg: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
      quotation: '€320.00',
      status: 'Dispatched'
    },
    {
      id: 'WO-803',
      property: 'Maison Moriconi',
      problem: 'Keyless smart lock keypad battery depletion & firmware update',
      category: 'Smart Lock',
      priority: 'Medium',
      contractor: 'Nuki Certified Tech (Alain G.)',
      scheduledDate: 'Oct 2, 2026',
      beforeImg: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80',
      afterImg: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80',
      quotation: '€85.00',
      actualCost: '€85.00',
      status: 'Resolved'
    },
    {
      id: 'WO-804',
      property: 'Maison de la Plage',
      problem: 'Teak deck board stabilization and child safety gate alignment',
      category: 'Exterior',
      priority: 'Low',
      contractor: 'Menuiserie Artisanale Quiberon',
      scheduledDate: 'Oct 4, 2026',
      beforeImg: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
      quotation: '€210.00',
      status: 'Waiting Approval'
    }
  ];

  const filteredOrders = workOrders.filter(o => {
    if (filter === 'All') return true;
    if (filter === 'High') return o.priority === 'High';
    if (filter === 'In Progress') return o.status === 'In Progress';
    if (filter === 'Resolved') return o.status === 'Resolved';
    return true;
  });

  return (
    <div className="maintenance-root">
      <div className="pagehead">
        <div>
          <span className="section-eyebrow">FIELD MAINTENANCE & CONTRACTORS</span>
          <h2>Visual Work Orders</h2>
          <p>Real-time work orders with contractor dispatch, quote approval, and photographic verification.</p>
        </div>
        <div className="actions">
          <button className="btn primary" onClick={() => alert('New work order form opened')}>
            + Create Work Order
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="traveler-nav-tabs" style={{ marginBottom: 20 }}>
        {(['All', 'High', 'In Progress', 'Resolved'] as const).map(f => (
          <button
            key={f}
            className={`traveler-tab ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f} Orders
          </button>
        ))}
      </div>

      {/* Visual Work Orders Grid */}
      <div className="work-orders-grid">
        {filteredOrders.map(order => (
          <div key={order.id} className="card work-order-card" onClick={() => setSelectedOrder(order)}>
            <div className="work-order-header">
              <div>
                <span className="work-order-id">{order.id}</span>
                <h4>{order.property}</h4>
              </div>
              <div className="work-order-badges">
                <span className={`priority-badge ${order.priority.toLowerCase()}`}>
                  {order.priority}
                </span>
                <span className={`status ${order.status === 'Resolved' ? 'ok' : order.status === 'In Progress' ? 'wait' : 'bad'}`}>
                  {order.status}
                </span>
              </div>
            </div>

            <p className="problem-text">{order.problem}</p>

            <div className="work-order-photos">
              <div className="photo-box">
                <ZenImage
                  src={order.beforeImg}
                  alt="Before Intervention"
                  aspectRatio="4/3"
                />
                <span className="photo-label">Before Inspection</span>
              </div>
              {order.afterImg ? (
                <div className="photo-box">
                  <ZenImage
                    src={order.afterImg}
                    alt="After Intervention"
                    aspectRatio="4/3"
                  />
                  <span className="photo-label ok">Resolved Proof</span>
                </div>
              ) : (
                <div className="photo-box placeholder">
                  <span className="placeholder-text">Awaiting Contractor Resolution Photo</span>
                </div>
              )}
            </div>

            <div className="work-order-footer">
              <div>
                <small>Assigned Contractor</small>
                <b>{order.contractor}</b>
              </div>
              <div style={{ textAlign: 'right' }}>
                <small>Quotation / Cost</small>
                <b className="cost-val">{order.actualCost || order.quotation}</b>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Work Order Detail Drawer / Modal */}
      {selectedOrder && (
        <div className="modal-backdrop" onClick={() => setSelectedOrder(null)}>
          <div className="drawer open" onClick={e => e.stopPropagation()} style={{ width: 560 }}>
            <div className="drawer-head">
              <div>
                <span className="badge-navy">{selectedOrder.id} • {selectedOrder.category}</span>
                <h3>{selectedOrder.property}</h3>
              </div>
              <button className="iconbtn" onClick={() => setSelectedOrder(null)}>✕</button>
            </div>
            <div className="drawer-body">
              <div className="detail-grid">
                <div className="detailbox">
                  <span>STATUS</span>
                  <b>{selectedOrder.status}</b>
                </div>
                <div className="detailbox">
                  <span>PRIORITY</span>
                  <b>{selectedOrder.priority} Urgency</b>
                </div>
                <div className="detailbox">
                  <span>SCHEDULED TIME</span>
                  <b>{selectedOrder.scheduledDate}</b>
                </div>
                <div className="detailbox">
                  <span>QUOTATION / COST</span>
                  <b>{selectedOrder.quotation}</b>
                </div>
              </div>

              <h4 style={{ marginTop: 20 }}>Problem Diagnostics</h4>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--text)' }}>
                {selectedOrder.problem}
              </p>

              <h4 style={{ marginTop: 20 }}>Contractor Assignment</h4>
              <div className="detailbox" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="avatar">CB</div>
                <div>
                  <b>{selectedOrder.contractor}</b>
                  <small style={{ color: 'var(--muted)', display: 'block' }}>Verified Partner • Siret: 481 928 104 • Insured</small>
                </div>
              </div>

              <h4 style={{ marginTop: 20 }}>Visual Evidence</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <ZenImage src={selectedOrder.beforeImg} alt="Before" aspectRatio="4/3" />
                  <small style={{ display: 'block', textAlign: 'center', marginTop: 4, color: 'var(--muted)' }}>Reported Issue</small>
                </div>
                <div>
                  {selectedOrder.afterImg ? (
                    <>
                      <ZenImage src={selectedOrder.afterImg} alt="After" aspectRatio="4/3" />
                      <small style={{ display: 'block', textAlign: 'center', marginTop: 4, color: '#10b981' }}>Completed Proof</small>
                    </>
                  ) : (
                    <div style={{ height: '100%', minHeight: 120, border: '1px dashed var(--line)', borderRadius: 10, display: 'grid', placeItems: 'center', padding: 12, textAlign: 'center', fontSize: 11, color: 'var(--muted)' }}>
                      Pending completion upload
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="drawer-foot">
              <button className="btn" onClick={() => setSelectedOrder(null)}>Close</button>
              <button className="btn primary" onClick={() => { alert('Intervention signed off.'); setSelectedOrder(null); }}>
                Approve & Close Work Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
