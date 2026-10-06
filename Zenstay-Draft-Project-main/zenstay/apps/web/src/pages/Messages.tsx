import { useState, useMemo } from 'react';
import { ZenImage } from '../components/ZenImage';

interface Message {
  id: string;
  sender: 'contact' | 'me' | 'system';
  text: string;
  time: string;
  read?: boolean;
}

export interface Conversation {
  id: string;
  contactName: string;
  contactRole: string;
  avatar: string;
  avatarBg?: string;
  online: boolean;
  category: 'Guests' | 'Operations' | 'Contractors';
  channel: 'Airbnb' | 'Guesty PMS' | 'Direct VIP' | 'Field WhatsApp';
  property: string;
  propertyThumb: string;
  stayDates: string;
  guestCount: number;
  lockPin: string;
  hkStatus: string;
  folioTotal: string;
  unreadCount: number;
  lastMessageSnippet: string;
  lastMessageTime: string;
  messages: Message[];
  aiSuggestions: string[];
}

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    contactName: 'Camille Bernard',
    contactRole: 'VIP Guest (Maison Moriconi)',
    avatar: 'CB',
    avatarBg: '#b77a25',
    online: true,
    category: 'Guests',
    channel: 'Airbnb',
    property: 'Maison Moriconi',
    propertyThumb: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80',
    stayDates: '1 – 5 Oct 2026 (4 Nights)',
    guestCount: 2,
    lockPin: '9604#',
    hkStatus: 'Ready for Guest (Verified 8/8)',
    folioTotal: '€960.00 Paid',
    unreadCount: 1,
    lastMessageSnippet: 'Can we arrive around 14:00 instead of 16:00?',
    lastMessageTime: '4m ago',
    messages: [
      { id: 'm-1', sender: 'contact', text: 'Bonjour Albert! We just landed at Lorient airport. Can we check in around 14:00 instead of 16:00?', time: '13:42' },
      { id: 'm-2', sender: 'me', text: 'Bonjour Camille! Let me check with Marie Le Guen, our lead specialist on site right now.', time: '13:45', read: true },
      { id: 'm-3', sender: 'system', text: 'Housekeeping status updated to: Ready for Guest (100% verified)', time: '13:48' },
      { id: 'm-4', sender: 'contact', text: 'That would be wonderful, we have some fresh local seafood for the fridge! Merci!', time: '13:50' }
    ],
    aiSuggestions: [
      '⚡ Approve Early Check-in at 14:00 (Unit Ready)',
      '🔑 Send Nuki Smart Lock Keypad PIN (9604#)',
      '🍷 Confirm Ruinart Champagne Delivery in Wine Cooler'
    ]
  },
  {
    id: 'conv-2',
    contactName: 'Baron Laurent de Montmirail',
    contactRole: 'Direct VIP Guest (Villa Les Embruns)',
    avatar: 'LM',
    avatarBg: '#081726',
    online: true,
    category: 'Guests',
    channel: 'Direct VIP',
    property: 'Villa Les Embruns',
    propertyThumb: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=400&q=80',
    stayDates: '1 – 7 Oct 2026 (6 Nights)',
    guestCount: 4,
    lockPin: '8402#',
    hkStatus: 'In progress (14/18 verified)',
    folioTotal: '€2,532.20 Paid',
    unreadCount: 2,
    lastMessageSnippet: 'Is the private sommelier confirmed for tomorrow dinner?',
    lastMessageTime: '18m ago',
    messages: [
      { id: 'm-20', sender: 'contact', text: 'Good morning Albert. We will be driving down from Paris with the family.', time: '11:15' },
      { id: 'm-21', sender: 'contact', text: 'Is the private sommelier tasting confirmed for tomorrow evening at 19:30 on the terrace?', time: '12:18' },
      { id: 'm-22', sender: 'me', text: 'Bonjour Monsieur le Baron. Yes, Sommelier Jean-Yves has curated the Brittany natural cider and Loire Valley grand crus pairing. All confirmed!', time: '12:22', read: true }
    ],
    aiSuggestions: [
      '🍾 Confirm Sommelier Tasting & Fresh Oysters',
      '🌡 Verify Heated Pool Temperature (28°C)',
      '🚗 Inquire about Rennes Airport Chauffeur'
    ]
  },
  {
    id: 'conv-3',
    contactName: 'Sophie Martin',
    contactRole: 'Deep Clean & Sanitization Lead',
    avatar: 'SM',
    avatarBg: '#10b981',
    online: true,
    category: 'Operations',
    channel: 'Field WhatsApp',
    property: 'Villa Guidel Plage',
    propertyThumb: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
    stayDates: 'Field Duty (Oct 1)',
    guestCount: 0,
    lockPin: '3150#',
    hkStatus: 'Deep Clean In Progress',
    folioTotal: '€220.00 Payout',
    unreadCount: 0,
    lastMessageSnippet: 'Photos uploaded for Villa Guidel terrace & pool.',
    lastMessageTime: '24m ago',
    messages: [
      { id: 'm-30', sender: 'contact', text: 'Albert, the delayed linen delivery van just arrived at Guidel. We are dressing the master suites now.', time: '13:10' },
      { id: 'm-31', sender: 'contact', text: 'Photos uploaded for Villa Guidel terrace, pool skimmer, and ensuite baths. 18/22 items checked.', time: '13:28' },
      { id: 'm-32', sender: 'me', text: 'Excellent work Sophie. Alexandre Dumas and party arrive at 17:30, so plenty of buffer. Merci!', time: '13:30', read: true }
    ],
    aiSuggestions: [
      '✓ Approve Photos & Sign off Inspection',
      '☕ Send Coffee Break Voucher',
      '📍 Next Route Stop: Maison de la Plage (16:30)'
    ]
  },
  {
    id: 'conv-4',
    contactName: 'Thomas Dubois',
    contactRole: 'Guest (Villa Océane)',
    avatar: 'TD',
    avatarBg: '#2563eb',
    online: false,
    category: 'Guests',
    channel: 'Guesty PMS',
    property: 'Villa Océane',
    propertyThumb: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=400&q=80',
    stayDates: '2 – 8 Oct 2026 (6 Nights)',
    guestCount: 6,
    lockPin: '3040#',
    hkStatus: 'Pending Changeover',
    folioTotal: '€2,400.00 Deposit Held',
    unreadCount: 0,
    lastMessageSnippet: 'Thank you Albert, digital guide received!',
    lastMessageTime: '1h ago',
    messages: [
      { id: 'm-40', sender: 'me', text: 'Hello Thomas, here is your digital concierge guide and beach recommendations for Larmor-Plage.', time: '10:00', read: true },
      { id: 'm-41', sender: 'contact', text: 'Thank you Albert, digital guide received! Looking forward to arriving tomorrow.', time: '11:32' }
    ],
    aiSuggestions: [
      '🔑 Send Pre-arrival Check-in Pass',
      '🏄 Offer Catamaran Sailing Charter'
    ]
  },
  {
    id: 'conv-5',
    contactName: 'Jean-Luc B. (Carnac Plomberie)',
    contactRole: 'Certified Contractor Partner',
    avatar: 'JL',
    avatarBg: '#8b5cf6',
    online: true,
    category: 'Contractors',
    channel: 'Field WhatsApp',
    property: 'Villa Les Embruns',
    propertyThumb: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=400&q=80',
    stayDates: 'WO-801 Maintenance',
    guestCount: 0,
    lockPin: '8402#',
    hkStatus: 'Resolved',
    folioTotal: '€185.00 Quotation',
    unreadCount: 0,
    lastMessageSnippet: 'Shower mixer pressure valve replaced and tested.',
    lastMessageTime: '2h ago',
    messages: [
      { id: 'm-50', sender: 'contact', text: 'Intervention completed at Villa Les Embruns. Rainfall shower pressure valve replaced and pressure gauge verified at 3.2 bar.', time: '10:45' },
      { id: 'm-51', sender: 'me', text: 'Invoice approved Jean-Luc. SEPA transfer will be released in today’s batch closing.', time: '11:00', read: true }
    ],
    aiSuggestions: [
      '📥 Download Contractor Invoice & Receipt',
      '⭐ Rate Contractor Quality (5/5)'
    ]
  }
];

