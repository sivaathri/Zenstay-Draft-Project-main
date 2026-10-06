import { useState, useMemo } from 'react';
import { ZenImage } from '../components/ZenImage';

export interface Reservation {
  id: string;
  guestName: string;
  guestAvatar: string;
  guestCount: number;
  propertyId: string;
  propertyName: string;
  startDay: number; // 1 to 14 (Oct 1 to Oct 14)
  durationDays: number;
  status: 'In-House' | 'Confirmed' | 'Pending';
  channel: 'Direct' | 'Airbnb' | 'Booking.com' | 'Guesty Direct';
  totalPrice: string;
  nightlyRate: string;
  paidStatus: 'Paid' | 'Deposit Held';
  cleaningStatus: 'Assigned' | 'Verified' | 'Pending';
  cleanerName: string;
  smartLockPin: string;
  specialRequests: string;
  phone: string;
  email: string;
}

interface TurnaroundBuffer {
  id: string;
  propertyId: string;
  startDay: number;
  durationDays: number;
  type: string;
}

interface Unit {
  id: string;
  name: string;
  location: string;
  beds: number;
  thumb: string;
  pricePerNight: string;
}

const INITIAL_UNITS: Unit[] = [
  {
    id: 'u-1',
    name: 'Villa Les Embruns',
    location: 'Carnac Plage',
    beds: 5,
    thumb: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=200&q=80',
    pricePerNight: '€420'
  },
  {
    id: 'u-2',
    name: 'Maison Moriconi',
    location: 'La Trinité-sur-Mer',
    beds: 3,
    thumb: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=200&q=80',
    pricePerNight: '€240'
  },
  {
    id: 'u-3',
    name: 'Villa Guidel Plage',
    location: 'Guidel-Plages',
    beds: 6,
    thumb: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=80',
    pricePerNight: '€450'
  },
  {
    id: 'u-4',
    name: 'Appartement Kerjouanno',
    location: 'Arzon Port du Crouesty',
    beds: 2,
    thumb: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=200&q=80',
    pricePerNight: '€165'
  },
  {
    id: 'u-5',
    name: 'Maison de la Plage',
    location: 'Quiberon Sauvage',
    beds: 4,
    thumb: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=200&q=80',
    pricePerNight: '€310'
  },
  {
    id: 'u-6',
    name: 'Villa Océane',
    location: 'Larmor-Plage',
    beds: 5,
    thumb: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=200&q=80',
    pricePerNight: '€380'
  }
];

