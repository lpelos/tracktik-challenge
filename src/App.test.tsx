import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders TODO text', () => {
  render(<App />);
  const textElement = screen.getByText(/TODO/i);
  expect(textElement).toBeInTheDocument();
});
