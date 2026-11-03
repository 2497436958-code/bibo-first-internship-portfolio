import { useEffect, useRef, useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';
import type { AgentSystem } from './agentSystems';
import { dispatchTerminalCommand } from './terminalCommands';
import './TerminalPage.css';

type TranscriptEntry = { command?: string; lines: string[] };

export type TerminalSurfaceProps = {
  systems: AgentSystem[];
  onOpenSystem: (system: AgentSystem) => Promise<{ ok: boolean; lines: string[] }>;
};

const welcome: TranscriptEntry = {
  lines: ['BIBO Intelligence agent system console', 'Type help to inspect available systems.'],
};

export function TerminalSurface({ systems, onOpenSystem }: TerminalSurfaceProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([welcome]);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [transcript]);

  const submit = async (event?: FormEvent) => {
    event?.preventDefault();
    const command = input.trim();
    if (!command) return;

    const result = dispatchTerminalCommand(command, systems);
    setHistory((current) => [...current.filter((item) => item !== command), command]);
    setHistoryIndex(-1);
    setInput('');

    if (result.clear) {
      setTranscript([]);
    } else {
      setTranscript((current) => [...current, { command, lines: result.lines }]);
    }

    if (result.openSystem) {
      const outcome = await onOpenSystem(result.openSystem);
      if (outcome.lines.length > 0) {
        setTranscript((current) => [...current, { lines: outcome.lines }]);
      }
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submit();
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHistoryIndex((current) => {
        const next = Math.max(0, current < 0 ? history.length - 1 : current - 1);
        setInput(history[next] ?? '');
        return next;
      });
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHistoryIndex((current) => {
        const next = Math.min(history.length, current + 1);
        setInput(history[next] ?? '');
        return next;
      });
    }
  };

  const prefillSystemCommand = (systemId: string) => {
    setInput(`open ${systemId}`);
    setHistoryIndex(-1);
    inputRef.current?.focus();
  };

  return <div className="terminal-surface">
    <div className="terminal-page__header">
      <span className="terminal-page__eyebrow">04 / AGENT SYSTEM CONSOLE</span>
      <span className="terminal-page__status"><i /> LOCAL SYSTEM LAUNCHER</span>
    </div>
    <div className="terminal-page__workspace">
      <div className="terminal-window">
        <div className="terminal-window__bar">
          <div className="terminal-window__lights" aria-hidden="true"><i /><i /><i /></div>
          <span>XX@bibo-intelligence: ~/agents</span>
        </div>
        <div ref={logRef} className="terminal-window__log" role="log" aria-live="polite">
          {transcript.map((entry, index) => <div className="terminal-entry" key={`${entry.command ?? 'welcome'}-${index}`}>
            {entry.command && <div className="terminal-command"><span>xx@bibo:~$</span> {entry.command}</div>}
            {entry.lines.map((line) => <div className="terminal-output" key={line}>{line}</div>)}
          </div>)}
          <form className="terminal-prompt" onSubmit={submit}>
            <label htmlFor="terminal-command">xx@bibo:~$</label>
            <input ref={inputRef} id="terminal-command" aria-label="Terminal command" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={handleKeyDown} autoComplete="off" spellCheck={false} />
            <span className="terminal-caret" aria-hidden="true" />
          </form>
        </div>
      </div>
      <aside className="terminal-shortcuts" aria-label="Agent system shortcuts">
        <span>QUICK OPEN</span>
        {systems.map((system, index) => <button key={system.id} type="button" aria-label={`Open ${system.title}`} title={`启动命令：${system.startHint}`} onClick={() => prefillSystemCommand(system.id)}><b>{String(index + 1).padStart(2, '0')}</b><i style={{ backgroundColor: system.colour }} /><em>{system.title}</em><small>{system.command}</small></button>)}
      </aside>
    </div>
    <p className="terminal-page__caption">A focused interface for launching BIBO Intelligence agent systems.</p>
  </div>;
}
