/**
 * Mock communication records for EasyHire MVP.
 *
 * Later this data will come from the SNS Workbench communication workflow.
 */

export const communications = [
  {
    id: 'comm-001',
    candidateId: 'cand-004',
    candidateName: 'Sneha Reddy',
    message: 'Assessment invitation for React Frontend Developer role',
    type: 'Assessment Invitation',
    date: '2026-08-28',
    status: 'Sent',
  },
  {
    id: 'comm-002',
    candidateId: 'cand-007',
    candidateName: 'Deepak Menon',
    message: 'Interview scheduled for DevOps Engineer position',
    type: 'Interview Invitation',
    date: '2026-08-27',
    status: 'Sent',
  },
  {
    id: 'comm-003',
    candidateId: 'cand-004',
    candidateName: 'Sneha Reddy',
    message: 'Reminder: Please complete your assessment by Sep 5',
    type: 'Assessment Reminder',
    date: '2026-09-01',
    status: 'Sent',
  },
  {
    id: 'comm-004',
    candidateId: 'cand-001',
    candidateName: 'Arun Sharma',
    message: 'Congratulations! You have been shortlisted for client review',
    type: 'Status Update',
    date: '2026-08-30',
    status: 'Delivered',
  },
  {
    id: 'comm-005',
    candidateId: 'cand-003',
    candidateName: 'Ravi Kumar',
    message: 'Interview invitation for Senior Python Developer role',
    type: 'Interview Invitation',
    date: '2026-08-22',
    status: 'Delivered',
  },
  {
    id: 'comm-006',
    candidateId: 'cand-009',
    candidateName: 'Rahul Verma',
    message: 'Interview reminder: Your AI interview is scheduled for tomorrow',
    type: 'Interview Reminder',
    date: '2026-08-23',
    status: 'Delivered',
  },
  {
    id: 'comm-007',
    candidateId: 'cand-006',
    candidateName: 'Ananya Iyer',
    message: 'You have been found eligible for the Data Analyst role',
    type: 'Status Update',
    date: '2026-08-26',
    status: 'Delivered',
  },
  {
    id: 'comm-008',
    candidateId: 'cand-008',
    candidateName: 'Kavitha Sundaram',
    message: 'Update regarding your application for Senior Python Developer',
    type: 'Status Update',
    date: '2026-08-28',
    status: 'Sent',
  },
];

export default communications;
