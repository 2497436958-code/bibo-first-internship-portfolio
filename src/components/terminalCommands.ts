import type { AgentSystem } from './agentSystems';

export type TerminalCommandResult = {
  lines: string[];
  clear?: boolean;
  openSystem?: AgentSystem;
};

const helpLines = [
  'available commands:',
  'help',
  'systems',
  'projects',
  'open <agent>',
  'about',
  'whoami',
  'clear',
];

const normalize = (value: string) => value.trim().toLowerCase();

function resolveSystem(value: string, systems: AgentSystem[]) {
  const query = normalize(value).replace(/\s+/g, '-');
  return systems.find((system) => {
    const title = normalize(system.title).replace(/\s+/g, '-');
    return system.id === query || title === query;
  });
}

export function dispatchTerminalCommand(input: string, systems: AgentSystem[]): TerminalCommandResult {
  const normalized = normalize(input);
  if (!normalized) return { lines: [] };

  const [command, ...args] = normalized.split(/\s+/);
  switch (command) {
    case 'help':
      return { lines: helpLines };
    case 'systems':
    case 'projects':
      return {
        lines: [
          'agent systems:',
          ...systems.map((system) => `  ${system.id.padEnd(12)} ${system.title} · ready to open`),
        ],
      };
    case 'open': {
      const system = resolveSystem(args.join(' '), systems);
      return system
        ? { lines: [`opening ${system.title}...`], openSystem: system }
        : { lines: ['agent system not found. Try: open mes'] };
    }
    case 'about':
      return { lines: ['BIBO Intelligence', '柔性 MES · 工业 AI · 制造业数字化转型', '洞察为始 · 落地为证'] };
    case 'whoami':
      return { lines: ['XX / BIBO Intelligence', '浙江杭州 · digital manufacturing systems'] };
    case 'clear':
      return { lines: [], clear: true };
    default:
      return { lines: [`unknown command: ${command}`, 'Type help to see the available commands.'] };
  }
}
