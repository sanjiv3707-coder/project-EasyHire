import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  FileText, 
  Check, 
  X,
  AlertTriangle,
  Bot
} from 'lucide-react';
import { getCandidateById } from '../services/candidateService';
import { getAvatarColor, getInitials, getStatusBadgeVariant, getScoreColor } from '../utils/helpers';

export default function CandidateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getCandidateById(id);
      setCandidate(data);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  if (loading) return <div>Loading candidate details...</div>;
  if (!candidate) return <div>Candidate not found.</div>;

  return (
    <div className="candidate-detail">
      <div className="mock-notice">
        <AlertTriangle size={16} />
        <div>
          <strong>Mock Data Notice:</strong> The AI scores, matching skills, and insights shown below are simulated for the MVP. They will be replaced by real SNS Workbench outputs in the future.
        </div>
      </div>

      <button 
        className="btn btn-ghost" 
        style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-2) 0' }}
        onClick={() => navigate('/candidates')}
      >
        <ArrowLeft size={16} />
        Back to Candidates
      </button>

      {/* Header */}
      <div className="candidate-detail-header">
        <div 
          className="candidate-detail-avatar"
          style={{ background: getAvatarColor(candidate.name) }}
        >
          {getInitials(candidate.name)}
        </div>
        <div>
          <h1 className="candidate-detail-name">{candidate.name}</h1>
          <div className="candidate-detail-job">
            Applying for <strong>{candidate.jobTitle}</strong>
          </div>
          <div style={{ marginTop: 'var(--space-2)' }}>
            <span className={`badge badge-${getStatusBadgeVariant(candidate.status)}`}>
              {candidate.status}
            </span>
          </div>
        </div>
        <div className="candidate-detail-actions">
          <button className="btn btn-secondary">
            <Mail size={16} />
            Contact
          </button>
          <button className="btn btn-danger">Reject</button>
          <button className="btn btn-primary">
            <Check size={16} />
            Approve & Advance
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="dashboard-grid">
        {/* Left Column */}
        <div>
          <div className="card detail-section">
            <div className="card-header">
              <h2 className="card-title">Candidate Information</h2>
            </div>
            <div className="card-body detail-grid">
              <div className="detail-field">
                <span className="detail-field-label">Email</span>
                <span className="detail-field-value" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Mail size={14} className="text-muted" />
                  {candidate.email}
                </span>
              </div>
              <div className="detail-field">
                <span className="detail-field-label">Phone</span>
                <span className="detail-field-value" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Phone size={14} className="text-muted" />
                  {candidate.phone}
                </span>
              </div>
              <div className="detail-field">
                <span className="detail-field-label">Location</span>
                <span className="detail-field-value" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={14} className="text-muted" />
                  {candidate.location}
                </span>
              </div>
              <div className="detail-field">
                <span className="detail-field-label">Experience</span>
                <span className="detail-field-value" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Briefcase size={14} className="text-muted" />
                  {candidate.experience} Years
                </span>
              </div>
              <div className="detail-field" style={{ gridColumn: '1 / -1' }}>
                <span className="detail-field-label">Skills</span>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
                  {candidate.skills.map(s => (
                    <span key={s} className="badge badge-gray">{s}</span>
                  ))}
                </div>
              </div>
              <div className="detail-field" style={{ gridColumn: '1 / -1', marginTop: 'var(--space-2)' }}>
                <span className="detail-field-label">Resume</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px', padding: '12px', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }}>
                  <FileText size={24} className="text-muted" />
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 'var(--font-size-sm)' }}>{candidate.resumeFile}</div>
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-gray-500)' }}>Uploaded {candidate.resumeUploadedAt}</div>
                  </div>
                  <button className="btn btn-secondary btn-sm" style={{ marginLeft: 'auto' }}>View PDF</button>
                </div>
              </div>
            </div>
          </div>

          {/* Assessment & Interview blocks */}
          <div className="card detail-section">
            <div className="card-header">
              <h2 className="card-title">Assessment Results</h2>
              <span className={`badge badge-${candidate.assessment.status === 'Completed' ? 'success' : 'gray'}`}>
                {candidate.assessment.status}
              </span>
            </div>
            <div className="card-body">
              {candidate.assessment.score ? (
                <>
                  <div className="detail-grid">
                    <div className="detail-field">
                      <span className="detail-field-label">Score</span>
                      <span className="detail-field-value" style={{ fontSize: 'var(--font-size-xl)', color: getScoreColor(candidate.assessment.score) }}>
                        {candidate.assessment.score}%
                      </span>
                    </div>
                    <div className="detail-field">
                      <span className="detail-field-label">Questions</span>
                      <span className="detail-field-value">{candidate.assessment.correctAnswers} / {candidate.assessment.totalQuestions}</span>
                    </div>
                    <div className="detail-field">
                      <span className="detail-field-label">Time Taken</span>
                      <span className="detail-field-value">{candidate.assessment.completionTime}</span>
                    </div>
                  </div>
                  {candidate.assessment.suspiciousFlags?.length > 0 && (
                    <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', background: 'var(--color-warning-50)', borderRadius: 'var(--radius-md)', color: 'var(--color-warning-700)', fontSize: 'var(--font-size-sm)' }}>
                      <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                        <AlertTriangle size={14} /> Suspicious Activity Detected
                      </div>
                      <ul style={{ paddingLeft: '20px', margin: 0 }}>
                        {candidate.assessment.suspiciousFlags.map(f => <li key={f}>{f}</li>)}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-muted text-center py-4">Assessment not yet completed</div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: AI Analysis */}
        <div>
          <div className="card detail-section" style={{ border: '2px solid var(--color-primary-100)', boxShadow: '0 4px 20px rgba(99, 102, 241, 0.1)' }}>
            <div className="card-header" style={{ background: 'var(--color-primary-50)' }}>
              <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary-700)' }}>
                <Bot size={20} /> AI Screening Analysis
              </h2>
            </div>
            <div className="card-body">
              <div className="ai-screening-grid">
                <div className="match-score">
                  <div className="match-score-circle" style={{ 
                    border: `6px solid ${getScoreColor(candidate.aiScreening.matchScore)}`,
                    color: getScoreColor(candidate.aiScreening.matchScore)
                  }}>
                    {candidate.aiScreening.matchScore}%
                  </div>
                  <div className="match-score-label">Overall Match Score</div>
                </div>
                
                <div className="skills-match-list">
                  <div className="detail-field-label" style={{ marginBottom: '8px' }}>Skill Analysis</div>
                  {candidate.aiScreening.matchingSkills.map(s => (
                    <div key={s} className="skill-match-item matched">
                      <Check size={14} /> {s}
                    </div>
                  ))}
                  {candidate.aiScreening.missingSkills.map(s => (
                    <div key={s} className="skill-match-item missing">
                      <X size={14} /> {s}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="ai-recommendation">
                <div className="ai-recommendation-label">AI Recommendation: {candidate.aiScreening.recommendation}</div>
                <div className="ai-recommendation-text">{candidate.aiScreening.explanation}</div>
              </div>
            </div>
          </div>

          <div className="card detail-section">
            <div className="card-header">
              <h2 className="card-title">AI Interview Summary</h2>
              <span className={`badge badge-${candidate.interview.status === 'Completed' ? 'success' : 'gray'}`}>
                {candidate.interview.status}
              </span>
            </div>
            <div className="card-body">
              {candidate.interview.score ? (
                <>
                  <div style={{ marginBottom: 'var(--space-4)' }}>
                    <span className="detail-field-label">Overall Score</span>
                    <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold', color: getScoreColor(candidate.interview.score) }}>
                      {candidate.interview.score}%
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: 'var(--space-4)' }}>
                    <span className="detail-field-label">Summary</span>
                    <p style={{ fontSize: 'var(--font-size-sm)', marginTop: '4px', lineHeight: 1.6 }}>
                      {candidate.interview.summary}
                    </p>
                  </div>
                  
                  <div className="ai-screening-grid">
                    <div>
                      <span className="detail-field-label">Strengths</span>
                      <ul style={{ paddingLeft: '20px', marginTop: '4px', fontSize: 'var(--font-size-sm)', color: 'var(--color-success-700)' }}>
                        {candidate.interview.strengths.map(s => <li key={s}>{s}</li>)}
                      </ul>
                    </div>
                    <div>
                      <span className="detail-field-label">Areas to Probe</span>
                      <ul style={{ paddingLeft: '20px', marginTop: '4px', fontSize: 'var(--font-size-sm)', color: 'var(--color-danger-600)' }}>
                        {candidate.interview.weaknesses.map(s => <li key={s}>{s}</li>)}
                      </ul>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-muted text-center py-4">AI Interview not yet completed</div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
