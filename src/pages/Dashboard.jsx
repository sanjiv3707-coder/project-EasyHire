import { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Users, 
  Star, 
  ClipboardCheck, 
  Video, 
  CheckCircle2,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { getJobs } from '../services/jobService';
import { getCandidates } from '../services/candidateService';
import { activities } from '../data/activities';
import { PIPELINE_STAGES } from '../data/candidates';

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [jobsData, candidatesData] = await Promise.all([
        getJobs(),
        getCandidates(),
      ]);
      setJobs(jobsData);
      setCandidates(candidatesData);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  // Calculate metrics
  const activeJobsCount = jobs.filter(j => j.status === 'Active').length;
  const totalCandidatesCount = candidates.length;
  const shortlistedCount = candidates.filter(c => c.pipelineStage === 'Shortlisted' || c.pipelineStage === 'Assessment' || c.pipelineStage === 'Interview' || c.pipelineStage === 'Recruiter Review' || c.pipelineStage === 'Client Ready').length;
  const assessmentsPending = candidates.filter(c => c.assessment.status === 'Pending').length;
  const interviewsPending = candidates.filter(c => c.interview.status === 'Pending').length;
  const clientReadyCount = candidates.filter(c => c.status === 'Client Ready').length;

  // Pipeline counts
  const pipelineCounts = PIPELINE_STAGES.map(stage => {
    const count = candidates.filter(c => c.pipelineStage === stage).length;
    return { stage, count };
  });

  const maxPipelineCount = Math.max(...pipelineCounts.map(p => p.count), 1);

  return (
    <div className="dashboard-page">
      <div className="metrics-grid">
        <MetricCard
          title="Active Jobs"
          value={activeJobsCount}
          icon={Briefcase}
          colorClass="primary"
          trend="up"
          trendValue="2"
        />
        <MetricCard
          title="Total Candidates"
          value={totalCandidatesCount}
          icon={Users}
          colorClass="info"
          trend="up"
          trendValue="12%"
        />
        <MetricCard
          title="Shortlisted"
          value={shortlistedCount}
          icon={Star}
          colorClass="teal"
          trend="up"
          trendValue="5%"
        />
        <MetricCard
          title="Assessments Pending"
          value={assessmentsPending}
          icon={ClipboardCheck}
          colorClass="warning"
          trend="down"
          trendValue="4"
        />
        <MetricCard
          title="Interviews Pending"
          value={interviewsPending}
          icon={Video}
          colorClass="warning"
          trend="down"
          trendValue="1"
        />
        <MetricCard
          title="Client-Ready"
          value={clientReadyCount}
          icon={CheckCircle2}
          colorClass="success"
          trend="up"
          trendValue="3"
        />
      </div>

      <div className="dashboard-grid">
        {/* Pipeline Overview */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Pipeline Overview</h2>
          </div>
          <div className="card-body">
            <div className="pipeline-overview">
              {pipelineCounts.map(({ stage, count }) => {
                const widthPercent = (count / maxPipelineCount) * 100;
                // Color logic based on stage
                let fillClass = 'var(--color-primary-500)';
                if (stage === 'Client Ready') fillClass = 'var(--color-success-500)';
                else if (stage === 'Recruiter Review') fillClass = 'var(--color-warning-500)';

                return (
                  <div key={stage} className="pipeline-stage">
                    <div className="pipeline-stage-label">{stage}</div>
                    <div className="pipeline-stage-bar">
                      {count > 0 && (
                        <div
                          className="pipeline-stage-fill"
                          style={{
                            width: `${widthPercent}%`,
                            background: fillClass,
                          }}
                        >
                          {count}
                        </div>
                      )}
                    </div>
                    <div className="pipeline-stage-count">{count}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Recent Activity</h2>
          </div>
          <div className="card-body" style={{ padding: '0 var(--space-6)' }}>
            <div className="activity-list">
              {activities.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className={`activity-dot ${activity.color}`} />
                  <div>
                    <div
                      className="activity-text"
                      dangerouslySetInnerHTML={{ __html: activity.text }}
                    />
                    <div className="activity-time">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, colorClass, trend, trendValue }) {
  return (
    <div className="card metric-card">
      <div className="metric-card-header">
        <div>
          <div className="metric-card-value">{value}</div>
          <div className="metric-card-label">{title}</div>
        </div>
        <div className={`metric-card-icon ${colorClass}`}>
          <Icon size={22} />
        </div>
      </div>
      {trend && (
        <div className={`metric-card-change ${trend}`}>
          {trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span>{trendValue} {trend === 'up' ? 'increase' : 'decrease'}</span>
        </div>
      )}
    </div>
  );
}
