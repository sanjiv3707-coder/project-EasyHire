import { useState, useEffect } from 'react';
import { getCandidates } from '../services/candidateService';
import { Video } from 'lucide-react';
import { getScoreColor } from '../utils/helpers';

export default function Interviews() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getCandidates();
      // Filter for candidates who have started or completed interview
      setCandidates(data.filter(c => c.interview.status !== 'Not Started'));
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading interviews...</div>;

  return (
    <div className="interviews-page">
      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Job</th>
                <th>Interview Status</th>
                <th>AI Score</th>
                <th>Date Completed</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map(candidate => (
                <tr key={candidate.id}>
                  <td style={{ fontWeight: 500, color: 'var(--color-gray-900)' }}>
                    {candidate.name}
                  </td>
                  <td>{candidate.jobTitle}</td>
                  <td>
                    <span className={`badge badge-${candidate.interview.status === 'Completed' ? 'success' : 'warning'}`}>
                      {candidate.interview.status}
                    </span>
                  </td>
                  <td>
                    {candidate.interview.score ? (
                      <span style={{ fontWeight: 'bold', color: getScoreColor(candidate.interview.score) }}>
                        {candidate.interview.score}%
                      </span>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td>{candidate.interview.completedAt || '—'}</td>
                </tr>
              ))}
              
              {candidates.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center" style={{ padding: '40px' }}>
                    <Video size={32} className="text-muted" style={{ margin: '0 auto 16px' }} />
                    <p>No interviews active or completed.</p>
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
