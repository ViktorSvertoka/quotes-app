import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@components/Button'; // Adjust the import path according to your file structure

describe('Tests for Button Component', () => {
  const mockOnClick = jest.fn();

  afterEach(() => {
    jest.clearAllMocks(); // Clear any previous mock calls
  });

  test('renders with primary variant by default', () => {
    render(<Button text="Click Me" onClick={mockOnClick} />);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeTruthy();

    const expectedClass = 'bg-violet-900';
    expect(button.className).toContain(expectedClass);
  });

  test('renders with secondary variant', () => {
    render(
      <Button text="Click Me" onClick={mockOnClick} variant="secondary" />
    );

    const button = screen.getByRole('button', { name: /click me/i });

    const expectedClass = 'bg-gray-300';
    expect(button.className).toContain(expectedClass);
  });

  test('renders with danger variant', () => {
    render(<Button text="Delete" onClick={mockOnClick} variant="danger" />);

    const button = screen.getByRole('button', { name: /delete/i });

    const expectedClass = 'bg-red-900';
    expect(button.className).toContain(expectedClass);
  });

  test('calls onClick function when clicked', () => {
    render(<Button text="Click Me" onClick={mockOnClick} />);

    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1); // Ensure the onClick function is called
  });
});
