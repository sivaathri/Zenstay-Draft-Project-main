import { useState } from 'react';
import './index.css';
import { Icons } from './Icons';
import { Auth } from './Auth';
import { LandingPage } from './pages/LandingPage';
import { Overview } from './pages/Overview';
import { AiIntelligence } from './pages/AiIntelligence';
import { Finance } from './pages/Finance';
import { Properties } from './pages/Properties';
import { Housekeepers } from './pages/Housekeepers';
import { Operations } from './pages/Operations';
import { Calendar } from './pages/Calendar';
import { Messages } from './pages/Messages';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { HkHome } from './pages/HkHome';
import { HkAssign } from './pages/HkAssign';
import { Maintenance } from './pages/Maintenance';
import { CrmRealEstate } from './pages/CrmRealEstate';
import { OwnerPortal } from './pages/OwnerPortal';
import { TravelerPortal } from './pages/TravelerPortal';

type Role = 'manager' | 'housekeeper' | 'owner' | 'traveler';
type Page =
  | 'overview'
  | 'operations'
  | 'calendar'
  | 'properties'
  | 'housekeepers'
  | 'maintenance'
  | 'crm'
  | 'finance'
  | 'messages'
  | 'reports'
  | 'ai'
  | 'settings'
  | 'hkhome'
  | 'hkassign'
  | 'owner'
  | 'traveler';

