import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from '@/app/loading';

describe('Loading page', () => {
  it('renders a loading spinner', () => {
    const { container } = render(<Loading />);
    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('renders "Loading" text', () => {
    render(<Loading />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('takes up the full screen height', () => {
    const { container } = render(<Loading />);
    expect((container.firstChild as HTMLElement).className).toContain('min-h-screen');
  });

  it('does not use gray or purple colours', () => {
    const { container } = render(<Loading />);
    expect(container.innerHTML).not.toMatch(/bg-gray|text-purple|bg-purple/);
  });
});
