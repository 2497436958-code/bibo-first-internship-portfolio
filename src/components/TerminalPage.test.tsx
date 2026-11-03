import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { agentSystems } from './agentSystems';
import { TerminalPage } from './TerminalPage';
import { TerminalSurface } from './TerminalSurface';

const resolvedOpen = () => vi.fn().mockResolvedValue({ ok: true, lines: [] });

describe('TerminalPage', () => {
  afterEach(cleanup);

  it('renders one reusable terminal command input', () => {
    render(<TerminalSurface systems={agentSystems} onOpenSystem={resolvedOpen()} />);

    expect(screen.getAllByRole('textbox', { name: /terminal command/i })).toHaveLength(1);
    expect(screen.getByText(/BIBO Intelligence agent system console/i)).toBeInTheDocument();
  });

  it('submits commands and exposes output to assistive technology', () => {
    render(<TerminalPage systems={agentSystems} onOpenSystem={resolvedOpen()} />);
    const input = screen.getByRole('textbox', { name: /terminal command/i });
    fireEvent.change(input, { target: { value: 'help' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(screen.getByText('available commands:')).toBeInTheDocument();
    expect(screen.getByRole('log')).toHaveAttribute('aria-live', 'polite');
  });

  it('emits an open request without closing the terminal', () => {
    const onOpenProject = vi.fn(resolvedOpen());
    render(<TerminalPage systems={agentSystems} onOpenSystem={onOpenProject} />);
    const input = screen.getByRole('textbox', { name: /terminal command/i });
    fireEvent.change(input, { target: { value: 'open mes' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onOpenProject).toHaveBeenCalledWith(agentSystems[0]);
    expect(screen.getByRole('region', { name: /agent system console/i })).toBeInTheDocument();
  });

  it('recalls the last command with ArrowUp', () => {
    render(<TerminalPage systems={agentSystems} onOpenSystem={resolvedOpen()} />);
    const input = screen.getByRole('textbox', { name: /terminal command/i });
    fireEvent.change(input, { target: { value: 'whoami' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(input).toHaveValue('whoami');
  });

  it('prefills a project command from a shortcut and waits for Enter to open it', () => {
    const onOpenProject = vi.fn(resolvedOpen());
    render(<TerminalPage systems={agentSystems} onOpenSystem={onOpenProject} />);
    fireEvent.click(screen.getByRole('button', { name: /open mes agent/i }));
    const input = screen.getByRole('textbox', { name: /terminal command/i });
    expect(input).toHaveValue('open mes');
    expect(onOpenProject).not.toHaveBeenCalled();

    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onOpenProject).toHaveBeenCalledWith(agentSystems[0]);
  });
});
