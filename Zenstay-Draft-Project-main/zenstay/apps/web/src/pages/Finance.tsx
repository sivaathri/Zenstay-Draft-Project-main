import { useState, useMemo } from 'react';

export interface InvoiceItem {
  id: string;
  ref: string;
  beneficiary: string;
  beneficiaryRole: string;
  avatar: string;
  category: 'Turnaround' | 'Maintenance' | 'Linen & Supplies' | 'Owner Yield';
  property: string;
  period: string;
  date: string;
  netHT: string;
  vat: string;
  totalTTC: string;
  status: 'Paid' | 'Approved' | 'Pending' | 'On Hold';
  iban: string;
  urssafSiret: string;
  lineItems: { description: string; qty: number; unitPrice: string; total: string }[];
}

const INITIAL_INVOICES: InvoiceItem[] = [
  {
    id: 'inv-1',
    ref: 'ZS-INV-2026-00123',
    beneficiary: 'Marie Le Guen',
    beneficiaryRole: 'Lead Turnover Specialist',
    avatar: 'ML',
    category: 'Turnaround',
    property: 'Villa Les Embruns & Maison Moriconi',
    period: 'Sep 2026',
    date: '30 Sep 2026',
    netHT: '€2,480.00',
    vat: '€0.00',
    totalTTC: '€2,480.00',
    status: 'Paid',
    iban: 'FR76 3000 4012 3456 7890 1234 567',
    urssafSiret: '839 201 928 00012 (Auto-entrepreneur)',
    lineItems: [
      { description: 'Villa Les Embruns - 6x Full Check-out Turnovers & Audits', qty: 6, unitPrice: '€185.00', total: '€1,110.00' },
      { description: 'Maison Moriconi - 8x VIP Check-in Preparations', qty: 8, unitPrice: '€120.00', total: '€960.00' },
      { description: 'September Quality Audit Score Bonus (96% Pass Rate)', qty: 1, unitPrice: '€410.00', total: '€410.00' }
    ]
  },
  {
    id: 'inv-2',
    ref: 'ZS-INV-2026-00124',
    beneficiary: 'Sophie Martin',
    beneficiaryRole: 'Deep Clean & Sanitization Lead',
    avatar: 'SM',
    category: 'Turnaround',
    property: 'Villa Guidel Plage & Maison de la Plage',
    period: 'Sep 2026',
    date: '30 Sep 2026',
    netHT: '€2,140.00',
    vat: '€428.00',
    totalTTC: '€2,568.00',
    status: 'Approved',
    iban: 'FR76 1005 7001 2345 6789 0123 456',
    urssafSiret: '792 481 029 00025 (SARL Martin Pro Clean)',
    lineItems: [
      { description: 'Villa Guidel - 5x Deep Turnover & Pool Sanitization', qty: 5, unitPrice: '€220.00', total: '€1,100.00' },
      { description: 'Maison de la Plage - 6x Full Residence Turnover & Terrace', qty: 6, unitPrice: '€160.00', total: '€960.00' },
      { description: 'Emergency Sunday Linen Dispatch Run', qty: 1, unitPrice: '€80.00', total: '€80.00' }
    ]
  },
  {
    id: 'inv-3',
    ref: 'ZS-INV-2026-00125',
    beneficiary: 'Julie Renaud',
    beneficiaryRole: 'Audit & Turnaround Specialist',
    avatar: 'JR',
    category: 'Turnaround',
    property: 'Appartement Kerjouanno',
    period: 'Sep 2026',
    date: '30 Sep 2026',
    netHT: '€1,870.00',
    vat: '€0.00',
    totalTTC: '€1,870.00',
    status: 'Pending',
    iban: 'FR76 1027 8000 9876 5432 1098 765',
    urssafSiret: '912 345 678 00019 (Auto-entrepreneur)',
    lineItems: [
      { description: 'Appartement Kerjouanno - 14x Departure Inspection & Restock', qty: 14, unitPrice: '€95.00', total: '€1,330.00' },
      { description: 'VIP Guest Amenity Pack Setups (Local Breizh Gifts)', qty: 18, unitPrice: '€30.00', total: '€540.00' }
    ]
  },
  {
    id: 'inv-4',
    ref: 'ZS-INV-2026-00126',
    beneficiary: 'Carnac Plomberie Express',
    beneficiaryRole: 'Certified HVAC & Plumbing Partner',
    avatar: 'CP',
    category: 'Maintenance',
    property: 'Villa Les Embruns',
    period: 'Sep 2026',
    date: '28 Sep 2026',
    netHT: '€580.00',
    vat: '€116.00',
    totalTTC: '€696.00',
    status: 'Paid',
    iban: 'FR76 3000 2008 1122 3344 5566 778',
    urssafSiret: '439 102 938 00045 (SAS Plomberie Carnac)',
    lineItems: [
      { description: 'Master Ensuite Rainfall Shower Pressure Mixer Replacement', qty: 1, unitPrice: '€380.00', total: '€380.00' },
      { description: 'Emergency Call-out Diagnostic & Sealant Repair', qty: 1, unitPrice: '€200.00', total: '€200.00' }
    ]
  },
  {
    id: 'inv-5',
    ref: 'ZS-INV-2026-00127',
    beneficiary: 'Atlantic Blanchisserie & Linge',
    beneficiaryRole: 'Luxury Linen Rental & Laundry',
    avatar: 'AB',
    category: 'Linen & Supplies',
    property: 'Entire Brittany Portfolio',
    period: 'Sep 2026',
    date: '25 Sep 2026',
    netHT: '€3,420.00',
    vat: '€684.00',
    totalTTC: '€4,104.00',
    status: 'Approved',
    iban: 'FR76 3000 1002 9988 7766 5544 332',
    urssafSiret: '528 910 234 00016 (Atlantic Linge Pro SA)',
    lineItems: [
      { description: '400TC Egyptian Cotton King Sheet Sets (54 Turnovers)', qty: 54, unitPrice: '€38.00', total: '€2,052.00' },
      { description: 'Luxury Plush Towels & Bathrobe Service Packs', qty: 68, unitPrice: '€15.00', total: '€1,020.00' },
      { description: 'Express Same-day Laundry Delivery Logistics', qty: 6, unitPrice: '€58.00', total: '€348.00' }
    ]
  },
  {
    id: 'inv-6',
    ref: 'ZS-INV-2026-00128',
    beneficiary: 'Baron de Montmirail',
    beneficiaryRole: 'Asset Owner (Villa Les Embruns)',
    avatar: 'BM',
    category: 'Owner Yield',
    property: 'Villa Les Embruns',
    period: 'Sep 2026',
    date: '30 Sep 2026',
    netHT: '€14,820.00',
    vat: '€0.00',
    totalTTC: '€14,820.00',
    status: 'Paid',
    iban: 'FR76 1005 8000 1234 5678 9012 345',
    urssafSiret: 'Private Individual Asset Owner',
    lineItems: [
      { description: 'September Gross Rental Bookings (Guesty + Direct VIP)', qty: 1, unitPrice: '€18,525.00', total: '€18,525.00' },
      { description: 'Zenstay 20% Operational Full-Service Management Fee', qty: 1, unitPrice: '-€3,705.00', total: '-€3,705.00' }
    ]
  }
];

