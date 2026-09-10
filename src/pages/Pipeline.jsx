import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCandidates } from '../services/candidateService';
import { PIPELINE_STAGES } from '../data/candidates';
import { getScoreColor } from '../utils/helpers';

export default function Pipeline() {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getCandidates();
      setCandidates(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading pipeline...</div>;

  return (
    <div className="pipeline-page">
      <div className="kanban-board">
        {PIPELINE_STAGES.map((stage) => {
          const stageCandidates = candidates.filter(c => c.pipelineStage === stage);
          
          return (
            <div key={stage} className="kanban-column">
              <div className="kanban-column-header">
                <h3 className="kanban-column-title">{stage}</h3>
                <div className="kanban-column-count">{stageCandidates.length}</div>
              </div>
              
              <div className="kanban-cards">
                {stageCandidates.map(candidate => (
                  <div 
                    key={candidate.id} 
                    className="kanban-card"
                    onClick={() => navigate(`/candidates/${candidate.id}`)}
                  >
                    <div className="kanban-card-name">{candidate.name}</div>
                    <div className="kanban-card-job">{candidate.jobTitle}</div>
                    
                    <div className="kanban-card-footer">
                      <div className="kanban-card-score" style={{ 
                        color: candidate.aiScreening.matchScore ? getScoreColor(candidate.aiScreening.matchScore) : 'var(--color-gray-500)'
                      }}>
                        {candidate.aiScreening.matchScore ? `Match: ${candidate.aiScreening.matchScore}%` : 'Pending Score'}
                      </div>
                      <span className="badge badge-gray text-xs" style={{ padding: '0 6px' }}>
                        {candidate.experience}y exp
                      </span>
                    </div>
                  </div>
                ))}
                
                {stageCandidates.length === 0 && (
                  <div className="text-center text-muted" style={{ padding: 'var(--space-4) 0', fontSize: 'var(--font-size-sm)' }}>
                    No candidates
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
