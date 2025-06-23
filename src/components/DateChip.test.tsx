// DateChip component tests
import React from 'react';
import { render, screen } from '@testing-library/react';
import DateChip from './DateChip';

test('renders DateChip with the correct day for the date', () => {
  render(<DateChip start={new Date('2024-06-08T12:00:00Z')} end={new Date('2024-06-08T13:00:00Z')} />);
  const linkElement = screen.getByText(/Sat/i);
  expect(linkElement).toBeInTheDocument();

  render(<DateChip start={new Date('2024-06-09T12:00:00Z')} end={new Date('2024-06-09T13:00:00Z')} />);
  const linkElement2 = screen.getByText(/Sun/i);
  expect(linkElement2).toBeInTheDocument();
});

test('renders DateChip with the correct time for the date', () => {
  render(<DateChip start={new Date('2024-06-08T12:05:00Z')} end={new Date('2024-06-08T13:00:00Z')} />);
  const linkElement = screen.getByText(/1:05 PM/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders DateChip with the correct day for the date range', () => {
  render(<DateChip start={new Date('2024-06-08T12:00:00Z')} end={new Date('2024-06-10T13:00:00Z')} />);
  const linkElement2 = screen.getByText(/Sat/i);
  expect(linkElement2).toBeInTheDocument();
  const linkElementMon = screen.getByText(/Mon/i);
  expect(linkElementMon).toBeInTheDocument();
});
