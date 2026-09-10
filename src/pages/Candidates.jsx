import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Mail, ExternalLink } from 'lucide-react';
import { getCandidates } from '../services/candidateService';
import { getJobs } from '../services/jobService';
import { getAvatarColor, getInitials, getStatusBadgeVariant, getScoreColor } from '../utils/helpers';

export default function Candidates() {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [search, setSearch] = useState('');
  const [jobFilter, setJobFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    async function fetchData() {
      const [candData, jobsData] = await Promise.all([
        getCandidates(),
        getJobs()
      ]);
      setCandidates(candData);
      setJobs(jobsData);
      setLoading(false);
    }
    fetchData();
  }, []);

  const filteredCandidates = candidates.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                          c.email.toLowerCase().includes(search.toLowerCase()) ||
                          c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchesJob = jobFilter ? c.jobId === jobFilter : true;
    const matchesStatus = statusFilter ? c.status === statusFilter : true;
    
    return matchesSearch && matchesJob && matchesStatus;
  });

  if (loading) return <div>Loading candidates...</div>;

  return (
    <div className="candidates-page">
      <div className="filters-bar">
        <div className="search-input-wrapper">
          <Search />
          <input
            type="text"
            className="form-input"
            placeholder="Search candidates, emails, or skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <select 
          className="form-select filter-select"
          value={jobFilter}
          onChange={(e) => setJobFilter(e.target.value)}
        >
          <option value="">All Jobs</option>
          {jobs.map(j => (
            <option key={j.id} value={j.id}>{j.title}</option>
          ))}
        </select>
        
        <select 
          className="form-select filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Eligible">Eligible</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Assessment Pending">Assessment Pending</option>
          <option value="Interview Pending">Interview Pending</option>
          <option value="Client Ready">Client Ready</option>
          <option value="Rejected">Rejected</option>
        </select>
        
        <button className="btn btn-secondary" style={{ marginLeft: 'auto' }}>
          <Filter size={18} />
          More Filters
        </button>
      </div>

      <div className="table-container">
        <table className="table table-clickable">
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Applied For</th>
              <th>AI Score</th>
              <th>Assessment</th>
              <th>Interview</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map(candidate => (
              <tr 
                key={candidate.id}
                onClick={() => navigate(`/candidates/${candidate.id}`)}
              >
                <td>
                  <div className="candidate-name-cell">
                    <div 
                      className="candidate-avatar"
                      style={{ background: getAvatarColor(candidate.name) }}
                    >
                      {getInitials(candidate.name)}
                    </div>
                    <div>
                      <div className="candidate-name">{candidate.name}</div>
                      <div className="candidate-email">{candidate.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div style={{ fontWeight: 500, color: 'var(--color-gray-900)' }}>
                    {candidate.jobTitle}
                  </div>
                  <div className="text-small text-muted">{candidate.experience} yrs exp</div>
                </td>
                <td>
                  {candidate.aiScreening.matchScore ? (
                    <div className="score-bar">
                      <div className="score-bar-track">
                        <div 
                          className="score-bar-fill"
                          style={{ 
                            width: `${candidate.aiScreening.matchScore}%`,
                            background: getScoreColor(candidate.aiScreening.matchScore)
                          }}
                        />
                      </div>
                      <span className="score-value" style={{ color: getScoreColor(candidate.aiScreening.matchScore) }}>
                        {candidate.aiScreening.matchScore}%
                      </span>
                    </div>
                  ) : (
                    <span className="text-muted text-small">N/A</span>
                  )}
                </td>
                <td>
                  {candidate.assessment.score ? (
                    <span style={{ fontWeight: 500, color: getScoreColor(candidate.assessment.score) }}>
                      {candidate.assessment.score}%
                    </span>
                  ) : (
                    <span className="text-muted text-small">{candidate.assessment.status}</span>
                  )}
                </td>
                <td>
                   {candidate.interview.score ? (
                    <span style={{ fontWeight: 500, color: getScoreColor(candidate.interview.score) }}>
                      {candidate.interview.score}%
                    </span>
                  ) : (
                    <span className="text-muted text-small">{candidate.interview.status}</span>
                  )}
                </td>
                <td>
                  <span className={`badge badge-${getStatusBadgeVariant(candidate.status)}`}>
                    {candidate.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }} onClick={e => e.stopPropagation()}>
                    <button className="btn btn-ghost btn-icon" title="Email Candidate">
                      <Mail size={16} />
                    </button>
                    <button 
                      className="btn btn-ghost btn-icon" 
                      title="View Details"
                      onClick={() => navigate(`/candidates/${candidate.id}`)}
                    >
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            
            {filteredCandidates.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center" style={{ padding: '40px' }}>
                  No candidates found matching filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
