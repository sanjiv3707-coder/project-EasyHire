/**
 * Utility helpers for EasyHire.
 */

/**
 * Get a deterministic avatar background color from a name string.
 */
const AVATAR_COLORS = [
  'linear-gradient(135deg, #6366f1, #8b5cf6)',
  'linear-gradient(135deg, #14b8a6, #06b6d4)',
  'linear-gradient(135deg, #f59e0b, #f97316)',
  'linear-gradient(135deg, #ec4899, #f43f5e)',
  'linear-gradient(135deg, #10b981, #34d399)',
  'linear-gradient(135deg, #3b82f6, #6366f1)',
  'linear-gradient(135deg, #8b5cf6, #ec4899)',
  'linear-gradient(135deg, #06b6d4, #3b82f6)',
];

export function getAvatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

/**
 * Get initials from a full name.
 */
export function getInitials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Map a status string to a badge variant.
 */
export function getStatusBadgeVariant(status) {
  const map = {
    'Applied': 'info',
    'Eligible': 'primary',
    'Shortlisted': 'primary',
    'Assessment Pending': 'warning',
    'Assessment Completed': 'info',
    'Interview Pending': 'warning',
    'Interview Completed': 'info',
    'Under Review': 'warning',
    'Client Ready': 'success',
    'Rejected': 'danger',
    'Active': 'success',
    'Paused': 'gray',
    'Closed': 'danger',
    'Completed': 'success',
    'Pending': 'warning',
    'Not Started': 'gray',
    'Sent': 'success',
    'Delivered': 'success',
    'Queued': 'warning',
    'Failed': 'danger',
  };
  return map[status] || 'gray';
}

/**
 * Get score color class.
 */
export function getScoreColor(score) {
  if (score >= 85) return 'var(--color-success-500)';
  if (score >= 70) return 'var(--color-primary-500)';
  if (score >= 50) return 'var(--color-warning-500)';
  return 'var(--color-danger-500)';
}

/**
 * Format salary (INR lakhs).
 */
export function formatSalary(amount) {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
}
