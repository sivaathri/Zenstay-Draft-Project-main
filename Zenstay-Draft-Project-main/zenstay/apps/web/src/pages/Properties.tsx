import { useState, useEffect } from 'react';
import { ZenImage } from '../components/ZenImage';
import { fetchApi } from '../api';

interface Property {
  id: string;
  name: string;
  location: string;
  specs: string;
  cleaningFee: string;
  status: string;
  statusKlass: 'ok' | 'wait' | 'bad';
  occupancy: string;
  monthlyRevenue: string;
  owner: string;
  guestyId: string;
  description: string;
  images: string[];
}

export function Properties() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProperties() {
      try {
        const data = await fetchApi('/properties');
        
        const mappedProperties: Property[] = data.map((prop: any) => ({
          id: prop.id,
          name: prop.name,
          location: prop.city || prop.address,
          specs: `8 guests • 4 bedrooms • 3 baths • 280 m²`, // Fallback specs
          cleaningFee: `€${prop.cleaningFee.toFixed(2)}`,
          status: 'Ready for check-in', // Mock status
          statusKlass: 'ok',
          occupancy: '94.2%', // Mock occupancy
          monthlyRevenue: '€14,520', // Mock revenue
          owner: prop.owner ? `${prop.owner.firstName} ${prop.owner.lastName}` : 'Unassigned',
          guestyId: prop.guestyId || `listing_${prop.id.substring(0, 5)}`,
          description: 'Exclusive luxury residence loaded from the database.',
          images: [
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
          ]
        }));

        setProperties(mappedProperties);
      } catch (err) {
        console.error('Failed to load properties', err);
      } finally {
        setLoading(false);
      }
    }
    loadProperties();
  }, []);

  return (
    <div className="properties-page-root">
      <div className="pagehead">
        <div>
          <span className="section-eyebrow">PORTFOLIO OVERVIEW</span>
          <h2>Managed Properties</h2>
          <p>Real-time Guesty-synced luxury properties, field readiness, and operational status.</p>
        </div>
        <div className="actions">
          <button className="btn">Map View</button>
          <button className="btn primary" onClick={() => alert('Onboarding modal')}>+ Onboard Property</button>
        </div>
      </div>

      {/* Property Cards Grid */}
      {loading ? (
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)' }}>
          Loading properties from Guesty synchronization...
        </div>
      ) : properties.length === 0 ? (
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)' }}>
          No properties found. Run database seed to populate mock data.
        </div>
      ) : (
        <div className="grid property-grid">
          {properties.map(p => (
          <article
            className="card prop-luxury-card"
            key={p.id}
            onClick={() => setSelectedProperty(p)}
          >
            <div className="prop-img-wrap">
              <ZenImage
                src={p.images[0]}
                alt={p.name}
                aspectRatio="16/10"
              />
              <span className={`prop-badge ${p.statusKlass}`}>{p.status}</span>
              <span className="prop-occ-badge">{p.occupancy} Occ.</span>
            </div>

            <div className="prop-content">
              <div className="prop-title">
                <div>
                  <h3>{p.name}</h3>
                  <p>{p.location}</p>
                </div>
              </div>

              <div className="prop-meta">
                <span>{p.specs.split(' • ').slice(0, 2).join(' • ')}</span>
              </div>

              <div className="prop-foot">
                <div className="fee">
                  <small>Monthly Run-Rate</small>
                  <b className="rev-val">{p.monthlyRevenue}</b>
                </div>
                <button
                  className="btn-editorial"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProperty(p);
                  }}
                >
                  View Dossier →
                </button>
              </div>
            </div>
          </article>
        ))}
        </div>
      )}

      {/* PROPERTY DOSSIER MODAL WITH EDITORIAL GALLERY */}
      {selectedProperty && (
        <div className="modal-backdrop" onClick={() => setSelectedProperty(null)}>
          <div className="property-dossier-modal" onClick={e => e.stopPropagation()}>
            <div className="dossier-header">
              <div>
                <span className="badge-gold">GUESTY ID: {selectedProperty.guestyId}</span>
                <h2>{selectedProperty.name}</h2>
                <p>{selectedProperty.location}</p>
              </div>
              <button className="close-btn" onClick={() => setSelectedProperty(null)}>✕</button>
            </div>

            <div className="dossier-body">
              {/* EDITORIAL 5-PHOTO GALLERY MOSAIC */}
              <div className="editorial-gallery-mosaic">
                <div className="mosaic-hero" onClick={() => { setActivePhotoIdx(0); setLightboxOpen(true); }}>
                  <ZenImage
                    src={selectedProperty.images[0]}
                    alt={`${selectedProperty.name} Master`}
                    aspectRatio="16/10"
                  />
                  <div className="mosaic-tag">Principal Exterior</div>
                </div>

                <div className="mosaic-thumbs">
                  {selectedProperty.images.slice(1, 5).map((img, i) => (
                    <div
                      key={i}
                      className="mosaic-thumb"
                      onClick={() => { setActivePhotoIdx(i + 1); setLightboxOpen(true); }}
                    >
                      <ZenImage
                        src={img}
                        alt={`${selectedProperty.name} Room ${i + 1}`}
                        aspectRatio="16/10"
                      />
                      {i === 3 && (
                        <div className="mosaic-more-overlay">
                          <span>+ View All Photos</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* PROPERTY DETAILS GRID */}
              <div className="dossier-info-grid">
                <div className="dossier-main">
                  <h3>Property Architecture & Overview</h3>
                  <p>{selectedProperty.description}</p>

                  <h4 style={{ marginTop: 20 }}>Specifications & Capacity</h4>
                  <div className="detail-grid">
                    <div className="detailbox">
                      <span>CAPACITY</span>
                      <b>{selectedProperty.specs}</b>
                    </div>
                    <div className="detailbox">
                      <span>CLEANING PACKAGE</span>
                      <b>{selectedProperty.cleaningFee}</b>
                    </div>
                    <div className="detailbox">
                      <span>MONTHLY RUN-RATE</span>
                      <b style={{ color: '#c59b4e' }}>{selectedProperty.monthlyRevenue}</b>
                    </div>
                    <div className="detailbox">
                      <span>CURRENT OCCUPANCY</span>
                      <b>{selectedProperty.occupancy}</b>
                    </div>
                  </div>

                  <h4 style={{ marginTop: 24 }}>Operational Readiness</h4>
                  <div className="readiness-strip">
                    <div className="ready-metric">
                      <span>Housekeeping</span>
                      <b className="ok">Turnaround Verified</b>
                    </div>
                    <div className="ready-metric">
                      <span>Smart Lock</span>
                      <b className="ok">PIN Synchronized</b>
                    </div>
                    <div className="ready-metric">
                      <span>Maintenance</span>
                      <b className="ok">Zero Critical Alerts</b>
                    </div>
                  </div>
                </div>

                <div className="dossier-side">
                  <div className="card owner-card-mini">
                    <span className="badge-navy">PROPERTY OWNER</span>
                    <h4>{selectedProperty.owner}</h4>
                    <p>Exclusive 24-Month Hospitality Mandate</p>
                    <div className="side-stat-row">
                      <span>Commission Rate</span>
                      <b>18% Net</b>
                    </div>
                    <div className="side-stat-row">
                      <span>Last Payout</span>
                      <b>Sep 3, 2026 (Disbursed)</b>
                    </div>
                    <button className="btn full" style={{ marginTop: 14 }}>
                      Contact Owner
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="dossier-footer">
              <button className="btn" onClick={() => setSelectedProperty(null)}>Close</button>
              <button className="btn primary" onClick={() => alert('Calendar opened for this property.')}>
                Open in Reservation Calendar →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULL-SCREEN LIGHTBOX GALLERY */}
      {lightboxOpen && selectedProperty && (
        <div className="lightbox-backdrop" onClick={() => setLightboxOpen(false)}>
          <div className="lightbox-container" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightboxOpen(false)}>✕</button>
            <div className="lightbox-image-wrap">
              <ZenImage
                src={selectedProperty.images[activePhotoIdx]}
                alt={`${selectedProperty.name} photo ${activePhotoIdx + 1}`}
                aspectRatio="16/10"
              />
            </div>
            <div className="lightbox-controls">
              <button
                className="lightbox-nav-btn"
                onClick={() => setActivePhotoIdx((activePhotoIdx - 1 + selectedProperty.images.length) % selectedProperty.images.length)}
              >
                ← Prev
              </button>
              <span className="lightbox-counter">
                {activePhotoIdx + 1} of {selectedProperty.images.length}
              </span>
              <button
                className="lightbox-nav-btn"
                onClick={() => setActivePhotoIdx((activePhotoIdx + 1) % selectedProperty.images.length)}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
