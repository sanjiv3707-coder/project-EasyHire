import { useState, useEffect } from 'react';
import { getCommunications } from '../services/communicationService';
import { getStatusBadgeVariant } from '../utils/helpers';
import { MessageSquare, Bell, Calendar, HelpCircle, Inbox } from 'lucide-react';

export default function Communication() {
  const [communications, setCommunications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getCommunications();
      setCommunications(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const getIconForType = (type) => {
    if (type.includes('Invitation')) return <Calendar size={16} className="text-primary-500" />;
    if (type.includes('Reminder')) return <Bell size={16} className="text-warning-500" />;
    if (type.includes('Status')) return <MessageSquare size={16} className="text-info-500" />;
    return <HelpCircle size={16} className="text-gray-500" />;
  };

  if (loading) return <div>Loading communications...</div>;

  return (
    <div className="communication-page">
      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Candidate</th>
                <th>Type</th>
                <th>Message</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {communications.map(comm => (
                <tr key={comm.id}>
                  <td className="text-muted">{comm.date}</td>
                  <td style={{ fontWeight: 500, color: 'var(--color-gray-900)' }}>
                    {comm.candidateName}
                  </td>
                  <td>
                    <div className="comm-type-icon">
                      {getIconForType(comm.type)}
                      {comm.type}
                    </div>
                  </td>
                  <td>
                    <div style={{ maxWidth: '400px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={comm.message}>
                      {comm.message}
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-${getStatusBadgeVariant(comm.status)}`}>
                      {comm.status}
                    </span>
                  </td>
                </tr>
              ))}
              
              {communications.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center" style={{ padding: '40px' }}>
                    <Inbox size={32} className="text-muted" style={{ margin: '0 auto 16px' }} />
                    <p>No communications found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
