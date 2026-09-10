import { mockAsync } from './api';
import { candidates as mockCandidates } from '../data/candidates';

/**
 * Candidate service — abstracts data access for candidate operations.
 * Swap mock implementations with real API calls when backend is ready.
 */

export async function getCandidates() {
  return mockAsync(mockCandidates);
}

export async function getCandidateById(id) {
  const candidate = mockCandidates.find((c) => c.id === id) || null;
  return mockAsync(candidate);
}

export async function getCandidatesByJob(jobId) {
  const filtered = mockCandidates.filter((c) => c.jobId === jobId);
  return mockAsync(filtered);
}

export async function updateCandidateStatus(id, status) {
  // In future: PATCH /api/candidates/:id
  return mockAsync({ id, status, updatedAt: new Date().toISOString() });
}