export function Messages() {
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState<string>('conv-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All' | 'Guests' | 'Operations' | 'Contractors'>('All');
  const [inputText, setInputText] = useState('');
  const [isContextVisible, setIsContextVisible] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  // Active conversation
  const activeConv = useMemo(() => {
    return conversations.find(c => c.id === activeConvId) || conversations[0];
  }, [conversations, activeConvId]);

  // Filtered thread list
  const filteredThreads = useMemo(() => {
    return conversations.filter(c => {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        c.contactName.toLowerCase().includes(q) ||
        c.property.toLowerCase().includes(q) ||
        c.lastMessageSnippet.toLowerCase().includes(q);

      if (!matchSearch) return false;
      if (activeCategory !== 'All' && c.category !== activeCategory) return false;

      return true;
    });
  }, [conversations, searchQuery, activeCategory]);

  // Send message handler
  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const newMsg: Message = {
      id: `m-${Date.now()}`,
      sender: 'me',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true
    };

    setConversations(prev =>
      prev.map(c => {
        if (c.id !== activeConvId) return c;
        return {
          ...c,
          messages: [...c.messages, newMsg],
          lastMessageSnippet: text.trim(),
          lastMessageTime: 'Just now',
          unreadCount: 0
        };
      })
    );

    setInputText('');
    showToast(`Reply sent to ${activeConv.contactName}`);

    // Simulate realistic intelligent auto-acknowledgement after 1.8 seconds
    if (activeConv.category === 'Guests') {
      setTimeout(() => {
        const autoReply: Message = {
          id: `m-${Date.now() + 1}`,
          sender: 'contact',
          text: `Merci beaucoup Albert! That is wonderfully fast. We truly appreciate the five-star Zenstay concierge service.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setConversations(current =>
          current.map(c => {
            if (c.id !== activeConvId) return c;
            return {
              ...c,
              messages: [...c.messages, autoReply],
              lastMessageSnippet: autoReply.text,
              lastMessageTime: 'Just now'
            };
          })
        );
      }, 1800);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    // Strip leading emoji
    const cleanText = suggestion.replace(/^[^\w]+/, '');
    if (suggestion.includes('Approve Early Check-in')) {
      handleSendMessage('Bonjour! Good news: your residence is fully ready and certified by our housekeeping lead. You are warmly approved to check in at 14:00!');
    } else if (suggestion.includes('Smart Lock')) {
      handleSendMessage(`Here is your keyless smart lock Nuki PIN code: ${activeConv.lockPin}. Simply enter this on the illuminated keypad at the front door.`);
    } else if (suggestion.includes('Champagne')) {
      handleSendMessage('We have confirmed your bottle of chilled champagne in the wine cooler to welcome you upon arrival!');
    } else {
      handleSendMessage(cleanText);
    }
  };

  return (
    <div className="messages-page-root">
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
          <span className="section-eyebrow">OMNICHANNEL GUEST & FIELD COMMS</span>
          <h2>Unified Concierge & Operations Messaging</h2>
          <p>
            Real-time unified inbox across Guesty PMS, Airbnb, WhatsApp, VIP Direct Concierge, and Field Specialist dispatch.
          </p>
        </div>
        <div className="actions">
          <div className="ops-telemetry-badge">
            <span className="ops-pulse-dot"></span>
            <span>99.8% Response Rate • Avg 3.4m</span>
          </div>
          <button
            className="btn"
            onClick={() => showToast('AI Concierge Auto-Draft Mode is active and assisting responses')}
          >
            🤖 AI Auto-Pilot: Active
          </button>
          <button
            className="btn primary"
            onClick={() => showToast('New broadcast notification drawer opened')}
          >
            <svg className="icon"><use href="#i-plus" /></svg>
            + Broadcast Alert
          </button>
        </div>
      </div>

      {/* 4-Card Messaging KPIs */}
      <div className="messages-kpis-grid">
        <div className="messages-kpi-card">
          <div className="messages-kpi-top">
            <span className="messages-kpi-label">Active Inquiries</span>
            <span className="ops-kpi-icon gold">💬</span>
          </div>
          <div className="messages-kpi-val">18 Threads</div>
          <div className="messages-kpi-sub pos">
            <span>3 requiring manager reply</span>
          </div>
        </div>

        <div className="messages-kpi-card">
          <div className="messages-kpi-top">
            <span className="messages-kpi-label">Channel Webhooks</span>
            <span className="ops-kpi-icon green">⚡</span>
          </div>
          <div className="messages-kpi-val">Guesty & Airbnb</div>
          <div className="messages-kpi-sub pos">
            <span>Instant 2-way sync live</span>
          </div>
        </div>

        <div className="messages-kpi-card">
          <div className="messages-kpi-top">
            <span className="messages-kpi-label">Avg. Response Time</span>
            <span className="ops-kpi-icon blue">⏱</span>
          </div>
          <div className="messages-kpi-val">3.4 min</div>
          <div className="messages-kpi-sub pos">
            <span>-42% via AI Concierge drafts</span>
          </div>
        </div>

        <div className="messages-kpi-card">
          <div className="messages-kpi-top">
            <span className="messages-kpi-label">Guest CSAT Score</span>
            <span className="ops-kpi-icon green">⭐</span>
          </div>
          <div className="messages-kpi-val">4.98 / 5</div>
          <div className="messages-kpi-sub pos">
            <span>99.2% positive reviews</span>
          </div>
        </div>
      </div>

      {/* Main 3-Column Unified Messaging Card */}
      <div className={`card messages-main-card ${!isContextVisible ? 'no-context' : ''}`}>
        {/* 1. Left Inbox Pane */}
        <div className="messages-inbox-pane">
          <div className="messages-inbox-head">
            {/* Search Box */}
            <div className="messages-search-wrap">
              <svg className="ops-search-icon icon"><use href="#i-search" /></svg>
              <input
                type="text"
                className="messages-search-input"
                placeholder="Search conversations, guests, villas..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="ops-search-clear" onClick={() => setSearchQuery('')}>✕</button>
              )}
            </div>

            {/* Category Filter Tabs */}
            <div className="messages-inbox-tabs">
              {(['All', 'Guests', 'Operations', 'Contractors'] as const).map(cat => (
                <button
                  key={cat}
                  className={`messages-inbox-tab ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat === 'All' ? 'All Threads' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable Thread List */}
          <div className="messages-thread-list">
            {filteredThreads.map(conv => {
              const isActive = conv.id === activeConvId;
              return (
                <div
                  key={conv.id}
                  className={`messages-thread-item ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setActiveConvId(conv.id);
                    // Mark as read
                    setConversations(prev =>
                      prev.map(c => (c.id === conv.id ? { ...c, unreadCount: 0 } : c))
                    );
                  }}
                >
                  <div className="thread-avatar-wrap">
                    <div className="thread-avatar" style={{ background: conv.avatarBg || '#081726' }}>
                      {conv.avatar}
                    </div>
                    {conv.online && <div className="thread-online-dot" />}
                  </div>

                  <div className="thread-info">
                    <div className="thread-top-row">
                      <h4 className="thread-name">{conv.contactName}</h4>
                      <span className="thread-time">{conv.lastMessageTime}</span>
                    </div>

                    <div className="thread-prop-sub">
                      <span>{conv.property}</span>
                      <span style={{ color: 'var(--muted)', fontWeight: 500 }}> • {conv.channel}</span>
                    </div>

                    <div className="thread-snippet-row">
                      <p className="thread-snippet">{conv.lastMessageSnippet}</p>
                      {conv.unreadCount > 0 && (
                        <span className="thread-unread-badge">{conv.unreadCount}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Center Chat Stream Pane */}
        <div className="messages-chat-pane">
          {/* Header */}
          <div className="messages-chat-header">
            <div className="chat-header-profile">
              <div
                className="thread-avatar"
                style={{ width: 42, height: 42, background: activeConv.avatarBg || '#081726' }}
              >
                {activeConv.avatar}
              </div>
              <div style={{ minWidth: 0 }}>
                <h3 className="chat-header-name">
                  <span>{activeConv.contactName}</span>
                  <span className="badge-navy" style={{ fontSize: 9 }}>{activeConv.channel}</span>
                </h3>
                <p className="chat-header-meta">
                  📍 {activeConv.property} • {activeConv.stayDates}
                </p>
              </div>
            </div>

            <div className="chat-header-actions">
              <button
                className="chat-header-btn"
                onClick={() => showToast(`Calling ${activeConv.contactName}...`)}
              >
                📞 Call
              </button>
              <button
                className="chat-header-btn"
                onClick={() => showToast(`Smart Lock Keypad PIN: ${activeConv.lockPin}`)}
              >
                🔒 PIN: {activeConv.lockPin}
              </button>
              <button
                className="chat-header-btn"
                onClick={() => setIsContextVisible(!isContextVisible)}
                title="Toggle Stay Details Dossier"
              >
                📋 {isContextVisible ? 'Hide Context' : 'Show Context'}
              </button>
            </div>
          </div>

          {/* Message Stream */}
          <div className="messages-stream-wrap">
            <div className="stream-date-divider">
              <span className="stream-date-pill">Today, Thursday 1 October 2026</span>
            </div>

            {activeConv.messages.map(msg => {
              if (msg.sender === 'system') {
                return (
                  <div key={msg.id} className="stream-system-event">
                    <span>⚡ {msg.text}</span>
                    <small style={{ opacity: 0.8 }}>({msg.time})</small>
                  </div>
                );
              }

              const isMe = msg.sender === 'me';

              return (
                <div key={msg.id} className={`msg-row ${isMe ? 'outgoing' : 'incoming'}`}>
                  {!isMe && (
                    <div className="msg-avatar" style={{ background: activeConv.avatarBg || 'var(--card2)' }}>
                      {activeConv.avatar}
                    </div>
                  )}

                  <div className="msg-bubble-box">
                    <div className="msg-bubble">
                      {msg.text}
                    </div>
                    <div className="msg-meta-row">
                      <span>{msg.time}</span>
                      {isMe && <span style={{ color: 'var(--green)' }}>✓✓</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* AI Quick-Reply Chips Bar */}
          <div className="chat-suggestions-bar">
            <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: 4 }}>
              ⚡ AI DRAFTS:
            </span>
            {activeConv.aiSuggestions.map((sug, idx) => (
              <button
                key={idx}
                className="suggestion-chip"
                onClick={() => handleSuggestionClick(sug)}
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            className="chat-input-bar"
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <button
              type="button"
              className="chat-action-btn"
              title="Attach Document or Photo"
              onClick={() => showToast('Photo attachment dialog opened')}
            >
              📎
            </button>
            <input
              type="text"
              className="chat-input-field"
              placeholder={`Reply to ${activeConv.contactName} or click an AI draft...`}
              value={inputText}
              onChange={e => setInputText(e.target.value)}
            />
            <button
              type="submit"
              className="chat-send-btn"
              disabled={!inputText.trim()}
            >
              <span>Send</span>
              <svg className="icon" style={{ width: 14, height: 14 }}><use href="#i-check" /></svg>
            </button>
          </form>
        </div>

        {/* 3. Right Context Pane (Reservation & Stay Dossier) */}
        {isContextVisible && (
          <div className="messages-context-pane">
            <h4 className="context-section-title">Stay & Property Dossier</h4>

            {/* Property Thumbnail */}
            <div className="context-prop-thumb">
              <ZenImage src={activeConv.propertyThumb} alt={activeConv.property} aspectRatio="16/9" />
            </div>

            <div style={{ marginBottom: 14 }}>
              <b style={{ fontSize: 15, color: 'var(--text)', display: 'block' }}>{activeConv.property}</b>
              <small style={{ color: 'var(--muted)', fontSize: 11 }}>Southern Brittany Luxury Portfolio</small>
            </div>

            <div className="context-data-row">
              <span>Contact Role</span>
              <b>{activeConv.contactRole}</b>
            </div>

            <div className="context-data-row">
              <span>Channel Source</span>
              <b>{activeConv.channel}</b>
            </div>

            <div className="context-data-row">
              <span>Stay Duration</span>
              <b>{activeConv.stayDates}</b>
            </div>

            <div className="context-data-row">
              <span>Guest Count</span>
              <b>{activeConv.guestCount} Guests</b>
            </div>

            <div className="context-data-row">
              <span>Housekeeping</span>
              <b style={{ color: 'var(--green)' }}>{activeConv.hkStatus}</b>
            </div>

            <div className="context-data-row">
              <span>Folio Total</span>
              <b style={{ color: 'var(--gold)' }}>{activeConv.folioTotal}</b>
            </div>

            {/* Smart Lock Keyless Box */}
            <div className="context-lock-card">
              <div className="context-lock-icon">🔒</div>
              <div>
                <b style={{ fontSize: 12, display: 'block' }}>Nuki Smart Lock Code</b>
                <span style={{ fontSize: 14, fontWeight: 900, color: 'var(--gold)', letterSpacing: '0.08em' }}>
                  {activeConv.lockPin}
                </span>
                <small style={{ display: 'block', fontSize: 10, color: 'var(--muted)' }}>
                  Active until departure day 11:00
                </small>
              </div>
            </div>

            {/* Context Quick Actions */}
            <div className="context-actions-list">
              <button
                className="btn primary full"
                style={{ justifyContent: 'center', fontSize: 12 }}
                onClick={() => showToast(`Digital Welcome Guide resent to ${activeConv.contactName}`)}
              >
                📱 Send Digital Welcome Guide
              </button>
              <button
                className="btn full"
                style={{ justifyContent: 'center', fontSize: 12 }}
                onClick={() => showToast(`Opening Guesty Reservation Folio for ${activeConv.contactName}...`)}
              >
                🔍 View in Guesty PMS
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
