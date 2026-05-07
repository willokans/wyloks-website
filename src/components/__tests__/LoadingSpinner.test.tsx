import React from 'react';
import { render } from '@testing-library/react';
import LoadingSpinner from '@/components/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders an SVG element', () => {
    const { container } = render(<LoadingSpinner />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('applies the animate-spin class', () => {
    const { container } = render(<LoadingSpinner />);
    expect(container.querySelector('svg')).toHaveClass('animate-spin');
  });

  it('applies a custom className', () => {
    const { container } = render(<LoadingSpinner className="h-4 w-4" />);
    expect(container.querySelector('svg')).toHaveClass('h-4', 'w-4');
  });

  it('uses default size classes when no className provided', () => {
    const { container } = render(<LoadingSpinner />);
    expect(container.querySelector('svg')).toHaveClass('h-5', 'w-5');
  });

  it('does not hardcode a text-white or purple colour', () => {
    const { container } = render(<LoadingSpinner />);
    const svg = container.querySelector('svg');
    expect(svg?.className).not.toContain('text-white');
    expect(svg?.className).not.toContain('purple');
  });
});
