import { useState, useMemo } from 'react';
import { ZenImage } from '../components/ZenImage';

interface ChecklistItem {
  id: string;
  text: string;
  done: boolean;
}

interface ChecklistCategory {
  category: string;
  items: ChecklistItem[];
}

export interface Intervention {
  id: string;
  property: string;
  location: string;
  sector: string;
  img: string;
  timeWindow: string;
  type: 'Check-out & Turnover' | 'VIP Pre-Arrival Prep' | 'Deep Clean & Pool' | 'Mid-Stay Refresh' | 'Departure Inspection';
  who: string;
  whoAvatar: string;
  whoRole: string;
  phone: string;
  checklistCount: number;
  checklistTotal: number;
  status: 'In progress' | 'Ready' | 'Attention' | 'Completed';
  priority: 'Urgent' | 'High' | 'Normal';
  amt: string;
  guestArrival: string;
  notes: string;
  stopNumber?: number;
  coordinates: { x: number; y: number }; // percentage on map
  distanceFromPrev?: string;
  transitTime?: string;
  checklists: ChecklistCategory[];
  beforePhotos: string[];
  afterPhotos: string[];
}

const INITIAL_OPERATIONS: Intervention[] = [
  {
    id: 'OP-101',
    property: 'Villa Les Embruns',
    location: '14 Allée des Dunes, Carnac',
    sector: 'Carnac',
    img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80',
    timeWindow: '10:00 - 12:15',
    type: 'Check-out & Turnover',
    who: 'Marie Le Guen',
    whoAvatar: 'ML',
    whoRole: 'Lead Turnover Specialist',
    phone: '+33 6 42 19 88 01',
    checklistCount: 14,
    checklistTotal: 18,
    status: 'In progress',
    priority: 'High',
    amt: '€185.00',
    guestArrival: '15:00 • Baron de Montmirail (VIP)',
    notes: 'Keyless lock reset required. 2 sets of Egyptian cotton beddings delivered. Bottle of Ruinart in cooler.',
    stopNumber: 1,
    coordinates: { x: 26, y: 34 },
    distanceFromPrev: 'Depot (Vannes HQ)',
    transitTime: '24 min',
    checklists: [
      {
        category: 'Living & Dining Reception',
        items: [
          { id: 'c1', text: 'Floor polish & French doors glazing clean', done: true },
          { id: 'c2', text: 'Smart home iPad reset to Guest Welcome Mode', done: true },
          { id: 'c3', text: 'Fresh flowers and handwritten welcome card placed', done: true }
        ]
      },
      {
        category: 'Master Suite & Bathrooms',
        items: [
          { id: 'c4', text: 'Crisp 400TC linen hospital corners & pillow fluff', done: true },
          { id: 'c5', text: 'Diptyque toiletries stocked & towels folded', done: true },
          { id: 'c6', text: 'Rainfall shower heads descaled and polished', done: false }
        ]
      },
      {
        category: 'Outdoor & Amenities',
        items: [
          { id: 'c7', text: 'Heated pool cover rolled and water temp 28°C', done: true },
          { id: 'c8', text: 'Weber BBQ cleaned with fresh gas bottle check', done: false }
        ]
      }
    ],
    beforePhotos: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80'
    ],
    afterPhotos: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=400&q=80'
    ]
  },
  {
    id: 'OP-102',
    property: 'Maison Moriconi',
    location: '6 Quai d’Arzon, La Trinité-sur-Mer',
    sector: 'La Trinité',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
    timeWindow: '12:45 - 14:15',
    type: 'VIP Pre-Arrival Prep',
    who: 'Marie Le Guen',
    whoAvatar: 'ML',
    whoRole: 'Lead Turnover Specialist',
    phone: '+33 6 42 19 88 01',
    checklistCount: 12,
    checklistTotal: 12,
    status: 'Ready',
    priority: 'Urgent',
    amt: '€120.00',
    guestArrival: '14:30 • Lady Catherine Spencer',
    notes: 'Guest requested late champagne setup & baby high-chair in main salon. Temperature set to 21.5°C.',
    stopNumber: 2,
    coordinates: { x: 44, y: 52 },
    distanceFromPrev: '8.4 km via D781',
    transitTime: '12 min',
    checklists: [
      {
        category: 'VIP Protocols',
        items: [
          { id: 'c9', text: 'Bollinger Special Cuvée chilled to 8°C in wine rack', done: true },
          { id: 'c10', text: 'Baby high-chair sanitized and set with Stokke tray', done: true },
          { id: 'c11', text: 'Air conditioning set to 21.5°C throughout', done: true }
        ]
      },
      {
        category: 'Final Inspection',
        items: [
          { id: 'c12', text: 'Smart lock code verified for guest arrival 14:30', done: true },
          { id: 'c13', text: 'All blinds raised to showcase marina water view', done: true }
        ]
      }
    ],
    beforePhotos: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80'
    ],
    afterPhotos: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80'
    ]
  },
  {
    id: 'OP-103',
    property: 'Villa Guidel Plage',
    location: '28 Boulevard de l’Océan, Guidel-Plages',
    sector: 'Guidel',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    timeWindow: '14:30 - 17:00',
    type: 'Deep Clean & Pool',
    who: 'Sophie Martin',
    whoAvatar: 'SM',
    whoRole: 'Sanitization & Deep Clean Lead',
    phone: '+33 6 81 22 93 40',
    checklistCount: 6,
    checklistTotal: 22,
    status: 'Attention',
    priority: 'Urgent',
    amt: '€220.00',
    guestArrival: '17:30 • Alexandre Dumas & Family (6 guests)',
    notes: 'Delayed linen supply van delayed by 30 mins due to coastal road traffic. Secondary team dispatched.',
    stopNumber: 3,
    coordinates: { x: 74, y: 32 },
    distanceFromPrev: '26 km via N165',
    transitTime: '26 min',
    checklists: [
      {
        category: 'Deep Turnover Tasks',
        items: [
          { id: 'c14', text: 'Oven pyrolysis clean & kitchen extractor degreasing', done: true },
          { id: 'c15', text: 'Steam sanitization of 4 ensuite bathrooms', done: true },
          { id: 'c16', text: 'Linen delivery validation from dry cleaners', done: false },
          { id: 'c17', text: 'Pool robotic vacuum cycle & chlorine balance', done: false }
        ]
      }
    ],
    beforePhotos: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80'
    ],
    afterPhotos: []
  },
  {
    id: 'OP-104',
    property: 'Appartement Kerjouanno',
    location: 'Port du Crouesty, Arzon',
    sector: 'Arzon',
    img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80',
    timeWindow: '15:30 - 17:00',
    type: 'Departure Inspection',
    who: 'Julie Renaud',
    whoAvatar: 'JR',
    whoRole: 'Audit & Turnaround Specialist',
    phone: '+33 6 99 10 44 12',
    checklistCount: 14,
    checklistTotal: 14,
    status: 'Ready',
    priority: 'Normal',
    amt: '€95.00',
    guestArrival: '18:00 • Nicolas Fouquet',
    notes: 'Zero damage deposit release approved. Cleanliness score rated 9.9/10 by autonomous audit.',
    stopNumber: 4,
    coordinates: { x: 62, y: 72 },
    distanceFromPrev: '14.8 km via D198',
    transitTime: '18 min',
    checklists: [
      {
        category: 'Audit & Departure Checklist',
        items: [
          { id: 'c18', text: 'Keyless safe code reset and tested', done: true },
          { id: 'c19', text: 'Nespresso pods & local Breizh butter cookies replenished', done: true },
          { id: 'c20', text: 'Harbor view balcony furniture wiped and aligned', done: true }
        ]
      }
    ],
    beforePhotos: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80'
    ],
    afterPhotos: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80'
    ]
  },
  {
    id: 'OP-105',
    property: 'Maison de la Plage',
    location: '12 Rue de la Côte Sauvage, Quiberon',
    sector: 'Quiberon',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80',
    timeWindow: '16:30 - 18:30',
    type: 'Check-out & Turnover',
    who: 'Sophie Martin',
    whoAvatar: 'SM',
    whoRole: 'Sanitization & Deep Clean Lead',
    phone: '+33 6 81 22 93 40',
    checklistCount: 18,
    checklistTotal: 18,
    status: 'Completed',
    priority: 'Normal',
    amt: '€160.00',
    guestArrival: 'Tomorrow, 11:00 • Mid-week turnover buffer',
    notes: 'Finished 20 mins ahead of schedule. Housekeeping supervisor signed off photo dossier.',
    stopNumber: 5,
    coordinates: { x: 30, y: 78 },
    distanceFromPrev: '19.5 km via D768',
    transitTime: '21 min',
    checklists: [
      {
        category: 'Complete Residence Reset',
        items: [
          { id: 'c21', text: 'Full linen exchange & laundry hamper sealed', done: true },
          { id: 'c22', text: 'Fireplace ash extraction and fresh logs stacked', done: true },
          { id: 'c23', text: 'Perimeter security lights & sensor check', done: true }
        ]
      }
    ],
    beforePhotos: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80'
    ],
    afterPhotos: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80'
    ]
  },
  {
    id: 'OP-106',
    property: 'Manoir de Kerdurand',
    location: 'Route de Riantec, Port-Louis Sector',
    sector: 'Guidel',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    timeWindow: '17:15 - 18:45',
    type: 'Mid-Stay Refresh',
    who: 'Marie Le Guen',
    whoAvatar: 'ML',
    whoRole: 'Lead Turnover Specialist',
    phone: '+33 6 42 19 88 01',
    checklistCount: 7,
    checklistTotal: 10,
    status: 'In progress',
    priority: 'Normal',
    amt: '€110.00',
    guestArrival: 'In residence (Suite 1 & 2)',
    notes: 'Mid-stay turn-down service, Turkish bath aromatherapy replenishment & towel change.',
    stopNumber: 6,
    coordinates: { x: 82, y: 58 },
    distanceFromPrev: '11.2 km via D781',
    transitTime: '15 min',
    checklists: [
      {
        category: 'Turn-down & Wellness',
        items: [
          { id: 'c24', text: 'Hammam eucalyptus essence infused', done: true },
          { id: 'c25', text: 'Plush bathrobes replaced with laundered sets', done: true },
          { id: 'c26', text: 'Nightstand bottled Evian and mint chocolates set', done: false }
        ]
      }
    ],
    beforePhotos: [],
    afterPhotos: []
  }
];

