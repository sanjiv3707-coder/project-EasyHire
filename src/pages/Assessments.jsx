import { useState, useEffect } from 'react';
import { getCandidates } from '../services/candidateService';
import { ClipboardCheck } from 'lucide-react';
import { getScoreColor } from '../utils/helpers';

export default function Assessments() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getCandidates();
      // Filter for candidates who have started or completed assessment
      setCandidates(data.filter(c => c.assessment.status !== 'Not Started'));
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading assessments...</div>;

  return (
    <div className="assessments-page">
      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Job</th>
                <th>Assessment Status</th>
                <th>Score</th>
                <th>Time Taken</th>
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
                    <span className={`badge badge-${candidate.assessment.status === 'Completed' ? 'success' : 'warning'}`}>
                      {candidate.assessment.status}
                    </span>
                  </td>
                  <td>
                    {candidate.assessment.score ? (
                      <span style={{ fontWeight: 'bold', color: getScoreColor(candidate.assessment.score) }}>
                        {candidate.assessment.score}%
                      </span>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td>{candidate.assessment.completionTime || '—'}</td>
                  <td>{candidate.assessment.completedAt || '—'}</td>
                </tr>
              ))}
              
              {candidates.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center" style={{ padding: '40px' }}>
                    <ClipboardCheck size={32} className="text-muted" style={{ margin: '0 auto 16px' }} />
                    <p>No assessments active or completed.</p>
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