export function Finance({ role }: { role: 'manager' | 'housekeeper' }) {
  const isManager = role === 'manager';
  const [invoices, setInvoices] = useState<InvoiceItem[]>(INITIAL_INVOICES);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceItem | null>(null);
  const [isClosingModalOpen, setIsClosingModalOpen] = useState(false);
  const [isNewExpenseModalOpen, setIsNewExpenseModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Expense form state
  const [newBeneficiary, setNewBeneficiary] = useState('Marie Le Guen');
  const [newCategory, setNewCategory] = useState<InvoiceItem['category']>('Turnaround');
  const [newProperty, setNewProperty] = useState('Villa Les Embruns');
  const [newNet, setNewNet] = useState('€185.00');
  const [newVat, setNewVat] = useState('€0.00');
  const [newDesc, setNewDesc] = useState('Turnover inspection and linen package');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  // Filtered Invoices
  const filteredInvoices = useMemo(() => {
    return invoices.filter(inv => {
      // In housekeeper mode, only show their own invoices!
      if (!isManager && inv.beneficiary !== 'Marie Le Guen') return false;

      const q = searchQuery.toLowerCase();
      const matchSearch =
        inv.ref.toLowerCase().includes(q) ||
        inv.beneficiary.toLowerCase().includes(q) ||
        inv.property.toLowerCase().includes(q) ||
        inv.period.toLowerCase().includes(q);

      if (!matchSearch) return false;
      if (statusFilter !== 'All' && inv.status !== statusFilter) return false;
      if (categoryFilter !== 'All' && inv.category !== categoryFilter) return false;

      return true;
    });
  }, [invoices, searchQuery, statusFilter, categoryFilter, isManager]);

  // Financial Totals
  const pendingInvoices = invoices.filter(i => i.status === 'Pending' || i.status === 'Approved');
  const pendingTotal = pendingInvoices.reduce((acc, i) => {
    const num = parseFloat(i.totalTTC.replace('€', '').replace(',', ''));
    return acc + (isNaN(num) ? 0 : num);
  }, 0);

  const handleApproveBatch = () => {
    setInvoices(prev =>
      prev.map(inv =>
        inv.status === 'Pending' || inv.status === 'Approved' ? { ...inv, status: 'Paid' } : inv
      )
    );
    setIsClosingModalOpen(false);
    showToast(`SEPA Batch Transfer Executed! €${pendingTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })} released to specialists.`);
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const created: InvoiceItem = {
      id: `inv-${Date.now()}`,
      ref: `ZS-INV-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      beneficiary: newBeneficiary,
      beneficiaryRole: newBeneficiary.includes('Marie') ? 'Lead Turnover Specialist' : 'Field Partner',
      avatar: newBeneficiary.split(' ').map(n => n[0]).join('').slice(0, 2),
      category: newCategory,
      property: newProperty,
      period: 'Oct 2026',
      date: '1 Oct 2026',
      netHT: newNet,
      vat: newVat,
      totalTTC: newNet,
      status: 'Approved',
      iban: 'FR76 3000 4012 3456 7890 1234 567',
      urssafSiret: '839 201 928 00012 (Auto-entrepreneur)',
      lineItems: [
        { description: newDesc, qty: 1, unitPrice: newNet, total: newNet }
      ]
    };

    setInvoices([created, ...invoices]);
    setIsNewExpenseModalOpen(false);
    showToast(`Invoice ${created.ref} created for ${created.beneficiary}!`);
  };

  return (
    <div className="finance-page-root">
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
          <span className="section-eyebrow">
            {isManager ? 'ENTERPRISE TREASURY & DISBURSEMENTS' : 'FIELD EARNINGS & INVOICING'}
          </span>
          <h2>{isManager ? 'Finance & Invoicing Command Center' : 'My Specialist Revenue & Invoices'}</h2>
          <p>
            {isManager
              ? 'Monthly closing, SEPA batch payouts, field cost allocations, and French URSSAF compliance.'
              : 'Completed turnovers, quality bonuses, disbursement history, and official PDF invoices.'}
          </p>
        </div>
        <div className="actions">
          <div className="ops-telemetry-badge">
            <span className="ops-pulse-dot"></span>
            <span>SEPA Instant & Stripe Connected</span>
          </div>
          {isManager && (
            <>
              <button
                className="btn"
                onClick={() => showToast('Exporting FEC French Standard Accounting Dossier (CSV & XML)...')}
              >
                <svg className="icon"><use href="#i-file" /></svg>
                FEC Export
              </button>
              <button className="btn primary" onClick={() => setIsClosingModalOpen(true)}>
                <svg className="icon"><use href="#i-money" /></svg>
                Review Monthly Closing
              </button>
            </>
          )}
          {!isManager && (
            <button className="btn primary" onClick={() => showToast('Bank account IBAN updated')}>
              💳 Payout Settings
            </button>
          )}
        </div>
      </div>

      {/* 5-Card KPIs Row */}
      {isManager ? (
        <div className="finance-kpis-grid">
          <div className="finance-kpi-card">
            <div className="finance-kpi-top">
              <span className="finance-kpi-label">Gross Volume (GMV)</span>
              <span className="ops-kpi-icon gold">💳</span>
            </div>
            <div className="finance-kpi-val">€128,450</div>
            <div className="finance-kpi-sub pos">
              <span>↑ +14.2% vs Sep (High Season)</span>
            </div>
          </div>

          <div className="finance-kpi-card">
            <div className="finance-kpi-top">
              <span className="finance-kpi-label">Management Yield</span>
              <span className="ops-kpi-icon green">📈</span>
            </div>
            <div className="finance-kpi-val">€25,690</div>
            <div className="finance-kpi-sub pos">
              <span>20% Flat Management Yield</span>
            </div>
          </div>

          <div className="finance-kpi-card">
            <div className="finance-kpi-top">
              <span className="finance-kpi-label">Field Operations Cost</span>
              <span className="ops-kpi-icon blue">🧹</span>
            </div>
            <div className="finance-kpi-val">€31,840</div>
            <div className="finance-kpi-sub pos">
              <span>€22,460 paid • €9,380 pending</span>
            </div>
          </div>

          <div className="finance-kpi-card">
            <div className="finance-kpi-top">
              <span className="finance-kpi-label">Owner Net Yield</span>
              <span className="ops-kpi-icon amber">🏦</span>
            </div>
            <div className="finance-kpi-val">€70,920</div>
            <div className="finance-kpi-sub">
              <span>98.5% Automated SEPA release</span>
            </div>
          </div>

          <div className="finance-kpi-card">
            <div className="finance-kpi-top">
              <span className="finance-kpi-label">URSSAF & VAT Compliance</span>
              <span className="ops-kpi-icon green">⚖️</span>
            </div>
            <div className="finance-kpi-val">100% OK</div>
            <div className="finance-kpi-sub pos">
              <span>French B2B Dossier Audited</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="finance-kpis-grid" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
          <div className="finance-kpi-card">
            <div className="finance-kpi-top">
              <span className="finance-kpi-label">September Revenue</span>
              <span className="ops-kpi-icon gold">💶</span>
            </div>
            <div className="finance-kpi-val">€2,480.00</div>
            <div className="finance-kpi-sub pos">
              <span>Paid via SEPA on Oct 1</span>
            </div>
          </div>

          <div className="finance-kpi-card">
            <div className="finance-kpi-top">
              <span className="finance-kpi-label">Turnovers Completed</span>
              <span className="ops-kpi-icon blue">🧹</span>
            </div>
            <div className="finance-kpi-val">46 Units</div>
            <div className="finance-kpi-sub">
              <span>Average €54.00 / turnover</span>
            </div>
          </div>

          <div className="finance-kpi-card">
            <div className="finance-kpi-top">
              <span className="finance-kpi-label">Quality Score Bonus</span>
              <span className="ops-kpi-icon green">⭐</span>
            </div>
            <div className="finance-kpi-val">€410.00</div>
            <div className="finance-kpi-sub pos">
              <span>96% Photo audit compliance</span>
            </div>
          </div>

          <div className="finance-kpi-card">
            <div className="finance-kpi-top">
              <span className="finance-kpi-label">Next Payout</span>
              <span className="ops-kpi-icon amber">📅</span>
            </div>
            <div className="finance-kpi-val">Oct 15, 2026</div>
            <div className="finance-kpi-sub">
              <span>€1,180 currently in progress</span>
            </div>
          </div>
        </div>
      )}

      {/* Visual Analytics Row: Cost Allocation + Ring Status */}
      {isManager && (
        <div className="finance-analytics-grid">
          {/* Left Card: October Field Costs Breakdown */}
          <div className="finance-cost-card">
            <div>
              <div className="finance-cost-header">
                <div>
                  <span className="section-eyebrow">FIELD BUDGET TELEMETRY</span>
                  <h3>October Field Costs Allocation</h3>
                  <small>Projected month total based on booked guest changeovers</small>
                </div>
                <span className="status ok">On Budget (94.2%)</span>
              </div>

              <div className="finance-cost-total">€31,840.00</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', gap: 12 }}>
                <span><b>€22,460</b> Validated & Paid</span>
                <span>•</span>
                <span style={{ color: 'var(--gold)' }}><b>€9,380</b> In-flight / Upcoming</span>
              </div>

              <div className="finance-cost-progress-wrap">
                <div className="finance-progress-track">
                  <div className="finance-progress-fill" style={{ width: '70.5%' }} />
                </div>
              </div>
            </div>

            {/* Three distinct sub-cards with clear spacing & layout */}
            <div className="finance-breakdown-row">
              <div className="finance-sub-item">
                <span className="finance-sub-title">Interventions & Cleanings</span>
                <span className="finance-sub-amount">€18,920.00</span>
                <span className="finance-sub-pct">59.4% of total field spend</span>
              </div>
              <div className="finance-sub-item">
                <span className="finance-sub-title">Linen & Sanitization Kits</span>
                <span className="finance-sub-amount">€7,460.00</span>
                <span className="finance-sub-pct">23.4% of total field spend</span>
              </div>
              <div className="finance-sub-item">
                <span className="finance-sub-title">Quality Rewards & Logistics</span>
                <span className="finance-sub-amount">€5,460.00</span>
                <span className="finance-sub-pct">17.2% of total field spend</span>
              </div>
            </div>
          </div>

          {/* Right Card: SVG Donut Chart */}
          <div className="finance-ring-card">
            <div className="finance-ring-header">
              <div>
                <span className="section-eyebrow">LEDGER DISBURSEMENT HEALTH</span>
                <h3>Invoice Settlement Status</h3>
              </div>
              <span className="badge-navy">142 Lines</span>
            </div>

            {/* SVG Donut Chart */}
            <div className="finance-donut-wrap">
              <svg width="180" height="180" viewBox="0 0 180 180">
                {/* Background Ring */}
                <circle
                  cx="90"
                  cy="90"
                  r="68"
                  fill="none"
                  stroke="var(--card2)"
                  strokeWidth="20"
                />
                {/* Validated (58%) - Green */}
                <circle
                  cx="90"
                  cy="90"
                  r="68"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="20"
                  strokeDasharray="248 427"
                  strokeDashoffset="0"
                  transform="rotate(-90 90 90)"
                />
                {/* Approved (22%) - Teal/Gold */}
                <circle
                  cx="90"
                  cy="90"
                  r="68"
                  fill="none"
                  stroke="#c59b4e"
                  strokeWidth="20"
                  strokeDasharray="94 427"
                  strokeDashoffset="-248"
                  transform="rotate(-90 90 90)"
                />
                {/* Pending (15%) - Amber */}
                <circle
                  cx="90"
                  cy="90"
                  r="68"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="20"
                  strokeDasharray="64 427"
                  strokeDashoffset="-342"
                  transform="rotate(-90 90 90)"
                />
                {/* On Hold (5%) - Red */}
                <circle
                  cx="90"
                  cy="90"
                  r="68"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="20"
                  strokeDasharray="21 427"
                  strokeDashoffset="-406"
                  transform="rotate(-90 90 90)"
                />
              </svg>

              <div className="finance-donut-center">
                <b>142</b>
                <span>Invoice Lines</span>
              </div>
            </div>

            {/* Legend Items */}
            <div className="finance-donut-legend">
              <div className="donut-legend-item">
                <div className="donut-legend-left">
                  <span className="dot" style={{ background: '#10b981' }} />
                  <span>Settled & Paid</span>
                </div>
                <b>58% (82)</b>
              </div>

              <div className="donut-legend-item">
                <div className="donut-legend-left">
                  <span className="dot" style={{ background: '#c59b4e' }} />
                  <span>Approved SEPA</span>
                </div>
                <b>22% (31)</b>
              </div>

              <div className="donut-legend-item">
                <div className="donut-legend-left">
                  <span className="dot" style={{ background: '#f59e0b' }} />
                  <span>Pending Audit</span>
                </div>
                <b>15% (21)</b>
              </div>

              <div className="donut-legend-item">
                <div className="donut-legend-left">
                  <span className="dot" style={{ background: '#ef4444' }} />
                  <span>On Hold</span>
                </div>
                <b>5% (8)</b>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invoices Ledger Table Section */}
      <div className="card finance-table-card">
        <div className="finance-table-top">
          <h3>
            <span>Disbursements & Billing Ledger</span>
            <span className="badge-navy">{filteredInvoices.length} Documents</span>
          </h3>

          <div className="finance-table-actions">
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <svg className="ops-search-icon icon"><use href="#i-search" /></svg>
              <input
                type="text"
                className="finance-search-input"
                placeholder="Search invoice ref, specialist..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category tabs */}
            {isManager && (
              <div className="seg">
                {['All', 'Turnaround', 'Maintenance', 'Owner Yield'].map(cat => (
                  <button
                    key={cat}
                    className={categoryFilter === cat ? 'active' : ''}
                    onClick={() => setCategoryFilter(cat)}
                  >
                    {cat === 'All' ? 'All Ledger' : cat}
                  </button>
                ))}
              </div>
            )}

            {/* Status tabs */}
            <div className="seg">
              {['All', 'Paid', 'Approved', 'Pending'].map(st => (
                <button
                  key={st}
                  className={statusFilter === st ? 'active' : ''}
                  onClick={() => setStatusFilter(st)}
                >
                  {st}
                </button>
              ))}
            </div>

            {isManager && (
              <button className="btn" onClick={() => setIsNewExpenseModalOpen(true)}>
                + Add Entry
              </button>
            )}
          </div>
        </div>

        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>Invoice Ref</th>
                {isManager && <th>Beneficiary & Role</th>}
                <th>Category</th>
                <th>Properties Serviced</th>
                <th>Period</th>
                <th>Net HT</th>
                <th>TVA / VAT</th>
                <th>Total TTC</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map(inv => (
                <tr key={inv.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <svg className="icon" style={{ width: 14, height: 14, color: 'var(--gold)' }}><use href="#i-file" /></svg>
                      <b style={{ color: 'var(--text)', cursor: 'pointer' }} onClick={() => setSelectedInvoice(inv)}>
                        {inv.ref}
                      </b>
                    </div>
                  </td>

                  {isManager && (
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            background: 'var(--nav)',
                            color: '#fff',
                            fontSize: 10,
                            fontWeight: 800,
                            display: 'grid',
                            placeItems: 'center',
                            border: '1px solid var(--gold)'
                          }}
                        >
                          {inv.avatar}
                        </div>
                        <div>
                          <b style={{ fontSize: 13, color: 'var(--text)', display: 'block' }}>{inv.beneficiary}</b>
                          <small style={{ color: 'var(--muted)', fontSize: 11 }}>{inv.beneficiaryRole}</small>
                        </div>
                      </div>
                    </td>
                  )}

                  <td>
                    <span className="badge-navy" style={{ fontSize: 10 }}>{inv.category}</span>
                  </td>

                  <td>
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{inv.property}</span>
                  </td>

                  <td>
                    <span style={{ fontSize: 12 }}>{inv.period}</span>
                  </td>

                  <td>
                    <b>{inv.netHT}</b>
                  </td>

                  <td>
                    <small style={{ color: 'var(--muted)' }}>{inv.vat}</small>
                  </td>

                  <td>
                    <b style={{ color: 'var(--text)', fontSize: 14 }}>{inv.totalTTC}</b>
                  </td>

                  <td>
                    <span
                      className={`status ${
                        inv.status === 'Paid'
                          ? 'ok'
                          : inv.status === 'Approved'
                          ? 'info'
                          : inv.status === 'Pending'
                          ? 'wait'
                          : 'bad'
                      }`}
                    >
                      {inv.status === 'Paid' ? '✓ Paid' : inv.status}
                    </span>
                  </td>

                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: 6 }}>
                      <button
                        className="btn"
                        style={{ padding: '4px 10px', fontSize: 11 }}
                        onClick={() => setSelectedInvoice(inv)}
                      >
                        📄 Dossier
                      </button>
                      {isManager && inv.status !== 'Paid' && (
                        <button
                          className="btn primary"
                          style={{ padding: '4px 10px', fontSize: 11 }}
                          onClick={() => {
                            setInvoices(prev =>
                              prev.map(i => (i.id === inv.id ? { ...i, status: 'Paid' } : i))
                            );
                            showToast(`Invoice ${inv.ref} marked as Paid!`);
                          }}
                        >
                          Pay
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Printable Invoice Dossier Modal */}
      {selectedInvoice && (
        <div className="ops-modal-backdrop" onClick={() => setSelectedInvoice(null)}>
          <div className="invoice-paper-modal" onClick={e => e.stopPropagation()}>
            <div className="ops-modal-head">
              <div>
                <span className="badge-gold">OFFICIAL DISBURSEMENT INVOICE</span>
                <h3 style={{ marginTop: 4 }}>{selectedInvoice.ref}</h3>
              </div>
              <button className="iconbtn" onClick={() => setSelectedInvoice(null)}>✕</button>
            </div>

            <div className="invoice-paper-body">
              {/* Header Letterhead */}
              <div className="invoice-paper-head">
                <div>
                  <div className="invoice-brand-title">ZENSTAY LUXURY HOSPITALITY SAS</div>
                  <p style={{ margin: '4px 0 0', fontSize: 11, color: 'var(--muted)' }}>
                    HQ: 14 Rue du Port, 56000 Vannes, France • SIRET: 849 203 192 00018 • TVA FR 39 849203192
                  </p>
                </div>
                <div
                  className={`invoice-badge-status status ${
                    selectedInvoice.status === 'Paid' ? 'ok' : 'wait'
                  }`}
                >
                  ● {selectedInvoice.status}
                </div>
              </div>

              {/* Beneficiary & Invoice Meta Grid */}
              <div className="invoice-meta-grid">
                <div className="invoice-meta-box">
                  <span>BENEFICIARY RECIPIENT</span>
                  <b>{selectedInvoice.beneficiary}</b>
                  <small style={{ color: 'var(--muted)', display: 'block', marginTop: 2 }}>
                    {selectedInvoice.beneficiaryRole}
                  </small>
                  <small style={{ color: 'var(--muted)', display: 'block', marginTop: 2 }}>
                    SIRET: {selectedInvoice.urssafSiret}
                  </small>
                </div>

                <div className="invoice-meta-box">
                  <span>SETTLEMENT DETAILS</span>
                  <b>IBAN: {selectedInvoice.iban}</b>
                  <small style={{ color: 'var(--muted)', display: 'block', marginTop: 2 }}>
                    Billing Date: {selectedInvoice.date} • Period: {selectedInvoice.period}
                  </small>
                  <small style={{ color: 'var(--muted)', display: 'block', marginTop: 2 }}>
                    Payout Method: SEPA Credit Transfer (SCT Inst)
                  </small>
                </div>
              </div>

              {/* Line Items Table */}
              <h4 style={{ fontSize: 14, fontWeight: 750, margin: '20px 0 8px' }}>
                Itemized Services & Interventions
              </h4>
              <table className="invoice-items-table">
                <thead>
                  <tr>
                    <th>Service Description</th>
                    <th>Qty</th>
                    <th>Unit Rate</th>
                    <th style={{ textAlign: 'right' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoice.lineItems.map((item, idx) => (
                    <tr key={idx}>
                      <td>
                        <b>{item.description}</b>
                      </td>
                      <td>{item.qty}</td>
                      <td>{item.unitPrice}</td>
                      <td style={{ textAlign: 'right' }}>
                        <b>{item.total}</b>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals Box */}
              <div className="invoice-totals-box">
                <div className="invoice-total-row">
                  <span style={{ color: 'var(--muted)' }}>Subtotal (Net HT):</span>
                  <b>{selectedInvoice.netHT}</b>
                </div>
                <div className="invoice-total-row">
                  <span style={{ color: 'var(--muted)' }}>TVA / French VAT:</span>
                  <b>{selectedInvoice.vat}</b>
                </div>
                <div className="invoice-total-row grand">
                  <span>Total Net Payout:</span>
                  <b>{selectedInvoice.totalTTC}</b>
                </div>
              </div>

              <div
                style={{
                  background: 'var(--card2)',
                  borderRadius: 8,
                  padding: 12,
                  marginTop: 24,
                  fontSize: 11,
                  color: 'var(--muted)',
                  border: '1px solid var(--line-light)'
                }}
              >
                <b>Legal French Notice: </b>
                Facture émise pour compte de tiers. Règlements par virement SEPA. Exonération de TVA selon article 293B du CGI pour les prestataires sous régime de la micro-entreprise.
              </div>
            </div>

            <div className="ops-modal-foot">
              <button className="btn" onClick={() => setSelectedInvoice(null)}>Close</button>
              <button
                className="btn"
                onClick={() => showToast(`Invoice ${selectedInvoice.ref} PDF downloaded successfully!`)}
              >
                📥 Download PDF
              </button>
              {isManager && selectedInvoice.status !== 'Paid' && (
                <button
                  className="btn primary"
                  onClick={() => {
                    setInvoices(prev =>
                      prev.map(i => (i.id === selectedInvoice.id ? { ...i, status: 'Paid' } : i))
                    );
                    setSelectedInvoice(prev => (prev ? { ...prev, status: 'Paid' } : null));
                    showToast(`Invoice ${selectedInvoice.ref} successfully paid via SEPA!`);
                  }}
                >
                  ✓ Approve & Release SEPA Payout
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Review Monthly Closing & SEPA Batch Modal */}
      {isClosingModalOpen && (
        <div className="ops-modal-backdrop" onClick={() => setIsClosingModalOpen(false)}>
          <div className="ops-modal-card" onClick={e => e.stopPropagation()}>
            <div className="ops-modal-head">
              <div>
                <span className="section-eyebrow">MONTHLY CLOSING SETTLEMENT</span>
                <h3>Execute Batch SEPA Payout Transfer</h3>
              </div>
              <button className="iconbtn" onClick={() => setIsClosingModalOpen(false)}>✕</button>
            </div>

            <div className="ops-modal-body">
              <div
                style={{
                  background: 'var(--card2)',
                  borderRadius: 12,
                  padding: 18,
                  border: '1px solid var(--line)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase' }}>
                      TOTAL PENDING DISBURSEMENTS
                    </span>
                    <div style={{ fontSize: 28, fontWeight: 900, color: 'var(--gold)', marginTop: 2 }}>
                      €{pendingTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                  <span className="badge-navy">{pendingInvoices.length} Invoices to settle</span>
                </div>
                <p style={{ margin: '10px 0 0', fontSize: 12, color: 'var(--muted)' }}>
                  This action generates the ISO 20022 SEPA XML file and initiates instant wire disbursement to all verified field partner IBANs.
                </p>
              </div>

              <h4 style={{ margin: '14px 0 8px', fontSize: 14, fontWeight: 750 }}>
                Specialist Disbursement Preview
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 220, overflowY: 'auto' }}>
                {pendingInvoices.map(inv => (
                  <div
                    key={inv.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: 8,
                      background: 'var(--card2)',
                      border: '1px solid var(--line-light)'
                    }}
                  >
                    <div>
                      <b style={{ fontSize: 13 }}>{inv.beneficiary}</b>
                      <small style={{ display: 'block', color: 'var(--muted)', fontSize: 11 }}>
                        {inv.ref} • {inv.iban}
                      </small>
                    </div>
                    <b style={{ fontSize: 14, color: 'var(--text)' }}>{inv.totalTTC}</b>
                  </div>
                ))}
              </div>
            </div>

            <div className="ops-modal-foot">
              <button className="btn" onClick={() => setIsClosingModalOpen(false)}>Cancel</button>
              <button className="btn primary" onClick={handleApproveBatch}>
                🚀 Approve All & Release Instant SEPA
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Expense / Invoice Modal */}
      {isNewExpenseModalOpen && (
        <div className="ops-modal-backdrop" onClick={() => setIsNewExpenseModalOpen(false)}>
          <div className="ops-modal-card" onClick={e => e.stopPropagation()}>
            <div className="ops-modal-head">
              <div>
                <span className="section-eyebrow">FIELD EXPENDITURE DISPATCH</span>
                <h3>Record New Invoice or Cost Entry</h3>
              </div>
              <button className="iconbtn" onClick={() => setIsNewExpenseModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleAddExpense}>
              <div className="ops-modal-body">
                <div className="ops-form-row">
                  <div className="ops-form-group">
                    <label>Beneficiary Name</label>
                    <select value={newBeneficiary} onChange={e => setNewBeneficiary(e.target.value)}>
                      <option value="Marie Le Guen">Marie Le Guen (Field Lead)</option>
                      <option value="Sophie Martin">Sophie Martin (Turnaround Specialist)</option>
                      <option value="Julie Renaud">Julie Renaud (Audit Specialist)</option>
                      <option value="Carnac Plomberie Express">Carnac Plomberie Express</option>
                      <option value="Atlantic Blanchisserie & Linge">Atlantic Blanchisserie & Linge</option>
                    </select>
                  </div>

                  <div className="ops-form-group">
                    <label>Cost Category</label>
                    <select value={newCategory} onChange={e => setNewCategory(e.target.value as any)}>
                      <option value="Turnaround">Turnaround & Housekeeping</option>
                      <option value="Maintenance">Maintenance & Contractors</option>
                      <option value="Linen & Supplies">Linen & Supplies</option>
                      <option value="Owner Yield">Owner Yield Disbursement</option>
                    </select>
                  </div>
                </div>

                <div className="ops-form-row">
                  <div className="ops-form-group">
                    <label>Associated Property</label>
                    <select value={newProperty} onChange={e => setNewProperty(e.target.value)}>
                      <option value="Villa Les Embruns">Villa Les Embruns (Carnac)</option>
                      <option value="Maison Moriconi">Maison Moriconi (La Trinité)</option>
                      <option value="Villa Guidel Plage">Villa Guidel Plage (Guidel)</option>
                      <option value="Appartement Kerjouanno">Appartement Kerjouanno (Arzon)</option>
                      <option value="Maison de la Plage">Maison de la Plage (Quiberon)</option>
                    </select>
                  </div>

                  <div className="ops-form-group">
                    <label>Total Net Amount (€)</label>
                    <input
                      type="text"
                      value={newNet}
                      onChange={e => setNewNet(e.target.value)}
                      placeholder="€185.00"
                      required
                    />
                  </div>
                </div>

                <div className="ops-form-group">
                  <label>Service Description & Notes</label>
                  <input
                    type="text"
                    value={newDesc}
                    onChange={e => setNewDesc(e.target.value)}
                    placeholder="e.g. Linen dry cleaning package or emergency lock repair..."
                    required
                  />
                </div>
              </div>

              <div className="ops-modal-foot">
                <button type="button" className="btn" onClick={() => setIsNewExpenseModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn primary">
                  Save & Approve Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