const WEEK_DAYS = [
  { day: 'MON', date: '28', full: 'Mon, 28 Sep', count: 9, hasAttention: false },
  { day: 'TUE', date: '29', full: 'Tue, 29 Sep', count: 11, hasAttention: false },
  { day: 'WED', date: '30', full: 'Wed, 30 Sep', count: 12, hasAttention: true },
  { day: 'THU', date: '01', full: 'Thu, 1 Oct', count: 14, hasAttention: true },
  { day: 'FRI', date: '02', full: 'Fri, 2 Oct', count: 16, hasAttention: false },
  { day: 'SAT', date: '03', full: 'Sat, 3 Oct', count: 21, hasAttention: true },
  { day: 'SUN', date: '04', full: 'Sun, 4 Oct', count: 10, hasAttention: false }
];

export function Operations() {
  const [operations, setOperations] = useState<Intervention[]>(INITIAL_OPERATIONS);
  const [selectedDay, setSelectedDay] = useState('THU 01');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'In progress' | 'Ready' | 'Attention' | 'Completed'>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [sectorFilter, setSectorFilter] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'split' | 'schedule' | 'route'>('split');
  const [selectedSpecialist, setSelectedSpecialist] = useState<string>('All');
  const [selectedTask, setSelectedTask] = useState<Intervention | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [routeStats, setRouteStats] = useState({
    distance: '48.2 km',
    driveTime: '1h 14m',
    savings: '-22%',
    stops: 6
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  // Filtered interventions
  const filteredOperations = useMemo(() => {
    return operations.filter(op => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesProp = op.property.toLowerCase().includes(q);
        const matchesLoc = op.location.toLowerCase().includes(q);
        const matchesWho = op.who.toLowerCase().includes(q);
        const matchesGuest = op.guestArrival.toLowerCase().includes(q);
        if (!matchesProp && !matchesLoc && !matchesWho && !matchesGuest) return false;
      }
      // Status
      if (statusFilter !== 'All' && op.status !== statusFilter) return false;
      // Type
      if (typeFilter !== 'All' && op.type !== typeFilter) return false;
      // Sector
      if (sectorFilter !== 'All' && op.sector !== sectorFilter) return false;
      // Specialist
      if (selectedSpecialist !== 'All' && op.who !== selectedSpecialist) return false;

      return true;
    });
  }, [operations, searchQuery, statusFilter, typeFilter, sectorFilter, selectedSpecialist]);

  // KPIs calculation
  const totalCount = operations.length;
  const readyCount = operations.filter(o => o.status === 'Ready').length;
  const inProgressCount = operations.filter(o => o.status === 'In progress').length;
  const attentionCount = operations.filter(o => o.status === 'Attention').length;
  const completedCount = operations.filter(o => o.status === 'Completed').length;

  // Status Change handler
  const handleStatusChange = (id: string, newStatus: Intervention['status']) => {
    setOperations(prev =>
      prev.map(op => (op.id === id ? { ...op, status: newStatus } : op))
    );
    if (selectedTask && selectedTask.id === id) {
      setSelectedTask(prev => (prev ? { ...prev, status: newStatus } : null));
    }
    showToast(`Status updated to "${newStatus}"`);
  };

  // Checklist item toggle inside Audit modal
  const handleToggleChecklist = (opId: string, catIndex: number, itemId: string) => {
    setOperations(prev =>
      prev.map(op => {
        if (op.id !== opId) return op;
        const newCats = op.checklists.map((cat, ci) => {
          if (ci !== catIndex) return cat;
          return {
            ...cat,
            items: cat.items.map(item =>
              item.id === itemId ? { ...item, done: !item.done } : item
            )
          };
        });

        // Recalculate done count
        let total = 0;
        let done = 0;
        newCats.forEach(c =>
          c.items.forEach(i => {
            total++;
            if (i.done) done++;
          })
        );

        const updated = {
          ...op,
          checklists: newCats,
          checklistCount: done,
          checklistTotal: total
        };

        if (selectedTask && selectedTask.id === opId) {
          setSelectedTask(updated);
        }

        return updated;
      })
    );
  };

  // Re-optimize Route Simulation
  const handleReoptimizeRoute = () => {
    setIsOptimizing(true);
    showToast('Calculating traffic-aware transit clustering with Guesty arrival sync...');
    setTimeout(() => {
      setIsOptimizing(false);
      setRouteStats({
        distance: '42.8 km',
        driveTime: '1h 02m',
        savings: '-28%',
        stops: operations.length
      });
      showToast('Route re-sequenced: saved 5.4 km & 12 mins transit time!');
    }, 900);
  };

  // Add new intervention state
  const [newProp, setNewProp] = useState('Villa Les Embruns');
  const [newType, setNewType] = useState<Intervention['type']>('Check-out & Turnover');
  const [newWho, setNewWho] = useState('Marie Le Guen');
  const [newTime, setNewTime] = useState('11:00 - 13:00');
  const [newPriority, setNewPriority] = useState<Intervention['priority']>('High');
  const [newAmt, setNewAmt] = useState('€150.00');
  const [newGuest, setNewGuest] = useState('16:00 • Arriving Guest');
  const [newNotes, setNewNotes] = useState('Keyless pin code check & linen setup.');

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Intervention = {
      id: `OP-${Math.floor(100 + Math.random() * 900)}`,
      property: newProp,
      location: newProp.includes('Carnac') ? 'Carnac, Morbihan' : 'Southern Brittany Coast',
      sector: newProp.includes('Carnac') ? 'Carnac' : 'La Trinité',
      img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80',
      timeWindow: newTime,
      type: newType,
      who: newWho,
      whoAvatar: newWho.split(' ').map(n => n[0]).join(''),
      whoRole: 'Turnaround Specialist',
      phone: '+33 6 42 19 88 01',
      checklistCount: 0,
      checklistTotal: 18,
      status: 'In progress',
      priority: newPriority,
      amt: newAmt,
      guestArrival: newGuest,
      notes: newNotes,
      stopNumber: operations.length + 1,
      coordinates: { x: Math.floor(25 + Math.random() * 55), y: Math.floor(30 + Math.random() * 50) },
      distanceFromPrev: '12 km via D768',
      transitTime: '15 min',
      checklists: [
        {
          category: 'Standard Luxury Turnover',
          items: [
            { id: 'nc1', text: 'Full linen exchange & hospital bed corners', done: false },
            { id: 'nc2', text: 'Sanitization of bathrooms & toiletries replenishment', done: false },
            { id: 'nc3', text: 'Welcome pack and digital tablet readiness check', done: false }
          ]
        }
      ],
      beforePhotos: [],
      afterPhotos: []
    };

    setOperations([created, ...operations]);
    setIsAddModalOpen(false);
    showToast(`Assignment for ${newProp} successfully dispatched to ${newWho}!`);
  };

  return (
    <div className="operations-page-root">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="ops-toast">
          <svg className="icon" style={{ stroke: 'var(--gold)' }}><use href="#i-check" /></svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="pagehead">
        <div>
          <span className="section-eyebrow">FIELD LOGISTICS & SPECIALIST DISPATCH</span>
          <h2>Field Operations Command Center</h2>
          <p>
            Real-time housekeeper deployment, turnover quality audits, keyless readiness, and GPS-optimized transit routes across Southern Brittany.
          </p>
        </div>
        <div className="actions">
          <div className="ops-telemetry-badge">
            <span className="ops-pulse-dot"></span>
            <span>Fleet Active: 6 Specialists in Field</span>
          </div>
          <button className="btn" onClick={handleReoptimizeRoute} disabled={isOptimizing}>
            <svg className="icon"><use href="#i-sync" /></svg>
            {isOptimizing ? 'Optimizing...' : 'Optimize Routes'}
          </button>
          <button className="btn primary" onClick={() => setIsAddModalOpen(true)}>
            <svg className="icon"><use href="#i-plus" /></svg>
            + Dispatch Assignment
          </button>
        </div>
      </div>

      {/* Live Operational KPIs */}
      <div className="ops-kpi-grid">
        <div className="ops-kpi-card">
          <div className="ops-kpi-top">
            <span className="ops-kpi-label">Today's Schedule</span>
            <span className="ops-kpi-icon blue">📋</span>
          </div>
          <div className="ops-kpi-val">{totalCount} Interventions</div>
          <div className="ops-kpi-sub pos">
            <span>↑ +3 vs yesterday</span>
          </div>
        </div>

        <div className="ops-kpi-card">
          <div className="ops-kpi-top">
            <span className="ops-kpi-label">Certified Ready</span>
            <span className="ops-kpi-icon green">🔑</span>
          </div>
          <div className="ops-kpi-val">{readyCount} Units</div>
          <div className="ops-kpi-sub pos">
            <span>100% Photo QA passed</span>
          </div>
        </div>

        <div className="ops-kpi-card">
          <div className="ops-kpi-top">
            <span className="ops-kpi-label">In-Flight On Site</span>
            <span className="ops-kpi-icon amber">⚡</span>
          </div>
          <div className="ops-kpi-val">{inProgressCount} Active</div>
          <div className="ops-kpi-sub">
            <span>3 on schedule</span>
          </div>
        </div>

        <div className="ops-kpi-card">
          <div className="ops-kpi-top">
            <span className="ops-kpi-label">Attention / Alerts</span>
            <span className="ops-kpi-icon red">⚠️</span>
          </div>
          <div className="ops-kpi-val">{attentionCount} Delay</div>
          <div className="ops-kpi-sub crit">
            <span>Linen express in transit</span>
          </div>
        </div>

        <div className="ops-kpi-card">
          <div className="ops-kpi-top">
            <span className="ops-kpi-label">Route Logistics</span>
            <span className="ops-kpi-icon gold">📍</span>
          </div>
          <div className="ops-kpi-val">{routeStats.distance}</div>
          <div className="ops-kpi-sub pos">
            <span>{routeStats.driveTime} • {routeStats.savings} CO2 saved</span>
          </div>
        </div>
      </div>

      {/* Interactive Week Ribbon Strip */}
      <div className="ops-calendar-strip">
        <div className="ops-cal-nav">
          <button className="ops-cal-nav-btn" title="Previous Week" onClick={() => showToast('Viewing previous week archive')}>‹</button>
          <button className="ops-today-btn" onClick={() => { setSelectedDay('THU 01'); showToast('Showing Today: Thursday, 1 October 2026'); }}>Today</button>
          <button className="ops-cal-nav-btn" title="Next Week" onClick={() => showToast('Viewing next week projections')}>›</button>
        </div>

        <div className="ops-days-container">
          {WEEK_DAYS.map(w => {
            const key = `${w.day} ${w.date}`;
            const isActive = selectedDay === key;
            return (
              <div
                key={key}
                className={`ops-day-pill ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setSelectedDay(key);
                  showToast(`Selected ${w.full} (${w.count} interventions)`);
                }}
              >
                <span className="ops-day-name">{w.day}</span>
                <span className="ops-day-num">{w.date}</span>
                <span className="ops-day-badge">
                  <span className={`ops-day-dot ${w.hasAttention ? 'attention' : ''}`} />
                  {w.count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter, Search & View Controls */}
      <div className="ops-controls-bar">
        {/* Search */}
        <div className="ops-search-wrap">
          <svg className="ops-search-icon icon"><use href="#i-search" /></svg>
          <input
            type="text"
            className="ops-search-input"
            placeholder="Search villa, housekeeper, guest..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="ops-search-clear" onClick={() => setSearchQuery('')}>✕</button>
          )}
        </div>

        {/* Status Filters */}
        <div className="ops-filter-tabs">
          {(['All', 'In progress', 'Ready', 'Attention', 'Completed'] as const).map(st => (
            <button
              key={st}
              className={`ops-filter-tab ${statusFilter === st ? 'active' : ''}`}
              onClick={() => setStatusFilter(st)}
            >
              {st}
              <span className="ops-tab-count">
                {st === 'All'
                  ? totalCount
                  : operations.filter(o => o.status === st).length}
              </span>
            </button>
          ))}
        </div>

        {/* Sector Quick Filter */}
        <div className="ops-filter-tabs">
          {['All', 'Carnac', 'La Trinité', 'Guidel', 'Arzon', 'Quiberon'].map(sec => (
            <button
              key={sec}
              className={`ops-filter-tab ${sectorFilter === sec ? 'active' : ''}`}
              style={{ fontSize: 11 }}
              onClick={() => setSectorFilter(sec)}
            >
              {sec === 'All' ? 'All Sectors' : sec}
            </button>
          ))}
        </div>

        {/* View Switcher */}
        <div className="seg">
          <button
            className={viewMode === 'split' ? 'active' : ''}
            onClick={() => setViewMode('split')}
            title="Split schedule and route map"
          >
            Split View
          </button>
          <button
            className={viewMode === 'schedule' ? 'active' : ''}
            onClick={() => setViewMode('schedule')}
            title="Full schedule list"
          >
            Tasks Only
          </button>
          <button
            className={viewMode === 'route' ? 'active' : ''}
            onClick={() => setViewMode('route')}
            title="Route GPS logistics"
          >
            Route Map
          </button>
        </div>
      </div>

      {/* Main Grid: Tasks Column (Left) + Route Optimizer (Right) */}
      <div
        className={`ops-layout-grid ${
          viewMode === 'schedule' ? 'schedule-only' : viewMode === 'route' ? 'route-only' : ''
        }`}
      >
        {/* Left Column: Interventions List */}
        {viewMode !== 'route' && (
          <div className="ops-tasks-column">
            <div className="ops-tasks-head">
              <h3>
                <span>Today's Dispatched Interventions</span>
                <span className="badge-navy">{filteredOperations.length} of {totalCount} Active</span>
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <small style={{ color: 'var(--muted)', fontSize: 12 }}>Filter Specialist:</small>
                <select
                  value={selectedSpecialist}
                  onChange={e => setSelectedSpecialist(e.target.value)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: 6,
                    border: '1px solid var(--line)',
                    background: 'var(--card2)',
                    fontSize: 11.5
                  }}
                >
                  <option value="All">All Specialists</option>
                  <option value="Marie Le Guen">Marie Le Guen</option>
                  <option value="Sophie Martin">Sophie Martin</option>
                  <option value="Julie Renaud">Julie Renaud</option>
                </select>
              </div>
            </div>

            {filteredOperations.length === 0 ? (
              <div
                className="card"
                style={{
                  padding: 48,
                  textAlign: 'center',
                  color: 'var(--muted)',
                  borderRadius: 'var(--r)'
                }}
              >
                <p style={{ fontSize: 16, fontWeight: 700, margin: '0 0 8px', color: 'var(--text)' }}>
                  No interventions found matching criteria
                </p>
                <p style={{ fontSize: 13, margin: '0 0 16px' }}>
                  Try resetting your search query or status filters to view the full field schedule.
                </p>
                <button
                  className="btn"
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('All');
                    setSectorFilter('All');
                    setSelectedSpecialist('All');
                  }}
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              filteredOperations.map(op => {
                const borderClass =
                  op.status === 'Ready'
                    ? 'border-ready'
                    : op.status === 'In progress'
                    ? 'border-progress'
                    : op.status === 'Attention'
                    ? 'border-attention'
                    : 'border-completed';

                const pct = Math.round((op.checklistCount / op.checklistTotal) * 100);

                return (
                  <div key={op.id} className={`ops-task-card ${borderClass}`}>
                    {/* Top Row: Time, Badges, Fee */}
                    <div className="ops-task-top">
                      <div className="ops-time-badge">
                        <svg className="icon" style={{ width: 14, height: 14 }}><use href="#i-cal" /></svg>
                        <span>{op.timeWindow}</span>
                      </div>

                      <div className="ops-task-badges">
                        {op.stopNumber && (
                          <span className="ops-stop-pill">
                            <svg className="icon" style={{ width: 12, height: 12 }}><use href="#i-home" /></svg>
                            Stop #{op.stopNumber}
                          </span>
                        )}
                        <span className={`priority-badge ${op.priority.toLowerCase()}`}>
                          {op.priority}
                        </span>
                        <span className="ops-task-fee">{op.amt}</span>
                      </div>
                    </div>

                    {/* Body: Photo, Title, Location, Service, Guest */}
                    <div className="ops-task-body">
                      <div className="ops-prop-thumb-wrap">
                        <ZenImage src={op.img} alt={op.property} aspectRatio="4/3" />
                      </div>

                      <div className="ops-prop-meta">
                        <div className="ops-prop-title-row">
                          <h4 className="ops-prop-title">{op.property}</h4>
                          <span className="badge-navy" style={{ fontSize: 9 }}>{op.id}</span>
                        </div>

                        <div className="ops-prop-loc">
                          <svg className="icon" style={{ width: 13, height: 13, color: 'var(--muted)' }}><use href="#i-house" /></svg>
                          <span>{op.location}</span>
                        </div>

                        <span className="ops-service-badge">
                          ✨ {op.type}
                        </span>

                        <div className="ops-guest-ribbon">
                          <svg className="icon" style={{ width: 13, height: 13, color: 'var(--gold)' }}><use href="#i-users" /></svg>
                          <span>Guest: <b>{op.guestArrival}</b></span>
                        </div>
                      </div>
                    </div>

                    {/* Specialist & Progress Bar */}
                    <div className="ops-task-specialist-row">
                      <div className="ops-specialist-profile">
                        <div className="ops-specialist-avatar">{op.whoAvatar}</div>
                        <div>
                          <p className="ops-specialist-name">
                            {op.who}
                            <span style={{ fontSize: 10, color: 'var(--green)', fontWeight: 800 }}>● Active</span>
                          </p>
                          <p className="ops-specialist-title">{op.whoRole}</p>
                        </div>
                      </div>

                      <button
                        className="ops-action-btn"
                        style={{ padding: '0 8px', fontSize: 11 }}
                        onClick={() => showToast(`Calling ${op.who} (${op.phone})...`)}
                        title={`Call ${op.who}`}
                      >
                        📞 Contact
                      </button>
                    </div>

                    {/* Checklist Progress */}
                    <div className="ops-task-progress-box">
                      <div className="ops-progress-label">
                        <span>Checklist Verification</span>
                        <b>{op.checklistCount} / {op.checklistTotal} items verified ({pct}%)</b>
                      </div>
                      <div className="ops-progress-track">
                        <div
                          className={`ops-progress-bar ${
                            op.status === 'Ready' ? 'ready' : op.status === 'Attention' ? 'attention' : ''
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    {/* Bottom Actions Row */}
                    <div className="ops-task-foot">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>Status:</span>
                        <select
                          className="ops-status-selector"
                          value={op.status}
                          onChange={e => handleStatusChange(op.id, e.target.value as any)}
                        >
                          <option value="In progress">⚡ In progress</option>
                          <option value="Ready">🔑 Ready for Guest</option>
                          <option value="Attention">⚠️ Needs Attention</option>
                          <option value="Completed">✓ Completed</option>
                        </select>
                      </div>

                      <div className="ops-card-actions">
                        <button
                          className="ops-action-btn"
                          onClick={() => setSelectedTask(op)}
                        >
                          🔍 Audit & Checklist ({op.checklistCount}/{op.checklistTotal})
                        </button>
                        {op.status !== 'Ready' && (
                          <button
                            className="ops-action-btn primary"
                            onClick={() => handleStatusChange(op.id, 'Ready')}
                          >
                            Mark Ready
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Right Column: Interactive Route Optimizer */}
        {viewMode !== 'schedule' && (
          <div className="ops-route-column">
            <div className="ops-route-card">
              <div className="ops-route-head">
                <div>
                  <span className="section-eyebrow">DISPATCH LOGISTICS</span>
                  <h3>Optimized Transit Route</h3>
                  <p>AI sequencing based on guest arrivals & coastal transit speeds.</p>
                </div>
                <button
                  className="ops-action-btn"
                  style={{ fontSize: 11, padding: '4px 10px' }}
                  onClick={handleReoptimizeRoute}
                  disabled={isOptimizing}
                >
                  ⚡ {isOptimizing ? 'Recalculating...' : 'Recalculate'}
                </button>
              </div>

              {/* Stylized Interactive Map Canvas */}
              <div className="ops-map-canvas">
                <div className="ops-map-grid-bg" />

                {/* SVG Coastline & Route Path */}
                <svg className="ops-map-coast-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path
                    d="M 10 20 Q 25 35 30 65 T 70 85 T 95 90"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="8"
                  />
                  <path
                    d="M 26 34 L 44 52 L 74 32 L 62 72 L 30 78"
                    fill="none"
                    stroke="#c59b4e"
                    strokeWidth="2"
                    strokeDasharray="4 3"
                    opacity="0.85"
                  />
                </svg>

                {/* Interactive Waypoint Pins */}
                {operations.map((op, idx) => {
                  const isReady = op.status === 'Ready';
                  const isAttention = op.status === 'Attention';
                  return (
                    <div
                      key={op.id}
                      className={`ops-map-pin ${selectedTask?.id === op.id ? 'active' : ''}`}
                      style={{
                        left: `${op.coordinates.x}%`,
                        top: `${op.coordinates.y}%`,
                        borderColor: isAttention ? '#ef4444' : isReady ? '#10b981' : '#c59b4e'
                      }}
                      onClick={() => {
                        setSelectedTask(op);
                        showToast(`Focused: Stop #${idx + 1} - ${op.property}`);
                      }}
                      title={`Stop #${idx + 1}: ${op.property} (${op.timeWindow})`}
                    >
                      <span>{idx + 1}</span>
                      <div className="ops-map-pin-pulse" />
                    </div>
                  );
                })}

                <div className="ops-map-tooltip">
                  <span>🛰 Southern Brittany GPS Track Active</span>
                  <b>{routeStats.stops} Stops • 4 Specialists</b>
                </div>
              </div>

              {/* Route Telemetry Metrics */}
              <div className="ops-route-telemetry">
                <div className="ops-route-stat">
                  <b>{routeStats.distance}</b>
                  <span>Distance</span>
                </div>
                <div className="ops-route-stat">
                  <b>{routeStats.driveTime}</b>
                  <span>Transit Time</span>
                </div>
                <div className="ops-route-stat">
                  <b>{routeStats.stops}</b>
                  <span>Turnovers</span>
                </div>
                <div className="ops-route-stat">
                  <b style={{ color: '#10b981' }}>{routeStats.savings}</b>
                  <span>Fuel Saved</span>
                </div>
              </div>

              {/* Waypoint Stops Timeline */}
              <div className="ops-waypoint-list">
                {operations.map((op, idx) => (
                  <div key={op.id}>
                    {idx > 0 && (
                      <div className="ops-transit-leg">
                        <span className="ops-transit-line" />
                        <span>🚗 {op.distanceFromPrev || '14 km'} ({op.transitTime || '18m'})</span>
                        <span className="ops-transit-line" />
                      </div>
                    )}
                    <div
                      className={`ops-waypoint-item ${selectedTask?.id === op.id ? 'selected' : ''}`}
                      onClick={() => setSelectedTask(op)}
                    >
                      <div className="ops-waypoint-num">{idx + 1}</div>
                      <div className="ops-waypoint-info">
                        <p className="ops-waypoint-name">{op.property}</p>
                        <p className="ops-waypoint-time">
                          {op.timeWindow} • {op.who} ({op.status})
                        </p>
                      </div>
                      <span className={`status ${op.status === 'Ready' ? 'ok' : op.status === 'In progress' ? 'wait' : 'bad'}`}>
                        {op.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="ops-route-btn-row">
                <button
                  className="btn primary full"
                  style={{ justifyContent: 'center' }}
                  onClick={() => showToast('Turn-by-turn route pushed to Marie Le Guen & Sophie Martin mobile apps!')}
                >
                  📱 Send Route to Specialists' Phones
                </button>
                <button
                  className="btn full"
                  style={{ justifyContent: 'center' }}
                  onClick={() => {
                    window.open('https://maps.google.com?q=Carnac,France', '_blank');
                    showToast('Opening GPS waypoints in Google Maps...');
                  }}
                >
                  🗺 Open in Google Maps Navigation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Task Audit & Room Checklist Drawer / Modal */}
      {selectedTask && (
        <div className="ops-modal-backdrop" onClick={() => setSelectedTask(null)}>
          <div className="ops-modal-card" onClick={e => e.stopPropagation()}>
            <div className="ops-modal-head">
              <div>
                <span className="badge-navy">{selectedTask.id} • {selectedTask.type}</span>
                <h3 style={{ marginTop: 4 }}>{selectedTask.property}</h3>
              </div>
              <button className="iconbtn" onClick={() => setSelectedTask(null)}>✕</button>
            </div>

            <div className="ops-modal-body">
              <div className="ops-form-row">
                <div className="detailbox">
                  <span>ASSIGNED SPECIALIST</span>
                  <b>{selectedTask.who} ({selectedTask.phone})</b>
                </div>
                <div className="detailbox">
                  <span>SCHEDULED WINDOW</span>
                  <b>{selectedTask.timeWindow}</b>
                </div>
              </div>

              <div className="ops-form-row">
                <div className="detailbox">
                  <span>GUEST CHECK-IN ETA</span>
                  <b>{selectedTask.guestArrival}</b>
                </div>
                <div className="detailbox">
                  <span>DISBURSEMENT FEE</span>
                  <b>{selectedTask.amt}</b>
                </div>
              </div>

              {/* Notes */}
              <div style={{ background: 'var(--card2)', padding: 12, borderRadius: 8, fontSize: 13, border: '1px solid var(--line)' }}>
                <b style={{ color: 'var(--text)' }}>Specialist Notes: </b>
                <span style={{ color: 'var(--text-secondary)' }}>{selectedTask.notes}</span>
              </div>

              {/* Interactive Room-by-room Checklist */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <h4 style={{ margin: 0, fontSize: 15, fontWeight: 750 }}>
                    Turnover Quality Checklist ({selectedTask.checklistCount}/{selectedTask.checklistTotal})
                  </h4>
                  <span className="status ok" style={{ fontSize: 10 }}>Live Audit Sync</span>
                </div>

                {selectedTask.checklists.map((cat, catIdx) => (
                  <div key={cat.category} className="ops-checklist-group">
                    <p className="ops-checklist-title">{cat.category}</p>
                    {cat.items.map(item => (
                      <label key={item.id} className={`ops-check-item ${item.done ? 'done' : ''}`}>
                        <input
                          type="checkbox"
                          checked={item.done}
                          onChange={() => handleToggleChecklist(selectedTask.id, catIdx, item.id)}
                        />
                        <span>{item.text}</span>
                      </label>
                    ))}
                  </div>
                ))}
              </div>

              {/* Before & After Photo Verification */}
              <div>
                <h4 style={{ margin: '8px 0 6px', fontSize: 14, fontWeight: 750 }}>
                  Photographic Audit Verification
                </h4>
                <div className="ops-photo-grid">
                  <div>
                    <small style={{ color: 'var(--muted)', display: 'block', marginBottom: 4 }}>Before Cleaning Photo</small>
                    {selectedTask.beforePhotos[0] ? (
                      <div style={{ borderRadius: 8, overflow: 'hidden', height: 110 }}>
                        <ZenImage src={selectedTask.beforePhotos[0]} alt="Before" aspectRatio="16/9" />
                      </div>
                    ) : (
                      <div style={{ height: 110, background: 'var(--card2)', borderRadius: 8, display: 'grid', placeItems: 'center', fontSize: 12, color: 'var(--muted)' }}>
                        No before photo uploaded
                      </div>
                    )}
                  </div>
                  <div>
                    <small style={{ color: 'var(--muted)', display: 'block', marginBottom: 4 }}>Guest Ready Resolved Proof</small>
                    {selectedTask.afterPhotos[0] ? (
                      <div style={{ borderRadius: 8, overflow: 'hidden', height: 110 }}>
                        <ZenImage src={selectedTask.afterPhotos[0]} alt="After" aspectRatio="16/9" />
                      </div>
                    ) : (
                      <div style={{ height: 110, background: 'var(--card2)', borderRadius: 8, display: 'grid', placeItems: 'center', fontSize: 12, color: 'var(--muted)' }}>
                        Awaiting specialist completion upload
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="ops-modal-foot">
              <button className="btn" onClick={() => setSelectedTask(null)}>Close</button>
              {selectedTask.status !== 'Ready' && (
                <button
                  className="btn primary"
                  onClick={() => {
                    handleStatusChange(selectedTask.id, 'Ready');
                    setSelectedTask(null);
                  }}
                >
                  ✓ Certify Ready for Guest
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Assignment / Dispatch Modal */}
      {isAddModalOpen && (
        <div className="ops-modal-backdrop" onClick={() => setIsAddModalOpen(false)}>
          <div className="ops-modal-card" onClick={e => e.stopPropagation()}>
            <div className="ops-modal-head">
              <div>
                <span className="section-eyebrow">FIELD ASSIGNMENT DISPATCH</span>
                <h3>Schedule New Turnover or Intervention</h3>
              </div>
              <button className="iconbtn" onClick={() => setIsAddModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleCreateAssignment}>
              <div className="ops-modal-body">
                <div className="ops-form-group">
                  <label>Managed Property</label>
                  <select value={newProp} onChange={e => setNewProp(e.target.value)}>
                    <option value="Villa Les Embruns">Villa Les Embruns (Carnac)</option>
                    <option value="Maison Moriconi">Maison Moriconi (La Trinité)</option>
                    <option value="Villa Guidel Plage">Villa Guidel Plage (Guidel)</option>
                    <option value="Appartement Kerjouanno">Appartement Kerjouanno (Arzon)</option>
                    <option value="Maison de la Plage">Maison de la Plage (Quiberon)</option>
                    <option value="Manoir de Kerdurand">Manoir de Kerdurand (Riantec)</option>
                  </select>
                </div>

                <div className="ops-form-row">
                  <div className="ops-form-group">
                    <label>Intervention Type</label>
                    <select value={newType} onChange={e => setNewType(e.target.value as any)}>
                      <option value="Check-out & Turnover">Check-out & Turnover</option>
                      <option value="VIP Pre-Arrival Prep">VIP Pre-Arrival Prep</option>
                      <option value="Deep Clean & Pool">Deep Clean & Pool</option>
                      <option value="Mid-Stay Refresh">Mid-Stay Refresh</option>
                      <option value="Departure Inspection">Departure Inspection</option>
                    </select>
                  </div>

                  <div className="ops-form-group">
                    <label>Assign Specialist</label>
                    <select value={newWho} onChange={e => setNewWho(e.target.value)}>
                      <option value="Marie Le Guen">Marie Le Guen (Field Lead)</option>
                      <option value="Sophie Martin">Sophie Martin (Deep Clean Lead)</option>
                      <option value="Julie Renaud">Julie Renaud (Audit Specialist)</option>
                    </select>
                  </div>
                </div>

                <div className="ops-form-row">
                  <div className="ops-form-group">
                    <label>Time Window</label>
                    <input
                      type="text"
                      value={newTime}
                      onChange={e => setNewTime(e.target.value)}
                      placeholder="e.g. 10:30 - 13:00"
                      required
                    />
                  </div>

                  <div className="ops-form-group">
                    <label>Disbursement Fee</label>
                    <input
                      type="text"
                      value={newAmt}
                      onChange={e => setNewAmt(e.target.value)}
                      placeholder="€185.00"
                      required
                    />
                  </div>
                </div>

                <div className="ops-form-row">
                  <div className="ops-form-group">
                    <label>Urgency Priority</label>
                    <select value={newPriority} onChange={e => setNewPriority(e.target.value as any)}>
                      <option value="Normal">Normal</option>
                      <option value="High">High Urgency</option>
                      <option value="Urgent">Critical / Immediate Departure</option>
                    </select>
                  </div>

                  <div className="ops-form-group">
                    <label>Guest Arrival ETA</label>
                    <input
                      type="text"
                      value={newGuest}
                      onChange={e => setNewGuest(e.target.value)}
                      placeholder="16:00 • Guest Name"
                    />
                  </div>
                </div>

                <div className="ops-form-group">
                  <label>Instructions & Special Requests</label>
                  <textarea
                    value={newNotes}
                    onChange={e => setNewNotes(e.target.value)}
                    placeholder="Enter instructions for linen setup, champagne cooler, or pool check..."
                  />
                </div>
              </div>

              <div className="ops-modal-foot">
                <button type="button" className="btn" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn primary">
                  Dispatch Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
