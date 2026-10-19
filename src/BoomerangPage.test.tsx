import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, expect, it } from 'vitest';
import { BoomerangPage } from './BoomerangPage';

describe('Boomerang landing page', () => {
  it('renders expandable Agent concept and system cards without project content', () => {
    render(<BoomerangPage />);

    const background = screen.getByTestId('boomerang-video-background');
    const video = background.querySelector('video');

    expect(background).toBeInTheDocument();
    expect(video).not.toHaveAttribute('crossorigin');
    expect(video).toHaveAttribute('loop');
    expect(video).toHaveAttribute('src', '/boomerang-background.mp4');
    expect(background.querySelector('img')).toHaveAttribute('src', '/bibo-building-logo.jpg');
    expect(screen.getByRole('complementary', { name: /prompt explainer card/i })).toBeInTheDocument();
    expect(screen.getByRole('complementary', { name: /harness explainer card/i })).toBeInTheDocument();
    expect(screen.getByRole('complementary', { name: /loop explainer card/i })).toBeInTheDocument();
    expect(screen.getByRole('complementary', { name: /mes explainer card/i })).toBeInTheDocument();
    expect(screen.getByRole('complementary', { name: /mat explainer card/i })).toBeInTheDocument();
    expect(screen.getByRole('complementary', { name: /erp explainer card/i })).toBeInTheDocument();
    expect(screen.getByText('PROMPT')).toBeInTheDocument();
    expect(screen.getByText('HARNESS')).toBeInTheDocument();
    expect(screen.getByText('LOOP')).toBeInTheDocument();
    expect(screen.getByText('MES')).toBeInTheDocument();
    expect(screen.getByText('MAT')).toBeInTheDocument();
    expect(screen.getByText('ERP')).toBeInTheDocument();
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: '查看项目' })).not.toBeInTheDocument();
    expect(screen.queryByRole('img', { name: /mes system preview/i })).not.toBeInTheDocument();

    fireEvent.click(screen.getAllByRole('button', { name: '了解更多' })[0]);

    expect(screen.getByText(/一个好的 Prompt 需要明确 AI 的角色/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '收起' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '收起' }));
    fireEvent.click(screen.getAllByRole('button', { name: '了解更多' })[1]);

    expect(screen.getByText(/Harness 可以理解为 Agent 的运行框架和安全护栏/)).toBeInTheDocument();
  });
});