const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'RES-88402',
    guestName: 'Baron Laurent de Montmirail',
    guestAvatar: 'LM',
    guestCount: 4,
    propertyId: 'u-1',
    propertyName: 'Villa Les Embruns',
    startDay: 1,
    durationDays: 6,
    status: 'In-House',
    channel: 'Direct',
    totalPrice: '€2,532.20',
    nightlyRate: '€420.00',
    paidStatus: 'Paid',
    cleaningStatus: 'Verified',
    cleanerName: 'Marie Le Guen',
    smartLockPin: '8402#',
    specialRequests: 'Chilled Champagne Ruinart on arrival; baby cot in guest suite 2. Heated pool at 28°C.',
    phone: '+33 6 12 34 56 78',
    email: 'laurent.montmirail@chateau.fr'
  },
  {
    id: 'RES-88403',
    guestName: 'Sir Arthur Wellesley',
    guestAvatar: 'AW',
    guestCount: 6,
    propertyId: 'u-1',
    propertyName: 'Villa Les Embruns',
    startDay: 8,
    durationDays: 5,
    status: 'Confirmed',
    channel: 'Guesty Direct',
    totalPrice: '€2,100.00',
    nightlyRate: '€420.00',
    paidStatus: 'Deposit Held',
    cleaningStatus: 'Assigned',
    cleanerName: 'Marie Le Guen',
    smartLockPin: '8403#',
    specialRequests: 'Late arrival at 20:00. Airport transfer chauffeur booked from Rennes Saint-Jacques.',
    phone: '+44 7700 900123',
    email: 'wellesley@diplomacy.gov.uk'
  },
  {
    id: 'RES-88404',
    guestName: 'Mme Claire Delacroix',
    guestAvatar: 'CD',
    guestCount: 2,
    propertyId: 'u-2',
    propertyName: 'Maison Moriconi',
    startDay: 1,
    durationDays: 4,
    status: 'In-House',
    channel: 'Airbnb',
    totalPrice: '€960.00',
    nightlyRate: '€240.00',
    paidStatus: 'Paid',
    cleaningStatus: 'Verified',
    cleanerName: 'Marie Le Guen',
    smartLockPin: '9604#',
    specialRequests: 'Early check-in approved at 13:30. Nespresso pods replenishment.',
    phone: '+33 6 78 90 12 34',
    email: 'claire.delacroix@art-paris.com'
  },
  {
    id: 'RES-88405',
    guestName: 'Herr Henrik Lindqvist',
    guestAvatar: 'HL',
    guestCount: 8,
    propertyId: 'u-3',
    propertyName: 'Villa Guidel Plage',
    startDay: 1,
    durationDays: 7,
    status: 'In-House',
    channel: 'Booking.com',
    totalPrice: '€3,150.00',
    nightlyRate: '€450.00',
    paidStatus: 'Paid',
    cleaningStatus: 'Verified',
    cleanerName: 'Sophie Martin',
    smartLockPin: '3150#',
    specialRequests: 'High-speed Wi-Fi password for remote executive board meetings. BBQ gas bottle setup.',
    phone: '+46 8 123 4567',
    email: 'henrik.lindqvist@nordic-ventures.se'
  },
  {
    id: 'RES-88406',
    guestName: 'Dr. Vincent Cassel',
    guestAvatar: 'VC',
    guestCount: 4,
    propertyId: 'u-4',
    propertyName: 'Appartement Kerjouanno',
    startDay: 2,
    durationDays: 5,
    status: 'Confirmed',
    channel: 'Direct',
    totalPrice: '€825.00',
    nightlyRate: '€165.00',
    paidStatus: 'Paid',
    cleaningStatus: 'Assigned',
    cleanerName: 'Julie Renaud',
    smartLockPin: '8250#',
    specialRequests: 'Requested extra hypoallergenic goose-down pillows and port marina parking permit.',
    phone: '+33 6 45 67 89 01',
    email: 'vincent.cassel@cinema.fr'
  },
  {
    id: 'RES-88407',
    guestName: 'Lady Eleanor Vance',
    guestAvatar: 'EV',
    guestCount: 6,
    propertyId: 'u-5',
    propertyName: 'Maison de la Plage',
    startDay: 3,
    durationDays: 6,
    status: 'Confirmed',
    channel: 'Guesty Direct',
    totalPrice: '€1,860.00',
    nightlyRate: '€310.00',
    paidStatus: 'Deposit Held',
    cleaningStatus: 'Assigned',
    cleanerName: 'Sophie Martin',
    smartLockPin: '1860#',
    specialRequests: 'Private catamaran sailing charter liaison. Daily breakfast bread & brioche delivery.',
    phone: '+44 20 7946 0912',
    email: 'eleanor.vance@kensington.co.uk'
  },
  {
    id: 'RES-88408',
    guestName: 'Julien Beaumont',
    guestAvatar: 'JB',
    guestCount: 6,
    propertyId: 'u-6',
    propertyName: 'Villa Océane',
    startDay: 4,
    durationDays: 8,
    status: 'Confirmed',
    channel: 'Airbnb',
    totalPrice: '€3,040.00',
    nightlyRate: '€380.00',
    paidStatus: 'Deposit Held',
    cleaningStatus: 'Pending',
    cleanerName: 'Sophie Martin',
    smartLockPin: '3040#',
    specialRequests: 'Requires heated pool temperature confirmed at 28°C and baby gate at staircase.',
    phone: '+33 6 90 12 34 56',
    email: 'julien.beaumont@tech-invest.fr'
  }
];

const INITIAL_BUFFERS: TurnaroundBuffer[] = [
  { id: 'b-1', propertyId: 'u-1', startDay: 7, durationDays: 1, type: 'Full Turnover & Spa Sanitization' },
  { id: 'b-2', propertyId: 'u-2', startDay: 5, durationDays: 1, type: 'VIP Turnover' },
  { id: 'b-3', propertyId: 'u-3', startDay: 8, durationDays: 1, type: 'Deep Clean Turnover' },
  { id: 'b-4', propertyId: 'u-4', startDay: 7, durationDays: 1, type: 'Express Audit' },
  { id: 'b-5', propertyId: 'u-5', startDay: 9, durationDays: 1, type: 'Turnover & Terrace Reset' }
];

