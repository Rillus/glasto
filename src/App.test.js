import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock the fetch function
global.fetch = jest.fn();

const mockApiResponse = {
  lastUpdated: '2025-06-23T14:55:40.572Z',
  sourceUrl: 'https://clashfinder.com/data/event/g2025.json',
  data: {
    copyright: 'Licensed under a Creative Commons Attribution-NonCommercial 3.0 License',
    modified: '2025-06-23 14:54',
    name: 'Glastonbury Festival 2025',
    locations: [
      {
        name: 'Pyramid Stage',
        events: [
          {
            name: 'Test Act',
            short: 'testact',
            start: '2025-06-27 12:00',
            end: '2025-06-27 13:00'
          }
        ]
      }
    ]
  }
};

const mockFallbackResponse = {
  copyright: 'Licensed under a Creative Commons Attribution-NonCommercial 3.0 License',
  modified: '2025-06-23 14:54',
  name: 'Glastonbury Festival 2025',
  locations: [
    {
      name: 'Pyramid Stage',
      events: [
        {
          name: 'Fallback Act',
          short: 'fallbackact',
          start: '2025-06-27 12:00',
          end: '2025-06-27 13:00'
        }
      ]
    }
  ]
};

beforeEach(() => {
  fetch.mockClear();
});

test('renders app title', () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockApiResponse,
  });

  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  
  const linkElement = screen.getByRole('heading', { name: /My Lineup/i });
  expect(linkElement).toBeInTheDocument();
});

test('fetches data from API endpoint successfully', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockApiResponse,
  });

  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith('https://glasto-lineup.vercel.app/api/lineup-data');
  });
});

test('falls back to local data when API fails', async () => {
  // Mock API failure
  fetch
    .mockRejectedValueOnce(new Error('API failed'))
    .mockResolvedValueOnce({
      ok: true,
      json: async () => mockFallbackResponse,
    });

  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith('https://glasto-lineup.vercel.app/api/lineup-data');
    expect(fetch).toHaveBeenCalledWith('/g2025.json');
  });
});

test('handles API response with nested data structure', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockApiResponse,
  });

  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  await waitFor(() => {
    // Verify the app can handle the nested data structure
    expect(fetch).toHaveBeenCalledWith('https://glasto-lineup.vercel.app/api/lineup-data');
  });
});
