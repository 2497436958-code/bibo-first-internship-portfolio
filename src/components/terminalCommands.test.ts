import { describe, expect, it } from 'vitest';
import { agentSystems } from './agentSystems';
import { dispatchTerminalCommand } from './terminalCommands';

describe('dispatchTerminalCommand', () => {
  it('normalizes help and returns the allow-list', () => {
    expect(dispatchTerminalCommand('  HELP  ', agentSystems).lines).toContain('projects');
  });

  it('resolves project aliases and never executes unknown commands', () => {
    expect(dispatchTerminalCommand('open mes', agentSystems).openSystem?.id).toBe('mes');
    expect(dispatchTerminalCommand('rm -rf /', agentSystems).lines[0]).toMatch(/unknown command/i);
  });

  it('returns clear for clear and project counts for projects', () => {
    expect(dispatchTerminalCommand('clear', agentSystems).clear).toBe(true);
    expect(dispatchTerminalCommand('projects', agentSystems).lines.join('\n')).toMatch(/MES Agent/);
  });

  it('routes the high-tech agent to its local frontend', () => {
    expect(agentSystems.find((system) => system.id === 'high-tech')?.url).toBe('http://127.0.0.1:3000/');
  });
});
