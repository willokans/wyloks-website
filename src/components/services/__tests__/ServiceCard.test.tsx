import React from 'react';
import { render, screen } from '@testing-library/react';
import { ServiceCard } from '@/components/services/ServiceCard';

describe('ServiceCard', () => {
  const mockProps = {
    title: 'Test Service',
    description: 'Test Description',
    icon: <svg data-testid="test-icon" />
  };

  it('renders the service card with all props', () => {
    render(<ServiceCard {...mockProps} />);
    
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('applies the correct styling classes', () => {
    render(<ServiceCard {...mockProps} />);
    
    const card = screen.getByRole('article');
    expect(card).toHaveClass('bg-white', 'rounded-2xl', 'p-6', 'sm:p-8', 'shadow-lg', 'hover:shadow-xl', 'transition-all', 'duration-300');
  });
});