const DAYS_HEADER = [
  { num: 1, name: 'Thu', full: 'Thu Oct 1', isWeekend: false },
  { num: 2, name: 'Fri', full: 'Fri Oct 2', isWeekend: false },
  { num: 3, name: 'Sat', full: 'Sat Oct 3', isWeekend: true },
  { num: 4, name: 'Sun', full: 'Sun Oct 4', isWeekend: true },
  { num: 5, name: 'Mon', full: 'Mon Oct 5', isWeekend: false },
  { num: 6, name: 'Tue', full: 'Tue Oct 6', isWeekend: false },
  { num: 7, name: 'Wed', full: 'Wed Oct 7', isWeekend: false },
  { num: 8, name: 'Thu', full: 'Thu Oct 8', isWeekend: false },
  { num: 9, name: 'Fri', full: 'Fri Oct 9', isWeekend: false },
  { num: 10, name: 'Sat', full: 'Sat Oct 10', isWeekend: true },
  { num: 11, name: 'Sun', full: 'Sun Oct 11', isWeekend: true },
  { num: 12, name: 'Mon', full: 'Mon Oct 12', isWeekend: false },
  { num: 13, name: 'Tue', full: 'Tue Oct 13', isWeekend: false },
  { num: 14, name: 'Wed', full: 'Wed Oct 14', isWeekend: false }
];

