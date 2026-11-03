export type ProbeOutcome = 'reachable' | 'unreachable' | 'slow';

const DEFAULT_TIMEOUT_MS = 2000;

/**
 * Probe a locally running agent system before opening it.
 *
 * `no-cors` still rejects on a refused connection, so a resolved promise means
 * something is listening. A timeout is reported as `slow` rather than
 * `unreachable` — a slow dev server is still worth opening.
 */
export async function probeAgentSystem(
  url: string,
  timeoutMs: number = DEFAULT_TIMEOUT_MS,
): Promise<ProbeOutcome> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    await fetch(url, { method: 'GET', mode: 'no-cors', cache: 'no-store', signal: controller.signal });
    return 'reachable';
  } catch (error) {
    const name = error instanceof Error ? error.name : '';
    if (name === 'AbortError') return 'slow';
    return 'unreachable';
  } finally {
    clearTimeout(timer);
  }
}