function Sidebar({
  role,
  activePage,
  setPage,
  onGoToLanding
}: {
  role: Role;
  activePage: Page;
  setPage: (p: Page) => void;
  onGoToLanding: () => void;
}) {
  return (
    <aside className="sidebar" id="sidebar">
      <div className="brand" onClick={onGoToLanding} style={{ cursor: 'pointer' }}>
        <div className="brandmark">
          <svg viewBox="0 0 48 48">
            <path d="M8 23 24 10l16 13v16H8z" fill="#081726" />
            <path d="M19 39V27h10v12" fill="#c59b4e" />
          </svg>
        </div>
        <div>
          <h1>ZENSTAY</h1>
          <p>Luxury Hospitality OS</p>
        </div>
      </div>

      {/* MANAGER NAVIGATION */}
      {role === 'manager' && (
        <div id="managerNav">
          <div className="workspace-label">Core Operations</div>
          <nav className="nav">
            <button className={activePage === 'overview' ? 'active' : ''} onClick={() => setPage('overview')}>
              <svg className="icon"><use href="#i-home" /></svg>Overview
            </button>
            <button className={activePage === 'operations' ? 'active' : ''} onClick={() => setPage('operations')}>
              <svg className="icon"><use href="#i-grid" /></svg>Operations<span className="count">12</span>
            </button>
            <button className={activePage === 'calendar' ? 'active' : ''} onClick={() => setPage('calendar')}>
              <svg className="icon"><use href="#i-cal" /></svg>Reservation Matrix
            </button>
            <button className={activePage === 'properties' ? 'active' : ''} onClick={() => setPage('properties')}>
              <svg className="icon"><use href="#i-house" /></svg>Properties
            </button>
            <button className={activePage === 'housekeepers' ? 'active' : ''} onClick={() => setPage('housekeepers')}>
              <svg className="icon"><use href="#i-users" /></svg>Housekeepers
            </button>
            <button className={activePage === 'maintenance' ? 'active' : ''} onClick={() => setPage('maintenance')}>
              <svg className="icon"><use href="#i-grid" /></svg>Work Orders<span className="count">4</span>
            </button>
            <button className={activePage === 'crm' ? 'active' : ''} onClick={() => setPage('crm')}>
              <svg className="icon"><use href="#i-house" /></svg>Real Estate CRM
            </button>
          </nav>

          <div className="workspace-label">Finance & Intelligence</div>
          <nav className="nav">
            <button className={activePage === 'finance' ? 'active' : ''} onClick={() => setPage('finance')}>
              <svg className="icon"><use href="#i-money" /></svg>Finance
            </button>
            <button className={activePage === 'messages' ? 'active' : ''} onClick={() => setPage('messages')}>
              <svg className="icon"><use href="#i-msg" /></svg>Messages<span className="count">4</span>
            </button>
            <button className={activePage === 'reports' ? 'active' : ''} onClick={() => setPage('reports')}>
              <svg className="icon"><use href="#i-chart" /></svg>Reports
            </button>
            <button className={activePage === 'ai' ? 'active' : ''} onClick={() => setPage('ai')}>
              <svg className="icon"><use href="#i-search" /></svg>ZENSTAY AI<span className="count">RAG</span>
            </button>
            <button className={activePage === 'settings' ? 'active' : ''} onClick={() => setPage('settings')}>
              <svg className="icon"><use href="#i-settings" /></svg>Settings
            </button>
          </nav>
        </div>
      )}

      {/* HOUSEKEEPER NAVIGATION */}
      {role === 'housekeeper' && (
        <div id="hkNav">
          <div className="workspace-label">Field Specialist</div>
          <nav className="nav">
            <button className={activePage === 'hkhome' ? 'active' : ''} onClick={() => setPage('hkhome')}>
              <svg className="icon"><use href="#i-home" /></svg>Field Home
            </button>
            <button className={activePage === 'hkassign' ? 'active' : ''} onClick={() => setPage('hkassign')}>
              <svg className="icon"><use href="#i-grid" /></svg>Assignments<span className="count">5</span>
            </button>
            <button className={activePage === 'properties' ? 'active' : ''} onClick={() => setPage('properties')}>
              <svg className="icon"><use href="#i-house" /></svg>Properties
            </button>
            <button className={activePage === 'calendar' ? 'active' : ''} onClick={() => setPage('calendar')}>
              <svg className="icon"><use href="#i-cal" /></svg>Schedule
            </button>
            <button className={activePage === 'finance' ? 'active' : ''} onClick={() => setPage('finance')}>
              <svg className="icon"><use href="#i-money" /></svg>My Earnings
            </button>
            <button className={activePage === 'messages' ? 'active' : ''} onClick={() => setPage('messages')}>
              <svg className="icon"><use href="#i-msg" /></svg>Messages
            </button>
            <button className={activePage === 'ai' ? 'active' : ''} onClick={() => setPage('ai')}>
              <svg className="icon"><use href="#i-search" /></svg>AI Assistant
            </button>
          </nav>
        </div>
      )}

      {/* OWNER NAVIGATION */}
      {role === 'owner' && (
        <div id="ownerNav">
          <div className="workspace-label">Asset Owner Portal</div>
          <nav className="nav">
            <button className={activePage === 'owner' ? 'active' : ''} onClick={() => setPage('owner')}>
              <svg className="icon"><use href="#i-chart" /></svg>Yield & Performance
            </button>
            <button className={activePage === 'properties' ? 'active' : ''} onClick={() => setPage('properties')}>
              <svg className="icon"><use href="#i-house" /></svg>My Properties
            </button>
            <button className={activePage === 'calendar' ? 'active' : ''} onClick={() => setPage('calendar')}>
              <svg className="icon"><use href="#i-cal" /></svg>Booking Calendar
            </button>
            <button className={activePage === 'maintenance' ? 'active' : ''} onClick={() => setPage('maintenance')}>
              <svg className="icon"><use href="#i-grid" /></svg>Maintenance Works
            </button>
            <button className={activePage === 'messages' ? 'active' : ''} onClick={() => setPage('messages')}>
              <svg className="icon"><use href="#i-msg" /></svg>Concierge Liaison
            </button>
          </nav>
        </div>
      )}

      {/* TRAVELER NAVIGATION */}
      {role === 'traveler' && (
        <div id="travelerNav">
          <div className="workspace-label">VIP Guest Experience</div>
          <nav className="nav">
            <button className={activePage === 'traveler' ? 'active' : ''} onClick={() => setPage('traveler')}>
              <svg className="icon"><use href="#i-home" /></svg>Digital Concierge
            </button>
            <button className={activePage === 'messages' ? 'active' : ''} onClick={() => setPage('messages')}>
              <svg className="icon"><use href="#i-msg" /></svg>Concierge Chat
            </button>
          </nav>
        </div>
      )}

      <div className="side-foot">
        <button
          className="btn full"
          onClick={onGoToLanding}
          style={{ marginBottom: 12, background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          🌐 Public Website
        </button>

        <div className="syncbox">
          <div className="syncrow">
            <span><span className="dot"></span>Guesty Connected</span>
            <button id="syncBtn" style={{ border: 0, background: 'transparent', color: '#fff', padding: 0 }}>
              <svg className="icon" style={{ width: 15, height: 15 }}><use href="#i-sync" /></svg>
            </button>
          </div>
          <p id="syncText">Instant webhook sync active</p>
        </div>
      </div>
    </aside>
  );
}

function Topbar({
  role,
  onSwitchRole,
  onGoToLanding,
  toggleTheme
}: {
  role: Role;
  onSwitchRole: (r: Role) => void;
  onGoToLanding: () => void;
  toggleTheme: () => void;
}) {
  const roleDisplayNames = {
    manager: 'Albert Yvard (Super Admin)',
    housekeeper: 'Marie Le Guen (Field Lead)',
    owner: 'Baron de Montmirail (Owner)',
    traveler: 'Laurent de Montmirail (VIP Guest)'
  };

  const roleAvatars = {
    manager: 'AY',
    housekeeper: 'ML',
    owner: 'BM',
    traveler: 'LM'
  };

  return (
    <header className="topbar">
      <button className="topbtn mobile-menu" id="menuBtn">
        <svg className="icon"><use href="#i-menu" /></svg>
      </button>

      {/* Persona Switcher for Evaluation */}
      <div className="topbar-role-selector">
        <span className="role-selector-label">VIEW WORKSPACE:</span>
        <select
          className="role-selector-dropdown"
          value={role}
          onChange={(e) => onSwitchRole(e.target.value as Role)}
        >
          <option value="manager">Enterprise Manager (HQ)</option>
          <option value="housekeeper">Field Specialist (Mobile)</option>
          <option value="owner">Asset Owner Portal</option>
          <option value="traveler">VIP Traveler Concierge</option>
        </select>
      </div>

      <div className="top-spacer"></div>

      <button className="btn" onClick={onGoToLanding} style={{ height: 34, fontSize: 11 }}>
        Public Site ↗
      </button>

      <span className="pill">
        <span className="dot"></span>Live PMS Telemetry
      </span>

      <button className="topbtn" onClick={toggleTheme} title="Toggle Dark/Light Mode">
        <svg className="icon"><use href="#i-moon" /></svg>
      </button>

      <button className="topbtn" id="notifyBtn" title="Notifications">
        <svg className="icon"><use href="#i-bell" /></svg>
        <span className="notif-dot"></span>
      </button>

      <div className="profile">
        <div className="avatar" id="profileAvatar">{roleAvatars[role]}</div>
        <div className="profile-text">
          <b id="profileName">{roleDisplayNames[role].split(' (')[0]}</b>
          <small id="profileRole">{role.toUpperCase()}</small>
        </div>
      </div>
    </header>
  );
}

export default function App() {
  const [view, setView] = useState<'landing' | 'app' | 'auth'>('landing');
  const [role, setRole] = useState<Role>('manager');
  const [activePage, setPage] = useState<Page>('overview');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleLogin = (r: Role) => {
    setRole(r);
    setView('app');
    if (r === 'manager') setPage('overview');
    else if (r === 'housekeeper') setPage('hkhome');
    else if (r === 'owner') setPage('owner');
    else if (r === 'traveler') setPage('traveler');
  };

  const handleRoleSwitch = (r: Role) => {
    setRole(r);
    if (r === 'manager') setPage('overview');
    else if (r === 'housekeeper') setPage('hkhome');
    else if (r === 'owner') setPage('owner');
    else if (r === 'traveler') setPage('traveler');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.dataset.theme = newTheme;
  };

  // 1. PUBLIC LANDING PAGE
  if (view === 'landing') {
    return (
      <>
        <Icons />
        <LandingPage
          onExploreApp={() => {
            setView('app');
            setPage('overview');
          }}
          onOpenLogin={() => setView('auth')}
        />
      </>
    );
  }

  // 2. AUTH LOGIN PAGE
  if (view === 'auth') {
    return (
      <>
        <Icons />
        <Auth
          onLogin={handleLogin}
          onBackToLanding={() => setView('landing')}
        />
      </>
    );
  }

  // 3. ENTERPRISE APPLICATION SHELL
  return (
    <>
      <Icons />
      <section id="app">
        <Sidebar
          role={role}
          activePage={activePage}
          setPage={setPage}
          onGoToLanding={() => setView('landing')}
        />
        <Topbar
          role={role}
          onSwitchRole={handleRoleSwitch}
          onGoToLanding={() => setView('landing')}
          toggleTheme={toggleTheme}
        />
        <main className="main">
          {activePage === 'overview' && <Overview role={role === 'manager' ? 'manager' : 'housekeeper'} />}
          {activePage === 'operations' && <Operations />}
          {activePage === 'calendar' && <Calendar />}
          {activePage === 'properties' && <Properties />}
          {activePage === 'housekeepers' && <Housekeepers />}
          {activePage === 'maintenance' && <Maintenance />}
          {activePage === 'crm' && <CrmRealEstate />}
          {activePage === 'finance' && <Finance role={role === 'manager' ? 'manager' : 'housekeeper'} />}
          {activePage === 'messages' && <Messages />}
          {activePage === 'reports' && <Reports />}
          {activePage === 'ai' && <AiIntelligence />}
          {activePage === 'settings' && <Settings />}
          {activePage === 'hkhome' && <HkHome />}
          {activePage === 'hkassign' && <HkAssign />}
          {activePage === 'owner' && <OwnerPortal />}
          {activePage === 'traveler' && <TravelerPortal />}
        </main>
      </section>
    </>
  );
}