export function Calendar() {
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);
  const [units] = useState<Unit[]>(INITIAL_UNITS);
  const [buffers] = useState<TurnaroundBuffer[]>(INITIAL_BUFFERS);
  const [selectedRes, setSelectedRes] = useState<Reservation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [channelFilter, setChannelFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Quick form state for new reservation
  const [newPropId, setNewPropId] = useState('u-1');
  const [newGuestName, setNewGuestName] = useState('');
  const [newStartDay, setNewStartDay] = useState(7);
  const [newDuration, setNewDuration] = useState(4);
  const [newChannel, setNewChannel] = useState<Reservation['channel']>('Direct');
  const [newGuestCount, setNewGuestCount] = useState(4);
  const [newTotalPrice, setNewTotalPrice] = useState('€1,680.00');
  const [newRequests, setNewRequests] = useState('Standard VIP Welcome Package with Champagne.');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  // Filtered properties and reservations
  const filteredUnits = useMemo(() => {
    return units.filter(u => {
      const q = searchQuery.toLowerCase();
      const matchUnit = u.name.toLowerCase().includes(q) || u.location.toLowerCase().includes(q);
      const matchGuest = reservations.some(
        r => r.propertyId === u.id && r.guestName.toLowerCase().includes(q)
      );
      return matchUnit || matchGuest;
    });
  }, [units, reservations, searchQuery]);

  // KPIs
  const totalBookedNights = reservations.reduce((acc, r) => acc + r.durationDays, 0);
  const totalAvailableNights = units.length * 14;
  const occupancyRate = ((totalBookedNights / totalAvailableNights) * 100).toFixed(1);
  const inHouseCount = reservations.filter(r => r.status === 'In-House').length;
  const upcomingCount = reservations.filter(r => r.status === 'Confirmed').length;

  const handleEmptySlotClick = (unit: Unit, dayNum: number) => {
    setNewPropId(unit.id);
    setNewStartDay(dayNum);
    setNewDuration(3);
    setIsAddModalOpen(true);
    showToast(`Booking slot selected for ${unit.name} on Oct ${dayNum}`);
  };

  const handleCreateReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const prop = units.find(u => u.id === newPropId) || units[0];
    const created: Reservation = {
      id: `RES-${Math.floor(88400 + Math.random() * 900)}`,
      guestName: newGuestName || 'VIP Guest',
      guestAvatar: (newGuestName || 'VG')
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2),
      guestCount: newGuestCount,
      propertyId: prop.id,
      propertyName: prop.name,
      startDay: Number(newStartDay),
      durationDays: Number(newDuration),
      status: Number(newStartDay) === 1 ? 'In-House' : 'Confirmed',
      channel: newChannel,
      totalPrice: newTotalPrice,
      nightlyRate: prop.pricePerNight,
      paidStatus: 'Paid',
      cleaningStatus: 'Assigned',
      cleanerName: 'Marie Le Guen',
      smartLockPin: `${Math.floor(1000 + Math.random() * 9000)}#`,
      specialRequests: newRequests,
      phone: '+33 6 00 00 00 00',
      email: 'guest@zenstay-luxury.com'
    };

    setReservations(prev => [...prev, created]);
    setIsAddModalOpen(false);
    showToast(`Reservation created for ${created.guestName} at ${prop.name}!`);
  };

  return (
    <div className="calendar-page-root">
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
          <span className="section-eyebrow">PMS MULTI-UNIT TIMELINE</span>
          <h2>Reservation Matrix & Gantt Calendar</h2>
          <p>Multi-unit Gantt calendar with instant Guesty synchronization, channel status, and turnaround buffers.</p>
        </div>
        <div className="actions">
          <div className="ops-telemetry-badge">
            <span className="ops-pulse-dot"></span>
            <span>Guesty Live Webhook Sync</span>
          </div>
          <button className="btn" onClick={() => showToast('Guesty calendar bidirectional sync completed')}>
            <svg className="icon"><use href="#i-sync" /></svg>
            Sync Matrix
          </button>
          <button className="btn primary" onClick={() => setIsAddModalOpen(true)}>
            <svg className="icon"><use href="#i-plus" /></svg>
            + Add Reservation
          </button>
        </div>
      </div>

      {/* Operational Matrix KPIs */}
      <div className="matrix-kpis-grid">
        <div className="matrix-kpi-card">
          <div className="matrix-kpi-top">
            <span className="matrix-kpi-label">Occupancy Rate</span>
            <span className="ops-kpi-icon blue">📈</span>
          </div>
          <div className="matrix-kpi-val">{occupancyRate}%</div>
          <div className="matrix-kpi-sub pos">
            <span>↑ +5.8% vs last fortnight</span>
          </div>
        </div>

        <div className="matrix-kpi-card">
          <div className="matrix-kpi-top">
            <span className="matrix-kpi-label">Active In-House</span>
            <span className="ops-kpi-icon gold">🥂</span>
          </div>
          <div className="matrix-kpi-val">{inHouseCount} Residences</div>
          <div className="matrix-kpi-sub pos">
            <span>18 guests on property</span>
          </div>
        </div>

        <div className="matrix-kpi-card">
          <div className="matrix-kpi-top">
            <span className="matrix-kpi-label">Upcoming Arrivals</span>
            <span className="ops-kpi-icon green">✈️</span>
          </div>
          <div className="matrix-kpi-val">{upcomingCount} Check-ins</div>
          <div className="matrix-kpi-sub">
            <span>Next arrival: 14:30 today</span>
          </div>
        </div>

        <div className="matrix-kpi-card">
          <div className="matrix-kpi-top">
            <span className="matrix-kpi-label">Turnaround Cleanings</span>
            <span className="ops-kpi-icon amber">🧹</span>
          </div>
          <div className="matrix-kpi-val">{buffers.length} Buffers</div>
          <div className="matrix-kpi-sub warn">
            <span>100% staff assigned</span>
          </div>
        </div>

        <div className="matrix-kpi-card">
          <div className="matrix-kpi-top">
            <span className="matrix-kpi-label">Projected Revenue</span>
            <span className="ops-kpi-icon blue">💳</span>
          </div>
          <div className="matrix-kpi-val">€14,467</div>
          <div className="matrix-kpi-sub pos">
            <span>ADR: €345 / night</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="matrix-filter-bar">
        {/* Search */}
        <div className="matrix-search-box">
          <svg className="ops-search-icon icon"><use href="#i-search" /></svg>
          <input
            type="text"
            className="matrix-search-input"
            placeholder="Search residence, guest, or confirmation..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="ops-search-clear" onClick={() => setSearchQuery('')}>✕</button>
          )}
        </div>

        {/* Channel Filter Pills */}
        <div className="ops-filter-tabs">
          {(['All', 'Direct', 'Guesty Direct', 'Airbnb', 'Booking.com'] as const).map(ch => (
            <button
              key={ch}
              className={`ops-filter-tab ${channelFilter === ch ? 'active' : ''}`}
              onClick={() => setChannelFilter(ch)}
            >
              {ch === 'All' ? 'All Channels' : ch}
              <span className="ops-tab-count">
                {ch === 'All'
                  ? reservations.length
                  : reservations.filter(r => r.channel === ch).length}
              </span>
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="ops-filter-tabs">
          {(['All', 'In-House', 'Confirmed'] as const).map(st => (
            <button
              key={st}
              className={`ops-filter-tab ${statusFilter === st ? 'active' : ''}`}
              onClick={() => setStatusFilter(st)}
            >
              {st === 'All' ? 'All Stays' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Main Gantt Calendar Matrix */}
      <div className="card calendar-matrix-card">
        {/* Top bar with Period Nav & Legends */}
        <div className="matrix-topbar">
          <div className="matrix-period-info">
            <div className="matrix-period-nav">
              <button
                className="matrix-nav-btn"
                title="Previous 14 Days"
                onClick={() => showToast('Viewing 16 – 30 September 2026 Archive')}
              >
                ‹
              </button>
              <button
                className="matrix-today-btn"
                onClick={() => showToast('Jumped to Today (Thu, 1 Oct 2026)')}
              >
                Today
              </button>
              <button
                className="matrix-nav-btn"
                title="Next 14 Days"
                onClick={() => showToast('Viewing 15 – 28 October 2026 Projection')}
              >
                ›
              </button>
            </div>
            <h3>1 – 14 October 2026</h3>
            <span className="badge-navy">14-DAY PMS MULTI-UNIT TIMELINE</span>
          </div>

          <div className="matrix-legend">
            <span className="legend-item">
              <span className="dot direct-vip"></span> Direct VIP
            </span>
            <span className="legend-item">
              <span className="dot in-house"></span> In-House (Checked-In)
            </span>
            <span className="legend-item">
              <span className="dot confirmed"></span> Confirmed Arrival
            </span>
            <span className="legend-item">
              <span className="dot turnaround"></span> Turnaround Buffer
            </span>
          </div>
        </div>

        {/* Gantt Table Container */}
        <div className="gantt-table-container">
          <div className="gantt-grid">
            {/* Header: Property Column + 14 Days in Track */}
            <div className="gantt-row header">
              <div className="gantt-cell prop-header-col">
                <span>Managed Residence</span>
                <span>Rate</span>
              </div>
              <div className="gantt-days-header-track">
                {DAYS_HEADER.map(d => (
                  <div
                    key={d.num}
                    className={`gantt-cell day-col ${d.isWeekend ? 'weekend' : ''} ${
                      d.num === 1 ? 'today' : ''
                    }`}
                  >
                    <span className="day-name">{d.name}</span>
                    <span className="day-number">{d.num < 10 ? `0${d.num}` : d.num}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Property Unit Rows */}
            {filteredUnits.map(unit => {
              const unitRes = reservations.filter(r => {
                if (r.propertyId !== unit.id) return false;
                if (channelFilter !== 'All' && r.channel !== channelFilter) return false;
                if (statusFilter !== 'All' && r.status !== statusFilter) return false;
                return true;
              });

              const unitBuffers = buffers.filter(b => b.propertyId === unit.id);

              return (
                <div key={unit.id} className="gantt-row unit-row">
                  {/* Left Column: Residence details */}
                  <div className="gantt-cell prop-col">
                    <div className="gantt-prop-thumb">
                      <ZenImage src={unit.thumb} alt={unit.name} aspectRatio="1/1" />
                    </div>
                    <div className="gantt-prop-meta">
                      <b>{unit.name}</b>
                      <small>📍 {unit.location} • {unit.beds} Beds</small>
                    </div>
                  </div>

                  {/* Right Track: 14 Day Grid Cells + Turnaround Buffers + Reservation Blocks */}
                  <div className="gantt-timeline-track">
                    {/* Day background grid cells */}
                    {DAYS_HEADER.map(d => (
                      <div
                        key={d.num}
                        className={`track-day-cell ${d.isWeekend ? 'weekend-col' : ''} ${
                          d.num === 1 ? 'today-col' : ''
                        }`}
                        onClick={() => handleEmptySlotClick(unit, d.num)}
                        title={`Click to book ${unit.name} on Oct ${d.num}`}
                      />
                    ))}

                    {/* Turnaround Cleaning Buffer Blocks */}
                    {unitBuffers.map(buf => {
                      const leftPercent = ((buf.startDay - 1) / 14) * 100;
                      const widthPercent = (buf.durationDays / 14) * 100;
                      return (
                        <div
                          key={buf.id}
                          className="turnaround-block"
                          style={{
                            left: `${leftPercent}%`,
                            width: `calc(${widthPercent}% - 3px)`
                          }}
                          title={`Turnaround: ${buf.type} on Oct ${buf.startDay}`}
                        >
                          <span>🧹 {buf.type}</span>
                        </div>
                      );
                    })}

                    {/* Reservation Overlay Blocks */}
                    {unitRes.map(res => {
                      const leftPercent = ((res.startDay - 1) / 14) * 100;
                      const widthPercent = (res.durationDays / 14) * 100;

                      const channelClass =
                        res.channel === 'Direct'
                          ? 'channel-direct'
                          : res.channel === 'Guesty Direct'
                          ? 'channel-guesty'
                          : res.channel === 'Airbnb'
                          ? 'channel-airbnb'
                          : 'channel-booking';

                      return (
                        <div
                          key={res.id}
                          className={`res-block ${channelClass}`}
                          style={{
                            left: `${leftPercent}%`,
                            width: `calc(${widthPercent}% - 4px)`
                          }}
                          onClick={() => setSelectedRes(res)}
                          title={`${res.guestName} (${res.channel}) • Oct ${res.startDay} - Oct ${
                            res.startDay + res.durationDays
                          } • Click for details`}
                        >
                          <div className="res-block-inner">
                            <span className="res-avatar">{res.guestAvatar}</span>
                            <span className="res-name">{res.guestName}</span>
                            <span className="res-meta-pill">
                              {res.channel === 'Direct' ? '👑 VIP' : res.channel}
                            </span>
                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 800,
                                opacity: 0.9,
                                marginLeft: 4
                              }}
                            >
                              {res.durationDays}n
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Comprehensive Reservation Dossier Drawer */}
      {selectedRes && (
        <div className="ops-modal-backdrop" onClick={() => setSelectedRes(null)}>
          <div className="ops-modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: 640 }}>
            <div className="ops-modal-head">
              <div>
                <span className="badge-gold">
                  {selectedRes.id} • {selectedRes.channel}
                </span>
                <h3 style={{ marginTop: 4 }}>{selectedRes.guestName}</h3>
              </div>
              <button className="iconbtn" onClick={() => setSelectedRes(null)}>✕</button>
            </div>

            <div className="ops-modal-body">
              <div className="ops-form-row">
                <div className="detailbox">
                  <span>RESIDENCE</span>
                  <b>{selectedRes.propertyName}</b>
                </div>
                <div className="detailbox">
                  <span>GUEST PARTY</span>
                  <b>{selectedRes.guestCount} Guests (VIP)</b>
                </div>
              </div>

              <div className="ops-form-row">
                <div className="detailbox">
                  <span>STAY DATES</span>
                  <b>
                    Oct {selectedRes.startDay} – Oct {selectedRes.startDay + selectedRes.durationDays} (
                    {selectedRes.durationDays} Nights)
                  </b>
                </div>
                <div className="detailbox">
                  <span>TOTAL FOLIO</span>
                  <b style={{ color: 'var(--gold)' }}>
                    {selectedRes.totalPrice} ({selectedRes.paidStatus})
                  </b>
                </div>
              </div>

              {/* Status and Housekeeping */}
              <div className="ops-form-row">
                <div className="detailbox">
                  <span>PMS STAY STATUS</span>
                  <b className={`status ${selectedRes.status === 'In-House' ? 'ok' : 'info'}`}>
                    {selectedRes.status}
                  </b>
                </div>
                <div className="detailbox">
                  <span>HOUSEKEEPING READINESS</span>
                  <b className={`status ${selectedRes.cleaningStatus === 'Verified' ? 'ok' : 'wait'}`}>
                    {selectedRes.cleaningStatus} ({selectedRes.cleanerName})
                  </b>
                </div>
              </div>

              {/* Smart Lock Keyless Pin */}
              <div
                style={{
                  background: 'var(--card2)',
                  border: '1px solid var(--line)',
                  borderRadius: 10,
                  padding: 14,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 9,
                    background: 'var(--nav)',
                    color: 'var(--gold)',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: 16
                  }}
                >
                  🔒
                </div>
                <div>
                  <b style={{ fontSize: 13, color: 'var(--text)' }}>
                    Smart Lock Nuki Keypad PIN: {selectedRes.smartLockPin}
                  </b>
                  <p style={{ margin: '2px 0 0', fontSize: 11, color: 'var(--muted)' }}>
                    Active from Oct {selectedRes.startDay} 15:00 until Oct{' '}
                    {selectedRes.startDay + selectedRes.durationDays} 11:00.
                  </p>
                </div>
              </div>

              {/* Guest Requests */}
              <div
                style={{
                  background: 'var(--card2)',
                  border: '1px solid var(--line)',
                  borderRadius: 10,
                  padding: 14
                }}
              >
                <b style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--gold)' }}>
                  VIP Special Requests & Dossier:
                </b>
                <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>
                  "{selectedRes.specialRequests}"
                </p>
              </div>

              {/* Contact info */}
              <div className="ops-form-row">
                <div className="detailbox">
                  <span>GUEST PHONE</span>
                  <b>{selectedRes.phone}</b>
                </div>
                <div className="detailbox">
                  <span>GUEST EMAIL</span>
                  <b>{selectedRes.email}</b>
                </div>
              </div>
            </div>

            <div className="ops-modal-foot">
              <button className="btn" onClick={() => setSelectedRes(null)}>Close</button>
              <button
                className="btn"
                onClick={() => {
                  showToast(`Welcome guide sent to ${selectedRes.email}`);
                }}
              >
                📱 Send Welcome Guide
              </button>
              <button
                className="btn primary"
                onClick={() => {
                  showToast(`Opening direct concierge chat with ${selectedRes.guestName}...`);
                  setSelectedRes(null);
                }}
              >
                Message Guest →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Reservation / Date Block Modal */}
      {isAddModalOpen && (
        <div className="ops-modal-backdrop" onClick={() => setIsAddModalOpen(false)}>
          <div className="ops-modal-card" onClick={e => e.stopPropagation()}>
            <div className="ops-modal-head">
              <div>
                <span className="section-eyebrow">PMS RESERVATION DISPATCH</span>
                <h3>Create New Reservation or Block Dates</h3>
              </div>
              <button className="iconbtn" onClick={() => setIsAddModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleCreateReservation}>
              <div className="ops-modal-body">
                <div className="ops-form-group">
                  <label>Managed Residence</label>
                  <select value={newPropId} onChange={e => setNewPropId(e.target.value)}>
                    {units.map(u => (
                      <option key={u.id} value={u.id}>
                        {u.name} ({u.location} • {u.pricePerNight}/night)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="ops-form-row">
                  <div className="ops-form-group">
                    <label>Guest Full Name</label>
                    <input
                      type="text"
                      value={newGuestName}
                      onChange={e => setNewGuestName(e.target.value)}
                      placeholder="e.g. Countess Isabelle de Rohan"
                      required
                    />
                  </div>

                  <div className="ops-form-group">
                    <label>Booking Channel</label>
                    <select value={newChannel} onChange={e => setNewChannel(e.target.value as any)}>
                      <option value="Direct">Direct VIP Concierge</option>
                      <option value="Guesty Direct">Guesty Direct Engine</option>
                      <option value="Airbnb">Airbnb</option>
                      <option value="Booking.com">Booking.com</option>
                    </select>
                  </div>
                </div>

                <div className="ops-form-row">
                  <div className="ops-form-group">
                    <label>Check-in Day (October 2026)</label>
                    <select value={newStartDay} onChange={e => setNewStartDay(Number(e.target.value))}>
                      {DAYS_HEADER.map(d => (
                        <option key={d.num} value={d.num}>
                          {d.full}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="ops-form-group">
                    <label>Duration of Stay (Nights)</label>
                    <select value={newDuration} onChange={e => setNewDuration(Number(e.target.value))}>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(n => (
                        <option key={n} value={n}>
                          {n} Nights
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="ops-form-row">
                  <div className="ops-form-group">
                    <label>Guest Count</label>
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={newGuestCount}
                      onChange={e => setNewGuestCount(Number(e.target.value))}
                    />
                  </div>

                  <div className="ops-form-group">
                    <label>Total Folio Price</label>
                    <input
                      type="text"
                      value={newTotalPrice}
                      onChange={e => setNewTotalPrice(e.target.value)}
                      placeholder="€1,680.00"
                    />
                  </div>
                </div>

                <div className="ops-form-group">
                  <label>Special Requests & Dossier</label>
                  <textarea
                    value={newRequests}
                    onChange={e => setNewRequests(e.target.value)}
                    placeholder="Enter special requests, arrival time, champagne preferences, or baby cot requirements..."
                  />
                </div>
              </div>

              <div className="ops-modal-foot">
                <button type="button" className="btn" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn primary">
                  Confirm & Sync to Guesty
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
