import { useState, useEffect } from 'react';
import { ZenImage } from '../components/ZenImage';
import { fetchApi } from '../api';

export function TravelerPortal() {
  const [reservation, setReservation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'stay' | 'services' | 'concierge' | 'folio'>('stay');
  const [serviceBooked, setServiceBooked] = useState<string | null>(null);
  const [messages, setMessages] = useState([
    { sender: 'concierge', text: 'Bonjour Monsieur Laurent! Welcome to Villa Les Embruns. Your smart lock PIN is 8402#. Let us know if you need anything.', time: '14:00' },
    { sender: 'guest', text: 'Thank you! Could we arrange a private sommelier tasting for tomorrow evening around 19:30?', time: '14:15' },
    { sender: 'concierge', text: 'Absolument. Chef Antoine has been notified and will bring premier cru selections from Loire and Bordeaux.', time: '14:18' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const services = [
    {
      id: 'sommelier',
      title: 'Private Sommelier Wine Tasting',
      price: '€180 / session',
      numericPrice: 180,
      desc: 'Exclusive curated cellar tasting of rare vintage Loire and Bordeaux wines accompanied by artisanal Brittany cheeses.',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'yacht',
      title: 'Gulf of Morbihan Yacht Charter',
      price: '€650 / half-day',
      numericPrice: 650,
      desc: 'Private 38ft sailing catamaran with professional skipper, exploring Île-aux-Moines and secluded cove beaches.',
      image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'chef',
      title: 'Private In-Villa Gastronomic Chef',
      price: '€120 / guest',
      numericPrice: 120,
      desc: 'A 4-course bespoke seafood menu prepared live in your villa kitchen featuring fresh Quiberon catch and local produce.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'housekeeping',
      title: 'Mid-Stay White Glove Linen Refresh',
      price: '€65 / service',
      numericPrice: 65,
      desc: 'Complete linen turnover, fresh Egyptian cotton towels, organic amenities replenishment, and full floor detailing.',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
    }
  ];

  useEffect(() => {
    async function loadReservation() {
      try {
        // In a real SPA, reservationId would be pulled from useParams()
        // Here we simulate by grabbing the first reservation from the database for the demo
        const allRes = await fetchApi('/reservations');
        const demoResId = allRes.length > 0 ? allRes[0].id : 'mock-res-123';
        
        // Fetch the dedicated Traveler Registration Info (Module B)
        // Note: For the mock if there's no real DB reservation, the backend will return 404, so we catch it
        const data = await fetchApi(`/travelers/registration/${demoResId}`);
        setReservation(data);
      } catch (err) {
        console.error('Failed to load reservation data', err);
        // Provide mock fallback data if database is empty so Premium UI doesn't break
        setReservation({
          id: 'ZEN-88402',
          property: { name: 'Villa Les Embruns', city: 'Carnac, Brittany' },
          traveler: { firstName: 'Laurent', lastName: 'de Montmirail' },
          checkIn: new Date('2026-10-01').toISOString(),
          checkOut: new Date('2026-10-07').toISOString(),
          totalAmount: 2532.20
        });
      } finally {
        setLoading(false);
      }
    }
    loadReservation();
  }, []);

  const handleBookUpsell = async (service: any) => {
    try {
      const resId = reservation?.id || 'mock-id';
      const response = await fetchApi(`/travelers/registration/${resId}/upsell`, {
        method: 'POST',
        body: JSON.stringify({
          serviceId: service.id,
          amount: service.numericPrice
        })
      });
      
      console.log('Stripe Payment Intent Generated:', response.paymentIntent);
      setServiceBooked(service.title);
    } catch (err) {
      console.error('Payment failed', err);
      alert('Failed to process payment');
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setMessages(prev => [...prev, { sender: 'guest', text: inputMsg, time: 'Just now' }]);
    setInputMsg('');
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: 'concierge', text: 'Thank you for your message. Your concierge is attending to this immediately.', time: 'Just now' }
      ]);
    }, 1200);
  };

  return (
    <div className="traveler-portal-root">
      {loading && <div className="loader-overlay">Syncing with Guesty Reservation Data...</div>}
      {/* Traveler Hero Banner */}
      <div className="traveler-hero">
        <ZenImage
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80"
          alt="Villa Les Embruns, Carnac"
          className="traveler-hero-bg"
          aspectRatio="21/9"
        />
        <div className="traveler-hero-overlay"></div>
        <div className="traveler-hero-content">
          <div className="traveler-badge">CONFIRMED VIP STAY • RESERVATION #{reservation?.id?.substring(0, 8)}</div>
          <h1>Welcome to {reservation?.property?.name || 'Villa Les Embruns'}</h1>
          <p>{reservation?.property?.city || 'Carnac, Brittany'} • Oct 1 – Oct 7, 2026 (6 Nights)</p>
          <div className="traveler-hero-stats">
            <div className="traveler-stat">
              <span>CHECK-IN</span>
              <b>Today at 15:00</b>
            </div>
            <div className="traveler-stat">
              <span>SMART LOCK PIN</span>
              <b className="pin-highlight">8402#</b>
            </div>
            <div className="traveler-stat">
              <span>HIGH-SPEED WIFI</span>
              <b>VillaEmbruns_5G (Key: embruns2026)</b>
            </div>
            <div className="traveler-stat">
              <span>CURRENT WEATHER</span>
              <b>21°C • Sun & Sea Breeze</b>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="traveler-nav-tabs">
        <button
          className={`traveler-tab ${activeTab === 'stay' ? 'active' : ''}`}
          onClick={() => setActiveTab('stay')}
        >
          My Stay Guide
        </button>
        <button
          className={`traveler-tab ${activeTab === 'services' ? 'active' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          Curated Experiences & Services
        </button>
        <button
          className={`traveler-tab ${activeTab === 'concierge' ? 'active' : ''}`}
          onClick={() => setActiveTab('concierge')}
        >
          24/7 Digital Concierge {messages.length > 0 && <span className="tab-pill">Live</span>}
        </button>
        <button
          className={`traveler-tab ${activeTab === 'folio' ? 'active' : ''}`}
          onClick={() => setActiveTab('folio')}
        >
          Folio & Billing
        </button>
      </div>

      {/* Tab 1: My Stay Guide */}
      {activeTab === 'stay' && (
        <div className="traveler-stay-grid">
          <div className="stay-main-card">
            <h3>Arrival & Keyless Access</h3>
            <p>
              Your reservation is prepared to five-star standards. Keyless digital locks have been synchronized to
              your personal entry code.
            </p>

            <div className="access-box">
              <div className="access-row">
                <span className="access-icon">🔑</span>
                <div>
                  <b>Main Entrance Electronic Gate & Front Door</b>
                  <p>Input <code>8402#</code> on the Nuki keypad. Green LED indicates unlocked.</p>
                </div>
              </div>
              <div className="access-row">
                <span className="access-icon">🚗</span>
                <div>
                  <b>Private Villa Parking</b>
                  <p>Two shaded spaces on the driveway inside the secure courtyard. EV charger available (Type 2).</p>
                </div>
              </div>
              <div className="access-row">
                <span className="access-icon">📶</span>
                <div>
                  <b>Fiber Optic Internet</b>
                  <p>Network: <strong>VillaEmbruns_5G</strong> | Password: <strong>embruns2026</strong> (480 Mbps down / 120 Mbps up).</p>
                </div>
              </div>
            </div>

            <h4 style={{ marginTop: 24 }}>Property Amenities</h4>
            <div className="amenities-tags">
              <span className="amenity-tag">Heated Saltwater Infinity Pool</span>
              <span className="amenity-tag">Panoramic Ocean Terrace</span>
              <span className="amenity-tag">Sonos Multi-Room Audio</span>
              <span className="amenity-tag">Miele Gourmet Kitchen</span>
              <span className="amenity-tag">Dyson Supersonic Care</span>
              <span className="amenity-tag">Wine Cellar Refrigeration</span>
            </div>
          </div>

          <div className="stay-side-card">
            <div className="concierge-card-preview">
              <ZenImage
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
                alt="Carnac Coastline"
                aspectRatio="16/9"
              />
              <div className="preview-text">
                <b>Local Concierge Recommendations</b>
                <p>Curated by ZENSTAY Hospitality Team</p>
                <ul className="rec-list">
                  <li><strong>Le Petit Hôtel du Grand Large:</strong> Michelin 1-star seafood, 8 mins walk.</li>
                  <li><strong>Plage de Men Dû:</strong> Protected shallow cove, ideal for morning swimming.</li>
                  <li><strong>Carnac Megalithic Site:</strong> Prehistoric standing stones private sunrise tour.</li>
                </ul>
                <button className="btn full" onClick={() => setActiveTab('concierge')}>
                  Chat with Concierge →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Curated Services */}
      {activeTab === 'services' && (
        <div className="traveler-services-container">
          <div className="services-head">
            <h3>Bespoke Experiences & In-Villa Services</h3>
            <p>Enhance your stay with private culinary masters, nautical expeditions, and personalized hospitality.</p>
          </div>

          {serviceBooked && (
            <div className="service-confirmed-banner">
              ✓ Service request for <strong>{serviceBooked}</strong> received. Our concierge is finalizing arrangements.
            </div>
          )}

          <div className="services-grid">
            {services.map(s => (
              <div key={s.id} className="service-card">
                <ZenImage
                  src={s.image}
                  alt={s.title}
                  aspectRatio="16/10"
                />
                <div className="service-content">
                  <div className="service-title-row">
                    <h4>{s.title}</h4>
                    <span className="service-price">{s.price}</span>
                  </div>
                  <p>{s.desc}</p>
                  <button
                    className="btn primary"
                    onClick={() => handleBookUpsell(s)}
                  >
                    Request Experience
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Concierge Chat */}
      {activeTab === 'concierge' && (
        <div className="traveler-concierge-chat">
          <div className="chat-window">
            <div className="chat-window-head">
              <div className="concierge-status">
                <span className="dot online"></span>
                <div>
                  <b>ZENSTAY Digital Concierge Team</b>
                  <small>Available 24/7 • Response in ~2 minutes</small>
                </div>
              </div>
              <span className="badge-gold">VIP GUEST</span>
            </div>

            <div className="chat-messages-area">
              {messages.map((m, idx) => (
                <div key={idx} className={`chat-bubble-row ${m.sender}`}>
                  <div className={`chat-bubble ${m.sender}`}>
                    <p>{m.text}</p>
                    <time>{m.time}</time>
                  </div>
                </div>
              ))}
            </div>

            <form className="chat-input-bar" onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder="Ask about restaurant reservations, yacht charters, extra amenities..."
                value={inputMsg}
                onChange={e => setInputMsg(e.target.value)}
              />
              <button type="submit" className="btn primary">Send</button>
            </form>
          </div>
        </div>
      )}

      {/* Tab 4: Folio & Billing */}
      {activeTab === 'folio' && (
        <div className="traveler-folio-card">
          <div className="folio-header">
            <div>
              <h3>Guest Folio & Receipt</h3>
              <p>Villa Les Embruns • Guest: Laurent de Montmirail</p>
            </div>
            <button className="btn" onClick={() => alert('Tax invoice PDF downloaded.')}>
              Download Official Invoice (PDF)
            </button>
          </div>

          <table className="folio-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Dates</th>
                <th>Rate</th>
                <th style={{ textAlign: 'right' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Villa Accommodation (6 nights @ €380.00/night)</td>
                <td>Oct 1 – Oct 7, 2026</td>
                <td>€380.00</td>
                <td style={{ textAlign: 'right' }}>€2,280.00</td>
              </tr>
              <tr>
                <td>Hospitality Turnaround & Linens Package</td>
                <td>Oct 1, 2026</td>
                <td>€185.00</td>
                <td style={{ textAlign: 'right' }}>€185.00</td>
              </tr>
              <tr>
                <td>Local Tourist Tax (Taxe de Séjour - Morbihan)</td>
                <td>6 nights × 4 adults</td>
                <td>€2.80</td>
                <td style={{ textAlign: 'right' }}>€67.20</td>
              </tr>
              <tr>
                <td>Pre-Authorized Damage Security Hold (Stripe)</td>
                <td>Hold expires Oct 9</td>
                <td>€1,500.00</td>
                <td style={{ textAlign: 'right', color: '#10b981' }}>Authorized</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} style={{ fontWeight: 800 }}>Total Paid via Stripe Card (•••• 8492)</td>
                <td style={{ textAlign: 'right', fontWeight: 850, fontSize: 16 }}>€2,532.20</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}
