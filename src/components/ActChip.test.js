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
          id={'test'}
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
          id={'test'}
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
          id={'test'}
          isSelected={true}
          name={'Test'}
        />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByLabelText('Add to lineup'));
    expect(document.cookie).toContain('act_test');
  });

  it('removes the selected act from localStorage', () => {
    render(
      <BrowserRouter>
        <ActChip
          id={'test'}
          isSelected={true}
          name={'Test'}
        />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByLabelText('Remove from lineup'));
    expect(document.cookie).toContain('act_test=false');
  });

  it('checks if act is in lineup', () => {
    document.cookie = 'act_test=true';
    render(
      <BrowserRouter>
        <ActChip
          id={'test'}
          isSelected={true}
          name={'Test'}
        />
      </BrowserRouter>
    );
    expect(screen.getByLabelText('Remove from lineup')).toBeInTheDocument();
  });
});
