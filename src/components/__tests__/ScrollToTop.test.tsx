import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ScrollToTop } from '@/components/ScrollToTop';

beforeEach(() => {
  Object.defineProperty(window, 'pageYOffset', { writable: true, configurable: true, value: 0 });
  window.scrollTo = jest.fn();
});

describe('ScrollToTop', () => {
  it('renders a button with an accessible label', () => {
    render(<ScrollToTop />);
    expect(screen.getByRole('button', { name: /scroll to top/i })).toBeInTheDocument();
  });

  it('is hidden when page has not scrolled', () => {
    render(<ScrollToTop />);
    const btn = screen.getByRole('button', { name: /scroll to top/i });
    expect(btn.className).toContain('opacity-0');
    expect(btn.className).toContain('pointer-events-none');
  });

  it('becomes visible after scrolling past 300px', () => {
    render(<ScrollToTop />);
    act(() => {
      Object.defineProperty(window, 'pageYOffset', { writable: true, configurable: true, value: 400 });
      fireEvent.scroll(window);
    });
    const btn = screen.getByRole('button', { name: /scroll to top/i });
    expect(btn.className).toContain('opacity-100');
  });

  it('calls window.scrollTo with smooth behaviour when clicked', () => {
    render(<ScrollToTop />);
    act(() => {
      Object.defineProperty(window, 'pageYOffset', { writable: true, configurable: true, value: 400 });
      fireEvent.scroll(window);
    });
    fireEvent.click(screen.getByRole('button', { name: /scroll to top/i }));
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('does not use rounded-full (stays flat to match design)', () => {
    render(<ScrollToTop />);
    expect(screen.getByRole('button', { name: /scroll to top/i }).className).not.toContain('rounded-full');
  });

  it('does not use purple colours', () => {
    render(<ScrollToTop />);
    expect(screen.getByRole('button', { name: /scroll to top/i }).className).not.toContain('purple');
  });
});
