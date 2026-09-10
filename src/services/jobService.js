import { mockAsync } from './api';
import { jobs as mockJobs } from '../data/jobs';

/**
 * Job service — abstracts data access for job-related operations.
 * Swap mock implementations with real API calls when backend is ready.
 */

export async function getJobs() {
  return mockAsync(mockJobs);
}

export async function getJobById(id) {
  const job = mockJobs.find((j) => j.id === id) || null;
  return mockAsync(job);
}

export async function createJob(jobData) {
  // In future: POST /api/jobs
  const newJob = {
    ...jobData,
    id: `job-${Date.now()}`,
    totalCandidates: 0,
    shortlisted: 0,
    status: 'Active',
    createdAt: new Date().toISOString().split('T')[0],
  };
  return mockAsync(newJob);
}
