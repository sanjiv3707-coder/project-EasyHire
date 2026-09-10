/**
 * Base API client for EasyHire.
 *
 * Currently returns mock data via simulated async calls.
 * When the backend is ready, replace the implementation here
 * with real fetch/axios calls — no component changes needed.
 *
 * Future integration pattern:
 *   const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';
 *   export async function apiGet(path) { return fetch(`${API_BASE}${path}`).then(r => r.json()); }
 *   export async function apiPost(path, data) { ... }
 */

const SIMULATED_DELAY_MS = 200;

/**
 * Simulate an async API response.
 * @param {*} data - The data to return
 * @returns {Promise<*>}
 */
export function mockAsync(data) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(structuredClone(data)), SIMULATED_DELAY_MS);
  });
}
