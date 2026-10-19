import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { afterEach, describe, expect, it } from 'vitest';
import { ProjectGallery } from './ProjectGallery';

afterEach(cleanup);

describe('ProjectGallery external requests', () => {
  it('opens a requested project from an external terminal action', () => {
    const { rerender } = render(<ProjectGallery openRequest={null} />);
    rerender(<ProjectGallery openRequest={{ projectId: 'mes', nonce: 1 }} />);
    expect(screen.getByRole('dialog', { name: /mes agent screenshots/i })).toBeInTheDocument();
  });
});
