import { useState, useEffect } from 'react';
import { fetchApi } from '../api';

export function Housekeepers() {
  const [housekeepers, setHousekeepers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHousekeepers() {
      try {
        const users = await fetchApi('/users');
        // Filter users who have the HOUSEKEEPER role, or just show all for the mock if none exist
        let hkUsers = users.filter((u: any) => 
          u.roles?.some((r: any) => r.role.name === 'HOUSEKEEPER')
        );
        
        // If DB has no roles set up, fallback to all users for display purposes
        if (hkUsers.length === 0) hkUsers = users;

        const mapped = hkUsers.map((u: any) => ({
          id: u.id,
          initials: `${u.firstName[0]}${u.lastName[0]}`,
          name: `${u.firstName} ${u.lastName}`,
          roleTitle: 'Turnaround Specialist',
          units: Math.floor(Math.random() * 20) + 5,
          jobs: Math.floor(Math.random() * 50) + 10,
          score: (90 + Math.random() * 9).toFixed(1),
          status: 'Active on Duty',
          revenue: `€${(1500 + Math.random() * 1000).toFixed(2)}`
        }));
        
        setHousekeepers(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadHousekeepers();
  }, []);
  return (
    <div className="page active">
      <div className="pagehead">
        <div>
          <span className="section-eyebrow">FIELD SPECIALISTS</span>
          <h2>Housekeeping Partners & Turnaround Teams</h2>
          <p>Assignment capacity, photo audit compliance, documents, and monthly disbursements.</p>
        </div>
        <div className="actions">
          <button className="btn">Documents & URSSAF</button>
          <button className="btn primary" onClick={() => alert('Onboard specialist modal')}>+ Add Specialist</button>
        </div>
      </div>

      <div className="card tablecard">
        <div className="tabletop">
          <h3>Active Field Partners</h3>
          <div className="filters">
            <button className="filter">Filter by Sector</button>
            <button className="filter">Quality Score</button>
          </div>
        </div>
        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>Specialist</th>
                <th>Assigned Portfolio</th>
                <th>Completed (Oct)</th>
                <th>Photo Audit Score</th>
                <th>Compliance Status</th>
                <th>Monthly Run-Rate</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: 40, color: 'var(--muted)' }}>
                    Loading specialists...
                  </td>
                </tr>
              ) : housekeepers.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: 40, color: 'var(--muted)' }}>
                    No housekeepers found in the database.
                  </td>
                </tr>
              ) : housekeepers.map(hk => (
                <tr key={hk.id}>
                  <td>
                    <div className="person">
                      <div className="avatar sm">{hk.initials}</div>
                      <div>
                        <b>{hk.name}</b>
                        <small style={{ color: 'var(--muted)', display: 'block' }}>{hk.roleTitle}</small>
                      </div>
                    </div>
                  </td>
                  <td>{hk.units} Units</td>
                  <td>{hk.jobs} Jobs</td>
                  <td><span className="status ok">{hk.score}%</span></td>
                  <td><span className="badge-navy">Verified URSSAF</span></td>
                  <td><b>{hk.revenue}</b></td>
                  <td><span className="status ok">{hk.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
