import { describe, expect, it, vi } from 'vitest';
import { probeAgentSystem } from './systemProbe';

describe('probeAgentSystem', () => {
  it('reports reachable when the request resolves', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 200 })));
    await expect(probeAgentSystem('http://127.0.0.1:5173/')).resolves.toBe('reachable');
  });

  it('reports unreachable when the connection is refused', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
    await expect(probeAgentSystem('http://127.0.0.1:5173/')).resolves.toBe('unreachable');
  });

  it('reports slow instead of unreachable when the probe times out', async () => {
    const abortError = new Error('aborted');
    abortError.name = 'AbortError';
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(abortError));
    await expect(probeAgentSystem('http://127.0.0.1:5173/', 10)).resolves.toBe('slow');
  });
});
