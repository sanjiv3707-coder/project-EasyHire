import { mockAsync } from './api';
import { communications as mockComms } from '../data/communications';

/**
 * Communication service — abstracts data access for messaging.
 * In future, this will connect to the SNS Workbench communication workflow.
 */

export async function getCommunications() {
  return mockAsync(mockComms);
}

export async function sendCommunication(commData) {
  // In future: POST /api/communications (triggers SNS Workbench workflow)
  const newComm = {
    ...commData,
    id: `comm-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    status: 'Queued',
  };
  return mockAsync(newComm);
}
