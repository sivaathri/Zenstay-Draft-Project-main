import { useState, useEffect } from 'react';
import { ZenImage } from '../components/ZenImage';
import { fetchApi } from '../api';

interface Task {
  id: string;
  realId: string;
  property: string;
  location: string;
  img: string;
  time: string;
  type: string;
  assignedTo: string;
  priority: 'High' | 'Normal';
  checklistCount: number;
  checklistTotal: number;
  status: 'In progress' | 'Ready' | 'To do';
  statusKlass: 'wait' | 'ok' | 'bad';
  fee: string;
  instructions: string;
  beforePhotos: string[];
  afterPhotos: string[];
}

export function HkAssign() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<'All' | 'To do' | 'Ready'>('All');

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await fetchApi('/housekeepings');

        // Map backend Prisma model to UI Task interface
        const mappedTasks: Task[] = data.map((job: any) => {
          const isCompleted = job.status === 'COMPLETED';
          return {
            id: job.id.split('-')[0].toUpperCase(),
            realId: job.id,
            property: job.reservation?.property?.name || 'Unknown Property',
            location: job.reservation?.property?.city || 'Unknown Location',
            img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80', // Fallback for premium UI
            time: new Date(job.scheduledDate).toLocaleDateString(),
            type: job.type === 'CHECK_IN' ? 'Full Departure Turnover' : 'Pre-Arrival Inspection',
            assignedTo: job.assignee ? `${job.assignee.firstName} ${job.assignee.lastName}` : 'Unassigned',
            priority: 'High',
            checklistCount: isCompleted ? 18 : 4,
            checklistTotal: 18,
            status: isCompleted ? 'Ready' : 'In progress',
            statusKlass: isCompleted ? 'ok' : 'wait',
            fee: `€${(job.price || 0).toFixed(2)}`,
            instructions: job.notes || 'Standard turnover procedure.',
            beforePhotos: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80'],
            afterPhotos: []
          };
        });

        setTasks(mappedTasks);
      } catch (err) {
        console.error('Failed to load tasks', err);
      } finally {
        setLoading(false);
      }
    }
    loadTasks();
  }, []);

  const filteredTasks = tasks.filter(t => {
    if (filter === 'All') return true;
    if (filter === 'To do') return t.status !== 'Ready';
    if (filter === 'Ready') return t.status === 'Ready';
    return true;
  });

  return (
    <div className="housekeeping-assign-root">
      <div className="pagehead">
        <div>
          <span className="section-eyebrow">FIELD ASSIGNMENTS</span>
          <h2>Housekeeping Turnaround Workflows</h2>
          <p>Visual assignment management with before/after inspection photos and room checklists.</p>
        </div>
        <div className="actions">
          <div className="seg">
            <button className={filter === 'All' ? 'active' : ''} onClick={() => setFilter('All')}>All</button>
            <button className={filter === 'To do' ? 'active' : ''} onClick={() => setFilter('To do')}>To Do</button>
            <button className={filter === 'Ready' ? 'active' : ''} onClick={() => setFilter('Ready')}>Ready</button>
          </div>
        </div>
      </div>

      {/* Visual Assignments Grid */}
      {loading ? (
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)' }}>
          Loading housekeeping assignments...
        </div>
      ) : (
        <div className="grid hk-tasks-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))' }}>
          {filteredTasks.map(t => {
            const progressPercent = Math.round((t.checklistCount / t.checklistTotal) * 100);
            return (
              <div
                key={t.id}
                className="card hk-visual-card"
                onClick={() => setSelectedTask(t)}
              >
                <div className="hk-card-img-wrap">
                  <ZenImage src={t.img} alt={t.property} aspectRatio="16/9" />
                  <span className={`priority-badge ${t.priority.toLowerCase()}`}>{t.priority} Priority</span>
                  <span className={`status ${t.statusKlass}`}>{t.status}</span>
                </div>

                <div className="hk-card-content">
                  <div className="hk-card-title-row">
                    <div>
                      <h4>{t.property}</h4>
                      <small>{t.location} • {t.time}</small>
                    </div>
                    <b className="hk-fee">{t.fee}</b>
                  </div>

                  <p className="hk-type-desc">{t.type} (Specialist: {t.assignedTo})</p>

                  {/* Progress bar */}
                  <div className="hk-progress-wrap">
                    <div className="hk-progress-labels">
                      <span>Checklist Progress</span>
                      <b>{t.checklistCount} / {t.checklistTotal} ({progressPercent}%)</b>
                    </div>
                    <div className="progress">
                      <span style={{ width: `${progressPercent}%` }}></span>
                    </div>
                  </div>

                  <button className="btn full" style={{ marginTop: 14 }}>
                    Open Inspection Task →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TASK DETAIL DRAWER */}
      {selectedTask && (
        <div className="modal-backdrop" onClick={() => setSelectedTask(null)}>
          <div className="drawer open" onClick={e => e.stopPropagation()} style={{ width: 580 }}>
            <div className="drawer-head">
              <div>
                <span className="badge-navy">{selectedTask.id} • {selectedTask.priority} Priority</span>
                <h3>{selectedTask.property}</h3>
              </div>
              <button className="iconbtn" onClick={() => setSelectedTask(null)}>✕</button>
            </div>

            <div className="drawer-body">
              <ZenImage src={selectedTask.img} alt={selectedTask.property} aspectRatio="16/9" />

              <div className="detail-grid" style={{ marginTop: 16 }}>
                <div className="detailbox">
                  <span>TIME WINDOW</span>
                  <b>{selectedTask.time}</b>
                </div>
                <div className="detailbox">
                  <span>CLEANING FEE</span>
                  <b>{selectedTask.fee}</b>
                </div>
                <div className="detailbox">
                  <span>SPECIALIST</span>
                  <b>{selectedTask.assignedTo}</b>
                </div>
                <div className="detailbox">
                  <span>CHECKLIST SCORE</span>
                  <b>{selectedTask.checklistCount} / {selectedTask.checklistTotal} Items</b>
                </div>
              </div>

              <h4 style={{ marginTop: 20 }}>Supervisor Turnaround Instructions</h4>
              <p style={{ fontSize: 13, lineHeight: 1.6, background: 'var(--card2)', padding: 12, borderRadius: 10 }}>
                {selectedTask.instructions}
              </p>

              <h4 style={{ marginTop: 20 }}>Before Photos (Arrival Condition)</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                {selectedTask.beforePhotos.map((img, i) => (
                  <ZenImage key={i} src={img} alt="Before inspection" aspectRatio="4/3" />
                ))}
              </div>

              <h4 style={{ marginTop: 20 }}>After Photos (Completion Proof)</h4>
              {selectedTask.afterPhotos.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                  {selectedTask.afterPhotos.map((img, i) => (
                    <ZenImage key={i} src={img} alt="After inspection" aspectRatio="4/3" />
                  ))}
                </div>
              ) : (
                <div style={{ padding: 18, border: '1px dashed var(--line)', borderRadius: 10, textAlign: 'center', color: 'var(--muted)', fontSize: 12 }}>
                  No completion photos uploaded yet. Capture via mobile camera.
                </div>
              )}
            </div>

            <div className="drawer-foot">
              <button className="btn" onClick={() => setSelectedTask(null)}>Close</button>
              <button className="btn primary" onClick={async () => {
                try {
                  const response = await fetchApi(`/housekeepings/${selectedTask.realId}/complete`, { method: 'POST' });
                  alert(`Turnaround certified! Invoice ${response.invoice.number} automatically generated.`);

                  // Optimistically update the UI list
                  setTasks(prev => prev.map(t =>
                    t.realId === selectedTask.realId ? { ...t, status: 'Ready', statusKlass: 'ok' } : t
                  ));

                  setSelectedTask(null);
                } catch (e) {
                  alert('Error certifying turnaround: ' + (e as Error).message);
                }
              }}>
                Verify & Mark Property Ready ✓
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
