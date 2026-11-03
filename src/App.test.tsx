import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import { ScrollChapter } from './components/ScrollChapter';

afterEach(cleanup);

describe('Jack portfolio landing page', () => {
  it('renders reusable scroll chapters with stable ids', () => {
    render(
      <>
        <ScrollChapter id="hero"><section>Hero</section></ScrollChapter>
        <ScrollChapter id="brand"><section>Brand</section></ScrollChapter>
        <ScrollChapter id="projects"><section>Projects</section></ScrollChapter>
      </>,
    );

    expect(screen.getByTestId('scroll-chapter-hero')).toBeInTheDocument();
    expect(screen.getByTestId('scroll-chapter-brand')).toBeInTheDocument();
    expect(screen.getByTestId('scroll-chapter-projects')).toBeInTheDocument();
  });

  it('renders the requested portfolio sections and actions', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /hi, i'm xx/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /bibo intelligence/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /project/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /about me/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /services/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('region', { name: /selected motion work/i })).not.toBeInTheDocument();
    expect(screen.getByTestId('scroll-chapter-hero')).toBeInTheDocument();
    expect(screen.getByTestId('scroll-chapter-brand')).toBeInTheDocument();
    expect(screen.getByTestId('scroll-chapter-boomerang')).toBeInTheDocument();
    expect(screen.getByTestId('scroll-chapter-terminal')).toBeInTheDocument();
    expect(screen.getByTestId('scroll-chapter-projects')).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /agent system console/i })).toBeInTheDocument();
    expect(screen.getAllByRole('textbox', { name: /terminal command/i })).toHaveLength(1);
    expect(screen.getByTestId('scroll-chapter-boomerang').compareDocumentPosition(
      screen.getByTestId('scroll-chapter-terminal'),
    )).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(screen.getByText('BIBO Internship Progress Report')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /start/i })).toHaveAttribute('href', '#brand');
    expect(screen.getByRole('link', { name: /return/i })).toHaveAttribute('href', '#hero');
    expect(screen.getAllByRole('button', { name: /open .* folder/i })).toHaveLength(5);
    expect(screen.getByText('07 screenshots')).toBeInTheDocument();
    expect(screen.getByText('01 screenshot')).toBeInTheDocument();
    expect(screen.getByAltText(/hero portrait/i)).toHaveAttribute('src', '/jack-portrait.png');
    expect(screen.getByLabelText(/hero background video/i)).toHaveAttribute('src', '/hero-background.mp4');
  }, 10_000);

  it('opens a project folder and starts its screenshot viewer without closing to navigate', async () => {
    render(<App />);

    const mesFolder = screen.getByRole('button', { name: /open mes agent folder/i });
    fireEvent.click(mesFolder);
    expect(mesFolder).toHaveAttribute('aria-expanded', 'true');
    expect(mesFolder.closest('.project-folder')?.querySelectorAll('.folder__back .paper')).toHaveLength(3);
    expect(mesFolder.closest('.project-folder')?.querySelectorAll('.folder__front')).toHaveLength(2);

    fireEvent.click(screen.getByRole('button', { name: /view mes agent screenshot 1/i }));
    expect(screen.getByRole('dialog', { name: /mes agent screenshots/i })).toBeInTheDocument();
    expect(screen.getByAltText(/mes agent screenshot 1/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /next screenshot/i }));
    expect(screen.getByRole('dialog', { name: /mes agent screenshots/i })).toBeInTheDocument();
    expect(screen.getByAltText(/mes agent screenshot 2/i)).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByAltText(/mes agent screenshot 3/i)).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(screen.getByAltText(/mes agent screenshot 2/i)).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: /mes agent screenshots/i })).not.toBeInTheDocument();
    });
  });

  it('opens an agent system in a new browser tab from the terminal', () => {
    const openWindow = vi.spyOn(window, 'open').mockImplementation(() => null);
    render(<App />);

    const command = screen.getByRole('textbox', { name: /terminal command/i });
    fireEvent.change(command, { target: { value: 'open mes' } });
    fireEvent.keyDown(command, { key: 'Enter' });

    expect(openWindow).toHaveBeenCalledWith('http://127.0.0.1:5173/', '_blank');
    openWindow.mockRestore();
  });

  it('falls back to a target blank link when the browser blocks window.open', () => {
    const openWindow = vi.spyOn(window, 'open').mockReturnValue(null);
    const anchorClick = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    render(<App />);

    const command = screen.getByRole('textbox', { name: /terminal command/i });
    fireEvent.change(command, { target: { value: 'open high-tech' } });
    fireEvent.keyDown(command, { key: 'Enter' });

    expect(anchorClick).toHaveBeenCalled();
    openWindow.mockRestore();
    anchorClick.mockRestore();
  });
});
