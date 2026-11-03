import type { AgentSystem } from './agentSystems';
import { TerminalSurface } from './TerminalSurface';

type TerminalPageProps = {
  systems: AgentSystem[];
  onOpenSystem: (system: AgentSystem) => Promise<{ ok: boolean; lines: string[] }>;
};

export function TerminalPage({ systems, onOpenSystem }: TerminalPageProps) {
  return <section id="terminal" className="terminal-page" aria-label="Agent system console"><TerminalSurface systems={systems} onOpenSystem={onOpenSystem} /></section>;
}
