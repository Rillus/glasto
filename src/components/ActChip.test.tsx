// tests for ActChip component

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import ActChip from './ActChip';

describe('ActChip', () => {
  beforeEach(() => {
    document.cookie = '';
  });

  it('renders with the correct label', () => {
    render(
      <BrowserRouter>
        <ActChip
          short={'TST'}
          isSelected={false}
          name={'Test'}
        />
      </BrowserRouter>
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('toggles the selected state when clicked', () => {
    render(
      <BrowserRouter>
        <ActChip
          short={'TST'}
          isSelected={false}
          name={'Test'}
        />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByLabelText('Add to lineup'));
    expect(screen.getByLabelText('Remove from lineup')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Remove from lineup'));
    expect(screen.getByLabelText('Add to lineup')).toBeInTheDocument();
  });

  it('adds the selected act to localStorage', () => {
    render(
      <BrowserRouter>
        <ActChip
          short={'TST'}
          isSelected={true}
          name={'Test'}
        />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByLabelText('Add to lineup'));
    expect(localStorage.getItem('act_TST')).toEqual('true');
  });

  it('removes the selected act from localStorage', () => {
    render(
      <BrowserRouter>
        <ActChip
          short={'TST'}
          isSelected={true}
          name={'Test'}
        />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByLabelText('Remove from lineup'));
    expect(localStorage.getItem('act_TST')).toEqual('false');
  });

  it('checks if act is in lineup', () => {
    localStorage.setItem('act_TST', 'true');
    render(
      <BrowserRouter>
        <ActChip
          short={'TST'}
          isSelected={true}
          name={'Test'}
        />
      </BrowserRouter>
    );
    expect(screen.getByLabelText('Remove from lineup')).toBeInTheDocument();
  });
});
