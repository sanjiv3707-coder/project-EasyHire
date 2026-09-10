import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, MapPin, Users, Filter, ChevronRight } from 'lucide-react';
import { getJobs } from '../services/jobService';
import { getStatusBadgeVariant } from '../utils/helpers';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const data = await getJobs();
      setJobs(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.department.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div>Loading jobs...</div>;

  return (
    <div className="jobs-page">
      <div className="page-header" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="filters-bar" style={{ margin: 0 }}>
          <div className="search-input-wrapper">
            <Search />
            <input
              type="text"
              className="form-input"
              placeholder="Search jobs or departments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="btn btn-secondary">
            <Filter size={18} />
            Filter
          </button>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/jobs/new')}
        >
          <Plus size={18} />
          Create New Job
        </button>
      </div>

      <div className="jobs-grid">
        {filteredJobs.map((job) => (
          <div 
            key={job.id} 
            className="card job-card"
            onClick={() => { /* In future, navigate to job detail */ }}
          >
            <div className="card-body">
              <div className="job-card-header">
                <div>
                  <h3 className="job-card-title">{job.title}</h3>
                  <div className="job-card-dept">{job.department} • {job.type}</div>
                </div>
                <span className={`badge badge-${getStatusBadgeVariant(job.status)}`}>
                  {job.status}
                </span>
              </div>

              <div className="job-card-meta">
                <div className="job-card-meta-item">
                  <MapPin />
                  {job.location}
                </div>
                <div className="job-card-meta-item">
                  <BriefcaseIcon />
                  {job.experienceMin}-{job.experienceMax} years
                </div>
              </div>

              <div className="job-card-skills">
                {job.requiredSkills.slice(0, 4).map(skill => (
                  <span key={skill} className="badge badge-gray">{skill}</span>
                ))}
                {job.requiredSkills.length > 4 && (
                  <span className="badge badge-gray">+{job.requiredSkills.length - 4}</span>
                )}
              </div>

              <div className="job-card-footer">
                <div className="job-card-stat">
                  <Users size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
                  <strong>{job.totalCandidates}</strong> Candidates
                </div>
                <div className="job-card-stat">
                  <strong>{job.shortlisted}</strong> Shortlisted
                </div>
                <ChevronRight size={18} className="text-muted" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredJobs.length === 0 && (
        <div className="empty-state">
          <BriefcaseIcon size={48} />
          <p>No jobs found matching "{search}"</p>
        </div>
      )}
    </div>
  );
}

// Inline Briefcase since Lucide Briefcase name conflicts with outer scope in some bundlers if destructured
function BriefcaseIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}
